'use client';

import { useState, useMemo } from 'react';
import { Grid, List, Eye, Heart } from 'lucide-react';

interface NFTItem {
  id: string;
  name: string;
  image: string;
  price: number;
  owner: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface CollectionItemsProps {
  collectionId: string;
}

// Deterministic random number generator based on seed
const seededRandom = (seed: string, index: number): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Add index to create variation
  hash = ((hash << 5) - hash) + index;
  hash = hash & hash;
  return Math.abs(hash) / 2147483647; // Normalize to 0-1
};

const CollectionItems = ({ collectionId }: CollectionItemsProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recently-listed');

  // Use useMemo to ensure consistent data generation
  const nftItems: NFTItem[] = useMemo(() => {
    const rarities: NFTItem['rarity'][] = ['common', 'rare', 'epic', 'legendary'];
    
    return Array.from({ length: 12 }, (_, i) => {
      const randomValue = seededRandom(collectionId, i);
      const rarityIndex = Math.floor(randomValue * rarities.length);
      
      return {
        id: `${collectionId}-${i + 1}`,
        name: `Cosmic Explorer #${i + 1}`,
        image: `/api/placeholder/300/300?text=CE${i + 1}`,
        price: 0.1 + (randomValue * 2), // Price between 0.1 and 2.1
        owner: `Owner${i + 1}`,
        rarity: rarities[rarityIndex],
      };
    });
  }, [collectionId]);

  const getRarityColor = (rarity: NFTItem['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-white">Items</h2>
        
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="recently-listed">Recently Listed</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rarity">Rarity</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* NFT Grid */}
      <div className={`grid gap-4 ${
        viewMode === 'grid' 
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' 
          : 'grid-cols-1'
      }`}>
        {nftItems.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-105"
          >
            {/* NFT Image */}
            <div className="relative mb-3">
              <div className="aspect-square bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">{item.name.split('#')[1]}</span>
              </div>
              
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex gap-1">
                <button className="p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-md transition-colors">
                  <Eye size={14} />
                </button>
                <button className="p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-md transition-colors">
                  <Heart size={14} />
                </button>
              </div>

              {/* Rarity Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-black/50 ${getRarityColor(item.rarity)}`}>
                  {item.rarity}
                </span>
              </div>
            </div>

            {/* NFT Info */}
            <div className="space-y-2">
              <h3 className="font-semibold text-white text-sm truncate">
                {item.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">
                  {item.price.toFixed(2)} HYPE
                </span>
                <span className="text-gray-400 text-xs">
                  {item.owner}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200">
          Load More Items
        </button>
      </div>
    </div>
  );
};

export default CollectionItems; 