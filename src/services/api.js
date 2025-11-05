import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080", // Spring Boot
  withCredentials: true,
});

export default api;
