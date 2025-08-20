'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';

const CollectionDetails = () => {
  const [formData, setFormData] = useState({
    maxSupply: '',
    mintPrice: '',
    royaltyPercentage: '',
    revealType: 'instant',
    whitelistEnabled: false,
    whitelistFile: null as File | null,
    metadata: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
    }
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
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <span className="ml-2 text-white font-medium">Collection</span>
              </div>
              <div className="w-16 h-0.5 bg-purple-600"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <span className="ml-2 text-white font-medium">Details</span>
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
              Collection Details
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Configure your collection settings, pricing, and metadata to create the perfect NFT experience.
            </p>
          </div>

          {/* Form */}
          <div className="glass-effect rounded-2xl p-8">
            <form className="space-y-8">
              {/* Basic Settings */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Settings className="h-6 w-6 text-purple-500" />
                  <h2 className="text-xl font-semibold text-white">Basic Settings</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Max Supply */}
                  <div>
                    <label htmlFor="maxSupply" className="block text-white font-medium mb-2">
                      Maximum Supply *
                    </label>
                    <input
                      type="number"
                      id="maxSupply"
                      name="maxSupply"
                      value={formData.maxSupply}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      placeholder="e.g., 1000"
                      min="1"
                      required
                    />
                  </div>

                  {/* Mint Price */}
                  <div>
                    <label htmlFor="mintPrice" className="block text-white font-medium mb-2">
                      Mint Price (HYPE) *
                    </label>
                    <input
                      type="number"
                      id="mintPrice"
                      name="mintPrice"
                      value={formData.mintPrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      placeholder="e.g., 0.1"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Royalty Percentage */}
                <div>
                  <label htmlFor="royaltyPercentage" className="block text-white font-medium mb-2">
                    Royalty Percentage
                  </label>
                  <input
                    type="number"
                    id="royaltyPercentage"
                    name="royaltyPercentage"
                    value={formData.royaltyPercentage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    placeholder="e.g., 5"
                    min="0"
                    max="20"
                  />
                  <p className="text-sm text-gray-400 mt-1">Percentage you&apos;ll earn from secondary sales (0-20%)</p>
                </div>

                {/* Reveal Type */}
                <div>
                  <label htmlFor="revealType" className="block text-white font-medium mb-2">
                    Reveal Type
                  </label>
                  <select
                    id="revealType"
                    name="revealType"
                    value={formData.revealType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  >
                    <option value="instant">Instant Reveal</option>
                    <option value="delayed">Delayed Reveal</option>
                    <option value="manual">Manual Reveal</option>
                  </select>
                </div>
              </div>

              {/* Whitelist Settings */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="h-6 w-6 text-purple-500" />
                  <h2 className="text-xl font-semibold text-white">Whitelist Settings</h2>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="whitelistEnabled"
                    name="whitelistEnabled"
                    checked={formData.whitelistEnabled}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <label htmlFor="whitelistEnabled" className="text-white font-medium">
                    Enable Whitelist
                  </label>
                </div>

                {formData.whitelistEnabled && (
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Whitelist File (CSV)
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileUpload(e, 'whitelistFile')}
                        className="hidden"
                        id="whitelist-upload"
                      />
                      <label htmlFor="whitelist-upload" className="cursor-pointer">
                        {formData.whitelistFile ? (
                          <div className="space-y-2">
                            <Upload className="mx-auto h-8 w-8 text-purple-500" />
                            <p className="text-white font-medium">{formData.whitelistFile.name}</p>
                            <p className="text-gray-400 text-sm">Click to change file</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <p className="text-white font-medium">Upload whitelist CSV</p>
                            <p className="text-gray-400 text-sm">Format: address,amount</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Metadata Upload */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Upload className="h-6 w-6 text-purple-500" />
                  <h2 className="text-xl font-semibold text-white">Metadata</h2>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Metadata JSON File
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => handleFileUpload(e, 'metadata')}
                      className="hidden"
                      id="metadata-upload"
                    />
                    <label htmlFor="metadata-upload" className="cursor-pointer">
                      {formData.metadata ? (
                        <div className="space-y-2">
                          <Upload className="mx-auto h-8 w-8 text-purple-500" />
                          <p className="text-white font-medium">{formData.metadata.name}</p>
                          <p className="text-gray-400 text-sm">Click to change file</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="text-white font-medium">Upload metadata JSON</p>
                          <p className="text-gray-400 text-sm">Contains NFT attributes and properties</p>
                        </div>
                      )}
                    </label>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Upload a JSON file containing metadata for each NFT in your collection
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Link href="/create/collection">
                  <button
                    type="button"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <ArrowLeft size={20} />
                    <span>Previous</span>
                  </button>
                </Link>
                
                <Link href="/create/collection/deploy">
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

export default CollectionDetails; 