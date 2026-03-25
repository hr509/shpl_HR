import { Home, TrendingUp, CheckCircle, Clock, Briefcase, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface DashboardProps {
  onBack: () => void;
}

export function Dashboard({ onBack }: DashboardProps) {
  // Mock data for visualization
  const stats = [
    {
      title: 'Total Tasks',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: CheckCircle,
      color: '#C9A36B',
    },
    {
      title: 'Completed',
      value: '18',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: '#10b981',
    },
    {
      title: 'In Progress',
      value: '6',
      change: '-5%',
      trend: 'down',
      icon: Clock,
      color: '#f59e0b',
    },
    {
      title: 'Personal',
      value: '14',
      change: '+3%',
      trend: 'up',
      icon: User,
      color: '#C9A36B',
    },
    {
      title: 'Official',
      value: '10',
      change: '+9%',
      trend: 'up',
      icon: Briefcase,
      color: '#283845',
    },
  ];

  const recentActivity = [
    {
      action: 'Completed "Design Review"',
      time: '2 hours ago',
      category: 'Official',
    },
    {
      action: 'Created "Grocery Shopping"',
      time: '5 hours ago',
      category: 'Personal',
    },
    {
      action: 'Updated "Project Documentation"',
      time: '1 day ago',
      category: 'Official',
    },
    {
      action: 'Completed "Morning Workout"',
      time: '2 days ago',
      category: 'Personal',
    },
  ];

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
              Dashboard
            </h1>
          </div>
          <div className="text-gray-400 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-6 hover:border-[#C9A36B]/60 transition-all duration-300 relative overflow-hidden group">
                {/* Background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A36B]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.title}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts and Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Completion Rate */}
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-6">
            <h3 className="text-xl font-semibold text-[#C9A36B] mb-6">
              Completion Rate
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Personal Tasks</span>
                  <span className="text-white font-semibold">85%</span>
                </div>
                <div className="h-3 bg-[#0A0A0A] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#C9A36B] to-[#C9A36B]/60 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Official Tasks</span>
                  <span className="text-white font-semibold">70%</span>
                </div>
                <div className="h-3 bg-[#0A0A0A] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#283845] to-[#283845]/60 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Overall</span>
                  <span className="text-white font-semibold">78%</span>
                </div>
                <div className="h-3 bg-[#0A0A0A] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#10b981] to-[#10b981]/60 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-6">
            <h3 className="text-xl font-semibold text-[#C9A36B] mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#0A0A0A]/50 border border-[#C9A36B]/10 hover:border-[#C9A36B]/30 transition-all"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.category === 'Personal'
                        ? 'bg-[#C9A36B]'
                        : 'bg-[#283845]'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="text-white text-sm">{activity.action}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      {activity.time}
                    </div>
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded ${
                      activity.category === 'Personal'
                        ? 'bg-[#C9A36B]/20 text-[#C9A36B]'
                        : 'bg-[#283845]/20 text-[#283845]'
                    }`}
                  >
                    {activity.category}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Productivity Insights */}
        <div className="mt-6">
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-6">
            <h3 className="text-xl font-semibold text-[#C9A36B] mb-4">
              Productivity Insights
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-[#0A0A0A]/50">
                <div className="text-3xl font-bold text-[#C9A36B] mb-2">5.2</div>
                <div className="text-sm text-gray-400">
                  Average tasks completed per day
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-[#0A0A0A]/50">
                <div className="text-3xl font-bold text-green-500 mb-2">92%</div>
                <div className="text-sm text-gray-400">On-time completion rate</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-[#0A0A0A]/50">
                <div className="text-3xl font-bold text-[#283845] mb-2">3.5h</div>
                <div className="text-sm text-gray-400">
                  Average time per task
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
