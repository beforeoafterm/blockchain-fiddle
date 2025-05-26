# Backend API — Ethereum Account Info

This backend provides a REST API to fetch Ethereum account details, including current gas price, block number, and ETH balance for a given address.

## Features
- **GET /api/account/:address** — Returns ETH balance, current block number, and gas price for the given Ethereum address
- Uses [ethers.js](https://docs.ethers.org/) for blockchain interactions
- **Redis caching** for gas price and block number
- **MongoDB persistence** for account balances
- **Async route handler middleware** for clean error handling
- **Centralized error handler** for consistent error responses
- **Environment variable validation** using [Zod](https://github.com/colinhacks/zod)
- **Dependency injection** for service instantiation (testable, flexible code)
- TypeScript, Express.js, and CORS enabled
- Extensible structure for future enhancements

## Setup

### Using Docker (Recommended)
1. Navigate to the docker directory:
   ```sh
   cd ../docker
   ```
2. Create a `.env.docker` file in `docker/backend/` with your environment variables
3. Run the service:
   ```sh
   docker compose up backend
   ```

### Local Development
1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file with your environment variables. (Check .env.example for required variables)
   ```sh
   cp .env.example .env
   ```
   Update the `.env` file with your Ethereum RPC URL, MongoDB URI, and Redis URL.
3. Start the development server:
   ```sh
   npm run dev
   ```

### Prerequisites
- Node.js (v20+ recommended)
- npm (v9+ recommended)
- An Ethereum RPC URL (e.g., Infura, Alchemy, Hardhat Local)
- MongoDB instance
- Redis instance

## Environment Variables
```env
# Required
ETHEREUM_RPC_URL=your_ethereum_node_url
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url

# Optional
PORT=4000 # default
```

## API Usage

### Health Check
- **GET /health**
  - Returns API health status
  - **Response:**
    ```json
    {
      "status": "healthy"
    }
    ```

### Account Info
- **GET /api/account/:address**
  - Get ETH balance, block number, and gas price for an address
  - **Params:** `address` (Ethereum address)
  - **Response:**
    ```json
    {
      "address": "0x...",
      "balance": "1.234",
      "blockNumber": 12345678,
      "gasPrice": "1234567890"
    }
    ```
  - **Errors:**
    - 400: Invalid Ethereum address
    - 500: Failed to fetch account data

### Token Balance
- **GET /api/token-balance/:address**
  - Get ERC-20 token balance for an address
  - **Params:** `address` (Ethereum address)
  - **Response:**
    ```json
    {
      "address": "0x...",
      "balance": "100.0"
    }
    ```
  - **Errors:**
    - 400: Invalid address
    - 500: Failed to fetch token balance

### NFT Holdings
- **GET /api/nfts/:address**
  - Get owned ERC-721 NFTs for an address
  - **Params:** `address` (Ethereum address)
  - **Response:**
    ```json
    {
      "address": "0x...",
      "nfts": [
        'tokenId1',
        'tokenId2'
      ]
    }
    ```
  - **Errors:**
    - 400: Invalid address
    - 500: Failed to fetch NFTs

## Caching & Persistence
- **Redis** is used to cache the latest block number and gas price for 10 seconds to reduce RPC calls.
- **MongoDB** is used to persist the latest ETH balance for each queried address.
- Configure `REDIS_URL` and `MONGODB_URI` in your `.env` file as needed.

## Architecture & Code Quality Improvements
- **Async route handler middleware** (`utils/asyncHandler.ts`) is used for all async routes, eliminating repetitive try/catch blocks.
- **Centralized error handler** ensures all errors are logged and returned in a consistent JSON format.
- **Environment variable validation** is performed at startup using [Zod](https://github.com/colinhacks/zod) (`utils/env.ts`), so the app fails fast if required config is missing or invalid.
- **Dependency injection**: The Ethereum provider, Redis client, and MongoDB URI are injected into the service, making the code more testable and modular.
- **TypeScript best practices**: All code is strictly typed, and error boundaries are enforced.

## Docker Setup
The backend service is containerized using Docker. The container configuration:
- Uses Node.js 20 Alpine as the base image
- Multi-stage build for smaller production images
- Properly handles TypeScript compilation
- Integrates with other services via Docker network

## Extending
- Add more endpoints or logic in `src/` as needed.
- Use environment variables for configuration.

## Assumptions & Decisions
- Only mainnet is supported by default (set by the RPC URL).
- Caching and persistence are enabled and required by default.

## Known Issues
- Requires a valid Ethereum RPC URL (Infura, Alchemy, Hardhat Local, etc.).
- No rate limiting implemented.
- There is currently an issue with the Docker build failing due to missing common module dependencies. This is being investigated.