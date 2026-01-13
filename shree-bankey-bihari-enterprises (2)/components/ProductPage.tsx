import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft, ShoppingBag } from "lucide-react";
import axios from "axios";
import { Product, Category } from "../types";
import API from "@/services/api";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  /* ---------- FETCH PRODUCT + CATEGORY ---------- */
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        // 1️⃣ Fetch product
        const productRes = await axios.get(`${API}/api/products/${id}`);

        const prod: Product = productRes.data;
        setProduct(prod);

        // 2️⃣ Fetch category using product.categoryId
        const categoryRes = await axios.get(
          `${API}/api/categories/${prod.categoryId}`
        );

        setCategory(categoryRes.data);

        window.scrollTo({ top: 0, left: 0 });
        setActiveImageIndex(0);
      } catch (err) {
        console.error("Failed to load product page", err);
        setProduct(null);
        setCategory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-40 text-center serif text-2xl">Loading product...</div>
    );
  }

  if (!product || !category) {
    return (
      <div className="pt-40 text-center serif text-2xl">Product not found.</div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPos({
      x: Math.min(Math.max(x, 0), 100),
      y: Math.min(Math.max(y, 0), 100),
    });
  };

  return (
    <div className="pt-40 pb-32">
      <div className="px-6 max-w-7xl mx-auto">
        {/* ---------- BREADCRUMB ---------- */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate(`/category/${category._id}`)}
            className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-[#24452d]/60 hover:text-[#8b5e3c] transition"
          >
            <ArrowLeft size={16} />
            <span>Back to {category.name}</span>
          </button>

          <nav className="hidden md:flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-bold text-[#1e3023]">
            <span>Products</span>
            <ChevronRight size={12} />
            <span className="text-[#24452d]/60">{category.name}</span>
            <ChevronRight size={12} />
            <span className="text-[#4a3728]">{product.name}</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* ---------- IMAGES ---------- */}
          <div className="lg:w-1/2 space-y-6">
            <div
              className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-[#4a3728]/5 shadow-sm cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
            >
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZooming ? "scale-150" : "scale-100"
                }`}
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
                draggable={false}
              />
            </div>

            {/* THUMBNAILS */}
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-24 aspect-square rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? "border-[#8b5e3c]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ---------- DETAILS ---------- */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <span className="text-[#1e3023] font-bold text-xs uppercase tracking-[0.3em] mb-4">
              {category.name}
            </span>

            <h1 className="text-4xl md:text-6xl font-bold serif mb-8">
              {product.name}
            </h1>

            <p className="text-[#4a3728]/70 text-lg leading-relaxed mb-10">
              {product.description}
            </p>

            <button
              onClick={() => navigate("/", { state: { scrollTo: "contact" } })}
              className="px-10 py-5 bg-[#1e3023] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#24452d] transition-all flex items-center space-x-3 w-fit"
            >
              <ShoppingBag size={16} />
              <span>Enquire for Bulk</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
