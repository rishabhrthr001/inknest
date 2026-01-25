import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

/* ---------- CATEGORY STORAGE ---------- */
const categoryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "categories",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

/* ---------- PRODUCT STORAGE ---------- */
const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const categoryUpload = multer({ storage: categoryStorage });
const productUpload = multer({ storage: productStorage });

export const uploadSingle = categoryUpload.single("image");
export const uploadThree = productUpload.array("images", 3);
