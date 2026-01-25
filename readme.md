🪶 InkNest

InkNest is a product showcase website built to present products with a clean, modern UI and smooth user experience.

Frontend: React (Vite)

Backend: Node.js + Express

Database: MongoDB

Media Storage: Cloudinary

This repository contains both frontend and backend, maintained as separate folders.

🧱 Tech Stack
Frontend

React (Vite)
TypeScript
Tailwind CSS
React Router
Axios
EmailJS (contact form)

Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
Cloudinary
REST APIs

## 📁 Project Structure

```
inknest/
├── frontend/          # React + Vite (previously shree-bankey-bihari...)
│   ├── src/
│   ├── dist/          # Production build
│   └── .env.local
├── backend/           # Node.js + Express (previously server)
│   ├── models/
│   ├── routes/
│   ├── server.js      # Updated to serve frontend in production
│   └── .env
├── package.json       # Root config to run both concurrently
└── DEPLOYMENT.md      # Deployment instructions for Oracle Cloud
```

## 🚀 Getting Started

### 1️⃣ Installation
Install dependencies for **root**, **frontend**, and **backend** in one go:
```bash
npm install && npm run install:all
```

### 2️⃣ Development
Start **both** Frontend (Port 3000) and Backend (Port 3001) with one command:
```bash
npm run dev
```

### 3️⃣ Build for Production
```bash
npm run build
```
This builds the React app into `frontend/dist`. In production code, the Backend serves these static files.

---

## ☁️ Deployment
See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for full details on hosting this app on Oracle Cloud.

🎨 Branding & Assets

Navbar Logo: navBarLogo.png

Favicon: inknest.png

Primary Color: #1e3023

Background / Accent: #fdfbf8

Fonts: Playfair Display, Inter

📌 Scope of This Project

✔ Product showcase UI
✔ Category-based navigation
✔ API-driven data
✔ Media uploads via Cloudinary
✔ Contact form (EmailJS)

❌ Payments
❌ CMS dashboard
❌ User roles (beyond basic auth)

🧾 License

MIT License

👤 Author

Built by Rishabh Rathore

```

```
