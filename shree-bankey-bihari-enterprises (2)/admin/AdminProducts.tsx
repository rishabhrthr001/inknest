import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Save, X, Upload, Edit2, Trash2 } from "lucide-react";
import { Product, Category } from "../types";
import API from "@/services/api";

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const isOpen = adding || editing;

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/api/categories`);
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchProducts = async (categoryId: string) => {
    try {
      const res = await axios.get(`${API}/api/products`, {
        params: categoryId !== "all" ? { categoryId } : {},
      });
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to fetch products");
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  const handleImageChange = (fileList: FileList) => {
    const remaining = 3 - files.length;
    const selected = Array.from(fileList).slice(0, remaining);

    setFiles((prev) => [...prev, ...selected]);
    setPreviews((prev) => [
      ...prev,
      ...selected.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setPreviews(product.images || []);
    setFiles([]);
    toast("Editing product", { icon: "✏️" });
  };

  const handleDelete = (id: string) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4">
          <span className="text-sm">Delete this product permanently?</span>

          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const tid = toast.loading("Deleting product...");
              try {
                await axios.delete(`${API}/add/product/${id}`);
                await fetchProducts(activeCategory);
                toast.success("Product deleted", { id: tid });
              } catch (err: any) {
                toast.error(err.response?.data?.msg || "Delete failed", {
                  id: tid,
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

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const toastId = toast.loading(
      editing ? "Updating product..." : "Creating product..."
    );

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      files.forEach((file) => {
        formData.append("images", file);
      });

      if (editing) {
        await axios.put(`${API}/add/product/${editing._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated", { id: toastId });
      } else {
        await axios.post(`${API}/add/product`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product created", { id: toastId });
      }

      await fetchProducts(activeCategory);

      setAdding(false);
      setEditing(null);
      setFiles([]);
      setPreviews([]);
      form.reset();
    } catch (err: any) {
      toast.error(err.response?.data?.msg || "Operation failed", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-16 px-6 bg-[#fdfbf7] min-h-screen">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* SIDEBAR */}
        <aside className="w-64 shrink-0">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1e3023]/60 mb-4">
            Categories
          </h3>

          <div className="space-y-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
                activeCategory === "all"
                  ? "bg-[#1e3023] text-white"
                  : "text-[#1e3023] hover:bg-[#2f4a37]/5"
              }`}
            >
              All Products
            </button>

            {categories.map((c) => (
              <button
                key={c._id}
                onClick={() => setActiveCategory(c._id)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
                  activeCategory === c._id
                    ? "bg-[#1e3023] text-white"
                    : "text-[#1e3023] hover:bg-[#2f4a37]/5"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <section className="flex-1 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold serif text-[#1e3023]">
                Products
              </h2>
              <p className="text-sm text-[#1e3023]/60">
                Products grouped by category
              </p>
            </div>

            <button
              onClick={() => setAdding(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1e3023] text-white rounded-full hover:bg-[#2f4a37] text-sm"
            >
              <Plus size={14} />
              Add Product
            </button>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="group relative bg-white rounded-2xl overflow-hidden border shadow-sm h-[320px]"
              >
                <div className="h-[85%] relative">
                  <img
                    src={
                      p.images?.[0] ||
                      "https://via.placeholder.com/600x400?text=Product"
                    }
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="flex gap-4 scale-95 group-hover:scale-100 transition">
                      <button
                        onClick={() => openEdit(p)}
                        className="px-4 py-2 rounded-full bg-white text-[#1e3023] flex items-center gap-2"
                      >
                        <Edit2 size={14} /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="px-4 py-2 rounded-full bg-red-500 text-white flex items-center gap-2"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-[15%] px-4 py-2">
                  <h3 className="text-sm font-bold text-[#1e3023] truncate">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#1e3023]/60 line-clamp-1">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-6xl rounded-3xl p-10 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold serif text-[#1e3023]">
                {editing ? "Edit Product" : "Add Product"}
              </h3>
              <button
                onClick={() => {
                  setAdding(false);
                  setEditing(null);
                  setFiles([]);
                  setPreviews([]);
                }}
              >
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              {/* IMAGE */}
              <div>
                <div className="border-2 border-dashed rounded-2xl h-[320px] flex items-center justify-center bg-[#fdfbf7]">
                  {previews[previews.length - 1] ? (
                    <img
                      src={previews[previews.length - 1]}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <label className="cursor-pointer text-center">
                      <Upload size={40} className="mx-auto mb-3" />
                      <input
                        type="file"
                        hidden
                        onChange={(e) =>
                          e.target.files && handleImageChange(e.target.files)
                        }
                      />
                    </label>
                  )}
                </div>

                {previews.length > 0 && previews.length < 3 && (
                  <label className="mt-4 inline-flex items-center gap-2 text-sm cursor-pointer text-[#1e3023]">
                    <Plus size={14} /> Add more images
                    <input
                      type="file"
                      hidden
                      onChange={(e) =>
                        e.target.files && handleImageChange(e.target.files)
                      }
                    />
                  </label>
                )}

                {previews.length > 1 && (
                  <div className="mt-4 flex gap-3">
                    {previews.slice(0, -1).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="h-16 w-16 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* FORM */}
              <div className="space-y-5">
                <select
                  name="categoryId"
                  required
                  defaultValue={editing?.categoryId}
                  className="w-full p-4 rounded-xl border"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <input
                  name="name"
                  required
                  defaultValue={editing?.name}
                  placeholder="Product name"
                  className="w-full p-4 rounded-xl border"
                />

                <textarea
                  name="description"
                  required
                  defaultValue={editing?.description}
                  rows={5}
                  placeholder="Product description"
                  className="w-full p-4 rounded-xl border"
                />

                <button
                  type="submit"
                  className="w-full py-4 rounded-full flex items-center justify-center gap-2 bg-[#1e3023] text-white hover:bg-[#2f4a37]"
                >
                  <Save size={14} />
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
