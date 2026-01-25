# ☁️ InkNest Deployment Guide (Oracle Cloud)

This guide documents the deployment process for InkNest on an Oracle Cloud "Always Free" VM running Ubuntu 22.04.

## 🏗️ Project Architecture
- **Frontend**: React + Vite (Static files served by Backend in production)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (Cloud)
- **Storage**: Cloudinary (Cloud images)
- **Server**: Oracle Cloud VM (Ubuntu) managed by PM2
- **Network**: Port 80 (HTTP)

---

## 🛠️ Deployment Steps Taken

### 1. Environment Setup (VM)
We installed the necessary dependencies on the Ubuntu server:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 & npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2
```

### 2. Project Upload
We uploaded the project files (excluding `node_modules`) to `~/inknest`:
- `backend/` source code
- `frontend/dist/` (Production build artifacts)
- `package.json`

### 3. Installation & Configuration
On the server:
```bash
cd ~/inknest/backend
npm install --production

# Production Environment Variables (.env)
# PORT=80
# NODE_ENV=production
# ... (MongoDB & Cloudinary credentials)
```

### 4. Running the App
We used PM2 to keep the app running in the background:
```bash
# Start app on Port 80
sudo PORT=80 NODE_ENV=production pm2 start server.js --name inknest

# Save configuration to auto-start on reboot
sudo pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root
```

### 5. Firewall Configuration
- **VM Level**: Opened Port 80 in `iptables`
- **Oracle Network**: Added **Ingress Rule** for Port 80 in VCN Security List

---

## 🔄 Updating the Deployment through local machine
To deploy new changes from your local machine:

1. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload Changes** (PowerShell):
   ```powershell
   # Upload backend code
   scp -i "path/to/key" -r backend/src ubuntu@<VM_IP>:~/inknest/backend/
   
   # Upload frontend build
   scp -i "path/to/key" -r frontend/dist ubuntu@<VM_IP>:~/inknest/frontend/
   ```

3. **Restart Server**:
   ```bash
   ssh -i "path/to/key" ubuntu@<VM_IP> "sudo pm2 restart inknest"
   ```

---

## 📋 Useful Commands (SSH into VM first)

| Action | Command |
|--------|---------|
| **Check Status** | `sudo pm2 status` |
| **View Logs** | `sudo pm2 logs inknest` |
| **Restart App** | `sudo pm2 restart inknest` |
| **Stop App** | `sudo pm2 stop inknest` |

---

## 🌐 DNS & Domain (Cloudflare)
To link a domain:
1. Create an **A Record** in Cloudflare resolving to `<VM_IP>` (`140.245.254.50`).
2. Enable "Proxied" status (Orange Cloud).
3. Set SSL/TLS mode to **Full** or **Flexible**.
