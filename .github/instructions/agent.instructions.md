---
applyTo: '**'
---
# Agent Instructions
This document provides instructions for the agent to complete the project as outlined in the project instructions.
The agent should follow the steps and requirements specified in the project instructions to ensure a successful completion of the project.

## Codebase structure
The agent should maintain a clear and organized codebase structure. The following directories have been created:
- `frontend`: Contains the frontend application code.
- `backend`: Contains the backend API code.
- `contracts`: Contains the smart contract code.
- `docker`: Contains Docker-related files for containerization.

## Technology stack
The agent should use the following technology stack as specified in the project instructions:
- **Frontend**: React.js with TypeScript + Vite + SWC + TailwindCSS
- **Backend**: Node.js + Express.js with TypeScript
- **Smart Contract**: Solidity
- **Database**: MongoDB + Redis (for caching)
- **Docker**: For containerization

## Code Style

- Use ESModule syntax (`import`/`export`) rather than CommonJS
  (`require`/`module.exports`)
- Use functional components with hooks for React code
- Avoid using React.FunctionComponent or React.FC to type components, instead,
  just type the props
- Use named exports rather than default exports where possible
- Format code according to the project's ESLint and Prettier configuration
- Follow the project's existing indentation and formatting style

## Documentation
The agent should ensure each tier is documented in the `README.md` file located at the root of the repository. The documentation should include:
- An overview of your project.
- Instructions on how to set up and run the application locally.
- Prerequisites or dependencies.
- Docker Compose instructions (if applicable).
- Assumptions or decisions you made.
- Known issues or limitations.