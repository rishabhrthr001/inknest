import { LayoutGrid, Package, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="pt-32 px-6 min-h-screen bg-[#fdfbf7]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold serif text-[#4a3728]">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#4a3728]/30 text-[#4a3728] text-sm hover:bg-[#4a3728]/5 transition"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            onClick={() => navigate("/admin/categories")}
            className="cursor-pointer bg-white rounded-3xl p-10 border shadow hover:shadow-xl transition"
          >
            <LayoutGrid size={40} className="text-[#4a3728] mb-6" />
            <h2 className="text-2xl font-bold serif mb-2">Categories</h2>
            <p className="text-[#4a3728]/60">Manage product categories</p>
          </div>

          <div
            onClick={() => navigate("/admin/products")}
            className="cursor-pointer bg-white rounded-3xl p-10 border shadow hover:shadow-xl transition"
          >
            <Package size={40} className="text-[#4a3728] mb-6" />
            <h2 className="text-2xl font-bold serif mb-2">Products</h2>
            <p className="text-[#4a3728]/60">Manage products by category</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
