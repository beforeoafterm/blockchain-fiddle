# Ethereum Wallet Dashboard (Tier 1)

This project is a simple, accessible Ethereum wallet dashboard built with React, TypeScript, Vite, and TailwindCSS. It allows users to connect their MetaMask wallet, view their ETH balance, and see their last 10 transactions.

## Features
- **MetaMask Wallet Connect**: Securely connect your Ethereum wallet using MetaMask.
- **ETH Balance**: Instantly view your current ETH balance.
- **Transaction History**: See your last 10 Ethereum transactions, with Etherscan links.
- **Responsive & Accessible UI**: Built with semantic HTML, ARIA attributes, and full dark mode support.
- **Performance Optimized**: Transaction lists are memoized for fast rendering.
- **TypeScript**: All code is fully typed for safety and maintainability.

## Tech Stack
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (with SWC)
- [TailwindCSS](https://tailwindcss.com/)
- [ethers.js](https://docs.ethers.org/)
- [Etherscan API](https://docs.etherscan.io/)

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm (v9+ recommended)
- MetaMask browser extension
- Etherscan API key (see `.env` setup)

### Setup
1. **Install dependencies**
   ```sh
   npm install
   ```
2. **Configure environment**
   - Copy `.env` and set your Etherscan API key:
     ```sh
     cp .env.example .env
     # Edit .env and set VITE_ETHERSCAN_API_KEY=your_key
     ```
   - Or use the provided `.env` file.
3. **Run the app**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

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

## Project Structure
- `frontend/` — React app (this project)
- `backend/`, `contracts/`, `docker/` — See other tiers for full stack features

---

For Tier 2+ (backend, smart contract, integration), see the root `README.md` and respective folders.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
