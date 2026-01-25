import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
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

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get("/check", (req, res) => {
  res.status(200).send("SERVER OK");
});

// Enable gzip compression
app.use(compression());

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

// API Routes
app.use("/auth", authRoutes);
app.use("/add", categoryRoutes);
app.use("/api", fetchCatRoute);
app.use("/api", fetchProRoute);
app.use("/add", productRoute);

// Serve static files in production


if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../frontend/dist"), {
      maxAge: "30d", // Cache static assets for 30 days
      immutable: true, // Content will not change
    })
  );

  // Handle React Router - serve index.html for all non-API routes
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
