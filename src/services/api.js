// src/services/api.js
import axios from "axios";

// ==============================
// BASE CONFIG
// ==============================
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // không dùng cookie
});

// ==============================
// REQUEST INTERCEPTOR
// ==============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      `%c[API REQUEST] ${config.method.toUpperCase()} → ${config.url}`,
      "color:#4ade80;",
      config
    );

    return config;
  },
  (error) => {
    console.error("🔴 REQUEST ERROR:", error);
    return Promise.reject(error);
  }
);

// ==============================
// REFRESH TOKEN LOGIC
// ==============================
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

/**
 * CALL REFRESH TOKEN API
 */
async function refreshTokenService() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    // Sử dụng axios trực tiếp để tránh circular dependency với authService
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE}/auth/refresh-token`,
      { refreshToken },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // Backend response format: { code: "OK", message: "...", data: { accessToken, refreshToken, user } }
    const apiRes = res.data;
    console.log("🔄 RefreshTokenService response:", apiRes);

    if (apiRes.code === "OK") {
      const { accessToken, refreshToken: newRefreshToken, user } = apiRes.data;

      // Cập nhật localStorage ngay lập tức
      if (accessToken) {
        localStorage.setItem("token", accessToken);
      }
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      return apiRes.data; // { accessToken, refreshToken, user }
    }

    return null;
  } catch (err) {
    console.error("🔴 Refresh token service error:", err);
    return null;
  }
}

// ==============================
// RESPONSE INTERCEPTOR
// ==============================
api.interceptors.response.use(
  (response) => {
    console.log(
      `%c[API RESPONSE] ${response.config.url}`,
      "color:#60a5fa;",
      response
    );
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 & chưa retry → thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Chờ token được refresh xong
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const tokenData = await refreshTokenService();

      if (!tokenData) {
        // Refresh token hết hạn → logout
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      const { accessToken, refreshToken: newRefreshToken, user } = tokenData;

      // Tokens đã được lưu trong refreshTokenService, chỉ cần update api headers
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      processQueue(null, accessToken);

      // Dispatch custom event để AuthContext có thể update (optional)
      if (user) {
        window.dispatchEvent(new CustomEvent('token-refreshed', {
          detail: { accessToken, refreshToken: newRefreshToken, user }
        }));
      }

      isRefreshing = false;

      // Gửi lại request ban đầu
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    }

    processQueue(error, null);
    isRefreshing = false;

    console.error("🔴 RESPONSE ERROR:", error);

    return Promise.reject(error);
  }
);

export default api;
