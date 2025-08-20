'use client';

import { Clock, ArrowUpRight, ArrowDownLeft, DollarSign } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'mint' | 'sale' | 'transfer' | 'list' | 'bid';
  user: string;
  amount?: string;
  price?: string;
  timestamp: string;
}

const CollectionActivity = ({ collectionId: _collectionId }: { collectionId: string }) => {
  // Mock activity data
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: 'sale',
      user: '0x1234...5678',
      amount: 'Cosmic Explorer #42',
      price: '1.25 HYPE',
      timestamp: '2 minutes ago',
    },
    {
      id: 2,
      type: 'list',
      user: '0x1111...2222',
      amount: 'Cosmic Explorer #156',
      price: '0.85 HYPE',
      timestamp: '5 minutes ago',
    },
    {
      id: 3,
      type: 'bid',
      user: '0x3333...4444',
      amount: 'Cosmic Explorer #89',
      price: '1.1 HYPE',
      timestamp: '12 minutes ago',
    },
    {
      id: 4,
      type: 'transfer',
      user: '0x7777...8888',
      amount: 'Cosmic Explorer #203',
      timestamp: '1 hour ago',
    },
    {
      id: 5,
      type: 'mint',
      user: '0xaaaa...bbbb',
      amount: 'Cosmic Explorer #67',
      timestamp: '2 hours ago',
    },
  ];

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'sale':
        return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case 'list':
        return <DollarSign className="w-4 h-4 text-blue-400" />;
      case 'bid':
        return <ArrowDownLeft className="w-4 h-4 text-yellow-400" />;
      case 'transfer':
        return <ArrowUpRight className="w-4 h-4 text-purple-400" />;
      case 'mint':
        return <ArrowUpRight className="w-4 h-4 text-purple-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'sale':
        return 'border-l-green-500';
      case 'list':
        return 'border-l-blue-500';
      case 'bid':
        return 'border-l-yellow-500';
      case 'transfer':
        return 'border-l-purple-500';
      case 'mint':
        return 'border-l-purple-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const getActivityText = (activity: ActivityItem) => {
    switch (activity.type) {
      case 'sale':
        return `Sold for ${activity.price}`;
      case 'list':
        return `Listed for ${activity.price}`;
      case 'bid':
        return `Bid ${activity.price}`;
      case 'transfer':
        return 'Transferred';
      case 'mint':
        return 'Minted';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`border-l-4 pl-4 py-3 ${getActivityColor(activity.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white truncate">
                    {activity.amount}
                  </p>
                  <span className="text-xs text-gray-400">
                    {activity.timestamp}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300 mt-1">
                  {getActivityText(activity)}
                </p>
                
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <span>From: {activity.user}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-6">
        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">
          Load More Activity
        </button>
      </div>
    </div>
  );
};

export default CollectionActivity; 