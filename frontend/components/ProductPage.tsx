import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft, ShoppingBag, X, Check } from "lucide-react";
import axios from "axios";
import { Product, Category } from "../types";
import API from "@/services/api";
import Loader from "./Loader";
import ContactForm from "./ContactForm";

const getOptimizedImage = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/q_auto,f_auto,w_1000/"); // High res
};

const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setIsLoaded(false);

        const productRes = await axios.get(`${API}/api/products/${slug}`);
        const prod: Product = productRes.data;
        setProduct(prod);

        const categoryRes = await axios.get(
          `${API}/api/categories/${prod.categoryId}`,
        );
        setCategory(categoryRes.data);

        window.scrollTo({ top: 0, left: 0 });
        setActiveImageIndex(0);
        
        // Trigger entry animations
        setTimeout(() => setIsLoaded(true), 100);
      } catch (err) {
        console.error("Failed to load product page", err);
        setProduct(null);
        setCategory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <Loader fullScreen />;
  if (!product || !category) return <div className="pt-40 text-center serif text-2xl">Product not found.</div>;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] pt-28 md:pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Back & Breadcrumb --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 md:mb-16">
          <button
            onClick={() => navigate(`/category/${category.slug || category._id}`, { state: { scrollTo: "products" } })}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#4a3728]/50 hover:text-[#4a3728] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Collections</span>
          </button>
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#4a3728]/30">
            <span className="text-[#4a3728]/60">{category.name}</span>
            <ChevronRight size={10} />
            <span className="text-[#4a3728]">{product.name}</span>
          </nav>
        </div>

        {/* --- MAIN CONTENT: Gallery(Sticky) + Details(Scrollable) --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* LEFT: GALLERY (STICKY) */}
          {/* width decreased to lg:w-[50%] for better balance */}
          <div className="w-full lg:w-[50%] lg:sticky lg:top-32 space-y-6">
            <div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-[#4a3728]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-crosshair"
            >
              <img
                src={getOptimizedImage(product.images[activeImageIndex])}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${isZooming ? "scale-150" : "scale-100"}`}
                style={{ transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }}
                draggable={false}
              />
              <div className="absolute top-6 left-6 w-8 h-px bg-black/10" />
              <div className="absolute top-6 left-6 h-8 w-px bg-black/10" />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImageIndex === idx ? "border-[#4a3728]" : "border-transparent opacity-50"}`}
                  >
                    <img src={getOptimizedImage(img)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS (SCROLLABLE) */}
          <div className="w-full lg:w-[50%] flex flex-col pt-2 lg:pb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c4966a] mb-3">
              {category.name}
            </span>

            <h1 className="serif text-4xl md:text-6xl font-bold text-[#1a1512] mb-8 leading-[1.1]">
              {product.name}
            </h1>

            {/* DESCRIPTION IS NOW FIRST AS REQUESTED */}
            <div className="bg-[#4a3728]/[0.02] border-l-2 border-[#c4966a]/20 p-8 mb-10">
              <p className="text-[#4a3728]/80 text-lg leading-[1.8] whitespace-pre-line italic">
                "{product.description}"
              </p>
            </div>

            {/* CTA BUTTON */}
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="group flex items-center justify-center gap-3 px-12 py-6 bg-[#4a3728] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:shadow-xl transition-all w-full sm:w-fit mb-12"
            >
              <ShoppingBag size={18} />
              <span>Request Quote</span>
            </button>

            {/* FEATURES GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 pt-10 border-t border-[#4a3728]/5">
              {[
                { t: "Custom Sizing", d: "Tailored to your dimensions" },
                { t: "Material Selection", d: "Standard to Luxury grades" },
                { t: "Bulk Logistics", d: "PAN-India door delivery" },
                { t: "Branding", d: "Gold Foiling, Embossing & more" }
              ].map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#4a3728]/5 flex items-center justify-center shrink-0">
                    <Check size={10} className="text-[#4a3728]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#4a3728] mb-1">{f.t}</h4>
                    <p className="text-xs text-[#4a3728]/50">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[9px] uppercase tracking-widest text-[#4a3728]/30 font-medium italic">
              * minimum order quantities apply based on customization complexity
            </p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-[#fdfbf7] w-full max-w-3xl rounded-[2rem] overflow-hidden animate-fade-scale shadow-2xl">
            <div className="flex items-center justify-between p-8 border-b border-[#4a3728]/5">
              <h3 className="serif text-2xl font-bold">Enquire for {product.name}</h3>
              <button onClick={() => setIsEnquiryModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full"><X size={24}/></button>
            </div>
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <ContactForm initialSubject={`Enquiry: ${product.name}`} isInModal />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
