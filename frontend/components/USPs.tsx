import React, { useEffect, useRef, useState } from "react";
import { Layers, Palette, Truck } from "lucide-react";

const USPS = [
  {
    id: 1,
    title: "100% Customisable",
    description:
      "Every product is fully customizable — size, material, print, and finish tailored to your brand.",
    icon: Layers,
    stat: "∞",
    statLabel: "Possibilities",
  },
  {
    id: 2,
    title: "Premium Print Quality",
    description:
      "High-resolution printing with rich colors and premium finishes for a refined brand presence.",
    icon: Palette,
    stat: "HD",
    statLabel: "Resolution",
  },
  {
    id: 3,
    title: "Pan-India Supply",
    description:
      "Reliable logistics network ensuring seamless delivery across India.",
    icon: Truck,
    stat: "28+",
    statLabel: "States Covered",
  },
];

const USPs: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="usp-section bg-[#2c1f14]">
      {/* Animated grain */}
      <div className="usp-grain" aria-hidden />

      {/* Subtle arc at top */}
      <div className="usp-arc" aria-hidden />

      <div className="usp-inner px-2 sm:px-4 overflow-hidden">
        {/* ── MOBILE COMPACT BAR (Horizontal Row) ── */}
        <div className="flex sm:hidden items-center justify-between gap-2 p-2">
          {USPS.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <div 
                key={usp.id} 
                className="flex flex-col items-center flex-1 text-center gap-1.5"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.6s ease ${idx * 0.1}s, transform 0.6s ease ${idx * 0.1}s`,
                }}
              >
                <div className="w-10 h-10 rounded-full bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 flex items-center justify-center">
                  <Icon size={18} className="text-[#c4966a]" />
                </div>
                <span className="text-[10px] uppercase tracking-tighter font-bold text-[#fdfbf7]/80 leading-tight">
                  {usp.title.split(' ')[0]} {usp.title.split(' ')[1] || ''}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── DESKTOP CONTENT (Hidden on mobile) ── */}
        <div className="hidden sm:block">
          {/* ── Eyebrow ── */}
          <div
            className="usp-eyebrow-wrap"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <span className="usp-eyebrow-line" />
            <span className="usp-eyebrow-text">Why Choose Us</span>
            <span className="usp-eyebrow-line" />
          </div>

          {/* ── Heading ── */}
          <h2
            className="usp-heading serif"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}
          >
            Built for Brands That&nbsp;
            <em className="usp-heading-accent">Mean Business</em>
          </h2>

          {/* ── Divider ── */}
          <div
            className="usp-divider"
            style={{
              transform: visible ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 1s cubic-bezier(0.22,1,0.36,1) 0.25s",
            }}
          />

          {/* ── Cards ── */}
          <div className="usp-grid">
            {USPS.map((usp, idx) => {
              const Icon = usp.icon;
              return (
                <div
                  key={usp.id}
                  className="usp-card"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(28px)",
                    transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${0.2 + idx * 0.13}s,
                                transform 0.75s cubic-bezier(0.22,1,0.36,1) ${0.2 + idx * 0.13}s`,
                  }}
                >
                  {/* Top row: icon + stat */}
                  <div className="usp-card-top">
                    <div className="usp-icon-wrap">
                      <Icon size={20} className="usp-icon" />
                    </div>
                    <div className="usp-stat-wrap">
                      <span className="usp-stat">{usp.stat}</span>
                      <span className="usp-stat-label">{usp.statLabel}</span>
                    </div>
                  </div>

                  {/* Divider line inside card */}
                  <div className="usp-card-rule" />

                  {/* Title */}
                  <h3 className="usp-card-title serif">{usp.title}</h3>

                  {/* Description */}
                  <p className="usp-card-desc">{usp.description}</p>

                  {/* Glow accent for hover */}
                  <div className="usp-card-glow" aria-hidden />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default USPs;
