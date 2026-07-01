import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // ou process.env selon ton setup

const api = axios.create({
  baseURL: API_URL,
});

export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (data) => api.post("/auth/register", data);
export const forgotPassword = (data) => api.post("/auth/forgot-password", data);
export const resetPassword = (data) => api.post("/auth/reset-password", data);