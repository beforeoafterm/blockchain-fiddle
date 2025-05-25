# Backend API — Ethereum Account Info

This backend provides a REST API to fetch Ethereum account details, including current gas price, block number, and ETH balance for a given address.

## Features
- **GET /api/account/:address** — Returns ETH balance, current block number, and gas price for the given Ethereum address.
- Uses [ethers.js](https://docs.ethers.org/) for blockchain interactions.
- **Redis caching** for gas price and block number.
- **MongoDB persistence** for account balances.
- TypeScript, Express.js, and CORS enabled.
- Extensible structure for future enhancements.

## Setup

### Prerequisites
- Node.js (v20+ recommended)
- npm (v9+ recommended)
- An Ethereum RPC URL (e.g., Infura, Alchemy)
- Redis and MongoDB running locally or in the cloud

### Installation
1. Install dependencies:
   ```sh
   npm install
   ```
2. Copy the example environment file and set your RPC URL and database configs:
   ```sh
   cp .env.example .env
   # Edit .env and set ETHEREUM_RPC_URL, REDIS_URL, and MONGODB_URI
   ```
3. Build and run the server:
   ```sh
   npm run start
   # Or for development:
   npm run dev
   ```

## API Usage
- **GET /api/account/:address**
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

## Caching & Persistence
- **Redis** is used to cache the latest block number and gas price for 10 seconds to reduce RPC calls.
- **MongoDB** is used to persist the latest ETH balance for each queried address.
- Configure `REDIS_URL` and `MONGODB_URI` in your `.env` file as needed.

## Extending
- Add more endpoints or logic in `src/` as needed.
- Use environment variables for configuration.

## Assumptions & Decisions
- Only mainnet is supported by default (set by the RPC URL).
- Caching and persistence are enabled and required by default.

## Known Issues
- Requires a valid Ethereum RPC URL (Infura, Alchemy, etc.).
- No rate limiting implemented.
