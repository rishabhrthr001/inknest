import React, { useEffect, useRef, useState } from "react";
import { Category, Banner } from "../types";
import axios from "axios";
import API from "@/services/api";
import { ArrowUpRight } from "lucide-react";

// Optimize Cloudinary images
const getOptimizedImage = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/q_auto,f_auto,w_600/");
};

interface CategoriesProps {
  onCategorySelect: (id: string) => void;
}

// Custom hook – fires once when element enters viewport
function useScrollReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const [data, setData] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);

  const { ref: headingRef, visible: headingVisible } =
    useScrollReveal<HTMLDivElement>(0.2);
  const { ref: gridRef, visible: gridVisible } =
    useScrollReveal<HTMLDivElement>(0.1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, banRes] = await Promise.all([
          axios.get(`${API}/api/categories`),
          axios.get(`${API}/api/banners`),
        ]);
        setData(Array.isArray(catRes.data) ? catRes.data : []);
        setBanners(Array.isArray(banRes.data) ? banRes.data : []);
      } catch (err) {
        console.error("Failed to load categories/banners", err);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (id: string) => {
    window.scrollTo({ top: 0, left: 0 });
    requestAnimationFrame(() => onCategorySelect(id));
  };

  const carryBags = data.filter((c) => c.type !== "stickers");
  const stickers = data.filter((c) => c.type === "stickers");

  const renderCategoryCard = (category: Category, globalIdx: number) => {
    return (
      <button
        id={`category-${category.slug || category._id}`}
        key={category._id}
        onClick={() => handleCategoryClick(category.slug || category._id)}
        className={`cat-card focus:outline-none ${
          gridVisible ? "cat-card-reveal" : "cat-card-hidden"
        }`}
        style={
          gridVisible
            ? { transitionDelay: `${globalIdx * 120}ms` }
            : undefined
        }
      >
        {/* ── IMAGE WRAPPER ── */}
        <div className="cat-img-wrap">
          <img
            src={getOptimizedImage(category.image)}
            alt={category.name}
            className="cat-img"
            loading="lazy"
            draggable={false}
          />

          {/* Gradient overlay – always visible, deepens on hover */}
          <div className="cat-gradient" />

          {/* Hover reveal overlay */}
          <div className="cat-hover-overlay">
            <span className="cat-explore-btn">
              <ArrowUpRight size={18} />
              Explore
            </span>
          </div>

          {/* Index badge */}
          <span className="cat-index-badge">
            {String(globalIdx + 1).padStart(2, "0")}
          </span>
        </div>

        {/* ── CARD BODY ── */}
        <div className="cat-card-body">
          <div className="cat-card-text">
            <h3 className="cat-card-title serif">{category.name}</h3>
            <p className="cat-card-desc">{category.description}</p>
          </div>

          {/* Animated underline */}
          <div className="cat-underline-wrap">
            <span className="cat-underline-track" />
            <span className="cat-underline-fill" />
          </div>
        </div>
      </button>
    );
  };

  const carryBagsBanner = banners.find((b) => b.key === "carry_bags_banner")?.image || "/Paperbag.webp";
  const stickersBanner = banners.find((b) => b.key === "stickers_banner")?.image || "/Stickers.webp";

  return (
    <section className="cat-section">
      {/* ── BACKGROUND TEXTURE ── */}
      <div className="cat-bg-grain" aria-hidden />

      {/* ── SECTION HEADER ── */}
      <div
        ref={headingRef}
        className={`cat-header ${headingVisible ? "cat-reveal" : "cat-hidden"}`}
      >
        {/* Decorative rule */}
        <div className="cat-rule-wrap">
          <span className="cat-rule" />
          <span className="cat-eyebrow">Our Collections</span>
          <span className="cat-rule" />
        </div>

        <h2 className="cat-title serif">
          Crafted for Every&nbsp;
          <em className="cat-title-accent">Brand Story</em>
        </h2>

        <p className="cat-subtitle">
          Premium packaging & print solutions — tailored to make your brand
          impossible to ignore.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {/* ── CARRY BAGS SECTION ── */}
        <div className={`space-y-12 ${carryBags.length === 0 ? 'hidden' : ''}`}>
          {/* Banner Header (Full-bleed edge-to-edge width breakout) */}
          <div className="w-screen relative left-1/2 -translate-x-1/2 h-28 sm:h-36 md:h-40 overflow-hidden shadow-sm group border-y border-[#4a3728]/5">
            <img 
              src={carryBagsBanner} 
              alt="Carry Bags Collection" 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent flex items-center">
              <div className="max-w-7xl mx-auto w-full px-6">
                <span className="text-[9px] tracking-[0.35em] font-extrabold text-[#c4966a] uppercase mb-1 block">Our Collection</span>
                <h3 className="text-xl sm:text-3xl font-bold serif text-[#fdfbf7] tracking-wider uppercase mb-1">Carry Bags</h3>
                <p className="text-[10px] sm:text-xs text-[#fdfbf7]/80 font-light max-w-xl hidden sm:block">
                  Eco-Friendly & Luxurious Packaging — tailored solutions for retail, events, and corporate branding.
                </p>
              </div>
            </div>
          </div>

          <div ref={gridRef} className="cat-grid">
            {carryBags.map((category, idx) => renderCategoryCard(category, idx))}
          </div>
        </div>

        {/* ── STICKERS SECTION ── */}
        <div className={`space-y-12 pt-12 border-t border-[#4a3728]/5 ${stickers.length === 0 ? 'hidden' : ''}`}>
          {/* Banner Header (Full-bleed edge-to-edge width breakout) */}
          <div className="w-screen relative left-1/2 -translate-x-1/2 h-28 sm:h-36 md:h-40 overflow-hidden shadow-sm group border-y border-[#4a3728]/5">
            <img 
              src={stickersBanner} 
              alt="Custom Stickers Collection" 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent flex items-center">
              <div className="max-w-7xl mx-auto w-full px-6">
                <span className="text-[9px] tracking-[0.35em] font-extrabold text-[#c4966a] uppercase mb-1 block">Our Collection</span>
                <h3 className="text-xl sm:text-3xl font-bold serif text-[#fdfbf7] tracking-wider uppercase mb-1">Stickers</h3>
                <p className="text-[10px] sm:text-xs text-[#fdfbf7]/80 font-light max-w-xl hidden sm:block">
                  Vibrant Stickers & Product Labels — weatherproof and scratch-resistant custom branding elements.
                </p>
              </div>
            </div>
          </div>

          <div className="cat-grid">
            {stickers.map((category, idx) => 
              renderCategoryCard(category, carryBags.length + idx)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
