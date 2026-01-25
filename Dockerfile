FROM node:20

# Set environment variables

# Add more memory for build if needed
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy backend and frontend source code
COPY backend ./backend
COPY frontend ./frontend

# Install backend dependencies
# Use regular npm install to be safe against lockfile mismatches
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies and build
WORKDIR /app/frontend
# Ensure dev dependencies are installed for build
RUN npm install
RUN npm run build

# Go back to backend
WORKDIR /app/backend

# Expose port (Cloud Run defaults to 8080)
EXPOSE 8080

# Set production env for runtime
ENV NODE_ENV=production

# Start command
CMD ["npm", "start"]
