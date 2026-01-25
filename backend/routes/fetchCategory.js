import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

import { isValidObjectId } from "mongoose";

router.get("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let query = {};

    if (isValidObjectId(id)) {
      query = { _id: id };
    } else {
      query = { slug: id };
    }

    const category = await Category.findOne(query);

    if (!category) {
      // Fallback: If searching by slug failed, try basic name match as last resort
      if (!isValidObjectId(id)) {
        const catByName = await Category.findOne({ name: { $regex: new RegExp(`^${id}$`, 'i') } });
        if (catByName) return res.json(catByName);
      }
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    res.status(400).json({ msg: "Invalid category identifier" });
  }
});

export default router;
