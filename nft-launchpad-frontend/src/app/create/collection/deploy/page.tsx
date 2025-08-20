'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, Loader2, Rocket, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';

const DeployCollection = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStep, setDeploymentStep] = useState(0);
  const [deploymentComplete, setDeploymentComplete] = useState(false);

  const deploymentSteps = [
    'Validating collection data...',
    'Uploading assets to IPFS...',
    'Generating smart contract...',
    'Deploying to HyperEVM blockchain...',
    'Finalizing collection...'
  ];

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    for (let i = 0; i < deploymentSteps.length; i++) {
      setDeploymentStep(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    setDeploymentComplete(true);
    setIsDeploying(false);
  };

  const collectionSummary = {
    name: 'My Awesome Collection',
    symbol: 'MAC',
    maxSupply: '1000',
    mintPrice: '0.1',
    royaltyPercentage: '5',
    revealType: 'Instant Reveal',
    whitelistEnabled: false
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
              <div className="w-16 h-0.5 bg-green-600"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <span className="ml-2 text-white font-medium">Details</span>
              </div>
              <div className="w-16 h-0.5 bg-purple-600"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <span className="ml-2 text-white font-medium">Deploy</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Deploy Your Collection
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Review your collection details and deploy to the HyperEVM blockchain. This action cannot be undone.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Collection Summary */}
            <div className="glass-effect rounded-2xl p-8">
              <div className="flex items-center space-x-2 mb-6">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h2 className="text-xl font-semibold text-white">Collection Summary</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Name:</span>
                  <span className="text-white font-medium">{collectionSummary.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Symbol:</span>
                  <span className="text-white font-medium">{collectionSummary.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Max Supply:</span>
                  <span className="text-white font-medium">{collectionSummary.maxSupply}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Mint Price:</span>
                  <span className="text-white font-medium">{collectionSummary.mintPrice} HYPE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Royalty:</span>
                  <span className="text-white font-medium">{collectionSummary.royaltyPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Reveal Type:</span>
                  <span className="text-white font-medium">{collectionSummary.revealType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Whitelist:</span>
                  <span className="text-white font-medium">
                    {collectionSummary.whitelistEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            {/* Deployment Status */}
            <div className="glass-effect rounded-2xl p-8">
              {!isDeploying && !deploymentComplete && (
                <>
                  <div className="flex items-center space-x-2 mb-6">
                    <Rocket className="h-6 w-6 text-purple-500" />
                    <h2 className="text-xl font-semibold text-white">Ready to Deploy</h2>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-white font-medium">Secure Deployment</p>
                        <p className="text-gray-400 text-sm">Your collection will be deployed using industry-standard security practices</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-white font-medium">Fast & Efficient</p>
                        <p className="text-gray-400 text-sm">Monad&apos;s high-performance blockchain ensures quick deployment</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="text-white font-medium">Verified Contract</p>
                        <p className="text-gray-400 text-sm">Smart contract will be automatically verified on HyperEVM Explorer</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="text-yellow-300 font-medium">Important Notice</p>
                        <p className="text-yellow-200 text-sm">
                          Deployment is irreversible. Please ensure all details are correct before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleDeploy}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-lg font-medium transition-all duration-200 hover-glow flex items-center justify-center space-x-2"
                  >
                    <Rocket size={20} />
                    <span>Deploy Collection</span>
                  </button>
                </>
              )}

              {isDeploying && (
                <>
                  <div className="flex items-center space-x-2 mb-6">
                    <Loader2 className="h-6 w-6 text-purple-500 animate-spin" />
                    <h2 className="text-xl font-semibold text-white">Deploying...</h2>
                  </div>

                  <div className="space-y-4">
                    {deploymentSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        {index < deploymentStep ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : index === deploymentStep ? (
                          <Loader2 className="h-5 w-5 text-purple-500 animate-spin" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-600" />
                        )}
                        <span className={`text-sm ${index <= deploymentStep ? 'text-white' : 'text-gray-400'}`}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                    <p className="text-blue-300 text-sm">
                      Please don&apos;t close this page during deployment. This process may take a few minutes.
                    </p>
                  </div>
                </>
              )}

              {deploymentComplete && (
                <>
                  <div className="flex items-center space-x-2 mb-6">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <h2 className="text-xl font-semibold text-white">Deployment Complete!</h2>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
                      <p className="text-green-300 text-sm">
                        Your NFT collection has been successfully deployed to the HyperEVM blockchain!
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Contract Address:</span>
                        <span className="text-white font-mono text-sm">0x1234...5678</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Transaction Hash:</span>
                        <span className="text-white font-mono text-sm">0xabcd...efgh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Gas Used:</span>
                        <span className="text-white">1,234,567</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href="/collections">
                      <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 hover-glow">
                        View My Collections
                      </button>
                    </Link>
                    <Link href="/">
                      <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-all duration-200">
                        Back to Home
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          {!isDeploying && !deploymentComplete && (
            <div className="flex justify-start mt-8">
              <Link href="/create/collection/details">
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                  <ArrowLeft size={20} />
                  <span>Back to Details</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeployCollection; 