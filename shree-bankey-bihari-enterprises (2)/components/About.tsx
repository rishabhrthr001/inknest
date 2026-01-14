import React from "react";

const About: React.FC = () => {
  return (
    <div className="pt-40 pb-32">
      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <span className="block text-[#4a3728] uppercase tracking-[0.3em] text-sm font-semibold opacity-0 animate-fade-up">
              Our Legacy
            </span>

            <h2 className="text-5xl md:text-6xl font-bold mt-4 serif mb-8 leading-tight opacity-0 animate-fade-up delay-200">
              Excellence Crafted <br /> Through Generations.
            </h2>

            <p className="text-[#4a3728]/70 text-lg leading-relaxed mb-6 opacity-0 animate-fade-up delay-400">
              Shree Bankey Bihari Enterprises was founded on the principles of
              integrity, quality, and innovation. For years, we have been at the
              forefront of the manufacturing industry, providing tailored
              solutions that bridge the gap between aesthetics and utility.
            </p>

            <p className="text-[#4a3728]/70 text-lg leading-relaxed opacity-0 animate-fade-up delay-500">
              Our state-of-the-art facility is equipped with the latest printing
              and manufacturing technology, allowing us to maintain a rigorous
              quality control process from the initial design phase to final
              delivery. Whether it's our eco-friendly paper bags or our
              precision-cut stickers, every product carries the mark of our
              commitment to excellence.
            </p>
          </div>

          <div className="lg:w-1/2 relative opacity-0 animate-fade-scale">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
              alt="Our Facility"
              className="rounded-3xl shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#4a3728]/10 rounded-full blur-3xl -z-0" />
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#4a3728]/5 rounded-full blur-3xl -z-0" />
          </div>
        </div>

        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Our Mission",
              text: "To provide sustainable and high-quality packaging that adds value to our clients’ brands.",
            },
            {
              title: "Our Vision",
              text: "To become a global leader in eco-friendly manufacturing and innovative print solutions.",
            },
            {
              title: "Our Values",
              text: "Commitment to sustainability, customer-centricity, and relentless pursuit of quality.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-10 bg-white rounded-2xl border border-[#4a3728]/5 shadow-sm hover:shadow-md transition-shadow opacity-0 animate-fade-up"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <h3 className="text-2xl font-bold serif mb-4">{item.title}</h3>
              <p className="text-[#4a3728]/60 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
