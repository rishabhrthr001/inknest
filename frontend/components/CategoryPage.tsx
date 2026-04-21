import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import axios from "axios";
import { Category, Product } from "../types";
import API from "@/services/api";

const getOptimizedImage = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/q_auto,f_auto,w_800/");
};

const getCardWidth = (): string => {
  const w = window.innerWidth;
  if (w >= 1280) return "270px";
  if (w >= 1024) return "252px";
  if (w >= 768)  return "230px";
  if (w >= 640)  return "210px";
  return ""; 
};

/* --- Skeleton Component --- */
const CategorySkeleton = () => (
  <div className="pt-40 px-6 max-w-7xl mx-auto animate-pulse">
    <div className="h-4 w-32 bg-gray-200 rounded-full mb-8" />
    <div className="h-16 w-64 bg-gray-200 rounded-2xl mb-6" />
    <div className="h-6 w-full max-w-md bg-gray-200 rounded-lg mb-16" />
    <div className="flex flex-wrap justify-center gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-[250px] aspect-[4/5] bg-gray-100 rounded-[2rem]" />
      ))}
    </div>
  </div>
);

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [cardWidth, setCardWidth] = useState<string>(getCardWidth());

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setCardWidth(getCardWidth());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const observe = (el: HTMLElement | null, cb: () => void) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { cb(); io.disconnect(); } },
        { threshold: 0.01 }
      );
      io.observe(el);
      return () => io.disconnect();
    };
    if (!loading) {
      observe(headerRef.current, () => setHeaderVisible(true));
      observe(gridRef.current, () => setGridVisible(true));
    }
  }, [loading]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch Category First
        const catRes = await axios.get(`${API}/api/categories/${slug}`);
        const cat = catRes.data;
        setCategory(cat);

        // Fetch Products using the actual Category ID from the response (safer than using the slug)
        const prodRes = await axios.get(`${API}/api/products`, { 
          params: { categoryId: cat._id } 
        });
        
        setProducts(Array.isArray(prodRes.data) ? prodRes.data : []);
      } catch (err: any) {
        console.error("Fetch failed:", err);
        setError(err.message || "Something went wrong while loading products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    const scrollTarget = location.state?.scrollTo;
    if (scrollTarget) {
      setTimeout(() => {
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [location.state, loading]);

  if (loading) return <CategorySkeleton />;

  if (error || !category) {
    return (
      <div className="pt-40 text-center px-6">
        <h2 className="serif text-3xl mb-4 text-[#4a3728]">Oops! {error ? "Error loading products" : "Category not found"}</h2>
        <p className="text-[#4a3728]/60 mb-8">{error || "We couldn't find the collection you're looking for."}</p>
        <button onClick={() => navigate("/")} className="px-8 py-3 bg-[#4a3728] text-white rounded-full font-bold uppercase tracking-widest text-xs">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40 min-h-screen bg-[#fdfbf7]">
      <div className="px-6 max-w-7xl mx-auto">
        
        {/* BREADCRUMB */}
        <div className={`mb-12 flex items-center justify-between transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
           <button
            onClick={() => navigate("/")}
            className="group flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-[#4a3728]/40 hover:text-[#4a3728] transition"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Collections</span>
          </button>
          
          <div className="hidden md:flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-[#4a3728]/40">
            <span>Home</span>
            <ChevronRight size={10} />
            <span className="text-[#4a3728]">{category.name}</span>
          </div>
        </div>

        {/* HEADER */}
        <div 
          ref={headerRef}
          className={`mb-20 transition-all duration-1000 delay-200 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="text-[#c4966a] font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">
            Exclusive Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-bold serif text-[#1a1512] mb-6 tracking-tight">
            {category.name}
          </h1>
          <p className="text-[#4a3728]/60 text-lg md:text-xl max-w-2xl leading-relaxed italic">
            {category.description}
          </p>
        </div>

        {/* PRODUCTS GRID */}
        <div 
          ref={gridRef}
          className={`flex flex-wrap justify-center gap-6 md:gap-8 transition-all duration-1000 delay-400 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-10'}`}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product.slug || product._id}`)}
                className="group relative bg-white rounded-[2rem] overflow-hidden border border-[#4a3728]/5 shadow-[0_4px_20px_rgba(74,55,40,0.03)] cursor-pointer transition-all duration-500 hover:shadow-[0_20px_50px_rgba(74,55,40,0.1)] hover:-translate-y-2 active:scale-[0.98]"
                style={{
                  flex: `0 0 ${cardWidth || "calc(50% - 12px)"}`,
                  maxWidth: cardWidth || "calc(50% - 12px)",
                }}
              >
                {/* Image Container */}
                <div className="aspect-[4/5] overflow-hidden bg-[#f9f7f2]">
                  <img
                    src={getOptimizedImage(product.images[0])}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  
                  {/* Floating Action Hint */}
                  <div className="absolute bottom-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight size={18} className="text-[#4a3728]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-bold text-[#1a1512] mb-2 group-hover:text-[#c4966a] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-6 bg-[#4a3728]/20" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#4a3728]/40">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center w-full">
               <p className="serif text-xl text-[#4a3728]/40">No products available in this collection yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
