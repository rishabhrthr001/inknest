import React from "react";
import {
  Layers,
  Palette,
  Package,
  Zap,
  ShieldCheck,
  Truck,
} from "lucide-react";

const USPS = [
  {
    id: 1,
    title: "100% Customisable",
    description:
      "Every product is fully customizable — size, material, print, and finish tailored to your brand.",
    icon: <Layers size={28} className="text-[#fdfbf7]" />,
  },
  {
    id: 2,
    title: "Premium Print Quality",
    description:
      "High-resolution printing with rich colors and premium finishes for a refined brand presence.",
    icon: <Palette size={28} className="text-[#fdfbf7]" />,
  },
  {
    id: 3,
    title: "Pan-India Supply",
    description:
      "Reliable logistics network ensuring seamless delivery across India.",
    icon: <Truck size={28} className="text-[#fdfbf7]" />,
  },
];

const USPs: React.FC = () => {
  return (
    <section className="bg-[#1e3023] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-8">
          {USPS.map((usp, idx) => (
            <div
              key={usp.id}
              className={`flex flex-col items-center text-center group
                opacity-0 translate-y-8
                animate-fade-up
                [animation-delay:${idx * 150}ms]
              `}
            >
              {/* Icon */}
              <div className="mb-5 p-5 rounded-full bg-[#fdfbf7]/5 group-hover:bg-[#fdfbf7]/10 transition-colors duration-500">
                {usp.icon}
              </div>

              {/* Title */}
              <h3 className="text-[#fdfbf7] text-sm md:text-xl font-bold mb-2 serif uppercase tracking-widest">
                {usp.title}
              </h3>

              {/* Description (hidden on mobile) */}
              <p className="hidden md:block text-[#fdfbf7]/60 text-sm max-w-[280px]">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPs;
