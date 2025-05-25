# Blockchain Fiddle

## Overview
This repository covers frontend, backend, smart contract, and integration for Web3 Fullstack Development. Each section is organized in its own directory for clarity and modularity.

## Directory Structure
- `frontend/` — React + TypeScript + Vite + TailwindCSS Ethereum wallet dashboard
- `backend/` — Node.js + Express.js API + TypeScript
- `contracts/` — Solidity smart contracts
- `docker/` — Docker and Docker Compose files

## Tier 1: Frontend (Ethereum Wallet Dashboard)
See [`frontend/README.md`](./frontend/README.md) for full details, setup, and usage instructions.

## How to Run (Frontend)
1. Go to the `frontend` directory:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
2. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Prerequisites
- Node.js (v20+ recommended)
- npm (v9+ recommended)
- MetaMask browser extension
- Etherscan API key (see `.env` in `frontend/`)

## Assumptions & Decisions
- Each tier is implemented in its own directory for clarity.
- Sensitive information (API keys, private keys) is excluded from the repository.
- See each tier's README for specific details and limitations.

## Known Issues & Limitations
- Tier 1 only supports MetaMask and Ethereum mainnet.
- Etherscan API rate limits may apply.

---

For detailed instructions and documentation for each tier, see the README in the corresponding directory.