'use client';

import { useState, useEffect } from 'react';
import { Wallet, Menu, X, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@/hooks/useWallet';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { 
    address, 
    isConnected, 
    isCorrectNetwork, 
    connectWallet, 
    disconnect, 
    switchToCorrectNetwork,
    signInWithEthereum,
    connectors 
  } = useWallet();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug: Log connectors to see what's available (client-only)
  useEffect(() => {
    if (!mounted) return;
    console.log('Available connectors:', connectors);
    console.log('Is connected:', isConnected);
    console.log('Address:', address);
    console.log('Is correct network:', isCorrectNetwork);
  }, [mounted, connectors, isConnected, address, isCorrectNetwork]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Create', href: '/create/collection' },
    { name: 'Artists', href: '/artists' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Community', href: '/community' },
  ];

  const handleConnectWallet = async () => {
    if (!mounted) return;
    console.log('Connect wallet clicked');
    setIsConnecting(true);
    try {
      console.log('Connectors available:', connectors);
      console.log('Attempting to connect with connector 0:', connectors[0]);
      
      // Connect to MetaMask (first connector) - this should show the modal
      await connectWallet(0);
      
      console.log('Wallet connected successfully');
      
      // Wait a bit for the connection to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Switch to correct network if not already on it
      if (!isCorrectNetwork) {
        await switchToCorrectNetwork();
      }
      
      // Sign in with Ethereum
      await signInWithEthereum();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      // You might want to show a toast notification here
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setIsMenuOpen(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const showConnected = mounted && isConnected;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold gradient-text cursor-pointer">HyperPad</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-purple-300 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Connect Wallet Button */}
          <div className="hidden md:flex">
            {!showConnected ? (
              <div className="flex space-x-2">
                <button 
                  onClick={handleConnectWallet}
                  disabled={isConnecting || !mounted}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover-glow flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Wallet size={20} />
                  <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                </button>
                {/* Debug button */}
                <button 
                  onClick={() => {
                    if (!mounted) return;
                    console.log('Debug: Available connectors:', connectors);
                    console.log('Debug: First connector:', connectors[0]);
                    if (connectors[0]) {
                      connectWallet(0);
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Debug
                </button>
                {/* Try different connectors */}
                <button 
                  onClick={() => {
                    if (!mounted) return;
                    console.log('Trying MetaMask connector (index 1)');
                    if (connectors[1]) {
                      connectWallet(1);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  MetaMask
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
                  <User size={16} className="text-green-400" />
                  <span className="text-white text-sm font-mono">
                    {address ? formatAddress(address) : ''}
                  </span>
                  {mounted && !isCorrectNetwork && (
                    <span className="text-yellow-400 text-xs">(Wrong Network)</span>
                  )}
                </div>
                <button 
                  onClick={handleDisconnect}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Disconnect</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-purple-300 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-effect rounded-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-white hover:text-purple-300 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {!showConnected ? (
                <button 
                  onClick={handleConnectWallet}
                  disabled={isConnecting || !mounted}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover-glow flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Wallet size={20} />
                  <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                </button>
              ) : (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-800 rounded-lg">
                    <span className="text-white text-sm font-mono">
                      {address ? formatAddress(address) : ''}
                    </span>
                    {mounted && !isCorrectNetwork && (
                      <span className="text-yellow-400 text-xs">Wrong Network</span>
                    )}
                  </div>
                  <button 
                    onClick={handleDisconnect}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <LogOut size={20} />
                    <span>Disconnect</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 