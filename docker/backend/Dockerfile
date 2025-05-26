# Build stage
FROM node:22-alpine AS build

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY backend/ .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy built JavaScript files
COPY --from=build /app/dist ./dist

# Copy environment variables
COPY docker/backend/.env.docker .env

EXPOSE 4000

CMD ["node", "dist/index.js"]
