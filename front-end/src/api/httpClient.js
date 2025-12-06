// src/api/httpClient.js
import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:4000/api", // nanti kalau base URL beda, tinggal ganti di sini
  headers: {
    "Content-Type": "application/json",
  },
});

// (opsional) interceptor untuk nambah token kalau sudah ada backend beneran
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;
