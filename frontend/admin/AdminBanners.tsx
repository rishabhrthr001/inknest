import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Upload, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Banner } from "../types";
import API from "@/services/api";

const AdminBanners: React.FC = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${API}/api/banners`);
      setBanners(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to load banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleUpload = async (key: string, file: File) => {
    setLoadingKey(key);
    const toastId = toast.loading("Uploading banner image...");

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.put(`${API}/add/banner/${key}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Banner updated successfully", { id: toastId });
      await fetchBanners();
    } catch (err: any) {
      toast.error(err.response?.data?.msg || "Upload failed", { id: toastId });
    } finally {
      setLoadingKey(null);
    }
  };

  const getBannerDetails = (key: string) => {
    switch (key) {
      case "carry_bags_banner":
        return {
          title: "Carry Bags Section Banner",
          description: "Full-width banner displayed directly below the Carry Bags title on the home page.",
        };
      case "stickers_banner":
        return {
          title: "Stickers Section Banner",
          description: "Full-width banner displayed directly below the Stickers title on the home page.",
        };
      default:
        return { title: key, description: "" };
    }
  };

  return (
    <div className="pt-32 px-6 pb-16 bg-[#fdfbf7] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* BREADCRUMB */}
        <button
          onClick={() => navigate("/admin")}
          className="group flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-[#4a3728]/40 hover:text-[#4a3728] transition"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        {/* HEADER */}
        <div>
          <h2 className="text-3xl font-bold serif text-[#4a3728]">Banners Manager</h2>
          <p className="text-sm text-[#4a3728]/60">Customize section banner images shown on the main page</p>
        </div>

        {/* BANNERS LIST */}
        <div className="space-y-8">
          {banners.map((b) => {
            const { title, description } = getBannerDetails(b.key);
            const isLoading = loadingKey === b.key;

            return (
              <div
                key={b.key}
                className="bg-white rounded-3xl p-6 md:p-8 border shadow-sm flex flex-col gap-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#4a3728]">{title}</h3>
                  <p className="text-xs text-[#4a3728]/60 mt-1">{description}</p>
                </div>

                {/* Preview */}
                <div className="w-full h-36 sm:h-44 md:h-48 rounded-2xl overflow-hidden relative border bg-[#f9f7f2]">
                  <img
                    src={b.image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Upload Button */}
                <div className="flex justify-end">
                  <input
                    type="file"
                    accept="image/*"
                    id={`banner-file-${b.key}`}
                    className="hidden"
                    disabled={isLoading}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleUpload(b.key, e.target.files[0]);
                      }
                    }}
                  />
                  <label
                    htmlFor={`banner-file-${b.key}`}
                    className={`flex items-center gap-2 px-6 py-3 border rounded-full text-sm font-semibold tracking-wider uppercase cursor-pointer hover:bg-[#4a3728]/5 transition ${
                      isLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <Upload size={14} />
                    {isLoading ? "Uploading..." : "Change Image"}
                  </label>
                </div>
              </div>
            );
          })}

          {banners.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border shadow-sm">
              <ImageIcon size={40} className="mx-auto mb-4 text-[#4a3728]/30" />
              <p className="serif text-[#4a3728]/60">No banners found in the database. Please make sure database is seeded.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBanners;
