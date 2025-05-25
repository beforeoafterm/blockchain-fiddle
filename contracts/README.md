# Smart Contracts — Hardhat Project

This directory contains the Ethereum smart contracts and deployment scripts for the project. It uses [Hardhat](https://hardhat.org/) for development, testing, and deployment, and [OpenZeppelin](https://openzeppelin.com/contracts/) for secure ERC-20 and ERC-721 base contracts.

## Features

- **ERC-20 Token (`NeuToken`)**: Mintable and transferable fungible token.
- **ERC-721 NFT (`NeuNFT`)**: Mintable and transferable non-fungible token.
- **OpenZeppelin**: Secure, audited base contracts.
- **TypeScript**: For scripts and tests.
- **Local and Sepolia testnet deployment**: Easily deploy contracts to local Hardhat node or Sepolia.
- **Automated scripts**: For node startup, deployment, and combined dev workflow.

## Setup

### Prerequisites

- Node.js (v20+ recommended)
- npm (v9+ recommended)

### Installation

1. Install dependencies:
   ```sh
   npm install
   ```

2. (Optional) For Sepolia/testnet deployment, copy the example environment file and set your RPC URL and private key:
   ```sh
   cp .env.example .env
   # Edit .env and set PRIVATE_KEY and RPC_URL for Sepolia
   ```

## Usage

### Local Development

- **Start local Hardhat node:**
  ```sh
  npm run node
  ```

- **Deploy contracts to local node:**
  ```sh
  npm run deploy:localhost
  ```

- **Combined dev (start node and deploy):**
  ```sh
  npm run dev
  ```

### Sepolia Testnet Deployment

1. Ensure `.env` is configured with your Sepolia RPC URL and funded private key.
2. Deploy:
   ```sh
   npm run deploy:sepolia
   ```

## Scripts

- `clean` — Remove Hardhat build artifacts and cache.
- `compile` — Compile all Solidity smart contracts.
- `deploy:localhost` — Deploy contracts to the local Hardhat node.
- `deploy:sepolia` — Deploy contracts to the Sepolia Ethereum testnet (requires .env with RPC URL and private key).
- `dev` — Start the local node and deploy contracts to it (for rapid local development; requires `concurrently`).
- `node` — Start a local Hardhat Ethereum node for development/testing.
- `postcompile` — Copy contract ABIs and TypeChain types to the frontend after compiling.
- `test` — Run all smart contract tests using Hardhat.

## Directory Structure

- `contracts/` — Solidity smart contracts.
- `scripts/` — Deployment scripts.
- `test/` — Contract tests.
- `.env.example` — Example environment config for testnet deployment.

## Assumptions & Decisions

- OpenZeppelin is used for security and standards compliance.
- Minting is open to all users for demonstration purposes.
- Sepolia is the recommended testnet for public deployments.

## Known Issues or Limitations

- Contracts are not audited for production use.
- Only basic minting and transfer functionality is implemented.
- No access control or payment logic is included in mint functions.

## References

- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)