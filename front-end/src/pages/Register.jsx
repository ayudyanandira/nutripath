import { useState } from "react";
import authApi from "../api/authApi";

export default function Register() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("12345678");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await authApi.register({ email, password });
      setMessage("Register berhasil! Silakan login.");
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Register gagal, cek console."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold text-center">Register NutriPath</h1>

        <input
          className="border rounded w-full px-3 py-2 text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border rounded w-full px-3 py-2 text-sm"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-500 text-white w-full py-2 rounded">
          Register
        </button>

        {message && (
          <p className="text-center text-sm mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
