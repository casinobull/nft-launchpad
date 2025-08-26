#!/bin/bash

echo "🚀 NFT Launchpad Integration Setup"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js is installed"

# Install contract dependencies
echo "📦 Installing contract dependencies..."
cd nft-launchpad-contract
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd nft-launchpad-backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd nft-launchpad-frontend
npm install
cd ..

echo ""
echo "✅ Dependencies installed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy contract to Sepolia:"
echo "   cd nft-launchpad-contract"
echo "   npm run deploy:sepolia"
echo ""
echo "2. Configure environment variables:"
echo "   - Backend: nft-launchpad-backend/.env"
echo "   - Frontend: nft-launchpad-frontend/.env.local"
echo ""
echo "3. Set up Supabase database tables (see INTEGRATION_GUIDE.md)"
echo ""
echo "4. Start the services:"
echo "   Backend: cd nft-launchpad-backend && npm run dev"
echo "   Frontend: cd nft-launchpad-frontend && npm run dev"
echo ""
echo "📖 See INTEGRATION_GUIDE.md for detailed instructions"
