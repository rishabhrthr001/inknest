import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-40 pb-32">
      <section className="px-6 max-w-4xl mx-auto">

        <span className="block text-[#8b5e3c] uppercase tracking-[0.3em] text-sm font-semibold opacity-0 animate-fade-up">
          Privacy
        </span>

        <h1 className="text-5xl md:text-6xl font-bold mt-4 serif mb-12 leading-tight opacity-0 animate-fade-up delay-200">
          Privacy Policy
        </h1>


        <div className="space-y-10 text-[#4a3728]/70 leading-relaxed text-lg opacity-0 animate-fade-up delay-400">
          <section>
            <h2 className="text-2xl font-bold serif text-[#4a3728] mb-4">
              1. Information Collection
            </h2>
            <p>
              We collect information you provide directly to us when you fill
              out our contact form, including your name, email address, and
              inquiry details. We also automatically collect certain information
              about your device and how you interact with our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold serif text-[#4a3728] mb-4">
              2. How We Use Information
            </h2>
            <p>
              The information we collect is used to respond to your inquiries,
              process your orders, improve our website, and communicate with you
              about our products and services. We do not sell your personal
              information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold serif text-[#4a3728] mb-4">
              3. Data Security
            </h2>
            <p>
              We implement a variety of security measures to maintain the safety
              of your personal information. However, no method of transmission
              over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold serif text-[#4a3728] mb-4">
              4. Cookies
            </h2>
            <p>
              Our website may use cookies to enhance your browsing experience.
              You can choose to set your web browser to refuse cookies, or to
              alert you when cookies are being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold serif text-[#4a3728] mb-4">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about our Privacy Policy or the
              practices of this site, please contact us at{" "}
              <span className="font-medium text-[#4a3728]">
                privacy@shreebbent.com
              </span>
              .
            </p>
          </section>

          <p className="pt-10 text-sm italic text-[#4a3728]/50">
            Last Updated: October 2025
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
