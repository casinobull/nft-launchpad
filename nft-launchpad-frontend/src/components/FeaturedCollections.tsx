'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Link from 'next/link';

interface Collection {
  id: number;
  name: string;
  artist: string;
  items: number;
  floorPrice: string;
  logo: string;
  images: string[];
  slug: string;
}

const collections: Collection[] = [
  {
    id: 1,
    name: 'Cosmic Explorers',
    artist: 'Stella Nova',
    items: 1000,
    floorPrice: '0.5 HYPE',
    logo: '/api/placeholder/60/60',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
    slug: 'cosmic-explorers'
  },
  {
    id: 2,
    name: 'Digital Dreamscapes',
    artist: 'Pixel Prophet',
    items: 750,
    floorPrice: '0.8 HYPE',
    logo: '/api/placeholder/60/60',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
    slug: 'digital-dreamscapes'
  },
  {
    id: 3,
    name: 'Neon Nightlife',
    artist: 'Cyber Punk',
    items: 500,
    floorPrice: '1.2 HYPE',
    logo: '/api/placeholder/60/60',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
    slug: 'neon-nightlife'
  },
  {
    id: 4,
    name: 'Abstract Anomalies',
    artist: 'Quantum Artist',
    items: 350,
    floorPrice: '2 HYPE',
    logo: '/api/placeholder/60/60',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
    slug: 'abstract-anomalies'
  },
  {
    id: 5,
    name: 'Galactic Wonders',
    artist: 'Stella Nova',
    items: 600,
    floorPrice: '1.5 HYPE',
    logo: '/api/placeholder/60/60',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
    slug: 'galactic-wonders'
  },
  {
    id: 6,
    name: 'Tech Noir',
    artist: 'Cyber Punk',
    items: 450,
    floorPrice: '1.8 HYPE',
    logo: '/api/placeholder/60/60',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
    slug: 'tech-noir'
  }
];

const FeaturedCollections = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(collections.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(collections.length / 3)) % Math.ceil(collections.length / 3));
  };

  const visibleCollections = collections.slice(currentIndex * 3, currentIndex * 3 + 3);

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
            Featured Collections
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the most exclusive and trending NFT collections from top creators around the world
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover-glow"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover-glow"
          >
            <ChevronRight size={24} />
          </button>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl overflow-hidden hover-glow transition-all duration-300"
              >
                {/* Collection Images */}
                <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                  <div className="grid grid-cols-3 gap-1 p-4 h-full">
                    {collection.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Collection Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full"></div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{collection.name}</h3>
                        <p className="text-gray-400">by {collection.artist}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-400">
                      <span className="block">Items</span>
                      <span className="text-white font-semibold">{collection.items}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      <span className="block">Floor Price</span>
                      <span className="text-white font-semibold">{collection.floorPrice}</span>
                    </div>
                  </div>

                  <Link href={`/collections/${collection.slug}`}>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 hover-glow flex items-center justify-center space-x-2">
                      <Eye size={20} />
                      <span>View Collection</span>
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="glass-effect text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover-glow">
              View All Collections
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections; 