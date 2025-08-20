'use client';

import { Twitter, Globe, MessageCircle, Heart, Share2 } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  description: string;
  creator: string;
  image: string;
  banner: string;
  socialLinks: {
    twitter: string;
    discord: string;
    website: string;
  };
}

interface CollectionHeaderProps {
  collection: Collection;
}

const CollectionHeader = ({ collection }: CollectionHeaderProps) => {
  return (
    <div className="relative">
      {/* Banner Image */}
      <div className="h-64 md:h-80 w-full bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Collection Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
          {/* Collection Image */}
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 border-4 border-white shadow-xl">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">CE</span>
              </div>
            </div>
          </div>

          {/* Collection Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {collection.name}
                </h1>
                <p className="text-gray-300 text-lg mb-4 max-w-2xl">
                  {collection.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <span>Created by <span className="text-white font-medium">{collection.creator}</span></span>
                  <span>•</span>
                  <span>Verified Collection</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  <Heart size={16} />
                  <span>Like</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href={collection.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href={collection.socialLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href={collection.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionHeader; 