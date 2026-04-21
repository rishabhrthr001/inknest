#!/bin/bash
#############################################
# InkNest - Oracle Cloud One-Click Deploy
# Paste this entire script in Cloud Shell
#############################################

set -e

echo "🚀 InkNest Oracle Cloud Deployment"
echo "==================================="

# Update system
echo "📦 Updating system..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git

# Install PM2
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Create app directory
mkdir -p ~/inknest
cd ~/inknest

# Create backend
mkdir -p backend/config backend/middleware backend/models backend/routes
mkdir -p frontend/dist logs

# Create backend server.js
cat > backend/server.js << 'SERVERJS'
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/auth.js";
import cloudinary from "./config/cloudinary.js";
import categoryRoutes from "./routes/category.js";
import fetchCatRoute from "./routes/fetchCategory.js";
import productRoute from "./routes/product.js";
import fetchProRoute from "./routes/fetchProduct.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

cloudinary.api
  .ping()
  .then(() => console.log("Cloudinary connected"))
  .catch(console.error);

app.get("/check", (req, res) => {
  res.status(200).send("SERVER OK");
});

app.use("/auth", authRoutes);
app.use("/add", categoryRoutes);
app.use("/api", fetchCatRoute);
app.use("/api", fetchProRoute);
app.use("/add", productRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
SERVERJS

# Create backend package.json
cat > backend/package.json << 'PACKAGEJSON'
{
  "name": "inknest-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cloudinary": "^1.41.3",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.1.3",
    "multer": "^2.0.2",
    "multer-storage-cloudinary": "^4.0.0"
  }
}
PACKAGEJSON

# Create .env file
cat > backend/.env << 'ENVFILE'
MONGO_URI=mongodb+srv://rishabhrthr001_db_user:bCoouyntHMLtYsXT@cluster0.tefbat0.mongodb.net/
JWT_SECRET=9f4c8e2b7a6d1e0c3f9b5a4e8d7c2b1a0f6e5d4c9b8a7e6f5a4d3c2b1e0
PORT=80
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=dbuffe3zo
CLOUDINARY_API_KEY=791548488748899
CLOUDINARY_API_SECRET=BxrKuC7lNxGWn3k4SJzJslZDf1E
ENVFILE

echo "⚠️  NOTE: You need to upload your full project files!"
echo ""
echo "The script has created the folder structure."
echo "Now upload your project using one of these methods:"
echo ""
echo "Option 1 - From GitHub:"
echo "  cd ~/inknest && rm -rf * && git clone YOUR_REPO_URL ."
echo ""
echo "Option 2 - From local (run on your Windows machine):"
echo "  scp -r nikhil/* ubuntu@YOUR_VM_IP:~/inknest/"
echo ""
echo "After uploading, run:"
echo "  cd ~/inknest/backend && npm install"
echo "  cd ~/inknest/frontend && npm install && npm run build"
echo "  cd ~/inknest/backend && sudo pm2 start server.js --name inknest"
echo "  sudo pm2 save && sudo pm2 startup"
