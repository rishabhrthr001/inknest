import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroProps {
  onScrollTo: (id: string) => void;
}

const HERO_SLIDES = [
  {
    image: "/Paperbag.webp",
    mobileImage: "/mobile-bg1.webp",
    title: "Precision in Every Print",
    subtitle:
      "Elevating your brand with premium paper bags and packaging solutions.",
    overlay: "bg-black/55",
  },
  {
    image: "/Stickers.webp",
    mobileImage: "/mobile-bg2.webp",
    title: "Stickers That Speak",
    subtitle:
      "High-quality custom stickers designed to make your brand unforgettable.",
    overlay: "bg-black/55",
  },
  {
    image: "/Stationery.webp",
    mobileImage: "/mobile-bg3.webp",
    title: "Complete Branding Essentials",
    subtitle:
      "Notepads, business cards, tags, labels & envelopes — crafted to perfection.",
    overlay: "bg-black/55",
  },
];

const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ---------- SCREEN SIZE DETECTION ---------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640); // Tailwind sm
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const nextStep = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const prevStep = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  useEffect(() => {
    const timer = setInterval(nextStep, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#4a3728]">
      {/* BACKGROUND SLIDES */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-[2000ms] ease-out
            ${i === index
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-110 z-0"
            }
          `}
          style={{
            backgroundImage: `url(${isMobile ? slide.mobileImage : slide.image
              })`,
            backgroundSize: "cover",
            backgroundPosition: isMobile ? "top center" : "center",
          }}
        />
      ))}

      {/* OVERLAY + CONTENT */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 transition-colors duration-700 ${HERO_SLIDES[index].overlay}`}
      >
        <h1
          key={`title-${index}`}
          className="text-white text-5xl md:text-8xl font-bold serif mb-8 tracking-tight drop-shadow-2xl opacity-0 animate-fade-up"
        >
          {HERO_SLIDES[index].title}
        </h1>

        <p
          key={`subtitle-${index}`}
          className="text-white/90 text-xl md:text-2xl max-w-3xl font-light leading-relaxed drop-shadow-lg opacity-0 animate-fade-up delay-300"
        >
          {HERO_SLIDES[index].subtitle}
        </p>

        <button
          onClick={() => onScrollTo("categories")}
          className="mt-12 px-12 py-5 bg-[#fdfbf7] text-[#4a3728]/80 rounded-full font-bold uppercase tracking-[0.2em] text-xs
                     hover:bg-white hover:scale-105 active:scale-95 transition-all duration-500
                     opacity-0 animate-fade-up delay-500"
        >
          Explore Collection
        </button>
      </div>

      {/* NAV ARROWS */}
      <button
        onClick={prevStep}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full border border-white/10 text-white
                   hover:bg-white/10 transition-all duration-500 hidden md:block backdrop-blur-sm group"
      >
        <ChevronLeft
          size={36}
          className="group-hover:-translate-x-1 transition-transform duration-500"
        />
      </button>

      <button
        onClick={nextStep}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full border border-white/10 text-white
                   hover:bg-white/10 transition-all duration-500 hidden md:block backdrop-blur-sm group"
      >
        <ChevronRight
          size={36}
          className="group-hover:translate-x-1 transition-transform duration-500"
        />
      </button>

      {/* PAGINATION */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex space-x-4">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="py-2 px-1 group"
          >
            <div
              className={`h-[2px] rounded-full transition-all duration-700
                ${i === index
                  ? "bg-white w-16"
                  : "bg-white/20 w-8 group-hover:bg-white/40"
                }
              `}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
