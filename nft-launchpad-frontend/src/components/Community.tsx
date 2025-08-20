'use client';

import { motion } from 'framer-motion';
import { Twitter, MessageCircle, Instagram, Send } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Thompson',
    role: 'NFT Collector',
    content: 'This platform has completely transformed how I discover and collect NFTs. The user experience is unmatched!',
    avatar: '/api/placeholder/60/60'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Digital Artist',
    content: 'As an artist, I\'ve found the tools and community here to be incredibly supportive. My collections have reached a whole new audience.',
    avatar: '/api/placeholder/60/60'
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    role: 'Crypto Enthusiast',
    content: 'The seamless wallet integration and low gas fees make this my go-to platform for all things NFT. Highly recommended!',
    avatar: '/api/placeholder/60/60'
  }
];

const stats = [
  { label: 'Community Members', value: '50K+', icon: '👥' },
  { label: 'Discord Users', value: '10K+', icon: '💬' },
  { label: 'Artists', value: '5K+', icon: '🎨' },
  { label: 'NFTs Minted', value: '100K+', icon: '🖼️' }
];

const Community = () => {
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
            Join Our Community
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our vibrant community of creators, collectors, and enthusiasts. Share your work, discover amazing collections, and connect with fellow NFT lovers.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Connect With Us */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Connect With Us</h3>
            
            <div className="space-y-4 mb-8">
              <a href="#" className="flex items-center space-x-3 text-white hover:text-purple-300 transition-colors duration-200">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Twitter size={24} />
                </div>
                <span className="text-lg">Twitter</span>
              </a>
              
              <a href="#" className="flex items-center space-x-3 text-white hover:text-purple-300 transition-colors duration-200">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <span className="text-lg">Discord</span>
              </a>
              
              <a href="#" className="flex items-center space-x-3 text-white hover:text-purple-300 transition-colors duration-200">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Instagram size={24} />
                </div>
                <span className="text-lg">Instagram</span>
              </a>
              
              <a href="#" className="flex items-center space-x-3 text-white hover:text-purple-300 transition-colors duration-200">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Send size={24} />
                </div>
                <span className="text-lg">Telegram</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="glass-effect rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-3">Subscribe to Our Newsletter</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover-glow">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">What Our Community Says</h3>
            
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass-effect rounded-lg p-6"
                >
                  <p className="text-gray-300 mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full"></div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-lg font-semibold transition-all duration-200 hover-glow">
                Join Discord Community
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Community; 