import mongoose from "mongoose";
import dotenv from "dotenv";
import slugify from "slugify";
import Product from "./models/Product.js";

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to DB");

    const products = await Product.find({
      $or: [{ slug: { $exists: false } }, { slug: null }, { slug: "" }],
    });

    console.log(`Found ${products.length} products without slug`);

    for (const product of products) {
      const newSlug = slugify(product.name, {
        lower: true,
        strict: true,
      });

      product.slug = newSlug;
      await product.save();

      console.log(`Updated: ${product.name} -> ${newSlug}`);
    }

    console.log("All missing product slugs added ✅");
    process.exit(0);
  } catch (err) {
    console.error("Slug migration failed ❌", err);
    process.exit(1);
  }
}

run();
