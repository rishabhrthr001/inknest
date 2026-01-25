import React from "react";
import { Layers, Palette, Truck } from "lucide-react";

const USPS = [
  {
    id: 1,
    title: "100% Customisable",
    description:
      "Every product is fully customizable — size, material, print, and finish tailored to your brand.",
    icon: <Layers size={22} className="text-[#fdfbf7]" />,
  },
  {
    id: 2,
    title: "Premium Print Quality",
    description:
      "High-resolution printing with rich colors and premium finishes for a refined brand presence.",
    icon: <Palette size={22} className="text-[#fdfbf7]" />,
  },
  {
    id: 3,
    title: "Pan-India Supply",
    description:
      "Reliable logistics network ensuring seamless delivery across India.",
    icon: <Truck size={22} className="text-[#fdfbf7]" />,
  },
];

const USPs: React.FC = () => {
  return (
    <section
      className="
        bg-[#4a3728] py-10
        min-h-[15vh] md:min-h-0
        flex items-center justify-center
        px-4
        overflow-hidden
      "
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* GRID */}
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {USPS.map((usp, idx) => (
            <div
              key={usp.id}
              className={`flex flex-col items-center justify-center text-center group
                opacity-0 translate-y-4
                animate-fade-up
                [animation-delay:${idx * 120}ms]
              `}
            >
              {/* Icon */}
              <div
                className="
                  mb-2 md:mb-5
                  p-2 md:p-5
                  rounded-full
                  bg-[#fdfbf7]/5
                  group-hover:bg-[#fdfbf7]/10
                  transition-colors duration-500
                "
              >
                {usp.icon}
              </div>

              {/* Title */}
              <h3
                className="
                  text-[#fdfbf7]
                  text-[9px] md:text-xl
                  font-bold
                  uppercase
                  tracking-widest
                  serif
                  leading-tight
                "
              >
                {usp.title}
              </h3>

              {/* Description – desktop only */}
              <p className="hidden md:block text-[#fdfbf7]/60 text-sm max-w-[280px] mt-2">
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
