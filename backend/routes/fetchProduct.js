import express from "express";
import Product from "../models/Product.js";
import Category from "../models/Category.js"; // Import Category model
import { isValidObjectId } from "mongoose";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const { categoryId } = req.query;

    const filter = {};

    if (categoryId && categoryId !== "all") {
      if (isValidObjectId(categoryId)) {
        filter.categoryId = categoryId;
      } else {
        // If not a valid ID, assume it's a slug
        const category = await Category.findOne({ slug: categoryId });
        if (category) {
          filter.categoryId = category._id;
        } else {
          // If category slug not found, return empty array immediately
          return res.status(200).json([]);
        }
      }
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let query = {};

    if (isValidObjectId(id)) {
      query = { _id: id };
    } else {
      query = { slug: id };
    }

    const product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({ msg: "Invalid product identifier" });
  }
});

export default router;
