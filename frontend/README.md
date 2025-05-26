# Ethereum Wallet Dashboard (Tier 1)

This project is a simple, accessible Ethereum wallet dashboard built with React, TypeScript, Vite, and TailwindCSS. It allows users to connect their MetaMask wallet, view their ETH balance, and see their last 10 transactions.

## Features
- **MetaMask Wallet Integration**: Securely connect your Ethereum wallet using MetaMask
- **ETH Balance**: Instantly view your current ETH balance
- **Transaction History**: See your last 10 Ethereum transactions, with Etherscan links
- **Mint ERC20 and ERC721 Tokens**: Mint your own ERC20 and ERC721 tokens directly from the dashboard
- **Dark Mode Support**: Toggle your system preferences between light and dark themes for better user experience
- **Responsive & Accessible UI**: Built with semantic HTML, ARIA attributes, and full dark mode support
- **Performance Optimized**: Transaction lists are memoized for fast rendering
- **TypeScript**: All code is fully typed for safety and maintainability

## Tech Stack
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (with SWC)
- [TailwindCSS](https://tailwindcss.com/)
- [ethers.js](https://docs.ethers.org/)
- [Etherscan API](https://docs.etherscan.io/)

## Setup

### Using Docker (Recommended)
1. Navigate to the docker directory:
   ```sh
   cd ../docker
   ```
2. Create a `.env.docker` file in `docker/frontend/` with your environment variables
3. Run the service:
   ```sh
   docker-compose up frontend
   ```
4. Access the app at [http://localhost:80](http://localhost:80)

### Local Development
1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file with your environment variables
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173)

## Environment Variables
```env
# Required
VITE_BACKEND_URL=http://localhost:4000
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key

# Optional
VITE_NETWORK=mainnet # default, or: goerli, sepolia
```

## Docker Setup
The frontend is served using:
- Nginx for static file serving and routing
- Multi-stage Docker build for optimal production images
- Environment variable injection at runtime
- Proper handling of React Router paths

## Usage
- Click **Connect MetaMask** to connect your wallet.
- View your ETH balance and last 10 transactions.
- Click a transaction hash to view it on Etherscan.

## Accessibility & Best Practices
- Uses semantic HTML elements (`main`, `section`, `footer`, `ul`, `li`).
- ARIA roles and labels for screen readers.
- Fully responsive and dark mode ready.
- Transaction rendering is memoized for performance.

## Assumptions & Decisions
- Only MetaMask is supported for wallet connection
  - WalletConnect was removed due to issues between Vite and the WalletConnectProvider. (i.e. `@walletconnect/web3-provider` does not work with Vite since Vite does not support Node.js built-in modules like `Buffer` and `Stream`)
- Etherscan API is used for transaction history.
- No backend or smart contract integration in Tier 1.

## Known Issues & Limitations
- Only supports Ethereum mainnet addresses.
- Requires MetaMask browser extension.
- Etherscan API rate limits may apply.