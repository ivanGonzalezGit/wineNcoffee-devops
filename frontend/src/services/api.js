// frontend/src/services/api.js
import axios from "axios";

// Crear instancia de Axios usando variable de entorno de Vite
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // usa localhost en dev, backend de Render en producción
});

// Adjuntar token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
