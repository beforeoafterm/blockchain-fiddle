# Blockchain Fiddle

## Overview
This monorepo contains a frontend, backend, and smart contract integration to practice Web3 Fullstack Development. Each project is organized in its own directory for clarity and modularity.

## Directory Structure
- `frontend/` — React + TypeScript + Vite + TailwindCSS Ethereum wallet dashboard
- `backend/` — Node.js + Express.js API + TypeScript
- `contracts/` — Solidity smart contracts
- `docker/` — Docker and Docker Compose files

## How to Run
1. Ensure you have the required dependencies installed in all project directories:
   ```sh
   npm run setup
   ```
2. Start the Backend dev server by running the `dev:backend` NPM script:
   ```sh
   npm run dev:backend
   ```
2. Start the Frontend dev server by running the `dev:frontend` NPM script:
   ```sh
   npm run dev:frontend
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser to view the frontend.

## Prerequisites
- Node.js (v20+ recommended)
- npm (v9+ recommended)

## Assumptions & Decisions
- Each project is implemented in its own directory for clarity.
- Sensitive information (API keys, private keys) is excluded from the repository.
- See each project's README for specific details and limitations.

---

For detailed instructions and documentation for each tier, see the README in the corresponding directory.