import { useState, useEffect, useContext } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Plus } from 'lucide-react';
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from '../services/taskService';
import AuthContext from '../context/AuthContext';
import { calculateDaysLeft, formatTime } from '../lib/utils';
import TaskItem from '../components/TaskItem';
import AddTaskDialog from '../components/AddTaskDialog';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await addTask(taskData);
      setTasks([newTask, ...tasks]);
      setIsAddTaskOpen(false);
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const filteredTasks =
    filter === 'All' ? tasks : tasks.filter((task) => task.type === filter);

  const todoTasks = filteredTasks.filter((task) => task.status === 'TODO');

  const completedTasks = filteredTasks.filter(
    (task) => task.status === 'COMPLETED'
  );

  return (
    <div className="min-h-screen bg-[#fdf2e9]">
      <header className=" bg-[#fdf2e9] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#00000]">
                TaskForge{' '}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsAddTaskOpen(true)}
                disabled={!user}
              >
                <Plus size={16} />
                Add Task
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                {user ? 'Logout' : 'Login'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="All">
          <TabsList className="mb-6">
            <TabsTrigger value="All" onClick={() => setFilter('All')}>
              All
            </TabsTrigger>
            <TabsTrigger value="Remote" onClick={() => setFilter('Remote')}>
              Remote
            </TabsTrigger>
            <TabsTrigger
              value="In Person"
              onClick={() => setFilter('In Person')}
            >
              In Person
            </TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="flex items-center justify-center ">Loading...</div>
          ) : (
            <div className="flex flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  TODO ({todoTasks.length})
                </h2>
                <div className="space-y-4">
                  {todoTasks.map((task) => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  COMPLETED ({completedTasks.length})
                </h2>
                <div className="space-y-4">
                  {completedTasks.map((task) => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Tabs>
      </main>

      <AddTaskDialog
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default Dashboard;
