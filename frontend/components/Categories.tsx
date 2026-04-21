import React, { useEffect, useRef, useState } from "react";
import { Category } from "../types";
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

  const { ref: headingRef, visible: headingVisible } =
    useScrollReveal<HTMLDivElement>(0.2);
  const { ref: gridRef, visible: gridVisible } =
    useScrollReveal<HTMLDivElement>(0.1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/api/categories`);
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load categories", err);
        setData([]);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (id: string) => {
    window.scrollTo({ top: 0, left: 0 });
    requestAnimationFrame(() => onCategorySelect(id));
  };

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

      {/* ── PRODUCT GRID ── */}
      <div ref={gridRef} className="cat-grid">
        {data.map((category, idx) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category.slug || category._id)}
            className={`cat-card focus:outline-none ${
              gridVisible ? "cat-card-reveal" : "cat-card-hidden"
            }`}
            style={
              gridVisible
                ? { transitionDelay: `${idx * 120}ms` }
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
                {String(idx + 1).padStart(2, "0")}
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
        ))}
      </div>
    </section>
  );
};

export default Categories;
