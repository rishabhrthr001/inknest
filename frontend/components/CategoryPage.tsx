import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { Category, Product } from "../types";
import API from "@/services/api";
import Loader from "./Loader";

const getOptimizedImage = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/q_auto,f_auto,w_800/");
};

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("CATEGORY PARAM:", slug);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [categoryRes, productsRes] = await Promise.all([
          axios.get(`${API}/api/categories/${slug}`),
          axios.get(`${API}/api/products`, { params: { categoryId: slug } }),
        ]);

        setCategory(categoryRes.data);
        setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
      } catch (err) {
        console.error("Failed to load category page", err);
        setCategory(null);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <Loader fullScreen />;

  if (!category) {
    return (
      <div className="pt-32 text-center serif text-xl">Category not found.</div>
    );
  }

  return (
    <div className="pt-32 md:pt-40 pb-24 md:pb-32">
      {/* HEADER */}
      <section className="px-4 md:px-6 max-w-7xl mx-auto mb-16 md:mb-24">
        <button
          onClick={() =>
            navigate("/", {
              state: { scrollBack: "categories" },
            })
          }
          className="mb-8 md:mb-12 text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#4a3728]"
        >
          ← Back to Categories
        </button>

        <div className="border-b border-[#4a3728]/10 pb-8 md:pb-12">
          <nav className="flex items-center space-x-2 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-[#4a3728] mb-4 md:mb-6">
            <span>Products</span>
            <ChevronRight size={10} />
            <span className="text-[#4a3728]/40">{category.name}</span>
          </nav>

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold serif mb-4 md:mb-6">
            {category.name}
          </h1>

          <p className="text-[#4a3728]/60 text-sm md:text-lg max-w-3xl whitespace-pre-line">
            {category.description}
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10 lg:gap-12">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() =>
                navigate(`/product/${product.slug || product._id}`)
              }
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl aspect-square mb-4 md:mb-6 bg-white shadow-sm border">
                <img
                  src={getOptimizedImage(product.images?.[0])}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <h3 className="text-sm md:text-xl lg:text-2xl font-bold serif mb-1 md:mb-2">
                {product.name}
              </h3>

              <p className="text-[#4a3728]/60 text-xs md:text-sm line-clamp-2 whitespace-pre-line">
                {product.description}
              </p>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16 md:py-20 text-[#4a3728]/40 serif italic">
            More products in this category coming soon...
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
