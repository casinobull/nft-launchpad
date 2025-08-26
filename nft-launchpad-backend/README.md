# NFT Launchpad Backend

Backend API for the NFT Launchpad project with wallet authentication, collection deployment, and minting functionality.

## Features

- Wallet-based authentication using SIWE (Sign-In with Ethereum)
- Collection deployment to Sepolia testnet
- NFT minting functionality
- File upload to Supabase storage
- Database integration for collections and mints

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

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

# Blockchain Configuration (Sepolia)
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here
NETWORK=sepolia

# Contract Configuration
LAUNCHPAD_CONTRACT_ADDRESS=your_deployed_launchpad_contract_address
LAUNCHPAD_ABI_PATH=./abi/LaunchpadABI.json
LAUNCHPAD_USE_MOCK=false
```

### 3. Database Setup

Create the following tables in your Supabase database:

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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Deploy Contract

First, deploy the NFT Launchpad contract to Sepolia:

```bash
cd ../nft-launchpad-contract
npm run deploy:sepolia
```

Copy the deployed contract address and update your `.env` file.

### 5. Run the Backend

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

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

## Integration with Frontend

The backend is designed to work with the Next.js frontend. Transactions are signed on the frontend and submitted to the blockchain through the backend for better security and user experience.
