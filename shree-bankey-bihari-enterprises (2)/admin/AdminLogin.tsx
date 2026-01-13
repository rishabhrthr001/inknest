import React, { useState } from "react";
import { Lock, ShieldCheck, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import API from "@/services/api";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setIsAuth } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Verifying credentials...");

    try {
      const res = await axios.post(
        `${API}/auth/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", res.data.token);
      setIsAuth(true);

      toast.success("Login successful", { id: toastId });
      navigate("/admin");
    } catch (err: any) {
      toast.error(err.response?.data?.msg || "Invalid username or password", {
        id: toastId,
      });
    }
  };

  return (
    <div className="pt-40 pb-20 px-6 min-h-screen flex items-center justify-center bg-[#fdfbf7]">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl border shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#1e3023] rounded-2xl flex items-center justify-center text-white mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold serif">Admin Login</h1>
          <p className="text-[#1e3023]/60 mt-2">
            Enter credentials to access management
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <User
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1e3023]/40"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#fdfbf7] border border-transparent rounded-xl p-4 pl-10 outline-none focus:border-[#1e3023]"
              placeholder="Username"
              required
            />
          </div>

          <div className="relative">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1e3023]/40"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#fdfbf7] border border-transparent rounded-xl p-4 pl-10 outline-none focus:border-[#1e3023]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="
    w-full bg-[#1e3023] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs
    flex items-center justify-center gap-2
    transition-all duration-300
    hover:bg-[#2f4a37]
    hover:-translate-y-[2px] hover:shadow-lg
    active:translate-y-0 active:shadow-md
  "
          >
            <ShieldCheck size={16} />
            Verify Identity
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
