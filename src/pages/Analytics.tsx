
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Eye, Heart, Calendar, Target } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const engagementData = [
  { name: 'Mon', engagement: 4.2, reach: 2400 },
  { name: 'Tue', engagement: 3.8, reach: 1398 },
  { name: 'Wed', engagement: 5.1, reach: 3800 },
  { name: 'Thu', engagement: 4.7, reach: 3908 },
  { name: 'Fri', engagement: 4.9, reach: 4800 },
  { name: 'Sat', engagement: 3.2, reach: 3800 },
  { name: 'Sun', engagement: 3.6, reach: 4300 },
];

const postTypeData = [
  { name: 'Photos', value: 45, color: '#3B82F6' },
  { name: 'Videos', value: 30, color: '#8B5CF6' },
  { name: 'Stories', value: 15, color: '#EC4899' },
  { name: 'Reels', value: 10, color: '#10B981' },
];

const bestTimeData = [
  { time: '6AM', posts: 2, engagement: 2.1 },
  { time: '9AM', posts: 8, engagement: 3.2 },
  { time: '12PM', posts: 12, engagement: 4.1 },
  { time: '3PM', posts: 15, engagement: 3.8 },
  { time: '6PM', posts: 20, engagement: 5.2 },
  { time: '9PM', posts: 18, engagement: 4.7 },
];

export default function Analytics() {
  const { theme } = useTheme();

  const chartColors = {
    text: theme === 'dark' ? '#E5E7EB' : '#374151',
    grid: theme === 'dark' ? '#374151' : '#E5E7EB',
    background: theme === 'dark' ? '#1F2937' : '#FFFFFF',
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={cn(
                "text-sm",
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              )}>
                Total Followers
              </p>
              <p className={cn(
                "text-3xl font-bold",
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              )}>
                2,147
              </p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </p>
            </div>
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
            )}>
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={cn(
                "text-sm",
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              )}>
                Avg. Engagement
              </p>
              <p className={cn(
                "text-3xl font-bold",
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              )}>
                4.2%
              </p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +0.8%
              </p>
            </div>
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'
            )}>
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={cn(
                "text-sm",
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              )}>
                Total Reach
              </p>
              <p className={cn(
                "text-3xl font-bold",
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              )}>
                24.7K
              </p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +18.3%
              </p>
            </div>
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
            )}>
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={cn(
                "text-sm",
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              )}>
                Posts This Month
              </p>
              <p className={cn(
                "text-3xl font-bold",
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              )}>
                156
              </p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                5.2/day avg
              </p>
            </div>
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              theme === 'dark' ? 'bg-orange-900' : 'bg-orange-100'
            )}>
              <Target className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trend */}
        <Card className="p-6">
          <h3 className={cn(
            "text-lg font-semibold mb-4",
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            Engagement Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.background,
                  border: `1px solid ${chartColors.grid}`,
                  color: chartColors.text
                }}
              />
              <Line type="monotone" dataKey="engagement" stroke="#8B5CF6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Content Type Distribution */}
        <Card className="p-6">
          <h3 className={cn(
            "text-lg font-semibold mb-4",
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            Content Type Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={postTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                stroke={chartColors.background}
              >
                {postTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.background,
                  border: `1px solid ${chartColors.grid}`,
                  color: chartColors.text
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Best Posting Times */}
      <Card className="p-6">
        <h3 className={cn(
          "text-lg font-semibold mb-4",
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          Best Posting Times
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bestTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="time" stroke={chartColors.text} />
            <YAxis stroke={chartColors.text} />
            <Tooltip
              contentStyle={{
                backgroundColor: chartColors.background,
                border: `1px solid ${chartColors.grid}`,
                color: chartColors.text
              }}
            />
            <Bar dataKey="engagement" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
        <div className={cn(
          "mt-4 p-4 rounded-lg",
          theme === 'dark' ? 'bg-blue-900 border border-blue-800' : 'bg-blue-50 border border-blue-100'
        )}>
          <p className={cn(
            "text-sm",
            theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
          )}>
            <strong>Recommendation:</strong> Your audience is most active between 6-8 PM.
            Posts published during this window show 35% higher engagement rates.
          </p>
        </div>
      </Card>

      {/* Top Performing Posts */}
      <Card className="p-6">
        <h3 className={cn(
          "text-lg font-semibold mb-4",
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          Top Performing Posts
        </h3>
        <div className="space-y-4">
          {[
            { caption: 'New collection launch! 🚀 Excited to share these amazing pieces...', engagement: 5.2, reach: 5420, likes: 1247 },
            { caption: 'Morning coffee vibes ☕ Perfect start to a productive day...', engagement: 4.8, reach: 3210, likes: 892 },
            { caption: 'Behind the scenes of today\'s shoot 📸 Swipe to see...', engagement: 4.3, reach: 2876, likes: 743 },
          ].map((post, index) => (
            <div key={index} className={cn(
              "flex items-center justify-between p-4 rounded-lg",
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            )}>
              <div className="flex-1">
                <p className={cn(
                  "text-sm font-medium line-clamp-2",
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                )}>
                  {post.caption}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs">
                  <span className={cn(
                    "text-gray-500",
                    theme === 'dark' ? 'dark:text-gray-400' : ''
                  )}>
                    Engagement: {post.engagement}%
                  </span>
                  <span className={cn(
                    "text-gray-500",
                    theme === 'dark' ? 'dark:text-gray-400' : ''
                  )}>
                    Reach: {post.reach.toLocaleString()}
                  </span>
                  <span className={cn(
                    "text-gray-500",
                    theme === 'dark' ? 'dark:text-gray-400' : ''
                  )}>
                    Likes: {post.likes.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className={cn(
                  "text-lg font-bold text-green-600",
                  theme === 'dark' ? 'dark:text-green-400' : ''
                )}>
                  #{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>

  );
}