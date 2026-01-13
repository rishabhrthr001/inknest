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

📁 Project Structure

```
inknest/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   └── .env
```

├── backend/
│ ├── src/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ ├── server.js
│ └── .env
│
└── README.md

🚀 Getting Started

1️⃣ Clone the repository

```
git clone https://github.com/rishabhrthr001/inknest.git
cd inknest
```

⚙️ Backend Setup
📦 Install dependencies

```
cd backend
npm install
```

🔐 Backend .env structure

Create a .env file inside the backend folder:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<db_name>
JWT_SECRET=your_jwt_secret
PORT=3000

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloudname
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

▶️ Run backend server

```
npm run dev
or
npm start
```

Backend will run on:

```

http://localhost:3000
```

🎨 Frontend Setup
📦 Install dependencies

```
cd ../frontend

npm install
```

🔐 Frontend .env structure

Create a .env file inside the frontend folder:

```
VITE_API_URL=your backend hosted url

VITE_EMAILJS_SERVICE_ID=service_tmtu23f
VITE_EMAILJS_TEMPLATE_ID=template_jbsyaz4
VITE_EMAILJS_PUBLIC_KEY=TLMkuF9GHIYu5THNF
```

▶️ Run frontend

```
npm run dev
```

Frontend will run on:

```

http://localhost:5173
```

🔄 Running Both Together

Open two terminals:

Terminal 1 (Backend)

```
cd backend
npm run dev
```

Terminal 2 (Frontend)

```
cd frontend
npm run dev
```

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
