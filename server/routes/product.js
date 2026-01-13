import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import { uploadThree } from "../middleware/upload.js";

const router = express.Router();

router.post("/product", uploadThree, async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;

    if (!name || !description) {
      return res.status(400).json({ msg: "Name and description are required" });
    }

    if (!categoryId) {
      return res.status(400).json({ msg: "Category is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res
        .status(400)
        .json({ msg: "Invalid categoryId (must be ObjectId)" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "At least one image is required" });
    }

    const images = req.files.map((f) => f.path);

    const product = await Product.create({
      name,
      description,
      categoryId,
      images,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("PRODUCT CREATE ERROR:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.put("/product/:id", uploadThree, async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid product id" });
    }

    if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ msg: "Invalid categoryId" });
    }

    const update = {
      name,
      description,
      categoryId,
    };

    if (req.files && req.files.length > 0) {
      update.images = req.files.map((f) => f.path);
    }

    const product = await Product.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("PRODUCT UPDATE ERROR:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid product id" });
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error("PRODUCT DELETE ERROR:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;
