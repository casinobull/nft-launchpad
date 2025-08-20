'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'What is an NFT?',
    answer: 'An NFT (Non-Fungible Token) is a unique digital asset that represents ownership of a specific item or piece of content on the blockchain. Unlike cryptocurrencies, each NFT is unique and cannot be exchanged on a one-to-one basis.'
  },
  {
    id: 2,
    question: 'How do I purchase an NFT on this platform?',
    answer: 'To purchase an NFT, you need to connect your crypto wallet, browse available collections, select the NFT you want, and complete the transaction using cryptocurrency. The platform supports various payment methods including HYPE and other major cryptocurrencies.'
  },
  {
    id: 3,
    question: 'What crypto wallets are supported?',
    answer: 'We support all major crypto wallets including MetaMask, WalletConnect, Coinbase Wallet, Trust Wallet, and other Web3-compatible wallets. Simply connect your preferred wallet to start trading.'
  },
  {
    id: 4,
    question: 'What are gas fees and who pays them?',
    answer: 'Gas fees are transaction costs on the blockchain network. Buyers typically pay gas fees when purchasing NFTs, while sellers may pay fees when listing items. Gas fees vary based on network congestion and transaction complexity.'
  },
  {
    id: 5,
    question: 'How do royalties work for creators?',
    answer: 'Creators can set royalty percentages (typically 5-10%) on their NFT sales. This means they receive a percentage of the sale price every time their NFT is resold on the platform, providing ongoing revenue from their work.'
  },
  {
    id: 6,
    question: 'Can I create and sell my own NFTs on this platform?',
    answer: 'Yes! Our platform provides tools for creators to mint, list, and sell their own NFT collections. You can upload your digital artwork, set pricing, and manage your collection through our creator dashboard.'
  },
  {
    id: 7,
    question: 'Are the NFTs on this platform on a specific blockchain?',
    answer: 'Our platform is built on the HyperEVM blockchain, which offers fast transactions and low gas fees. All NFTs are minted and traded on this secure, decentralized network.'
  },
  {
    id: 8,
    question: 'What happens if I lose access to my wallet?',
    answer: 'If you lose access to your wallet, you may lose access to your NFTs permanently. We strongly recommend backing up your wallet seed phrase and using secure storage methods. We cannot recover lost wallets or NFTs.'
  },
  {
    id: 9,
    question: 'How do I report suspicious activity or potential scams?',
    answer: 'If you encounter suspicious activity, please report it immediately through our support system. We have a dedicated team that investigates reports and takes appropriate action to protect our community.'
  },
  {
    id: 10,
    question: 'Do you offer customer support?',
    answer: 'Yes, we provide comprehensive customer support through multiple channels including live chat, email, and our help center. Our support team is available 24/7 to assist with any questions or issues.'
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about NFTs and our platform
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-6">
            Still have questions? Reach out to our support team or join our community.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover-glow">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 