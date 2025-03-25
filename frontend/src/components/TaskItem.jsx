import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Clock, Calendar, FileText, MoreHorizontal } from 'lucide-react';
import { calculateDaysLeft, formatTime } from '../lib/utils';
import TaskDetailDialog from './TaskDetailDialog';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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

  return (
    <>
      <div onClick={() => setIsDetailOpen(true)} className="cursor-pointer">
        <Card className="hover:shadow-md transition-shadow bg-[#fff9f7] mt-8">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDetailOpen(true);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                  {task.dueDate && (
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{calculateDaysLeft(task.dueDate)} Days left</span>
                    </div>
                  )}

                  {task.timeSpent > 0 && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{formatTime(task.timeSpent)}</span>
                    </div>
                  )}

                  {task.attachments && task.attachments.length > 0 && (
                    <div className="flex items-center gap-1">
                      <FileText size={14} />
                      <span>{task.attachments.length} Files</span>
                    </div>
                  )}
                  <Badge variant={getPriorityVariant(task.priority)}>
                    {task.priority} Priority
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Detail Dialog */}
      <TaskDetailDialog
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        task={task}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </>
  );
};

export default TaskItem;
