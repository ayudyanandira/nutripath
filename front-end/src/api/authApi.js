// src/api/authApi.js
import httpClient from "./httpClient";

// SEKARANG MASIH DUMMY.
// Nanti kalau backend sudah jadi: tinggal uncomment bagian axios,
// dan hapus bagian return Promise.resolve(...)

export async function loginApi({ email, password }) {
  // === versi kalau backend sudah siap ===
  // const res = await httpClient.post("/auth/login", { email, password });
  // return res.data; // misal: { token, user }

  console.log("loginApi dummy:", { email, password });

  // dummy response
  return Promise.resolve({
    token: "dummy-token-from-api",
    user: {
      name: "Ayudya",
      email,
    },
  });
}

export async function registerApi({ email, password }) {
  // === versi kalau backend sudah siap ===
  // const res = await httpClient.post("/auth/register", { email, password });
  // return res.data;

  console.log("registerApi dummy:", { email, password });

  // dummy response
  return Promise.resolve({
    success: true,
  });
}
