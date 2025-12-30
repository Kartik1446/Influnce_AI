import { Card } from '@/components/ui/card';
import {
  MessageCircle, TrendingUp, Users, Heart, Eye, Share2,
  Plus, Filter, Calendar, Zap, ArrowRight, MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface Post {
  id: string;
  platform: 'instagram' | 'twitter' | 'youtube';
  image?: string;
  content: string;
  likes: number;
  comments: number;
  views: number;
  timestamp: string;
  engagement: number;
  status: 'published' | 'scheduled';
}

interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'trending' | 'engagement' | 'optimal_time';
  impact: 'high' | 'medium' | 'low';
}

export default function Home() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'feed' | 'scheduled' | 'drafts'>('feed');

  const [posts] = useState<Post[]>([
    {
      id: '1',
      platform: 'instagram',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
      content: 'New collection launch! 🚀 Excited to share these amazing pieces with you all. Link in bio! #fashion #lifestyle #newcollection',
      likes: 1247,
      comments: 89,
      views: 5420,
      timestamp: '2 hours ago',
      engagement: 24.5,
      status: 'published'
    },
    {
      id: '2',
      platform: 'twitter',
      content: 'Just dropped a new video on YouTube! specifically talking about how AI is changing the content creation game. 🤖✨ check it out! #AI #ContentCreator',
      likes: 450,
      comments: 32,
      views: 1200,
      timestamp: '4 hours ago',
      engagement: 18.2,
      status: 'published'
    },
    {
      id: '3',
      platform: 'youtube',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      content: 'My Morning Routine 2024 | Productive & Cozy ☕️',
      likes: 892,
      comments: 156,
      views: 3210,
      timestamp: '5 hours ago',
      engagement: 32.1,
      status: 'published'
    }
  ]);

  const [aiInsights] = useState<AIInsight[]>([
    {
      id: '1',
      title: 'Best Posting Time',
      description: 'Your audience is most active between 6-8 PM today.',
      type: 'optimal_time',
      impact: 'high'
    },
    {
      id: '2',
      title: 'Trending Hashtag',
      description: '#lifestyle is trending. Add it to your next post.',
      type: 'trending',
      impact: 'medium'
    },
    {
      id: '3',
      title: 'Engagement Spike',
      description: 'Video content is performing 3x better this week.',
      type: 'engagement',
      impact: 'high'
    }
  ]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trending': return <TrendingUp className="w-5 h-5" />;
      case 'engagement': return <Zap className="w-5 h-5" />;
      case 'optimal_time': return <Calendar className="w-5 h-5" />;
      default: return <MessageCircle className="w-5 h-5" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'bg-gradient-to-tr from-purple-500 to-pink-500';
      case 'twitter': return 'bg-blue-400';
      case 'youtube': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome & Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={cn(
            "text-3xl font-bold mb-1",
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          )}>
            Content Dashboard
          </h1>
          <p className={cn(
            "text-sm",
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          )}>
            Manage your social presence and view AI insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium",
            theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
          )}>
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02]">
            <Plus className="w-5 h-5" />
            Create Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit">
            {(['feed', 'scheduled', 'drafts'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                  activeTab === tab
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className={cn(
                "group relative overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl",
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              )}>
                <div className="p-6">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md",
                        getPlatformColor(post.platform)
                      )}>
                        {post.platform === 'instagram' && <Users className="w-5 h-5" />}
                        {post.platform === 'twitter' && <MessageCircle className="w-5 h-5" />}
                        {post.platform === 'youtube' && <Eye className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className={cn(
                          "font-semibold capitalize",
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        )}>
                          {post.platform} Post
                        </h3>
                        <span className={cn(
                          "text-xs",
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        )}>
                          {post.timestamp} • {post.status}
                        </span>
                      </div>
                    </div>
                    <button className={cn(
                      "p-2 rounded-lg transition-colors",
                      theme === 'dark' ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                    )}>
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col md:flex-row gap-6">
                    {post.image && (
                      <div className="md:w-1/3 shrink-0">
                        <img
                          src={post.image}
                          alt="Post media"
                          className="w-full h-48 md:h-full object-cover rounded-xl shadow-sm"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className={cn(
                        "mb-4 leading-relaxed",
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      )}>
                        {post.content}
                      </p>

                      {/* Metrics Grid */}
                      <div className={cn(
                        "grid grid-cols-4 gap-4 p-4 rounded-xl",
                        theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                      )}>
                        <div className="text-center">
                          <Heart className={cn("w-5 h-5 mx-auto mb-1", theme === 'dark' ? 'text-pink-400' : 'text-pink-500')} />
                          <span className={cn("text-sm font-semibold", theme === 'dark' ? 'text-white' : 'text-gray-900')}>{post.likes}</span>
                        </div>
                        <div className="text-center">
                          <MessageCircle className={cn("w-5 h-5 mx-auto mb-1", theme === 'dark' ? 'text-blue-400' : 'text-blue-500')} />
                          <span className={cn("text-sm font-semibold", theme === 'dark' ? 'text-white' : 'text-gray-900')}>{post.comments}</span>
                        </div>
                        <div className="text-center">
                          <Eye className={cn("w-5 h-5 mx-auto mb-1", theme === 'dark' ? 'text-green-400' : 'text-green-500')} />
                          <span className={cn("text-sm font-semibold", theme === 'dark' ? 'text-white' : 'text-gray-900')}>{post.views}</span>
                        </div>
                        <div className="text-center">
                          <Share2 className={cn("w-5 h-5 mx-auto mb-1", theme === 'dark' ? 'text-purple-400' : 'text-purple-500')} />
                          <span className={cn("text-sm font-semibold", theme === 'dark' ? 'text-white' : 'text-gray-900')}>{post.engagement}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights Card */}
          <Card className={cn(
            "border-0 shadow-lg overflow-hidden",
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          )}>
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className={cn(
                "font-bold flex items-center gap-2",
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              )}>
                <Zap className="w-5 h-5 text-yellow-500" />
                AI Insights
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className={cn(
                  "p-4 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer",
                  theme === 'dark'
                    ? 'bg-gray-700/30 border-gray-700 hover:bg-gray-700/50'
                    : 'bg-indigo-50/50 border-indigo-100 hover:bg-indigo-50'
                )}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(insight.type)}
                      <span className={cn(
                        "font-semibold text-sm",
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      )}>
                        {insight.title}
                      </span>
                    </div>
                    <span className={cn(
                      "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full",
                      getImpactColor(insight.impact)
                    )}>
                      {insight.impact}
                    </span>
                  </div>
                  <p className={cn(
                    "text-sm leading-relaxed",
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  )}>
                    {insight.description}
                  </p>
                </div>
              ))}
              <button className={cn(
                "w-full py-3 rounded-xl border-dashed border-2 flex items-center justify-center gap-2 text-sm font-medium transition-all group",
                theme === 'dark'
                  ? 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white'
                  : 'border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
              )}>
                Generate New Report
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Card>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className={cn(
              "p-4 border-0 shadow-md text-center hover:scale-105 transition-transform duration-300",
              theme === 'dark' ? 'bg-gradient-to-br from-purple-900/50 to-indigo-900/50' : 'bg-gradient-to-br from-purple-50 to-indigo-50'
            )}>
              <div className="text-3xl font-bold text-purple-600 mb-1">2.1K</div>
              <div className={cn("text-xs font-medium uppercase tracking-wide", theme === 'dark' ? 'text-purple-300' : 'text-purple-700')}>Followers</div>
            </Card>
            <Card className={cn(
              "p-4 border-0 shadow-md text-center hover:scale-105 transition-transform duration-300",
              theme === 'dark' ? 'bg-gradient-to-br from-green-900/50 to-emerald-900/50' : 'bg-gradient-to-br from-green-50 to-emerald-50'
            )}>
              <div className="text-3xl font-bold text-green-600 mb-1">4.8%</div>
              <div className={cn("text-xs font-medium uppercase tracking-wide", theme === 'dark' ? 'text-green-300' : 'text-green-700')}>Engagement</div>
            </Card>
            <Card className={cn(
              "p-4 border-0 shadow-md text-center hover:scale-105 transition-transform duration-300",
              theme === 'dark' ? 'bg-gradient-to-br from-blue-900/50 to-cyan-900/50' : 'bg-gradient-to-br from-blue-50 to-cyan-50'
            )}>
              <div className="text-3xl font-bold text-blue-600 mb-1">156</div>
              <div className={cn("text-xs font-medium uppercase tracking-wide", theme === 'dark' ? 'text-blue-300' : 'text-blue-700')}>Posts</div>
            </Card>
            <Card className={cn(
              "p-4 border-0 shadow-md text-center hover:scale-105 transition-transform duration-300",
              theme === 'dark' ? 'bg-gradient-to-br from-orange-900/50 to-red-900/50' : 'bg-gradient-to-br from-orange-50 to-red-50'
            )}>
              <div className="text-3xl font-bold text-orange-600 mb-1">+23%</div>
              <div className={cn("text-xs font-medium uppercase tracking-wide", theme === 'dark' ? 'text-orange-300' : 'text-orange-700')}>Growth</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}