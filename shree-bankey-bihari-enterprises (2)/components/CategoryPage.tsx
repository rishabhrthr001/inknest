import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { Category, Product } from "../types";
import API from "@/services/api";

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Fetch category
        const categoryRes = await axios.get(`${API}/api/categories/${id}`);
        setCategory(categoryRes.data);

        // 2️⃣ Fetch products in that category
        const productsRes = await axios.get(`${API}/api/products`, {
          params: { categoryId: id },
        });

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
  }, [id]);

  if (loading) {
    return (
      <div className="pt-40 text-center serif text-2xl">
        Loading category...
      </div>
    );
  }

  if (!category) {
    return (
      <div className="pt-40 text-center serif text-2xl">
        Category not found.
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32">
      {/* HEADER */}

      <section id="category" className="px-6 max-w-7xl mx-auto mb-24">
        <button
          onClick={() =>
            navigate("/", {
              state: { scrollBack: "categories" },
            })
          }
          className="mb-12 text-xs uppercase tracking-widest font-bold text-[#1e3023] hover:text-[#4a3728]"
        >
          ← Back to Categories
        </button>
        <div className="border-b border-[#4a3728]/10 pb-12">
          <nav className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-bold text-[#1e3023] mb-6">
            <span>Products</span>
            <ChevronRight size={12} />
            <span className="text-[#24452d]/40">{category.name}</span>
          </nav>

          <h1 className="text-5xl md:text-7xl font-bold serif mb-6">
            {category.name}
          </h1>

          <p className="text-[#4a3728]/60 text-lg">{category.description}</p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl aspect-square mb-6 bg-white shadow-sm border">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <h3 className="text-2xl font-bold serif mb-2">{product.name}</h3>

              <p className="text-[#4a3728]/60 text-sm line-clamp-2">
                {product.description}
              </p>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 text-[#4a3728]/40 serif italic">
            More products in this category coming soon...
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
