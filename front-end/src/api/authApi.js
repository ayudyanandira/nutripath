// src/api/authApi.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

// helper untuk handle response error
async function handleResponse(res) {
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    // kalau tidak ada JSON, biarkan data = null
  }

  if (!res.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }

  return data;
}

// LOGIN
export async function loginApi({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include", // aman kalau nanti pakai cookie
  });

  const data = await handleResponse(res);

  // Backend sekarang hanya kirim { token }
  // Supaya frontend tetap enak, kita bungkus jadi { token, user }
  return {
    token: data.token,
    user: {
      email,
      // kalau nanti backend kirim role / name, tinggal tambahin di sini:
      // name: data.name,
      // role: data.role,
    },
  };
}

// REGISTER
export async function registerApi({ email, password, name }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // kalau backend belum pakai "name", tidak masalah: field ini akan diabaikan
    body: JSON.stringify({ email, password, name }),
  });

  const data = await handleResponse(res);
  return data;
}
