// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { loginApi } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Email tidak valid.");
      return;
    }
    if (!password) {
      setError("Password tidak boleh kosong.");
      return;
    }

    try {
      setLoading(true);

      // panggil API (sekarang masih dummy di authApi.js)
      const result = await loginApi({ email, password });

      // simpan token & user di localStorage
      if (result?.token) {
        localStorage.setItem("token", result.token);
      }
      if (result?.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      // arahkan ke dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login gagal. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      description="Masuk untuk melihat diet plan, progress, dan risiko kesehatan yang sudah dipersonalisasi."
      bottom={
        <>
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Register di sini
          </Link>
          <p className="mt-2 text-xs text-slate-500">
            (Untuk sekarang masih pakai login dummy lewat authApi, nanti
            disambungkan ke backend beneran.)
          </p>
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
            placeholder="••••••••"
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
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
}
