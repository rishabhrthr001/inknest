import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import axios from "axios";
import { Category, Product } from "../types";
import API from "@/services/api";
import Loader from "./Loader";

const getOptimizedImage = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/q_auto,f_auto,w_800/");
};

/* Card width breakpoints — matches scoped style */
const getCardWidth = (): string => {
  const w = window.innerWidth;
  if (w >= 1280) return "270px";
  if (w >= 1024) return "252px";
  if (w >= 768)  return "230px";
  if (w >= 640)  return "210px";
  return ""; // mobile: handled by CSS calc below
};

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [cardWidth, setCardWidth] = useState<string>(getCardWidth());

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  /* ── Responsive card width ── */
  useEffect(() => {
    const update = () => setCardWidth(getCardWidth());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Scroll-reveal ── */
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
    const c1 = observe(headerRef.current, () => setHeaderVisible(true));
    const c2 = observe(gridRef.current, () => setGridVisible(true));
    return () => { c1?.(); c2?.(); };
  }, [loading]);

  /* ── Data fetch ── */
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoryRes, productsRes] = await Promise.all([
          axios.get(`${API}/api/categories/${id}`),
          axios.get(`${API}/api/products`, { params: { categoryId: id } }),
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
  }, [id]);

  useEffect(() => {
    const scrollTarget = location.state?.scrollTo;
    if (scrollTarget) {
      setTimeout(() => {
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  if (loading) return <Loader fullScreen />;

  if (!category) {
    return (
      <div className="pt-32 text-center text-xl serif text-[#4a3728]">
        Category not found.
      </div>
    );
  }

  /* On mobile, cards fill 50% of the row minus the gap */
  const isMobile = !cardWidth; // empty string = mobile
  const cardStyle: React.CSSProperties = isMobile
    ? { width: "calc(50% - 8px)", flexShrink: 0 }
    : { width: cardWidth, flexShrink: 0 };

  return (
    <div className="min-h-screen bg-[#fdfbf7]">

      {/* ─── HEADER ─── */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 pt-32 md:pt-40 pb-10 md:pb-12">
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* ← Back */}
          <button
            onClick={() => navigate("/", { state: { scrollBack: "categories" } })}
            className="inline-flex items-center gap-2 mb-7 md:mb-9 text-[10px] font-bold tracking-[0.2em] uppercase text-[#4a3728]/50 border border-[#4a3728]/15 rounded-full px-4 py-1.5 hover:text-[#4a3728] hover:border-[#4a3728]/35 transition-all duration-300 cursor-pointer bg-transparent"
          >
            <ArrowLeft size={11} />
            All Collections
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-[#4a3728] mb-4">
            <span>Products</span>
            <ChevronRight size={9} className="text-[#4a3728]/30" />
            <span className="text-[#4a3728]/35">{category.name}</span>
          </nav>

          {/* Title */}
          <h1 className="serif text-4xl md:text-6xl lg:text-[5.5rem] font-bold text-[#1a1512] leading-none tracking-tight mb-5">
            {category.name}
          </h1>

          {/* Gradient rule */}
          <div
            className="h-[3px] rounded-full mb-5"
            style={{
              width: headerVisible ? "5rem" : "0",
              background: "linear-gradient(90deg, #4a3728 0%, #c4966a 60%, transparent 100%)",
              transition: "width 1.1s cubic-bezier(0.22,1,0.36,1) 0.25s",
            }}
          />

          {/* Description */}
          <p className="text-[#4a3728]/55 text-sm md:text-base leading-[1.8] max-w-2xl mb-6">
            {category.description}
          </p>

          {/* Count pill */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4a3728]/10 bg-[#4a3728]/[0.04] text-[11px] font-semibold tracking-wide text-[#4a3728]/50">
            <span className="w-[6px] h-[6px] rounded-full bg-[#c4966a]"
              style={{ boxShadow: "0 0 6px rgba(196,150,106,0.65)" }} />
            {products.length} {products.length === 1 ? "Product" : "Products"} Available
          </span>
        </div>

        <div className="mt-9 md:mt-11 h-px bg-gradient-to-r from-[#4a3728]/10 via-[#4a3728]/5 to-transparent" />
      </section>

      {/* ─── PRODUCTS ─── */}
      <section id="products" className="max-w-7xl mx-auto px-5 md:px-10 pb-24 md:pb-36">

        {/*
          flex-wrap + justify-center:
          Any number of fixed-width cards always centres in the row.
          Partial rows (e.g. 3 of 4) sit centred, not left-stuck.
        */}
        <div
          ref={gridRef}
          className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8"
        >
          {products.map((product, idx) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product.slug || product._id}`)}
              className="group cursor-pointer flex flex-col"
              style={{
                ...cardStyle,
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${idx * 75}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${idx * 75}ms`,
              }}
            >
              {/* ── IMAGE ── */}
              <div
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#ede8e0] mb-4 w-full"
                style={{
                  boxShadow: "0 2px 8px rgba(74,55,40,0.07), 0 8px 28px rgba(74,55,40,0.08)",
                  transition: "box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "0 6px 20px rgba(74,55,40,0.14), 0 24px 56px rgba(74,55,40,0.17)";
                  el.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "0 2px 8px rgba(74,55,40,0.07), 0 8px 28px rgba(74,55,40,0.08)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <img
                  src={getOptimizedImage(product.images?.[0])}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.08]"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end p-3 md:p-4 bg-gradient-to-t from-[#2b1f14]/75 via-[#2b1f14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fdfbf7] text-[#4a3728] text-[9px] md:text-[10px] font-bold tracking-widest uppercase translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <ArrowUpRight size={10} />
                    View Details
                  </span>
                </div>

                {/* Number badge */}
                <div className="absolute top-2.5 right-2.5 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/12 backdrop-blur border border-white/20 flex items-center justify-center text-[8px] md:text-[9px] font-bold text-white/90 tracking-wide">
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </div>

              {/* ── INFO ── */}
              <div className="flex-1 px-0.5">
                <h3 className="serif font-bold text-[#1a1512] text-sm md:text-base leading-snug mb-1.5 group-hover:text-[#4a3728] transition-colors duration-300 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-[10px] md:text-xs text-[#4a3728]/45 leading-relaxed line-clamp-2 mb-3">
                  {product.description}
                </p>

                {/* Underline bar */}
                <div className="relative h-px overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-[#4a3728]/8" />
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: "1.25rem",
                      background: "linear-gradient(90deg, #4a3728, #c4966a)",
                      transition: "width 0.55s cubic-bezier(0.22,1,0.36,1)",
                    }}
                    ref={el => {
                      if (!el) return;
                      const card = el.closest(".group");
                      if (!card) return;
                      const on  = () => (el.style.width = "100%");
                      const off = () => (el.style.width = "1.25rem");
                      card.addEventListener("mouseenter", on);
                      card.addEventListener("mouseleave", off);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-[#4a3728]/25">
            <span className="text-5xl mb-5 opacity-30">✦</span>
            <p className="serif italic text-lg">More products coming soon…</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
