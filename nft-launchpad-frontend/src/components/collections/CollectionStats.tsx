'use client';

import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  floorPrice: number;
  totalVolume: number;
  owners: number;
  items: number;
  totalSupply: number;
}

interface CollectionStatsProps {
  collection: Collection;
}

const CollectionStats = ({ collection }: CollectionStatsProps) => {
  const stats = [
    {
      label: 'Floor Price',
      value: `${collection.floorPrice} HYPE`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive' as 'positive' | 'negative' | 'neutral',
    },
    {
      label: 'Total Volume',
      value: `${collection.totalVolume.toLocaleString()} HYPE`,
      icon: TrendingUp,
      change: '+8.2%',
      changeType: 'positive' as 'positive' | 'negative' | 'neutral',
    },
    {
      label: 'Owners',
      value: collection.owners.toLocaleString(),
      icon: Users,
      change: '+5.1%',
      changeType: 'positive' as 'positive' | 'negative' | 'neutral',
    },
    {
      label: 'Items',
      value: `${collection.items.toLocaleString()}/${collection.totalSupply.toLocaleString()}`,
      icon: Package,
      change: '100%',
      changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
    },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-6">Collection Stats</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl mx-auto mb-3">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            
            <div className="text-2xl font-bold text-white mb-1">
              {stat.value}
            </div>
            
            <div className="text-sm text-gray-400 mb-2">
              {stat.label}
            </div>
            
            <div className={`text-xs font-medium ${
              stat.changeType === 'positive' ? 'text-green-400' : 
              stat.changeType === 'negative' ? 'text-red-400' : 
              'text-gray-400'
            }`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionStats; 