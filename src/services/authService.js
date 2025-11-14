import api from "./api.js";

/**
 * Hàm login - GỌI API THẬT (tạm thời dùng mock data)
 * Service này CHỈ xử lý logic nghiệp vụ, KHÔNG gọi context
 * @param {Object} credentials - { email, password }
 * @returns {Promise<{token: string, user: Object}>}
 */
export async function login({ email, password }) {
  try {
    // TODO: Thay thế bằng API thật
    // const response = await api.post("/auth/login", { email, password });
    // return response.data;

    // MOCK DATA để test
    const role = email.includes("admin")
      ? "admin"
      : email.includes("gv")
      ? "lecturer"
      : email.includes("provider")
      ? "provider"
      : "student";

    // Giả lập delay API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const data = {
      token: "dummy-token-" + Date.now(),
      user: { id: "u1", name: "Nguyễn Văn A", email, role },
    };

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
  }
}
/**
 * Hàm register - GỌI API THẬT (tạm thời dùng mock data)
 * @param {Object} data - { name, email, password }
 * @returns {Promise<{token: string, user: Object}>}
 */
export async function register({ name, email, password }) {
  try {
    // TODO: thay bằng api.post("/auth/register", { name, email, password })

    // MOCK DATA để test
    await new Promise((resolve) => setTimeout(resolve, 500));

    const data = {
      token: "dummy-token-" + Date.now(),
      user: { id: "u2", name: name || "User mới", email, role: "student" },
    };

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Đăng ký thất bại");
  }
}

/**
 * Hàm verify OTP
 * @param {Object} data - { email, code }
 * @returns {Promise<{ok: boolean, message: string}>}
 */
export async function verifyOtp({ email, code }) {
  if (!code || String(code).length !== 6) {
    return { ok: false, message: "Mã OTP không hợp lệ" };
  }
  // TODO: Gọi API verify OTP thật
  return { ok: true, message: "Xác minh thành công" };
}

/**
 * Hàm lấy thông tin user hiện tại từ token
 * @param {string} token
 * @returns {Promise<Object>}
 */
export async function fetchMe(token) {
  try {
    // TODO: Thay bằng API thật
    // const response = await api.get("/auth/me", {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    // return response.data;

    if (!token) return null;

    // MOCK: Giải mã từ token (trong thực tế nên gọi API)
    return null; // Để Context tự giải mã JWT
  } catch (error) {
    throw new Error("Không thể lấy thông tin người dùng");
  }
}
