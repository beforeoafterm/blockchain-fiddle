# Blockchain Fiddle

## Overview
This monorepo contains a frontend, backend, and smart contract integration to practice Web3 Fullstack Development. Each project is organized in its own directory for clarity and modularity.

## Directory Structure
- `frontend/` — React + TypeScript + Vite + TailwindCSS Ethereum wallet dashboard
- `backend/` — Node.js + Express.js API + TypeScript
- `contracts/` — Solidity smart contracts
- `docker/` — Docker and Docker Compose files

## How to Run

### Using Docker (Recommended)
1. Make sure you have Docker and Docker Compose installed
2. From the root directory, run:
   ```sh
   cd docker && docker compose up --build
   ```
3. Open [http://localhost:80](http://localhost:80) in your browser to view the frontend
4. The backend API will be available at [http://localhost:4000](http://localhost:4000)

### Local Development
1. Ensure you have the required dependencies installed in all project directories:
   ```sh
   npm run setup
   ```
2. Start the Backend dev server by running the `dev:backend` NPM script:
   ```sh
   npm run dev:backend
   ```
3. Start the Frontend dev server by running the `dev:frontend` NPM script:
   ```sh
   npm run dev:frontend
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the frontend.

## Prerequisites
- Node.js (v20+ recommended)
- npm (v9+ recommended)
- Docker and Docker Compose (for containerized setup)

## Project Structure
Each component (frontend, backend, contracts) has its own README with detailed setup and development instructions.

## Environment Variables
You'll need to set up the following environment files:
- `frontend/.env` - Frontend configuration
- `backend/.env` - Backend API keys and configuration
- `docker/frontend/.env.docker` - Frontend Docker environment
- `docker/backend/.env.docker` - Backend Docker environment

## Known Issues
- The backend Dockerfile build currently fails due to missing common module dependencies. This is being investigated.

---

For detailed instructions and documentation for each tier, see the README in the corresponding directory.