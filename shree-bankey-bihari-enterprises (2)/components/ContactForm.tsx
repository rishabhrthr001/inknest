import React, { useState, useEffect } from "react";
import { Send, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

interface ContactFormProps {
  initialSubject?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialSubject = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject]);

  const triggerConfetti = () => {
    const duration = 1500;
    const end = Date.now() + duration;
    const colors = ["#4a3728", "#2b2f2d", "#fdfbf7"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Sending message...");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      triggerConfetti();
      toast.success("Message sent successfully!", { id: toastId });
      setIsSubmitted(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setIsSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Try again.", { id: toastId });
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        {/* Left Content */}
        <div className="lg:w-1/3 animate-fade-up">
          <span className="text-[#4a3728] uppercase tracking-[0.3em] text-sm font-semibold">
            Get In Touch
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 serif mb-8 leading-tight">
            Let's create something remarkable together.
          </h2>

          <p className="text-[#4a3728]/70 mb-10 text-lg">
            Whether you need custom branding or bulk packaging solutions, we are
            here to help your business grow.
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-[#4a3728] mb-1">Office Address</h4>
              <p className="text-[#4a3728]/60">
                L-1/109 Satsang Bhawan Road, Mohan garden, <br />
                Uttam Nagar, New Delhi, India
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#4a3728] mb-1">Inquiries</h4>
              <p className="text-[#4a3728]/60">
                <a
                  href="mailto:contact@inknest.com"
                  className="hover:text-[#4a3728] transition-colors"
                >
                  contact@inknest.com
                </a>
                <br />
                <a
                  href="tel:+919811544614"
                  className="hover:text-[#4a3728] transition-colors"
                >
                  +91-9811544614
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[#4a3728]/5 animate-fade-left">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-[#4a3728]/40 ml-1">
                Full Name
              </label>
              <input
                required
                type="text"
                placeholder="Your Name"
                className="w-full bg-[#fdfbf7] rounded-xl p-4 focus:ring-2 focus:ring-[#4a3728]/20 outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-[#4a3728]/40 ml-1">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="your-email@example.com"
                className="w-full bg-[#fdfbf7] rounded-xl p-4 focus:ring-2 focus:ring-[#4a3728]/20 outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-[#4a3728]/40 ml-1">
                Phone Number
              </label>
              <input
                required
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full bg-[#fdfbf7] rounded-xl p-4 focus:ring-2 focus:ring-[#4a3728]/20 outline-none"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            {/* Subject */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-[#4a3728]/40 ml-1">
                Subject
              </label>
              <input
                required
                type="text"
                placeholder="Bulk Order for Paper Bags"
                className="w-full bg-[#fdfbf7] rounded-xl p-4 focus:ring-2 focus:ring-[#4a3728]/20 outline-none"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-[#4a3728]/40 ml-1">
                Your Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell us about your requirements..."
                className="w-full bg-[#fdfbf7] rounded-xl p-4 focus:ring-2 focus:ring-[#4a3728]/20 outline-none resize-none"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                disabled={isSubmitted}
                className={`px-12 py-4 rounded-full flex items-center justify-center gap-3 transition-all ${
                  isSubmitted
                    ? "bg-[#4a3728] text-white"
                    : "bg-[#4a3728] text-white hover:opacity-90"
                }`}
              >
                {isSubmitted ? (
                  <>
                    <span>Sent Successfully</span>
                    <CheckCircle className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
