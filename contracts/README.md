# Smart Contracts — Hardhat Project

This directory contains the Ethereum smart contracts and deployment scripts for the project. It uses [Hardhat](https://hardhat.org/) for development, testing, and deployment, and [OpenZeppelin](https://openzeppelin.com/contracts/) for secure ERC-20 and ERC-721 base contracts.

## Features

- **ERC-20 Token (`NeuToken`)**: Mintable and transferable fungible token
- **ERC-721 NFT (`NeuNFT`)**: Mintable and transferable non-fungible token
- **OpenZeppelin**: Secure, audited base contracts
- **TypeScript**: For scripts and tests
- **Local and Sepolia testnet deployment**: Easily deploy contracts to local Hardhat node or Sepolia
- **Automated scripts**: For node startup, deployment, and combined dev workflow
- **Type generation**: Automatic TypeScript types for contracts
- **Shared types**: Contract types are shared with frontend and backend

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file with required environment variables
3. Compile contracts and generate types:
   ```sh
   npm run compile
   ```

### Prerequisites

- Node.js (v20+ recommended)
- npm (v9+ recommended)
- An Ethereum wallet with test ETH (for deployments)

## Environment Variables

```env
# Required for Sepolia testnet deployment
PRIVATE_KEY=your_deployer_wallet_private_key
INFURA_API_KEY=your_infura_api_key
```

## Scripts

- `npm run compile` - Compile contracts and generate TypeScript types
- `npm run test` - Run the test suite
- `npm run deploy:local` - Deploy to local Hardhat network
- `npm run deploy:sepolia` - Deploy to Sepolia testnet

## Type Generation

The project automatically generates TypeScript types for the contracts during compilation. These types are used by both the frontend and backend to ensure type safety when interacting with the contracts.

## Testing

The test suite uses:

- Hardhat's testing framework
- Chai for assertions
- TypeScript for type safety
- Ethers.js for contract interactions