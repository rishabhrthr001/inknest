import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Category } from "../types";
import API from "@/services/api";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const isHome = location.pathname === "/";
  const isAbout = location.pathname === "/about";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/api/categories`);
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load navbar categories", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const NavButton = ({
    label,
    onClick,
    isActive,
  }: {
    label: string;
    onClick: () => void;
    isActive?: boolean;
  }) => (
    <button
      onClick={onClick}
      className={`relative group px-2 py-2 transition-colors duration-300 ${
        isActive ? "text-[#1e3023]" : "text-[#1e3023] hover:text-[#1e3023]"
      }`}
    >
      {label}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-[#1e3023] transition-all duration-500 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </button>
  );

  const goToCategory = (id: string) => {
    navigate(`/category/${id}`);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center p-4 md:p-6 pointer-events-none">
        <div
          className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-500
          backdrop-blur-md bg-white/60
          ${isScrolled ? "shadow-lg bg-white/80 py-2 md:py-3" : ""}`}
        >
          {/* LEFT */}
          <div className="flex items-center space-x-4">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleLogoClick}
            >
              <img
                src="/navBarLogoBg.png"
                alt="Logo"
                className="h-8 md:h-6 w-24"
              />
            </div>

            {/* MOBILE CATEGORY DROPDOWN */}
            <div className="relative md:hidden">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 text-sm text-[#1e3023]"
              >
                <span>Categories</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-4 w-48 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border z-50">
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => goToCategory(cat._id)}
                      className="w-full text-left px-5 py-3 text-sm hover:text-[#1e3023]"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-wide text-[#1e3023]">
            <NavButton
              label="Home"
              onClick={handleLogoClick}
              isActive={isHome}
            />

            {/* DESKTOP CATEGORIES */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 transition">
                <span>Categories</span>
                <ChevronDown size={14} />
              </button>

              <div
                className={`absolute left-0 mt-4 w-52 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border
                transition-all duration-300
                ${
                  isDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => goToCategory(cat._id)}
                    className="w-full text-left px-6 py-3 text-xs uppercase hover:text-[#1e3023]"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <NavButton
              label="About Us"
              onClick={() => navigate("/about")}
              isActive={isAbout}
            />

            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2 bg-[#1e3023] text-white rounded-full hover:opacity-90 transition"
            >
              Contact
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-[#1e3023]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* MOBILE SHEET */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl px-8 pt-6 pb-10 animate-slide-up text-[#1e3023]">
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold tracking-wide">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex flex-col space-y-6 text-lg">
              <button onClick={handleLogoClick}>Home</button>
              <button onClick={() => navigate("/about")}>About</button>
              <button onClick={() => scrollToSection("contact")}>
                Contact
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
