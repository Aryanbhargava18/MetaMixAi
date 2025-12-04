import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

export const login = async (data) => {
  try {
    const res = await api.post("/api/login", data);
    return res.data;
  } catch (error) {
    return { message: error.response?.data?.message || "Login failed" };
  }
};

export const signup = async (data) => {
  try {
    const res = await api.post("/api/signup", data);
    return res.data;
  } catch (error) {
    return { message: error.response?.data?.message || "Signup failed" };
  }
};

export const getCurrentUser = async (token) => {
  try {
    const res = await api.get("/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return { message: error.response?.data?.message || "Failed to fetch user" };
  }
};

export default api;
