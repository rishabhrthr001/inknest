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

router.get("/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    res.status(400).json({ msg: "Invalid category id" });
  }
});

export default router;
