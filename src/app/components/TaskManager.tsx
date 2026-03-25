import { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  Home,
  BarChart3,
  Briefcase,
  User,
  Calendar,
  AlertCircle,
  Clock,
  FileText,
  Bell,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  dueTime: string;
  priorityLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'To Do' | 'In Progress' | 'Completed' | 'Hold';
  remark: string;
  category: 'Personal' | 'Official';
  reminder: boolean;
  reminderTime?: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

interface TaskManagerProps {
  onBack: () => void;
  onViewDashboard: () => void;
}

export function TaskManager({ onBack, onViewDashboard }: TaskManagerProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    dueTime: '',
    priorityLevel: 'Medium' as 'Low' | 'Medium' | 'High' | 'Critical',
    status: 'To Do' as 'To Do' | 'In Progress' | 'Completed' | 'Hold',
    remark: '',
    category: 'Personal' as 'Personal' | 'Official',
    reminder: false,
    reminderTime: '',
  });

  const handleCreateTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      dueDate: newTask.dueDate,
      dueTime: newTask.dueTime,
      priorityLevel: newTask.priorityLevel,
      status: newTask.status,
      remark: newTask.remark,
      category: newTask.category,
      reminder: newTask.reminder,
      reminderTime: newTask.reminderTime,
      completed: newTask.status === 'Completed',
      createdAt: new Date(),
      completedAt: newTask.status === 'Completed' ? new Date() : undefined,
    };

    setTasks([task, ...tasks]);
    setNewTask({
      title: '',
      dueDate: '',
      dueTime: '',
      priorityLevel: 'Medium',
      status: 'To Do',
      remark: '',
      category: 'Personal',
      reminder: false,
      reminderTime: '',
    });
    setIsCreating(false);
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newCompleted = !task.completed;
          return {
            ...task,
            completed: newCompleted,
            status: newCompleted ? ('Completed' as const) : ('In Progress' as const),
            completedAt: newCompleted ? new Date() : undefined,
          };
        }
        return task;
      })
    );
  };

  const handleStatusChange = (id: string, newStatus: 'To Do' | 'In Progress' | 'Completed' | 'Hold') => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: newStatus,
            completed: newStatus === 'Completed',
            completedAt: newStatus === 'Completed' ? new Date() : undefined,
          };
        }
        return task;
      })
    );
  };

  const calculateDaysToComplete = (task: Task) => {
    if (!task.completedAt) return null;
    const diff = task.completedAt.getTime() - task.createdAt.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getDateWiseSummary = () => {
    const summary: { [key: string]: Task[] } = {};
    tasks.forEach((task) => {
      const date = task.createdAt.toLocaleDateString();
      if (!summary[date]) {
        summary[date] = [];
      }
      summary[date].push(task);
    });
    return summary;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-500 bg-red-500/20 border-red-500/30';
      case 'High':
        return 'text-orange-500 bg-orange-500/20 border-orange-500/30';
      case 'Medium':
        return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30';
      case 'Low':
        return 'text-green-500 bg-green-500/20 border-green-500/30';
      default:
        return 'text-gray-500 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-500 bg-green-500/20 border-green-500/30';
      case 'In Progress':
        return 'text-blue-500 bg-blue-500/20 border-blue-500/30';
      case 'Hold':
        return 'text-orange-500 bg-orange-500/20 border-orange-500/30';
      case 'To Do':
        return 'text-gray-500 bg-gray-500/20 border-gray-500/30';
      default:
        return 'text-gray-500 bg-gray-500/20 border-gray-500/30';
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
    personal: tasks.filter((t) => t.category === 'Personal').length,
    official: tasks.filter((t) => t.category === 'Official').length,
  };

  const dateWiseSummary = getDateWiseSummary();

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-[#C9A36B] text-[#C9A36B] hover:bg-[#C9A36B]/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C9A36B] to-[#283845] bg-clip-text text-transparent">
              Task Manager
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowSummary(!showSummary)}
              variant="outline"
              className="border-[#C9A36B] text-[#C9A36B] hover:bg-[#C9A36B]/10"
            >
              <FileText className="w-4 h-4 mr-2" />
              {showSummary ? 'Hide Summary' : 'Task Summary'}
            </Button>
            <Button
              onClick={onViewDashboard}
              variant="outline"
              className="border-[#283845] text-[#283845] hover:bg-[#283845]/10"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-[#C9A36B] to-[#283845] hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-4">
            <div className="text-gray-400 text-sm mb-1">Total Tasks</div>
            <div className="text-3xl font-bold text-[#C9A36B]">{stats.total}</div>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#283845]/30 p-4">
            <div className="text-gray-400 text-sm mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-500">{stats.completed}</div>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-4">
            <div className="text-gray-400 text-sm mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-500">{stats.pending}</div>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#283845]/30 p-4">
            <div className="text-gray-400 text-sm mb-1 flex items-center gap-1">
              <User className="w-3 h-3" />
              Personal
            </div>
            <div className="text-3xl font-bold text-[#C9A36B]">{stats.personal}</div>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-4">
            <div className="text-gray-400 text-sm mb-1 flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              Official
            </div>
            <div className="text-3xl font-bold text-[#283845]">{stats.official}</div>
          </Card>
        </div>

        {/* Task Summary Section */}
        {showSummary && (
          <div className="mb-8">
            <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-6">
              <h2 className="text-2xl font-bold text-[#C9A36B] mb-6">
                Date-wise Task Summary
              </h2>
              <div className="space-y-6">
                {Object.entries(dateWiseSummary)
                  .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
                  .map(([date, dateTasks]) => (
                    <div key={date} className="border-l-4 border-[#C9A36B]/50 pl-4">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {date}
                      </h3>
                      <div className="grid gap-3">
                        {dateTasks.map((task) => {
                          const daysToComplete = calculateDaysToComplete(task);
                          return (
                            <div
                              key={task.id}
                              className="bg-[#0A0A0A]/50 rounded-lg p-4 border border-[#C9A36B]/20"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h4 className="text-white font-medium mb-2">
                                    {task.title}
                                  </h4>
                                  <div className="flex flex-wrap gap-2 text-sm">
                                    <Badge
                                      variant="outline"
                                      className={
                                        task.category === 'Personal'
                                          ? 'border-[#C9A36B] text-[#C9A36B] bg-[#C9A36B]/10'
                                          : 'border-[#283845] text-[#283845] bg-[#283845]/10'
                                      }
                                    >
                                      {task.category}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className={getPriorityColor(task.priorityLevel)}
                                    >
                                      {task.priorityLevel}
                                    </Badge>
                                    <div className="inline-flex">
                                      <Select
                                        value={task.status}
                                        onValueChange={(value: 'To Do' | 'In Progress' | 'Completed' | 'Hold') =>
                                          handleStatusChange(task.id, value)
                                        }
                                      >
                                        <SelectTrigger className={`h-6 text-xs border ${getStatusColor(task.status)}`}>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1A1A1A] border-[#C9A36B]/30">
                                          <SelectItem value="To Do" className="text-white hover:bg-gray-500/20">
                                            To Do
                                          </SelectItem>
                                          <SelectItem value="In Progress" className="text-white hover:bg-blue-500/20">
                                            In Progress
                                          </SelectItem>
                                          <SelectItem value="Completed" className="text-white hover:bg-green-500/20">
                                            Completed
                                          </SelectItem>
                                          <SelectItem value="Hold" className="text-white hover:bg-orange-500/20">
                                            Hold
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                                {daysToComplete !== null && (
                                  <div className="text-right">
                                    <div className="text-2xl font-bold text-[#C9A36B]">
                                      {daysToComplete}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      {daysToComplete === 1 ? 'day' : 'days'} to complete
                                    </div>
                                  </div>
                                )}
                                {task.dueDate && (
                                  <div className="text-right">
                                    <div className="text-xs text-gray-400 mb-1">Due Date</div>
                                    <div className="text-sm text-white">
                                      {new Date(task.dueDate).toLocaleDateString()}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 text-sm text-gray-400">
                        Total: {dateTasks.length} tasks | Completed:{' '}
                        {dateTasks.filter((t) => t.completed).length}
                      </div>
                    </div>
                  ))}
                {Object.keys(dateWiseSummary).length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No tasks yet. Create your first task to see the summary!
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Create Task Modal */}
        {isCreating && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setIsCreating(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-2 border-[#C9A36B]/30 rounded-2xl p-8 max-w-3xl w-full relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A36B]/5 to-transparent animate-pulse" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#C9A36B]">
                    Create New Task
                  </h2>
                  <Button
                    onClick={() => setIsCreating(false)}
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Task Title */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Task Title *
                    </label>
                    <Input
                      placeholder="Enter task title..."
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      className="bg-[#0A0A0A] border-[#C9A36B]/30 text-white placeholder:text-gray-500"
                    />
                  </div>

                  {/* Due Date and Time Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Due Date
                      </label>
                      <Input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) =>
                          setNewTask({ ...newTask, dueDate: e.target.value })
                        }
                        className="bg-[#0A0A0A] border-[#C9A36B]/30 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Due Time
                      </label>
                      <Input
                        type="time"
                        value={newTask.dueTime}
                        onChange={(e) =>
                          setNewTask({ ...newTask, dueTime: e.target.value })
                        }
                        className="bg-[#0A0A0A] border-[#C9A36B]/30 text-white"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Category *
                    </label>
                    <Select
                      value={newTask.category}
                      onValueChange={(value: 'Personal' | 'Official') =>
                        setNewTask({ ...newTask, category: value })
                      }
                    >
                      <SelectTrigger className="bg-[#0A0A0A] border-[#C9A36B]/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1A1A] border-[#C9A36B]/30">
                        <SelectItem value="Personal" className="text-white hover:bg-[#C9A36B]/20">
                          Personal
                        </SelectItem>
                        <SelectItem value="Official" className="text-white hover:bg-[#283845]/20">
                          Official
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Priority Level and Status Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Priority Level *
                      </label>
                      <Select
                        value={newTask.priorityLevel}
                        onValueChange={(value: 'Low' | 'Medium' | 'High' | 'Critical') =>
                          setNewTask({ ...newTask, priorityLevel: value })
                        }
                      >
                        <SelectTrigger className="bg-[#0A0A0A] border-[#C9A36B]/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1A] border-[#C9A36B]/30">
                          <SelectItem value="Low" className="text-white hover:bg-green-500/20">
                            Low
                          </SelectItem>
                          <SelectItem value="Medium" className="text-white hover:bg-yellow-500/20">
                            Medium
                          </SelectItem>
                          <SelectItem value="High" className="text-white hover:bg-orange-500/20">
                            High
                          </SelectItem>
                          <SelectItem value="Critical" className="text-white hover:bg-red-500/20">
                            Critical
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Status *
                      </label>
                      <Select
                        value={newTask.status}
                        onValueChange={(value: 'To Do' | 'In Progress' | 'Completed' | 'Hold') =>
                          setNewTask({ ...newTask, status: value })
                        }
                      >
                        <SelectTrigger className="bg-[#0A0A0A] border-[#C9A36B]/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1A] border-[#C9A36B]/30">
                          <SelectItem value="To Do" className="text-white hover:bg-gray-500/20">
                            To Do
                          </SelectItem>
                          <SelectItem value="In Progress" className="text-white hover:bg-blue-500/20">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Completed" className="text-white hover:bg-green-500/20">
                            Completed
                          </SelectItem>
                          <SelectItem value="Hold" className="text-white hover:bg-orange-500/20">
                            Hold
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Remark */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Remark
                    </label>
                    <Textarea
                      placeholder="Add any remarks or notes..."
                      value={newTask.remark}
                      onChange={(e) =>
                        setNewTask({ ...newTask, remark: e.target.value })
                      }
                      className="bg-[#0A0A0A] border-[#C9A36B]/30 text-white placeholder:text-gray-500 min-h-[120px]"
                    />
                  </div>

                  {/* Reminder/Alarm Section */}
                  <div className="border border-[#C9A36B]/20 rounded-lg p-4 bg-[#0A0A0A]/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#C9A36B]" />
                        <label className="text-sm text-gray-400">
                          Set Reminder/Alarm (Optional)
                        </label>
                      </div>
                      <Switch
                        checked={newTask.reminder}
                        onCheckedChange={(checked) =>
                          setNewTask({ ...newTask, reminder: checked })
                        }
                      />
                    </div>
                    
                    {newTask.reminder && (
                      <div className="pt-3 border-t border-[#C9A36B]/20">
                        <label className="text-sm text-gray-400 mb-2 block">
                          Reminder Time
                        </label>
                        <Input
                          type="time"
                          value={newTask.reminderTime}
                          onChange={(e) =>
                            setNewTask({ ...newTask, reminderTime: e.target.value })
                          }
                          className="bg-[#0A0A0A] border-[#C9A36B]/30 text-white"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          You'll be notified at this time
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleCreateTask}
                      className="flex-1 bg-gradient-to-r from-[#C9A36B] to-[#283845] hover:opacity-90"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Create Task
                    </Button>
                    <Button
                      onClick={() => setIsCreating(false)}
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id}>
              <Card
                className={`bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A36B]/10 ${
                  task.completed
                    ? 'border-green-500/30 opacity-60'
                    : 'border-[#C9A36B]/30'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => handleToggleComplete(task.id)}
                      className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-[#C9A36B] hover:border-[#C9A36B]/60'
                      }`}
                    >
                      {task.completed && <Check className="w-4 h-4 text-white" />}
                    </button>

                    {/* Task Content */}
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-semibold mb-2 ${
                          task.completed
                            ? 'text-gray-500 line-through'
                            : 'text-white'
                        }`}
                      >
                        {task.title}
                      </h3>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge
                          variant="outline"
                          className={
                            task.category === 'Personal'
                              ? 'border-[#C9A36B] text-[#C9A36B] bg-[#C9A36B]/10'
                              : 'border-[#283845] text-[#283845] bg-[#283845]/10'
                          }
                        >
                          {task.category === 'Personal' ? (
                            <User className="w-3 h-3 mr-1" />
                          ) : (
                            <Briefcase className="w-3 h-3 mr-1" />
                          )}
                          {task.category}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(task.priorityLevel)}
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {task.priorityLevel}
                        </Badge>
                        <div className="inline-flex">
                          <Select
                            value={task.status}
                            onValueChange={(value: 'To Do' | 'In Progress' | 'Completed' | 'Hold') =>
                              handleStatusChange(task.id, value)
                            }
                          >
                            <SelectTrigger className={`h-6 text-xs border ${getStatusColor(task.status)}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1A] border-[#C9A36B]/30">
                              <SelectItem value="To Do" className="text-white hover:bg-gray-500/20">
                                To Do
                              </SelectItem>
                              <SelectItem value="In Progress" className="text-white hover:bg-blue-500/20">
                                In Progress
                              </SelectItem>
                              <SelectItem value="Completed" className="text-white hover:bg-green-500/20">
                                Completed
                              </SelectItem>
                              <SelectItem value="Hold" className="text-white hover:bg-orange-500/20">
                                Hold
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Task Details */}
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-400">
                        {task.dueDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            {task.dueTime && <span>at {task.dueTime}</span>}
                          </div>
                        )}
                        {task.reminderTime && (
                          <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            <span>Reminder: {task.reminderTime}</span>
                          </div>
                        )}
                      </div>

                      {task.remark && (
                        <div className="mt-3 text-sm text-gray-400 italic">
                          "{task.remark}"
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleDeleteTask(task.id)}
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}

          {tasks.length === 0 && (
            <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-12">
              <div className="text-center">
                <div className="text-gray-500 mb-4">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
                  <p>Create your first task to get started</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}