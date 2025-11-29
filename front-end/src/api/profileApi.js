// src/api/profileApi.js
import httpClient from "./httpClient";

// Nanti ini dipakai di halaman Profile
export async function getProfile() {
  // const res = await httpClient.get("/profile");
  // return res.data;

  // sementara dummy → nanti kita isi beneran
  return Promise.resolve(null);
}
