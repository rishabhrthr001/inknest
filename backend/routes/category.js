import express from "express";
import Category from "../models/Category.js";
import { uploadSingle } from "../middleware/upload.js";

import { slugify } from "../utils/slugify.js";

const router = express.Router();

router.post("/category", uploadSingle, async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({ msg: "Category already exists" });
    }

    const category = await Category.create({
      name,
      description,
      image: req.file.path,
      slug: slugify(name),
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/category/:id", uploadSingle, async (req, res) => {
  try {
    const { name, description } = req.body;

    const updateData = {
      name,
      description,
    };

    if (name) {
      updateData.slug = slugify(name);
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ msg: "Invalid category id" });
  }
});

router.delete("/category/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json({ msg: "Category deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid category id" });
  }
});

export default router;
