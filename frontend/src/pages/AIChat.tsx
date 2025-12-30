
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Sparkles, TrendingUp, Users, Plus, Copy, Share, Camera, Image, Hash } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'analytics' | 'suggestion' | 'content_creation';
  data?: any;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  prompt: string;
  category: 'analytics' | 'creation';
}

export default function AIChat() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant for social media. I can help you with analytics insights about your Instagram performance, suggest optimal posting times, analyze engagement patterns, AND create engaging content with captions and hashtags. Switch to the "Create" tab to generate posts, captions, and hashtag sets! What would you like to do?',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'creation'>('analytics');
  const [isCreatingContent, setIsCreatingContent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Best Posting Times',
      description: 'Find optimal times to post',
      icon: TrendingUp,
      prompt: 'What are the best times to post on Instagram for maximum engagement?',
      category: 'analytics'
    },
    {
      id: '2',
      title: 'Engagement Analysis',
      description: 'Analyze your engagement patterns',
      icon: Users,
      prompt: 'Analyze my recent engagement patterns and suggest improvements',
      category: 'analytics'
    },
    {
      id: '3',
      title: 'Content Ideas',
      description: 'Get content suggestions',
      icon: Sparkles,
      prompt: 'Suggest some trending content ideas for my niche',
      category: 'analytics'
    },
    {
      id: '4',
      title: 'Create Post',
      description: 'Generate a complete social media post',
      icon: Plus,
      prompt: 'Create a engaging social media post with caption and hashtags',
      category: 'creation'
    },
    {
      id: '5',
      title: 'Photo Caption',
      description: 'Generate caption for your photo',
      icon: Camera,
      prompt: 'Create an engaging caption for a lifestyle photo',
      category: 'creation'
    },
    {
      id: '6',
      title: 'Hashtag Set',
      description: 'Generate trending hashtags',
      icon: Hash,
      prompt: 'Generate a set of trending hashtags for maximum reach',
      category: 'creation'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): Message => {
    const responses = [
      {
        type: 'analytics' as const,
        content:
          'Based on your recent posts, your audience is most active between 6-8 PM on weekdays. Posts published during this window show 35% higher engagement rates. I recommend scheduling your content between 6:00-7:30 PM for optimal reach.',
        data: {
          bestTimes: ['6:00 PM', '6:30 PM', '7:00 PM'],
          engagementBoost: '35%',
          recommendedDays: ['Monday', 'Wednesday', 'Friday'],
        },
      },
      {
        type: 'suggestion' as const,
        content:
          "I've analyzed trending hashtags in your niche. #lifestyle, #dailyinspiration, and #motivationmonday are performing exceptionally well. Consider incorporating these into your next posts while maintaining authenticity.",
        data: {
          hashtags: ['#lifestyle', '#dailyinspiration', '#motivationmonday', '#selfcare'],
          expectedReach: '15K-25K impressions',
        },
      },
      {
        type: 'text' as const,
        content:
          'Your recent engagement shows a positive trend! Your storytelling posts are performing 42% better than promotional content. I suggest maintaining a 70/30 ratio of value-driven vs promotional posts to maximize audience retention.',
        data: null,
      },
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: randomResponse.content,
      timestamp: new Date(),
      type: randomResponse.type,
      data: randomResponse.data,
    };
  };

  const generateSocialMediaContent = (prompt: string): Message => {
    const contentTypes = [
      {
        type: 'content_creation' as const,
        content: `I've created an engaging social media post for you based on your prompt: "${prompt}"`,
        data: {
          post: {
            caption:
              "✨ Transform your daily routine into something extraordinary! Small changes lead to big results. What's one habit you're working on today? #TransformationTuesday #DailyMotivation",
            hashtags: ['#TransformationTuesday', '#DailyMotivation', '#Lifestyle', '#SelfCare', '#Motivation', '#Inspiration', '#Goals', '#Wellness'],
            image_suggestion: 'A bright, inspiring lifestyle image showing personal growth or transformation',
            posting_time: '11:00 AM - 1:00 PM for maximum engagement',
            expected_reach: '15K-25K impressions',
            engagement_prediction: '4.2% engagement rate',
          },
        },
      },
      {
        type: 'content_creation' as const,
        content: `Here's a compelling caption for your photo: "${prompt}"`,
        data: {
          caption: {
            text:
              'Sometimes the best moments are the quiet ones. Taking time to appreciate the little things that make life beautiful. 🌸 What are you grateful for today?',
            tone: 'Inspirational and reflective',
            length: 'Medium-form (150 characters)',
            cta: 'Ask a question to boost engagement',
            hashtags: ['#Gratitude', '#Mindfulness', '#LifeStyle', '#Inspiration', '#SelfCare'],
          },
        },
      },
      {
        type: 'content_creation' as const,
        content: `I've generated a set of trending hashtags for maximum reach: "${prompt}"`,
        data: {
          hashtags: {
            trending: ['#Viral', '#TrendingNow', '#ExplorePage', '#InstaGood', '#PhotoOfTheDay'],
            niche_specific: ['#LifestyleBlogger', '#WellnessJourney', '#MindfulLiving', '#SelfCareRoutine'],
            engagement_boosters: ['#LikeForLike', '#FollowForFollow', '#CommentBelow', '#ShareYourStory'],
            optimal_count: '15-20 hashtags for best reach',
            placement: 'Mix in caption and first comment',
          },
        },
      },
    ];

    const randomContent = contentTypes[Math.floor(Math.random() * contentTypes.length)];

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: randomContent.content,
      timestamp: new Date(),
      type: randomContent.type,
      data: randomContent.data,
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Check if user is asking for content creation
    const creationKeywords = ['create', 'generate', 'make', 'write', 'caption', 'hashtag', 'post'];
    const isContentCreation = creationKeywords.some(keyword =>
      inputMessage.toLowerCase().includes(keyword)
    );

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = isContentCreation
        ? generateSocialMediaContent(inputMessage)
        : simulateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.category === 'creation') {
      // For creation actions, generate content directly
      setIsCreatingContent(true);
      setIsTyping(true);

      setTimeout(() => {
        const contentMessage = generateSocialMediaContent(action.prompt);
        setMessages(prev => [...prev, contentMessage]);
        setIsTyping(false);
        setIsCreatingContent(false);
      }, 2000);
    } else {
      // For analytics actions, use the normal flow
      setInputMessage(action.prompt);
      handleSendMessage();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Quick Actions Sidebar */}
      <div className={cn(
        "w-80 rounded-lg border mr-6 p-6",
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      )}>
        <h3 className={cn(
          "text-lg font-semibold mb-4 flex items-center",
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
          Quick Actions
        </h3>

        {/* Tabs */}
        <div className="flex mb-4 rounded-lg p-1 bg-gray-100 dark:bg-gray-700">
          <button
            onClick={() => setActiveTab('analytics')}
            className={cn(
              "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all",
              activeTab === 'analytics'
                ? theme === 'dark'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-600 text-white'
                : theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-800'
            )}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('creation')}
            className={cn(
              "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all",
              activeTab === 'creation'
                ? theme === 'dark'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-600 text-white'
                : theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-800'
            )}
          >
            Create
          </button>
        </div>
        <div className="space-y-3">
          {quickActions.filter(action => action.category === activeTab).map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action)}
                disabled={isCreatingContent}
                className={cn(
                  "w-full p-4 text-left rounded-lg border transition-all group",
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-purple-900 border-gray-600 hover:border-purple-600'
                    : 'bg-gray-50 hover:bg-purple-50 border-gray-200 hover:border-purple-200',
                  isCreatingContent && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className="w-5 h-5 text-purple-600" />
                  <h4 className={cn(
                    "font-medium",
                    theme === 'dark' ? 'text-white group-hover:text-purple-300' : 'text-gray-800 group-hover:text-purple-700'
                  )}>
                    {action.title}
                  </h4>
                </div>
                <p className={cn(
                  "text-sm",
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                )}>
                  {action.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* AI Capabilities */}
        <div className={cn(
          "mt-8 p-4 rounded-lg border",
          theme === 'dark'
            ? 'bg-blue-900 border-blue-800'
            : 'bg-blue-50 border-blue-100'
        )}>
          <h4 className={cn(
            "font-medium mb-2",
            theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
          )}>
            AI Assistant Capabilities
          </h4>
          <ul className={cn(
            "text-sm space-y-1",
            theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
          )}>
            <li>• Analyze engagement patterns</li>
            <li>• Suggest optimal posting times</li>
            <li>• Recommend trending hashtags</li>
            <li>• Generate complete social media posts</li>
            <li>• Create engaging captions</li>
            <li>• Provide hashtag sets for maximum reach</li>
            <li>• Track performance metrics</li>
          </ul>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col rounded-lg border">
        {/* Chat Header */}
        <div className={cn(
          "p-4 border-b flex items-center space-x-3",
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        )}>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className={cn(
              "font-semibold",
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              AI Assistant
            </h3>
            <p className={cn(
              "text-sm",
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            )}>
              Social Media Analytics Expert
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className={cn(
          "flex-1 overflow-y-auto p-4 space-y-4",
          theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
        )}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-2xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user'
                    ? 'bg-blue-500'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600'
                  }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={cn(
                  "p-3 rounded-lg",
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-white'
                      : 'bg-white text-gray-800 shadow-sm border'
                )}>
                  <p className="text-sm leading-relaxed">{message.content}</p>

                  {/* Special message types */}
                  {message.type === 'analytics' && message.data && (
                    <div className={cn(
                      "mt-3 p-3 rounded-lg",
                      message.role === 'user'
                        ? 'bg-blue-400 bg-opacity-20'
                        : theme === 'dark'
                          ? 'bg-gray-600 bg-opacity-50'
                          : 'bg-gray-100'
                    )}>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-medium">Best Times:</span>
                          <br />
                          {message.data.bestTimes.join(', ')}
                        </div>
                        <div>
                          <span className="font-medium">Boost:</span>
                          <br />
                          {message.data.engagementBoost}
                        </div>
                      </div>
                    </div>
                  )}

                  {message.type === 'suggestion' && message.data && (
                    <div className={cn(
                      "mt-3 p-3 rounded-lg",
                      message.role === 'user'
                        ? 'bg-blue-400 bg-opacity-20'
                        : theme === 'dark'
                          ? 'bg-gray-600 bg-opacity-50'
                          : 'bg-gray-100'
                    )}>
                      <div className="text-xs">
                        <span className="font-medium">Trending Hashtags:</span>
                        <br />
                        {message.data.hashtags.join(' ')}
                      </div>
                    </div>
                  )}

                  {message.type === 'content_creation' && message.data && (
                    <div className={cn(
                      "mt-3 p-3 rounded-lg border-2",
                      theme === 'dark'
                        ? 'bg-gray-800 border-purple-600'
                        : 'bg-purple-50 border-purple-300'
                    )}>
                      {message.data.post && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm mb-2 text-purple-700 dark:text-purple-300">Generated Post:</h4>
                            <div className={cn(
                              "p-3 rounded-lg border",
                              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                            )}>
                              <p className="text-sm mb-3">{message.data.post.caption}</p>
                              <div className="text-xs text-purple-600 dark:text-purple-400 mb-2">
                                {message.data.post.hashtags.join(' ')}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="font-medium">Best Time:</span><br />
                              {message.data.post.posting_time}
                            </div>
                            <div>
                              <span className="font-medium">Expected Reach:</span><br />
                              {message.data.post.expected_reach}
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(message.data.post.caption + ' ' + message.data.post.hashtags.join(' '));
                              }}
                              className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </button>
                            <button
                              onClick={() => {
                                // This would integrate with Instagram API in a real implementation
                                alert('Instagram posting would be implemented here with proper API integration');
                              }}
                              className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                            >
                              <Share className="w-3 h-3" />
                              <span>Post to Instagram</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {message.data.caption && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm mb-2 text-purple-700 dark:text-purple-300">Generated Caption:</h4>
                            <div className={cn(
                              "p-3 rounded-lg border",
                              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                            )}>
                              <p className="text-sm mb-2">{message.data.caption.text}</p>
                              <div className="text-xs text-purple-600 dark:text-purple-400">
                                {message.data.caption.hashtags.join(' ')}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs space-y-1">
                            <div><span className="font-medium">Tone:</span> {message.data.caption.tone}</div>
                            <div><span className="font-medium">Length:</span> {message.data.caption.length}</div>
                            <div><span className="font-medium">CTA:</span> {message.data.caption.cta}</div>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(message.data.caption.text + ' ' + message.data.caption.hashtags.join(' '));
                            }}
                            className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy Caption</span>
                          </button>
                        </div>
                      )}

                      {message.data.hashtags && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm mb-2 text-purple-700 dark:text-purple-300">Generated Hashtags:</h4>
                            <div className="space-y-2">
                              <div>
                                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Trending:</span>
                                <div className="text-xs mt-1">{message.data.hashtags.trending.join(' ')}</div>
                              </div>
                              <div>
                                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Niche Specific:</span>
                                <div className="text-xs mt-1">{message.data.hashtags.niche_specific.join(' ')}</div>
                              </div>
                              <div>
                                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Engagement Boosters:</span>
                                <div className="text-xs mt-1">{message.data.hashtags.engagement_boosters.join(' ')}</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            <div>💡 {message.data.hashtags.optimal_count}</div>
                            <div>📍 {message.data.hashtags.placement}</div>
                          </div>
                          <button
                            onClick={() => {
                              const allHashtags = [
                                ...message.data.hashtags.trending,
                                ...message.data.hashtags.niche_specific,
                                ...message.data.hashtags.engagement_boosters
                              ].join(' ');
                              navigator.clipboard.writeText(allHashtags);
                            }}
                            className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy All</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-2xl">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className={cn(
                  "p-3 rounded-lg",
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white border'
                )}>
                  <div className="flex space-x-1">
                    <div className={cn(
                      "w-2 h-2 rounded-full animate-bounce",
                      theme === 'dark' ? 'bg-gray-300' : 'bg-gray-400'
                    )}></div>
                    <div className={cn(
                      "w-2 h-2 rounded-full animate-bounce",
                      theme === 'dark' ? 'bg-gray-300' : 'bg-gray-400'
                    )} style={{ animationDelay: '0.1s' }}></div>
                    <div className={cn(
                      "w-2 h-2 rounded-full animate-bounce",
                      theme === 'dark' ? 'bg-gray-300' : 'bg-gray-400'
                    )} style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={cn(
          "p-4 border-t",
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        )}>
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={activeTab === 'creation' ? "Describe what kind of content you want to create..." : "Ask me anything about your social media analytics..."}
                className={cn(
                  "w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-transparent",
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                )}
                rows={2}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}