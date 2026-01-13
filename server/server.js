import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/auth.js";
import cloudinary from "./config/cloudinary.js";
import categoryRoutes from "./routes/category.js";
import fetchCatRoute from "./routes/fetchCategory.js";
import productRoute from "./routes/product.js";
import fetchProRoute from "./routes/fetchProduct.js";

dotenv.config();

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
