import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="pt-40 pb-32">
      <section className="px-6 max-w-4xl mx-auto">
        <span className="text-[#8b5e3c] uppercase tracking-[0.3em] text-sm font-semibold opacity-0 animate-fade-in">
          Legal
        </span>

        <h1 className="text-5xl md:text-6xl font-bold mt-4 serif mb-12 leading-tight opacity-0 animate-fade-up delay-100">
          Terms of Service
        </h1>

        <div className="space-y-10 text-[#4a3728]/70 leading-relaxed text-lg opacity-0 animate-fade-up delay-200">
          <section>
            <h2 className="text-2xl font-bold serif text-[#4a3728] mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the services provided by Shree Bankey
              Bihari Enterprises, you agree to comply with and be bound by these
              Terms of Service. If you do not agree, please refrain from using
              our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold serif text-[#4a3728] mb-4">
              2. Manufacturing & Orders
            </h2>
            <p>
              All orders are subject to acceptance and availability. Since we
              provide custom manufacturing for bags, notepads, and stickers,
              production timelines may vary based on order volume and
              complexity. We reserve the right to refuse service to anyone for
              any reason at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold serif text-[#4a3728] mb-4">
              3. Intellectual Property
            </h2>
            <p>
              The content, organization, graphics, design, and other matters
              related to this site are protected under applicable copyrights and
              trademarks. You may not copy, redistribute, use or publish any
              part of the site without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold serif text-[#4a3728] mb-4">
              4. Limitation of Liability
            </h2>
            <p>
              Shree Bankey Bihari Enterprises shall not be liable for any
              special or consequential damages that result from the use of, or
              the inability to use, the materials on this site or the
              performance of the products, even if we have been advised of the
              possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold serif text-[#4a3728] mb-4">
              5. Governing Law
            </h2>
            <p>
              These terms are governed by and construed in accordance with the
              laws of India. Any disputes relating to these terms will be
              subject to the exclusive jurisdiction of the courts of New Delhi.
            </p>
          </section>

          <p className="pt-10 text-sm italic">Last Updated: October 2024</p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
