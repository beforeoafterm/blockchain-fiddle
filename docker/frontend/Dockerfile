# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Copy environment file
COPY frontend/.env.docker .env

# Install dependencies
RUN npm install

# Copy source code
COPY ../../frontend .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
