import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { X, Send, CheckCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const ProductEnquiryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  productName,
}) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (productName) {
      setFormData((prev) => ({
        ...prev,
        subject: productName,
        message: `Hi, I want to enquire about ${productName}.`,
      }));
    }
  }, [productName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const toastId = toast.loading("Sending enquiry...");

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
          product: productName,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast.success("Enquiry sent successfully!", { id: toastId });
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send enquiry", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-8 md:p-12 shadow-2xl relative">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#4a3728] hover:opacity-70 transition"
        >
          <X size={22} />
        </button>

        {/* HEADER */}
        <div className="mb-10">
          <span className="text-[#4a3728] uppercase tracking-[0.3em] text-xs font-semibold">
            Enquiry
          </span>

          <h3 className="text-3xl md:text-4xl font-bold mt-3 serif text-[#4a3728]">
            Product Enquiry
          </h3>

          <p className="text-[#4a3728]/60 mt-2">You are enquiring about:</p>

          <p className="mt-1 font-semibold text-lg text-[#4a3728]">
            {productName}
          </p>
        </div>

        {/* FORM */}
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
              className="w-full bg-[#fdfbf7] rounded-xl p-4 focus:ring-2 focus:ring-[#4a3728]/20 outline-none resize-none"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              disabled={submitted || loading}
              className="px-12 py-4 rounded-full bg-[#4a3728] text-white flex items-center justify-center gap-3 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {submitted ? (
                <>
                  <span>Sent Successfully</span>
                  <CheckCircle size={16} />
                </>
              ) : (
                <>
                  <span>Send Enquiry</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEnquiryModal;
