// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { registerApi } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Email tidak valid.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    try {
      setLoading(true);

      // panggil API (sementara masih dummy di authApi.js)
      await registerApi({ email, password });

      // selesai register → arahkan ke login
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
      setError("Register gagal. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Register"
      description="Buat akun untuk menyimpan diet plan dan progress kesehatan kamu."
      bottom={
        <>
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Kembali ke login
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2.5 rounded-lg border border-slate-300
                       text-sm text-slate-800
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                       placeholder:text-slate-400"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2.5 rounded-lg border border-slate-300
                       text-sm text-slate-800
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                       placeholder:text-slate-400"
            placeholder="Minimal 6 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center px-4 py-2.5
                     rounded-lg bg-emerald-600 text-white text-sm font-semibold
                     hover:bg-emerald-700 transition disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
}
