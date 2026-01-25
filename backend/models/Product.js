import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String], // Cloudinary URLs
      validate: {
        validator: function (arr) {
          return arr.length <= 3;
        },
        message: "Maximum 3 images allowed",
      },
      required: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ categoryId: 1, createdAt: -1 });
productSchema.index({ slug: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
