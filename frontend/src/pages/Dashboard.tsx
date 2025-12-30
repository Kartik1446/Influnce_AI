import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import {
    Instagram,
    Twitter,
    Youtube,
    TrendingUp,
    Users,
    Heart,
    MessageCircle,
    Eye,
    BarChart3,
    Calendar,
    Sparkles,
    ArrowRight,
    Zap,
    CheckCircle2,
    PlusCircle
} from 'lucide-react';

interface PlatformStats {
    platform: string;
    followers: number;
    engagement: number;
    posts: number;
    growth: number;
}

export default function Dashboard() {
    const { user, isAuthenticated, connectedAccounts, fetchConnectedAccounts, connectPlatform } = useAuthStore();
    const { theme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchConnectedAccounts();
    }, [isAuthenticated, navigate, fetchConnectedAccounts]);

    const isConnected = (platform: string) => {
        return connectedAccounts.some((acc) => acc.platform === platform && acc.connected);
    };

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'instagram': return <Instagram className="w-6 h-6" />;
            case 'twitter': return <Twitter className="w-6 h-6" />;
            case 'youtube': return <Youtube className="w-6 h-6" />;
            default: return null;
        }
    };

    const getPlatformColor = (platform: string) => {
        switch (platform) {
            case 'instagram': return 'from-pink-500 to-purple-600';
            case 'twitter': return 'from-blue-400 to-cyan-500';
            case 'youtube': return 'from-red-500 to-orange-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className={cn(
                        "text-3xl font-bold mb-1",
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    )}>
                        Dashboard
                        <span className="ml-2 text-xl font-normal text-gray-500 dark:text-gray-400">
                            Welcome back, {user?.username}
                        </span>
                    </h1>
                    <p className={cn(
                        "text-sm",
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    )}>
                        Here's what's happening with your accounts today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/analytics')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium border",
                            theme === 'dark'
                                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                                : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                        )}>
                        <BarChart3 className="w-4 h-4" />
                        Full Analytics
                    </button>
                    <button
                        onClick={() => navigate('/ai-chat')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-purple-500/25 transition-all transform hover:scale-[1.02]">
                        <Sparkles className="w-4 h-4" />
                        Ask AI Assistant
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className={cn(
                    "p-6 border-0 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300",
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                )}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-100"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className={cn(
                            "p-3 rounded-xl",
                            theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-50'
                        )}>
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="flex items-center text-green-500 text-sm font-semibold bg-green-500/10 px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +12.5%
                        </span>
                    </div>
                    <div>
                        <h3 className={cn("text-3xl font-bold mb-1", theme === 'dark' ? 'text-white' : 'text-gray-900')}>24.5K</h3>
                        <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>Total Followers</p>
                    </div>
                </Card>

                <Card className={cn(
                    "p-6 border-0 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300",
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                )}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-100"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className={cn(
                            "p-3 rounded-xl",
                            theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-50'
                        )}>
                            <Heart className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="flex items-center text-green-500 text-sm font-semibold bg-green-500/10 px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +8.2%
                        </span>
                    </div>
                    <div>
                        <h3 className={cn("text-3xl font-bold mb-1", theme === 'dark' ? 'text-white' : 'text-gray-900')}>4.8%</h3>
                        <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>Avg. Engagement</p>
                    </div>
                </Card>

                <Card className={cn(
                    "p-6 border-0 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300",
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                )}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-100"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className={cn(
                            "p-3 rounded-xl",
                            theme === 'dark' ? 'bg-green-900/50' : 'bg-green-50'
                        )}>
                            <BarChart3 className="w-6 h-6 text-green-600" />
                        </div>
                        <span className="flex items-center text-green-500 text-sm font-semibold bg-green-500/10 px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +15.3%
                        </span>
                    </div>
                    <div>
                        <h3 className={cn("text-3xl font-bold mb-1", theme === 'dark' ? 'text-white' : 'text-gray-900')}>156</h3>
                        <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>Total Posts</p>
                    </div>
                </Card>

                <Card className={cn(
                    "p-6 border-0 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300",
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                )}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-100"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className={cn(
                            "p-3 rounded-xl",
                            theme === 'dark' ? 'bg-orange-900/50' : 'bg-orange-50'
                        )}>
                            <Eye className="w-6 h-6 text-orange-600" />
                        </div>
                        <span className="flex items-center text-green-500 text-sm font-semibold bg-green-500/10 px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +22.1%
                        </span>
                    </div>
                    <div>
                        <h3 className={cn("text-3xl font-bold mb-1", theme === 'dark' ? 'text-white' : 'text-gray-900')}>1.2M</h3>
                        <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>Total Reach</p>
                    </div>
                </Card>
            </div>

            {/* Connect Platforms */}
            <div>
                <h2 className={cn(
                    "text-xl font-bold mb-6",
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                )}>
                    Connected Platforms
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {['instagram', 'twitter', 'youtube'].map((platform) => {
                        const connected = isConnected(platform);
                        return (
                            <button
                                key={platform}
                                onClick={() => !connected && connectPlatform(platform as any)}
                                disabled={connected}
                                className={cn(
                                    "relative group overflow-hidden p-6 rounded-2xl border transition-all duration-300",
                                    theme === 'dark'
                                        ? 'bg-gray-800 border-gray-700'
                                        : 'bg-white border-gray-200',
                                    connected ? 'cursor-default' : 'hover:shadow-xl hover:-translate-y-1'
                                )}
                            >
                                <div className={cn(
                                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
                                    getPlatformColor(platform)
                                )} />

                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br",
                                        getPlatformColor(platform)
                                    )}>
                                        {getPlatformIcon(platform)}
                                    </div>
                                    {connected ? (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-600 rounded-full text-xs font-bold ring-1 ring-green-500/20">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            CONNECTED
                                        </div>
                                    ) : (
                                        <div className={cn(
                                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors",
                                            theme === 'dark'
                                                ? 'bg-gray-700 text-gray-400 group-hover:bg-gray-600 group-hover:text-white'
                                                : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-900'
                                        )}>
                                            <PlusCircle className="w-3.5 h-3.5" />
                                            CONNECT
                                        </div>
                                    )}
                                </div>
                                <div className="relative z-10 text-left">
                                    <h3 className={cn(
                                        "text-lg font-bold capitalize mb-1",
                                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    )}>
                                        {platform}
                                    </h3>
                                    <p className={cn(
                                        "text-sm",
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                    )}>
                                        {connected
                                            ? 'Syncing data automatically'
                                            : 'Connect to unlock analytics'}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity & AI Recommendations */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <Card className={cn(
                    "lg:col-span-2 border-0 shadow-lg p-6",
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                )}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={cn(
                            "text-lg font-bold flex items-center gap-2",
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        )}>
                            <Zap className="w-5 h-5 text-yellow-500" />
                            Recent Activity
                        </h3>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className={cn(
                                "flex items-start gap-4 p-4 rounded-xl transition-colors",
                                theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                            )}>
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <TrendingUp className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className={cn("font-medium", theme === 'dark' ? 'text-white' : 'text-gray-900')}>
                                        Your post "Summer Vibes" is trending
                                    </p>
                                    <p className={cn("text-sm mt-1", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                                        It has reached 5k views in the last hour.
                                    </p>
                                </div>
                                <span className={cn("text-xs whitespace-nowrap ml-auto", theme === 'dark' ? 'text-gray-500' : 'text-gray-400')}>
                                    2h ago
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* AI Recommendations */}
                <Card className={cn(
                    "border-0 shadow-lg p-6",
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                )}>
                    <h3 className={cn(
                        "text-lg font-bold mb-6 flex items-center gap-2",
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    )}>
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        AI Insights
                    </h3>
                    <div className="space-y-4">
                        <div className={cn(
                            "p-4 rounded-xl border",
                            theme === 'dark'
                                ? 'bg-purple-900/20 border-purple-500/30'
                                : 'bg-purple-50 border-purple-100'
                        )}>
                            <h4 className={cn("font-semibold mb-1 text-sm", theme === 'dark' ? 'text-purple-300' : 'text-purple-700')}>
                                Optimal Posting Time
                            </h4>
                            <p className={cn("text-xs leading-relaxed", theme === 'dark' ? 'text-purple-200' : 'text-purple-600')}>
                                Your audience is most active today between <span className="font-bold">6 PM - 8 PM</span>.
                            </p>
                        </div>
                        <div className={cn(
                            "p-4 rounded-xl border",
                            theme === 'dark'
                                ? 'bg-blue-900/20 border-blue-500/30'
                                : 'bg-blue-50 border-blue-100'
                        )}>
                            <h4 className={cn("font-semibold mb-1 text-sm", theme === 'dark' ? 'text-blue-300' : 'text-blue-700')}>
                                Engagement Tip
                            </h4>
                            <p className={cn("text-xs leading-relaxed", theme === 'dark' ? 'text-blue-200' : 'text-blue-600')}>
                                Try adding a question to your caption to boost comments by <span className="font-bold">~15%</span>.
                            </p>
                        </div>
                        <button className="w-full py-2.5 mt-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors">
                            View All Suggestions
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
