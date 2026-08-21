import { Routes, Route } from "react-router-dom";
import { Phone, Check, X, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import About from "./components/About";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminCategories from "./admin/AdminCategoris";
import AdminProducts from "./admin/AdminProducts";
import AdminBanners from "./admin/AdminBanners";
import ProtectedRoute from "./context/ProtectedRoute";
import { Toaster } from "sonner";

function App() {
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    navigate(`/category/${slug}`);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col">
      <Toaster
        position="top-right"
        icons={{
          success: (
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600">
              <Check size={11} strokeWidth={3.5} />
            </div>
          ),
          error: (
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100 border border-red-200 text-red-600">
              <X size={11} strokeWidth={3.5} />
            </div>
          ),
          loading: (
            <Loader2 size={15} className="text-amber-500 animate-spin" />
          )
        }}
        toastOptions={{
          style: {
            background: "#fdfbf7",
            color: "#1a1512",
            border: "1px solid rgba(74, 55, 40, 0.08)",
            borderRadius: "18px",
            padding: "12px 18px",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "0 10px 30px rgba(74, 55, 40, 0.06)",
            fontFamily: "Inter, sans-serif"
          }
        }}
      />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<HomePage onCategoryClick={handleCategoryClick} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute>
                <AdminCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/banners"
            element={
              <ProtectedRoute>
                <AdminBanners />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col gap-4">
        {/* Call Button */}
        <a
          href="tel:+919289300497"
          className="bg-[#4a3728] text-[#fdfbf7] p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group border border-white/10"
          aria-label="Call Us"
        >
          <Phone size={22} />
          <span className="absolute right-full mr-4 bg-[#4a3728] text-white px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Call Us
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
  href="https://wa.me/919289300497"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group border border-white/10"
  aria-label="Contact on WhatsApp"
>
  <FaWhatsapp size={24} />
  <span className="absolute right-full mr-4 bg-[#25D366] text-white px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
    WhatsApp
  </span>
</a>
      </div>
    </div>
  );
}

export default App;
