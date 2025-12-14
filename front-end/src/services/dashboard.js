import axios from "axios";

const API_URL = "http://localhost:4000/api";

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token tidak ditemukan");
  }

  const response = await axios.get(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
