'use client';

import { ArrowRight, Rocket, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';

const CreatePage = () => {
  const features = [
    {
      icon: <Rocket className="h-8 w-8 text-purple-500" />,
      title: 'Easy Deployment',
      description: 'Deploy your NFT collection to the HyperEVM blockchain with just a few clicks.'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: 'Secure & Verified',
      description: 'Industry-standard security practices with automatically verified smart contracts.'
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: 'High Performance',
      description: 'Leverage HyperEVM\'s high-performance blockchain for fast and efficient transactions.'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Collection Setup',
      description: 'Define your collection name, symbol, and upload collection image.'
    },
    {
      number: '2',
      title: 'Configure Details',
      description: 'Set mint price, supply, royalties, and upload metadata.'
    },
    {
      number: '3',
      title: 'Deploy',
      description: 'Review and deploy your collection to the blockchain.'
    }
  ];

  return (
    <div className="min-h-screen gradient-bg-dark">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Create Your NFT Collection
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-8">
              Launch your NFT collection on the fastest blockchain network. Our intuitive platform makes it easy to create, deploy, and manage your digital assets.
            </p>
            <Link href="/create/collection">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 hover-glow flex items-center space-x-2 mx-auto">
                <span>Start Creating</span>
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="glass-effect rounded-2xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Process Steps */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Simple 3-Step Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="glass-effect rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-300">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <div className="w-8 h-0.5 bg-purple-600"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="glass-effect rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Launch Your Collection?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of creators who have successfully launched their NFT collections on HyperEVM. Start your journey today!
            </p>
            <Link href="/create/collection">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 hover-glow flex items-center space-x-2 mx-auto">
                <Rocket size={20} />
                <span>Create Collection Now</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage; 