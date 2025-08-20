# NFT Launchpad Smart Contracts

A decentralized NFT launchpad built with Hardhat that allows users to create and mint NFT collections through a unified platform.

## 🚀 Features

- **NFT Project Creation**: Deploy new NFT collections with customizable parameters
- **Proxy Pattern**: Efficient contract deployment using minimal proxy pattern
- **Metadata Support**: IPFS integration for NFT metadata storage
- **Access Control**: Owner-only functions for project management
- **Flexible Pricing**: Configurable mint prices per collection
- **Supply Management**: Maximum supply limits and remaining supply tracking
- **Project Management**: Activate/deactivate projects and update metadata URIs

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Hardhat
- MetaMask or similar wallet

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nft-launchpad-contract
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Configure your environment variables in `.env`:
```env
# Network URLs
SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR-PROJECT-ID
MAINNET_URL=https://mainnet.infura.io/v3/YOUR-PROJECT-ID

# Private key for deployment (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# Etherscan API key for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# Gas reporting
REPORT_GAS=true
```

## 🏗️ Contract Architecture

### NFTContract.sol
- ERC721-compliant NFT contract
- Supports proxy pattern for efficient deployment
- Configurable mint price and maximum supply
- Only callable by the launchpad contract

### NFTLaunchpad.sol
- Main launchpad contract that manages NFT projects
- Deploys NFT contracts using minimal proxy pattern
- Handles minting requests and forwards them to NFT contracts
- Provides project management functions

## 🚀 Usage

### Compile Contracts
```bash
npm run compile
```

### Run Tests
```bash
npm test
```

### Deploy to Local Network
```bash
# Start local Hardhat node
npm run node

# In another terminal, deploy contracts
npm run deploy:local
```

### Deploy to Testnet/Mainnet
```bash
npm run deploy
```

### Run Interaction Demo
```bash
npx hardhat run scripts/interact.js --network localhost
```

## 📖 How It Works

### 1. Project Creation
The launchpad owner creates a new NFT project by calling `createNFTProject()` with:
- Project name and symbol
- Maximum supply
- Mint price
- Base URI for metadata

### 2. NFT Deployment
The launchpad deploys a new NFT contract using the minimal proxy pattern, which:
- Reduces gas costs for multiple deployments
- Uses the same implementation contract
- Initializes with project-specific parameters

### 3. Minting Process
Users mint NFTs by calling the launchpad's `mintNFT()` function:
- User provides the NFT contract address and token URI
- Launchpad forwards the mint request to the specific NFT contract
- NFT is minted to the user's address

### 4. Metadata Management
- Metadata is stored on IPFS
- Token URIs point to IPFS hashes
- Base URI can be updated by the project owner

## 🔧 Contract Functions

### NFTLaunchpad Functions

#### Owner Functions
- `createNFTProject(name, symbol, maxSupply, mintPrice, baseURI)` - Create new NFT project
- `setProjectActive(nftContract, active)` - Activate/deactivate project
- `updateProjectBaseURI(nftContract, newBaseURI)` - Update project metadata URI
- `withdraw()` - Withdraw collected fees

#### Public Functions
- `mintNFT(nftContract, tokenURI)` - Mint NFT from specific project
- `getProjectInfo(nftContract)` - Get project information
- `getAllDeployedNFTs()` - Get all deployed NFT contracts
- `getDeployedNFTsCount()` - Get total number of deployed projects

### NFTContract Functions

#### Public Functions
- `mint(to, tokenURI)` - Mint NFT (only callable by launchpad)
- `totalSupply()` - Get current total supply
- `remainingSupply()` - Get remaining supply
- `ownerOf(tokenId)` - Get NFT owner

#### Owner Functions
- `setMintingEnabled(enabled)` - Enable/disable minting
- `setMintPrice(newPrice)` - Update mint price
- `withdraw()` - Withdraw collected fees

## 🧪 Testing

The project includes comprehensive tests covering:
- Contract deployment
- NFT project creation
- Minting functionality
- Access control
- Project management
- Error handling

Run tests with:
```bash
npm test
```

## 🔒 Security Features

- **Access Control**: Owner-only functions for critical operations
- **Input Validation**: Comprehensive parameter validation
- **Reentrancy Protection**: OpenZeppelin's secure patterns
- **Proxy Safety**: Proper initialization and upgrade patterns

## 🌐 IPFS Integration

To use IPFS for metadata storage:

1. Upload your metadata JSON files to IPFS
2. Use the IPFS hash as the base URI when creating projects
3. Individual token URIs should point to specific metadata files

Example metadata structure:
```json
{
  "name": "Cool NFT #1",
  "description": "A really cool NFT",
  "image": "ipfs://QmImageHash/1.png",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "Blue"
    }
  ]
}
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub.

## ⚠️ Disclaimer

This software is provided "as is" without warranty. Use at your own risk. Always test thoroughly on testnets before deploying to mainnet. 