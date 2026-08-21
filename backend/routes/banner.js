import express from "express";
import Banner from "../models/Banner.js";
import { uploadSingle } from "../middleware/upload.js";

const router = express.Router();

// GET all banners
router.get("/banners", async (req, res) => {
  try {
    const banners = await Banner.find({});
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// UPDATE a banner by key
router.put("/banner/:key", uploadSingle, async (req, res) => {
  try {
    const { key } = req.params;
    
    const updateData = {};
    if (req.file) {
      updateData.image = req.file.path;
    } else if (req.body.image) {
      updateData.image = req.body.image;
    } else {
      return res.status(400).json({ msg: "No image file or URL provided" });
    }

    const banner = await Banner.findOneAndUpdate(
      { key },
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
