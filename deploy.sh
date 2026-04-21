#!/bin/bash
# Oracle Cloud Deployment Script for InkNest
# Run this on your Oracle Cloud VM after cloning the repo

echo "🚀 InkNest Deployment Script"
echo "============================"

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# Install PM2 globally for process management
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Navigate to project directory
cd ~/inknest || exit

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install --production

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
npm run build

# Go back to backend
cd ../backend

# Create production .env if it doesn't exist
if [ ! -f .env ]; then
  echo "⚠️  Please create .env file with your environment variables!"
  echo "Required variables:"
  echo "  - MONGO_URI"
  echo "  - JWT_SECRET"
  echo "  - PORT=80"
  echo "  - NODE_ENV=production"
  echo "  - CLOUDINARY_CLOUD_NAME"
  echo "  - CLOUDINARY_API_KEY"
  echo "  - CLOUDINARY_API_SECRET"
  exit 1
fi

# Start the application with PM2
echo "🔥 Starting application with PM2..."
pm2 stop inknest 2>/dev/null || true
pm2 delete inknest 2>/dev/null || true
pm2 start server.js --name "inknest" --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
pm2 save

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your app should be running at http://$(curl -s ifconfig.me)"
echo ""
echo "📋 Useful PM2 commands:"
echo "   pm2 status          - Check app status"
echo "   pm2 logs inknest    - View logs"
echo "   pm2 restart inknest - Restart app"
echo "   pm2 stop inknest    - Stop app"
