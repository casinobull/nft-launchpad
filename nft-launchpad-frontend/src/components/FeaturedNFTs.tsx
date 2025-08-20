'use client';

import { motion } from 'framer-motion';
import { Eye, Heart } from 'lucide-react';

interface NFT {
  id: number;
  name: string;
  collection: string;
  creator: string;
  price: string;
  image: string;
}

const nfts: NFT[] = [
  {
    id: 1,
    name: 'Stellar Birth #103',
    collection: 'Stellar Genesis',
    creator: 'Stella Nova',
    price: '0.95 HYPE',
    image: '/api/placeholder/300/300'
  },
  {
    id: 2,
    name: 'Pixel Kingdom #056',
    collection: 'Pixel Worlds',
    creator: 'Pixel Prophet',
    price: '1.4 HYPE',
    image: '/api/placeholder/300/300'
  },
  {
    id: 3,
    name: 'Cosmic Explorer #042',
    collection: 'Cosmic Explorers',
    creator: 'Stella Nova',
    price: '0.75 HYPE',
    image: '/api/placeholder/300/300'
  },
  {
    id: 4,
    name: 'Dream Weaver #103',
    collection: 'Digital Dreamscapes',
    creator: 'Pixel Prophet',
    price: '1.2 HYPE',
    image: '/api/placeholder/300/300'
  },
  {
    id: 5,
    name: 'Neon Rider #078',
    collection: 'Neon Nightlife',
    creator: 'Cyber Punk',
    price: '1.5 HYPE',
    image: '/api/placeholder/300/300'
  },
  {
    id: 6,
    name: 'Quantum Fractal #256',
    collection: 'Abstract Anomalies',
    creator: 'Quantum Artist',
    price: '2.3 HYPE',
    image: '/api/placeholder/300/300'
  },
  {
    id: 7,
    name: 'Nebula Dream #017',
    collection: 'Galactic Wonders',
    creator: 'Stella Nova',
    price: '3 HYPE',
    image: '/api/placeholder/300/300'
  },
  {
    id: 8,
    name: 'Night Detective #015',
    collection: 'Tech Noir',
    creator: 'Cyber Punk',
    price: '1.8 HYPE',
    image: '/api/placeholder/300/300'
  }
];

const FeaturedNFTs = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured NFTs
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our curated selection of unique digital collectibles from top artists
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfts.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-xl overflow-hidden hover-glow transition-all duration-300 group"
            >
              {/* NFT Image */}
              <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200">
                    <Heart size={16} />
                  </button>
                  <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200">
                    <Eye size={16} />
                  </button>
                </div>

                {/* NFT Number */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-sm font-medium">#{nft.id.toString().padStart(3, '0')}</span>
                </div>
              </div>

              {/* NFT Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1 truncate">
                  {nft.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{nft.collection}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm text-gray-400">
                    <span className="block">Creator</span>
                    <span className="text-white font-medium">{nft.creator}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    <span className="block">Current Price</span>
                    <span className="text-white font-semibold">{nft.price}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-200 hover-glow text-sm">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNFTs; 