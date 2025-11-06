import axios from "axios";
export default axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080",
  withCredentials: true,
});
