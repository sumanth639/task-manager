import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Clock, Calendar, FileText, Trash, Edit, Check } from 'lucide-react';
import { formatTime } from '../lib/utils';
import { format } from 'date-fns';

const TaskDetailDialog = ({ isOpen, onClose, task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [timeSpent, setTimeSpent] = useState(task.timeSpent);
  const [isAddingTimeSpent, setIsAddingTimeSpent] = useState(false);
  const [additionalTime, setAdditionalTime] = useState(0);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await onDelete(task._id);
      onClose();
    }
  };

  const handleUpdate = async () => {
    await onUpdate(task._id, {
      title,
      description,
      status,
      priority,
    });
    setIsEditing(false);
  };

  const handleAddTimeSpent = async () => {
    if (additionalTime <= 0) return;

    const newTotal = task.timeSpent + additionalTime;
    await onUpdate(task._id, { timeSpent: newTotal });
    setTimeSpent(newTotal);
    setAdditionalTime(0);
    setIsAddingTimeSpent(false);
  };

  const handleMarkAsCompleted = async () => {
    await onUpdate(task._id, { status: 'COMPLETED' });
    setStatus('COMPLETED'); // Update local state
  };

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'High':
        return 'high';
      case 'Medium':
        return 'medium';
      case 'Low':
        return 'low';
      default:
        return 'medium';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-start mb-4">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-semibold w-full border border-gray-300 rounded px-2 py-1"
            />
          ) : (
            <h2 className="text-xl font-semibold">{task.title}</h2>
          )}

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleUpdate}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit size={16} className="mr-1" /> Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={handleDelete}>
                  <Trash size={16} className="mr-1" /> Delete
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mb-4 flex items-center gap-3">
          {isEditing ? (
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          ) : (
            <Badge variant={getPriorityVariant(task.priority)}>
              {task.priority} Priority
            </Badge>
          )}

          {isEditing ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1"
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          ) : (
            <Badge variant="secondary">{task.status}</Badge>
          )}

          <Badge variant="outline">{task.type}</Badge>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              Description
            </h3>
            {isEditing ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                rows={4}
              />
            ) : (
              <p className="text-sm text-gray-500">
                {task.description || 'No description provided.'}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                Created At
              </h3>
              <p className="text-sm text-gray-500">
                {format(new Date(task.createdAt), 'MMM dd, yyyy HH:mm')}
              </p>
            </div>

            {task.dueDate && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">Time Spent</h3>
              {!isAddingTimeSpent && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAddingTimeSpent(true)}
                >
                  Add Time
                </Button>
              )}
            </div>

            <div className="flex items-center mt-1">
              <Clock size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">
                {formatTime(timeSpent)}
              </span>
            </div>

            {isAddingTimeSpent && (
              <div className="mt-2 flex items-end gap-2">
                <div>
                  <label
                    htmlFor="additionalTime"
                    className="block text-xs text-gray-600 mb-1"
                  >
                    Minutes to add
                  </label>
                  <input
                    id="additionalTime"
                    type="number"
                    min="1"
                    value={additionalTime}
                    onChange={(e) =>
                      setAdditionalTime(parseInt(e.target.value) || 0)
                    }
                    className="w-24 border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                </div>
                <Button size="sm" onClick={handleAddTimeSpent}>
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsAddingTimeSpent(false);
                    setAdditionalTime(0);
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {task.attachments.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Attachments
              </h3>
              <ul className="space-y-1">
                {task.attachments.map((attachment, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <FileText size={14} className="text-gray-500" />
                    <span>{attachment.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Mark as Completed Button */}
        {status !== 'COMPLETED' && (
          <div className="mt-6">
            <Button
              variant="success"
              className="w-full"
              onClick={handleMarkAsCompleted}
            >
              <Check size={16} className="mr-2" /> Mark as Completed
            </Button>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailDialog;
