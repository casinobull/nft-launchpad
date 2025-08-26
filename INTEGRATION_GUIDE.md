# NFT Launchpad Integration Guide

This guide will help you integrate the backend and contract components, then connect them with the frontend using Wagmi for web3 interactions.

## Prerequisites

- Node.js 18+ installed
- MetaMask wallet with Sepolia testnet configured
- Supabase account for database and storage
- Infura or Alchemy account for RPC endpoint

## Step 1: Contract Deployment

### 1.1 Setup Contract Environment

```bash
cd nft-launchpad-contract
npm install
```

Create `.env` file:
```env
SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 1.2 Deploy to Sepolia

```bash
npm run deploy:sepolia
```

Copy the deployed contract address for the next step.

## Step 2: Backend Setup

### 2.1 Install Dependencies

```bash
cd nft-launchpad-backend
npm install
```

### 2.2 Environment Configuration

Create `.env` file:
```env
# Server Configuration
PORT=4000
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:3000

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_STORAGE_BUCKET=nft-assets

# Blockchain Configuration
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here
NETWORK=sepolia
CHAIN_ID=11155111

# Contract Configuration
LAUNCHPAD_CONTRACT_ADDRESS=your_deployed_contract_address
LAUNCHPAD_ABI_PATH=./abi/LaunchpadABI.json
LAUNCHPAD_USE_MOCK=false
```

### 2.3 Database Setup

Create these tables in your Supabase database:

#### Collections Table
```sql
CREATE TABLE collections (
  id SERIAL PRIMARY KEY,
  owner_address TEXT NOT NULL,
  collection_address TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  base_uri TEXT NOT NULL,
  max_supply INTEGER NOT NULL,
  price_wei TEXT NOT NULL,
  network TEXT NOT NULL,
  chain_id INTEGER NOT NULL,
  tx_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Mints Table
```sql
CREATE TABLE mints (
  id SERIAL PRIMARY KEY,
  user_address TEXT NOT NULL,
  collection_address TEXT NOT NULL,
  token_id INTEGER NOT NULL,
  token_uri TEXT NOT NULL,
  tx_hash TEXT NOT NULL,
  mint_price TEXT NOT NULL,
  network TEXT NOT NULL,
  chain_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.4 Start Backend

```bash
npm run dev
```

## Step 3: Frontend Integration (Wagmi)

### 3.1 Install Dependencies

```bash
cd nft-launchpad-frontend
npm install
```

### 3.2 Environment Configuration

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_LAUNCHPAD_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_CHAIN_ID=11155111
```

### 3.3 Start Frontend

```bash
npm run dev
```

## Step 4: Testing the Integration

### 4.1 Test Collection Deployment

1. Open http://localhost:3000
2. Connect your MetaMask wallet (Wagmi will handle the connection)
3. Navigate to "Create Collection"
4. Fill in collection details
5. Deploy the collection (Wagmi will handle the transaction)
6. Verify the transaction on Sepolia Etherscan

### 4.2 Test NFT Minting

1. Go to your deployed collection
2. Click "Mint NFT"
3. Upload metadata and image
4. Complete the mint transaction (Wagmi will handle the transaction)
5. Verify the NFT on OpenSea Sepolia

## Architecture Overview

```
Frontend (Next.js + Wagmi) ←→ Backend (Express + Ethers.js) ←→ Blockchain (Sepolia)
                                           ↓
                                     Database (Supabase)
```

### Technology Stack:
- **Frontend**: Next.js 15, Wagmi v2, Viem, React Query
- **Backend**: Express.js, Ethers.js v5, SIWE authentication
- **Blockchain**: Sepolia testnet, NFTLaunchpad smart contract
- **Database**: Supabase (PostgreSQL)

### Flow:
1. User connects wallet using Wagmi hooks
2. Frontend signs SIWE message using Wagmi
3. Backend verifies signature and issues JWT
4. User creates collection details on frontend
5. Frontend uses Wagmi contract hooks to deploy collection
6. Backend stores collection data in database
7. User mints NFTs through frontend using Wagmi
8. Backend handles additional minting logic

## Wagmi Features Used

### Wallet Management
- `useAccount` - Get wallet connection status
- `useConnect` - Connect to different wallet providers
- `useDisconnect` - Disconnect wallet
- `useChainId` - Get current chain ID
- `useSwitchChain` - Switch between networks

### Contract Interactions
- `useReadContract` - Read contract data
- `useWriteContract` - Write to contracts
- `useWaitForTransactionReceipt` - Wait for transaction confirmations

### Custom Hooks
- `useWallet` - Custom hook for wallet management and SIWE
- `useLaunchpadContract` - Custom hook for contract interactions

## API Endpoints

### Authentication
- `POST /auth/siwe` - Sign-in with Ethereum
- `POST /auth/verify` - Verify SIWE message

### Collections
- `GET /collections` - Get all collections
- `GET /collections/:address` - Get collection details
- `GET /collections/:address/mints` - Get collection mints

### Deployment
- `POST /deploy` - Deploy new collection (requires auth)

### Minting
- `POST /mint` - Mint NFT (requires auth)

### Upload
- `POST /upload` - Upload files to IPFS (requires auth)

## Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_LAUNCHPAD_CONTRACT_ADDRESS` - Deployed contract address
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID
- `NEXT_PUBLIC_CHAIN_ID` - Blockchain chain ID (default: 11155111 for Sepolia)

### Backend (.env)
- `CHAIN_ID` - Blockchain chain ID (default: 11155111 for Sepolia)
- `NETWORK` - Network name (default: sepolia)
- `RPC_URL` - RPC endpoint URL
- `PRIVATE_KEY` - Wallet private key for transactions
- `LAUNCHPAD_CONTRACT_ADDRESS` - Deployed contract address

## Supported Networks

The application supports multiple networks through the `CHAIN_ID` environment variable:

- **Sepolia Testnet**: `CHAIN_ID=11155111`
- **Ethereum Mainnet**: `CHAIN_ID=1`
- **Other Networks**: Add custom chain configurations

## Troubleshooting

### Common Issues:

1. **MetaMask not connecting**
   - Ensure MetaMask is installed
   - Check if you're on the correct network (based on CHAIN_ID)
   - Clear browser cache
   - Check Wagmi configuration

2. **Contract deployment fails**
   - Verify you have ETH on the target network
   - Check your private key is correct
   - Ensure RPC URL is valid
   - Check contract address in environment variables

3. **Backend connection issues**
   - Verify backend is running on port 4000
   - Check CORS configuration
   - Ensure environment variables are set

4. **Database errors**
   - Verify Supabase credentials
   - Check table structure matches schema
   - Ensure RLS policies are configured

5. **Wagmi issues**
   - Check Wagmi configuration in `src/config/wagmi.ts`
   - Verify contract ABI is correct
   - Check network configuration

6. **Chain ID mismatch**
   - Ensure `CHAIN_ID` is set correctly in both frontend and backend
   - Verify the network is supported in Wagmi configuration
   - Check that MetaMask is connected to the correct network

## Security Considerations

1. **Private Keys**: Never expose private keys in frontend code
2. **JWT Secrets**: Use strong, unique JWT secrets
3. **CORS**: Configure CORS properly for production
4. **Rate Limiting**: Implement rate limiting for API endpoints
5. **Input Validation**: Validate all user inputs
6. **Wagmi Security**: Use proper error handling and transaction confirmation

## Production Deployment

1. **Backend**: Deploy to Vercel, Railway, or similar
2. **Frontend**: Deploy to Vercel or Netlify
3. **Database**: Use Supabase production instance
4. **Blockchain**: Deploy contracts to mainnet
5. **Environment**: Update all environment variables for production
6. **Wagmi**: Configure production RPC endpoints and contract addresses

## Next Steps

1. Add more NFT standards (ERC-1155, etc.)
2. Implement batch minting
3. Add royalty functionality
4. Implement whitelist features
5. Add analytics and reporting
6. Implement marketplace features
7. Add more Wagmi hooks for advanced functionality
