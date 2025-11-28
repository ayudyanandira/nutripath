import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import authApi from "../api/authApi"; // sementara nggak dipakai dulu

export default function Login() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // === SEMENTARA: fake login biar bisa lanjut ke Dashboard ===
    // TODO: nanti kalau backend sudah siap, hapus blok ini
    // dan aktifkan kode try/catch di bawah.
    localStorage.setItem("token", "dummy-token");
    navigate("/dashboard");
    return;

    /*
    // KODE ASLI (pakai API beneran)
    try {
      const res = await authApi.login({ email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login gagal, cek email/password."
      );
    }
    */
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left section: title / branding */}
        <div className="md:w-1/2 bg-slate-900 text-white p-8 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Login NutriPath
          </h1>
          <p className="text-sm md:text-base text-slate-200">
            Masuk untuk melihat diet plan, progress, dan risiko kesehatan yang
            sudah dipersonalisasi.
          </p>
        </div>

        {/* Right section: form */}
        <div className="md:w-1/2 p-8 flex items-center">
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                className="border rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/60"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                className="border rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/60"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-medium hover:bg-slate-800 transition"
            >
              Login
            </button>

            <p className="text-xs text-center text-slate-500 mt-2">
                Belum punya akun?{" "}
                <span
                    className="text-slate-900 font-medium cursor-pointer"
                    onClick={() => navigate("/register")}
  >
                    Register di sini
                </span>
            </p>


            {error && (
              <p className="text-center text-sm text-red-500 mt-2">{error}</p>
            )}

            <p className="text-xs text-center text-slate-500 mt-2">
              (Sementara login dummy, nanti dihubungkan ke backend.)
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
