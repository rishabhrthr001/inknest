import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Upload } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Category } from "../types";
import API from "@/services/api";

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [adding, setAdding] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isOpen = adding || editing;

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/api/categories`);
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ---------- ADD / EDIT ---------- */
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const toastId = toast.loading(
      editing ? "Updating category..." : "Creating category..."
    );

    const form = e.currentTarget;
    const formData = new FormData(form);

    const fileInput = form.querySelector<HTMLInputElement>("#image");
    if (fileInput?.files?.[0]) {
      formData.append("image", fileInput.files[0]);
    }

    try {
      if (editing) {
        await axios.put(`${API}/add/category/${editing._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Category updated", { id: toastId });
      } else {
        await axios.post(`${API}/add/category`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Category created", { id: toastId });
      }

      await fetchCategories();

      setAdding(false);
      setEditing(null);
      setPreview(null);
      form.reset();
    } catch (err: any) {
      toast.error(err.response?.data?.msg || "Operation failed", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = (id: string) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4">
          <span className="text-sm">Delete this category permanently?</span>

          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const toastId = toast.loading("Deleting...");
              try {
                await axios.delete(`${API}/add/category/${id}`);
                await fetchCategories();
                toast.success("Category deleted", { id: toastId });
              } catch (err: any) {
                toast.error(err.response?.data?.msg || "Delete failed", {
                  id: toastId,
                });
              }
            }}
            className="px-3 py-1 text-xs rounded bg-red-500 text-white"
          >
            Delete
          </button>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-xs rounded bg-gray-200"
          >
            Cancel
          </button>
        </div>
      ),
      { duration: 8000 }
    );
  };

  /* ---------- OPEN EDIT ---------- */
  const openEdit = (category: Category) => {
    setEditing(category);
    setPreview(category.image);
    toast("Editing category", { icon: "✏️" });
  };

  return (
    <div className="pt-32 px-6 pb-16 bg-[#fdfbf7] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold serif text-[#4a3728]">
              Categories
            </h2>
            <p className="text-sm text-[#4a3728]/60">
              Manage product categories
            </p>
          </div>

          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#4a3728] text-white rounded-full hover:opacity-90 transition text-sm"
          >
            <Plus size={14} />
            Add Category
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <div
              key={c._id}
              className="group relative bg-white rounded-2xl border shadow-sm overflow-hidden h-[320px]"
            >
              <div className="h-[85%] relative">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="flex gap-4">
                    <button
                      onClick={() => openEdit(c)}
                      className="px-4 py-2 rounded-full bg-white text-[#4a3728] flex items-center gap-2"
                    >
                      <Edit2 size={14} /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-4 py-2 rounded-full bg-red-500 text-white flex items-center gap-2"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-[15%] px-4 py-2">
                <h3 className="text-sm font-bold text-[#4a3728] truncate">
                  {c.name}
                </h3>
                <p className="text-xs text-[#4a3728]/60 line-clamp-1">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold serif text-[#4a3728]">
                {editing ? "Edit Category" : "Add Category"}
              </h3>
              <button
                onClick={() => {
                  setAdding(false);
                  setEditing(null);
                  setPreview(null);
                }}
              >
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* IMAGE */}
              <div className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center">
                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-56 object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <Upload size={32} className="text-[#4a3728]/40 mb-2" />
                    <p className="text-xs text-[#4a3728]/60">
                      Upload category image
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image"
                  onChange={(e) =>
                    e.target.files &&
                    setPreview(URL.createObjectURL(e.target.files[0]))
                  }
                />

                <label
                  htmlFor="image"
                  className="mt-4 px-4 py-1.5 border rounded-full cursor-pointer text-sm hover:bg-[#4a3728]/5 transition"
                >
                  Choose Image
                </label>
              </div>

              {/* FORM */}
              <div className="space-y-4">
                <input
                  name="name"
                  required
                  defaultValue={editing?.name}
                  placeholder="Category title"
                  className="w-full p-3 rounded-lg bg-[#fdfbf7] border"
                />

                <textarea
                  name="description"
                  required
                  defaultValue={editing?.description}
                  rows={4}
                  placeholder="Category description"
                  className="w-full p-3 rounded-lg bg-[#fdfbf7] border resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-full flex items-center justify-center gap-2 bg-[#4a3728] text-white hover:opacity-90"
                >
                  <Save size={14} />
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
