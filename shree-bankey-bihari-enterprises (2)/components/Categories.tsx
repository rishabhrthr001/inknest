import React, { useEffect, useState } from "react";
import { Category } from "../types";
import axios from "axios";
import API from "@/services/api";

interface CategoriesProps {
  onCategorySelect: (id: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/api/categories`);
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load categories", err);
        setData([]);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (id: string) => {
    window.scrollTo({ top: 0, left: 0 });
    requestAnimationFrame(() => onCategorySelect(id));
  };

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="text-center mb-12 md:mb-20">
        <span className="block text-[#1e3023] uppercase tracking-[0.3em] text-[10px] md:text-sm font-semibold opacity-0 animate-fade-up">
          Our Offerings
        </span>

        <h2 className="text-3xl md:text-5xl font-bold mt-3 md:mt-4 serif opacity-0 animate-fade-up delay-200">
          Product Categories
        </h2>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {data.map((category, idx) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
            className="group text-left cursor-pointer opacity-0 animate-fade-up focus:outline-none"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden aspect-[4/5] rounded-xl md:rounded-2xl mb-3 md:mb-6 shadow-sm">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                draggable={false}
              />
              <div className="absolute inset-0 bg-[#2b2f2d]/20 group-hover:bg-[#2b2f2d]/0 transition-colors duration-500" />
            </div>

            {/* TITLE */}
            <h3 className="text-sm md:text-2xl font-bold mb-1 md:mb-3 serif">
              {category.name}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-[#1e3023]/70 text-xs md:text-sm leading-relaxed line-clamp-2">
              {category.description}
            </p>

            {/* UNDERLINE */}
            <div className="mt-3 md:mt-4 w-6 md:w-10 h-0.5 bg-[#1e3023] group-hover:w-full transition-all duration-700" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
