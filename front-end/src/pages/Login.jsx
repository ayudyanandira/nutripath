// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { loginApi } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("user1@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi frontend sederhana
    if (!email || !email.includes("@")) {
      setError("Masukkan email yang valid.");
      return;
    }
    if (!password) {
      setError("Password tidak boleh kosong.");
      return;
    }

    try {
      setLoading(true);

      const result = await loginApi({ email, password });

      // Simpan token
      if (result?.token) {
        localStorage.setItem("token", result.token);
      }

      // Simpan user (minimal email, nanti bisa ditambah name/role)
      if (result?.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      // Arahkan ke dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      // Pesan dari backend (User not found / Wrong password)
      setError(err.message || "Login gagal. Silakan coba lagi.");
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
          <div className="text-xs text-slate-500">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Register di sini
            </Link>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Untuk demo, kamu bisa pakai:
            <br />
            <span className="font-mono">user1@example.com / password123</span>
          </p>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white/60
                         text-sm text-slate-800
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                         placeholder:text-slate-400 transition"
              placeholder="kamu@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Gunakan email yang kamu daftarkan di NutriPath.
          </p>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white/60
                         text-sm text-slate-800
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                         placeholder:text-slate-400 transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Minimal 8 karakter untuk keamanan yang lebih baik.</span>
            <button
              type="button"
              className="text-emerald-600 hover:underline font-medium"
              onClick={() =>
                alert("Fitur lupa password belum diimplementasikan.")
              }
            >
              Lupa password?
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="rounded-md bg-red-50 border border-red-100 px-3 py-2 text-xs text-red-600">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center px-4 py-2.5
                     rounded-lg bg-emerald-600 text-white text-sm font-semibold
                     shadow-sm hover:bg-emerald-700 active:bg-emerald-800
                     disabled:opacity-70 disabled:cursor-not-allowed
                     transition-transform duration-150 ease-out hover:-translate-y-[1px]"
        >
          {loading ? "Memproses..." : "Login ke Dashboard"}
        </button>

        {/* Hint bawah tombol */}
        <p className="text-[11px] text-slate-400 text-center">
          Dengan masuk, kamu menyetujui pengolahan data kesehatanmu secara
          anonim untuk peningkatan insight nutrisi.
        </p>
      </form>
    </AuthLayout>
  );
}
