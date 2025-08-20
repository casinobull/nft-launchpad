import { Metadata } from 'next';
import Link from 'next/link';
import { Eye, Users, Package, DollarSign } from 'lucide-react';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Collections - HyperPad',
  description: 'Explore all NFT collections on HyperPad. Discover unique digital art and collectibles on the fastest blockchain network.',
};

const collections = [
  {
    id: 'cosmic-explorers',
    name: 'Cosmic Explorers',
    artist: 'Stella Nova',
    items: 1000,
    floorPrice: 0.5,
    totalVolume: 1250,
    owners: 450,
    description: 'A cosmic journey through the vast expanse of space, featuring stunning digital art that captures the beauty and mystery of the universe.',
    image: '/api/placeholder/400/300',
  },
  {
    id: 'digital-dreamscapes',
    name: 'Digital Dreamscapes',
    artist: 'Pixel Prophet',
    items: 750,
    floorPrice: 0.8,
    totalVolume: 980,
    owners: 320,
    description: 'Immersive digital landscapes that blur the line between reality and imagination.',
    image: '/api/placeholder/400/300',
  },
  {
    id: 'neon-nightlife',
    name: 'Neon Nightlife',
    artist: 'Cyber Punk',
    items: 500,
    floorPrice: 1.2,
    totalVolume: 750,
    owners: 280,
    description: 'Vibrant neon-lit cityscapes that capture the energy of urban nightlife.',
    image: '/api/placeholder/400/300',
  },
  {
    id: 'abstract-anomalies',
    name: 'Abstract Anomalies',
    artist: 'Quantum Artist',
    items: 350,
    floorPrice: 2.0,
    totalVolume: 1200,
    owners: 150,
    description: 'Mind-bending abstract art that challenges perception and reality.',
    image: '/api/placeholder/400/300',
  },
  {
    id: 'galactic-wonders',
    name: 'Galactic Wonders',
    artist: 'Stella Nova',
    items: 600,
    floorPrice: 1.5,
    totalVolume: 890,
    owners: 220,
    description: 'Spectacular galactic scenes featuring distant planets and cosmic phenomena.',
    image: '/api/placeholder/400/300',
  },
  {
    id: 'tech-noir',
    name: 'Tech Noir',
    artist: 'Cyber Punk',
    items: 450,
    floorPrice: 1.8,
    totalVolume: 1100,
    owners: 180,
    description: 'Dark, atmospheric tech-inspired art with a noir aesthetic.',
    image: '/api/placeholder/400/300',
  },
];

export default function CollectionsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              All Collections
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover and explore all NFT collections on HyperPad. Find your next favorite digital art piece.
            </p>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                  {/* Collection Image */}
                  <div className="relative mb-6">
                    <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">{collection.name.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Collection Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                        {collection.name}
                      </h3>
                      <p className="text-gray-400 text-sm">by {collection.artist}</p>
                    </div>

                    <p className="text-gray-300 text-sm line-clamp-2">
                      {collection.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mx-auto mb-2">
                          <Package className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm text-gray-400">Items</div>
                        <div className="text-white font-semibold">{collection.items.toLocaleString()}</div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mx-auto mb-2">
                          <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm text-gray-400">Floor</div>
                        <div className="text-white font-semibold">{collection.floorPrice} HYPE</div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mx-auto mb-2">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm text-gray-400">Owners</div>
                        <div className="text-white font-semibold">{collection.owners.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* View Button */}
                    <div className="pt-4">
                      <div className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2">
                        <Eye size={20} />
                        <span>View Collection</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 