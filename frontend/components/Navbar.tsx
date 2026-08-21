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

  const carryBags = categories.filter((c) => c.type !== "stickers");
  const stickers = categories.filter((c) => c.type === "stickers");

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
      className="relative group px-2 py-2 transition-colors duration-300 text-[#1a1512] font-semibold tracking-wide hover:text-[#c4966a]"
    >
      {label}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-[#c4966a] transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"
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
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-center p-4 md:p-6 pointer-events-none transition-all duration-500
        ${(!isHome || isScrolled) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}
      `}>
        <div
          className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-500
          backdrop-blur-xl border border-white/20
          ${(!isHome || isScrolled) 
            ? "shadow-xl bg-white/35 border-[#4a3728]/10 py-2 md:py-3" 
            : "shadow-md bg-white/15 mb-4"}
          `}
        >
          {/* MOBILE LEFT: Hamburger + Logo OR DESKTOP LEFT: Logo only */}
          <div className="flex items-center space-x-4">
            {/* Hamburger (Mobile Only, Leftmost) */}
            <button
              className="md:hidden text-[#1a1512] hover:opacity-80 transition cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Logo */}
            <div
              className="flex items-center cursor-pointer select-none"
              onClick={handleLogoClick}
            >
              <span className="text-xl md:text-lg font-bold tracking-widest text-[#1a1512] serif">
                INKNEST
              </span>
            </div>
          </div>

          {/* DESKTOP NAV (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-wide text-[#1a1512]">
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
                className={`absolute left-0 mt-4 w-56 bg-white/90 backdrop-blur-md
                rounded-2xl shadow-xl border
                overflow-hidden py-2
                transition-all duration-300
                ${isDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                  }`}
              >
                {carryBags.length > 0 && (
                  <>
                    <div className="px-6 py-1.5 text-[9px] uppercase tracking-widest font-extrabold text-[#1a1512]/50 bg-[#4a3728]/5 mb-1">
                      Carry Bags
                    </div>
                    {carryBags.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => goToCategory(cat.slug || cat._id)}
                        className="group relative w-full text-left px-6 py-3 text-xs uppercase flex items-center transition-all duration-300 ease-out text-[#1a1512] font-semibold hover:bg-[#4a3728]/5"
                      >
                        <span className="absolute left-0 top-0 h-full w-[2px] bg-[#c4966a] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          {cat.name}
                        </span>
                      </button>
                    ))}
                  </>
                )}
                {stickers.length > 0 && (
                  <>
                    <div className="px-6 py-1.5 text-[9px] uppercase tracking-widest font-extrabold text-[#1a1512]/50 bg-[#4a3728]/5 mt-2 mb-1">
                      Stickers
                    </div>
                    {stickers.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => goToCategory(cat.slug || cat._id)}
                        className="group relative w-full text-left px-6 py-3 text-xs uppercase flex items-center transition-all duration-300 ease-out text-[#1a1512] font-semibold hover:bg-[#4a3728]/5"
                      >
                        <span className="absolute left-0 top-0 h-full w-[2px] bg-[#c4966a] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          {cat.name}
                        </span>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>

            <NavButton
              label="About Us"
              onClick={() => navigate("/about")}
              isActive={isAbout}
            />

            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2 bg-[#4a3728] text-white rounded-full hover:opacity-90 transition"
            >
              Contact
            </button>
          </div>

          {/* MOBILE RIGHT: Category Dropdown (Mobile Only) */}
          <div className="relative md:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 text-sm text-[#1a1512] font-semibold cursor-pointer"
            >
              <span>Categories</span>
              <ChevronDown
                size={14}
                className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-4 w-52 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border z-50 overflow-hidden py-2 text-[#1a1512]">
                {carryBags.length > 0 && (
                  <>
                    <div className="px-5 py-1.5 text-[9px] uppercase tracking-wider font-extrabold text-[#1a1512]/50 bg-[#4a3728]/5 mb-1">
                      Carry Bags
                    </div>
                    {carryBags.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => goToCategory(cat.slug || cat._id)}
                        className="w-full text-left px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-[#4a3728]/5 hover:translate-x-1"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </>
                )}
                {stickers.length > 0 && (
                  <>
                    <div className="px-5 py-1.5 text-[9px] uppercase tracking-wider font-extrabold text-[#1a1512]/50 bg-[#4a3728]/5 mt-2 mb-1">
                      Stickers
                    </div>
                    {stickers.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => goToCategory(cat.slug || cat._id)}
                        className="w-full text-left px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-[#4a3728]/5 hover:translate-x-1"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE SHEET */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-xl rounded-t-3xl border-t border-white/20 shadow-2xl px-8 pt-6 pb-10 animate-slide-up text-[#4a3728]">
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
