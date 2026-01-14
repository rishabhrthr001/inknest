import React from "react";
import { Facebook, Instagram, Twitter, Lock, Mail, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const socialLinks = [
    { icon: <Facebook size={16} />, label: "Facebook" },
    { icon: <Instagram size={16} />, label: "Instagram" },
    { icon: <Twitter size={16} />, label: "Twitter" },
  ];

  const isHome = location.pathname === "/";

  const scrollOrNavigate = (id: string) => {
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 600);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const handleScroll = (smooth: boolean = true) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  return (
    <footer className="bg-[#4a3728] text-[#fdfbf7] pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="/Inknestlogo.png"
              alt="Inknest"
              className="w-48 h-auto mb-6"
            />

            <p className="text-[#fdfbf7]/60 text-sm leading-relaxed mb-6">
              Premium manufacturing house specializing in high-quality packaging
              and stationery solutions for global brands.
            </p>

            {/* CONTACT + CTA */}
            <div className="space-y-3 mb-8 text-sm text-[#fdfbf7]/70">
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <a
                  href="mailto:contact@inknest.com"
                  className="hover:text-[#fdfbf7] transition-colors"
                >
                  contact@inknest.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={14} />
                <a
                  href="tel:+919811544614"
                  className="hover:text-[#fdfbf7] transition-colors"
                >
                  +91-9811544614
                </a>
              </div>

              <button
                onClick={() => scrollOrNavigate("contact")}
                className="mt-4 inline-block px-6 py-3 bg-[#fdfbf7] text-[#4a3728] rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition"
              >
                Request a Bulk Quote
              </button>
            </div>

            {/* SOCIALS */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <div
                  key={social.label}
                  className="w-10 h-10 rounded-full border border-[#fdfbf7]/20 flex items-center justify-center hover:bg-[#fdfbf7] hover:text-[#4a3728] cursor-pointer transition-all"
                  title={social.label}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm text-[#fdfbf7]/60">
              <li>
                <button
                  onClick={handleHomeClick}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollOrNavigate("categories")}
                  className="hover:text-white transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollOrNavigate("contact")}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">
              Why Choose Us
            </h4>

            <ul className="space-y-4 text-sm text-[#fdfbf7]/60">
              <li>• 10+ Years Manufacturing Experience</li>
              <li>• Bulk Orders & Custom Solutions</li>
              <li>• PAN-India & Export Supply</li>
              <li>• OEM & Private Label Support</li>
              <li>• Strict Quality Control</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[#fdfbf7]/10 flex flex-col md:flex-row justify-between items-center text-xs text-[#fdfbf7]/40 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <p>© 2026 Inknest | A Brand by Shree Bankey Bihari Enterprises</p>
            <button
              onClick={() => {
                handleScroll();
                navigate("/login");
              }}
              className="flex items-center space-x-1 hover:text-white transition-colors opacity-40 hover:opacity-100"
            >
              <Lock size={10} />
              <span>Admin</span>
            </button>
          </div>

          <div className="flex space-x-8">
            <button
              onClick={() => navigate("/privacy")}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate("/terms")}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
