'use client';

import { useState } from 'react';
import { ArrowRight, Upload, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';

const CreateCollection = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    image: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
  };

  return (
    <div className="min-h-screen gradient-bg-dark">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <span className="ml-2 text-white font-medium">Collection</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-600"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 font-bold">
                  2
                </div>
                <span className="ml-2 text-gray-400 font-medium">Details</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-600"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 font-bold">
                  3
                </div>
                <span className="ml-2 text-gray-400 font-medium">Deploy</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Create Your NFT Collection
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Start your journey as an NFT creator. Set up your collection with a unique name, symbol, and description.
            </p>
          </div>

          {/* Form */}
          <div className="glass-effect rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Collection Name */}
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Collection Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Enter your collection name"
                  required
                />
              </div>

              {/* Collection Symbol */}
              <div>
                <label htmlFor="symbol" className="block text-white font-medium mb-2">
                  Collection Symbol *
                </label>
                <input
                  type="text"
                  id="symbol"
                  name="symbol"
                  value={formData.symbol}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="e.g., HyperEVM"
                  maxLength={10}
                  required
                />
                <p className="text-sm text-gray-400 mt-1">Maximum 10 characters</p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-white font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                  placeholder="Describe your collection..."
                />
              </div>

              {/* Collection Image */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Collection Image
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {formData.image ? (
                      <div className="space-y-2">
                        <ImageIcon className="mx-auto h-12 w-12 text-purple-500" />
                        <p className="text-white font-medium">{formData.image.name}</p>
                        <p className="text-gray-400 text-sm">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="text-white font-medium">Upload collection image</p>
                        <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Link href="/create/collection/details">
                  <button
                    type="button"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover-glow flex items-center space-x-2"
                  >
                    <span>Next Step</span>
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection; 