import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode"; // Thư viện phổ biến để giải mã JWT
import * as authService from "../services/authService.js"; // Import authService

// 1. Tạo Context
const AuthContext = createContext(null);

/**
 * Component Provider cho AuthContext
 * Quản lý state đăng nhập, user, token và các hàm login/logout
 */
export default function AuthProvider({ children }) {
  // State: lấy token từ localStorage nếu có
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // isLoading: để xử lý việc kiểm tra token lúc mới tải trang
  // Rất quan trọng: tránh việc "flash" (nháy) trang login khi đã đăng nhập
  const [isLoading, setIsLoading] = useState(true);

  // 2. useEffect: Tự động cập nhật 'user' khi 'token' thay đổi
  useEffect(() => {
    // Bắt đầu quá trình kiểm tra
    setIsLoading(true);

    if (token) {
      try {
        // Kiểm tra xem có phải mock token không (để test)
        if (
          token.startsWith("mock-token-") ||
          token.startsWith("dummy-token-")
        ) {
          // Đối với mock token, không decode
          // Chỉ cần kiểm tra xem user đã được set chưa
          // Nếu chưa có user, có thể là reload trang
          if (!user) {
            // Thử lấy user từ localStorage (nếu có lưu)
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
              try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
              } catch (e) {
                console.error("Không thể parse user từ localStorage:", e);
                // Token mock nhưng không có user data → logout
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setToken(null);
                setUser(null);
              }
            }
          }
          setIsLoading(false);
          return;
        }

        // (Khuyến nghị) Thay vì tự giải mã, bạn nên gọi 1 API "/api/me"
        // để xác thực token ở backend và lấy thông tin user mới nhất.
        // Ở đây ta giải mã tạm để lấy thông tin:

        const decodedUser = jwtDecode(token);

        // (Tùy chọn) Kiểm tra token hết hạn
        // const isExpired = decodedUser.exp * 1000 < Date.now();
        // if (isExpired) {
        //   throw new Error("Token hết hạn");
        // }

        // Lưu thông tin user vào state
        setUser(decodedUser);
        localStorage.setItem("token", token); // Đảm bảo localStorage được cập nhật
        localStorage.setItem("user", JSON.stringify(decodedUser)); // Lưu user để restore khi reload
      } catch (error) {
        // Nếu token lỗi (hết hạn, không hợp lệ), xóa nó
        console.error("Token không hợp lệ hoặc đã hết hạn:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      }
    } else {
      // Không có token, xóa user
      setUser(null);
      localStorage.removeItem("user");
    }

    // Hoàn tất quá trình kiểm tra
    setIsLoading(false);
  }, [token]); // Chạy lại mỗi khi 'token' thay đổi

  // 3. Hàm Login (dùng để set token và user trực tiếp)
  const login = (newToken, userData) => {
    // Khi API login thành công, bạn gọi hàm này
    // 'userData' là object user trả về từ API (nếu có)
    // 'newToken' là JWT

    // Nếu API không trả về user, ta tự giải mã

    setToken(newToken);
    setUser(userData);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu user vào localStorage
  };

  // 3.1. Hàm Login với Service (gọi authService để xử lý logic)
  const loginWithService = async (credentials) => {
    try {
      // Gọi service để xử lý logic login
      const { token: newToken, user: userData } = await authService.login(
        credentials
      );

      // Sau khi service trả về dữ liệu, refresh context
      setToken(newToken);
      setUser(userData);
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData)); // Lưu user vào localStorage

      return { success: true, user: userData };
    } catch (error) {
      throw error;
    }
  };

  // 3.2. Hàm Login Mock (không gọi API, dùng để test)
  const loginMock = (email) => {
    const role = email.includes("admin")
      ? "admin"
      : email.includes("gv")
      ? "lecturer"
      : email.includes("provider")
      ? "provider"
      : "student";

    const mockToken = "mock-token-" + Date.now();
    const mockUser = {
      id: "mock-" + Date.now(),
      name: "Mock User",
      email,
      role,
    };

    // Refresh context với dữ liệu mock
    setToken(mockToken);
    setUser(mockUser);
    localStorage.setItem("token", mockToken);
    localStorage.setItem("user", JSON.stringify(mockUser)); // Lưu user vào localStorage

    return { success: true, user: mockUser };
  };

  // 4. Hàm Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // (Tùy chọn) Redirect về trang chủ hoặc login
    // window.location.href = '/auth/login';
  };

  // 5. Tạo giá trị cho Provider
  // Dùng useMemo để tối ưu, tránh re-render không cần thiết
  const contextValue = useMemo(
    () => ({
      token,
      user,
      isLoading,
      isAuthenticated: !!user, // Lấy "true" nếu user tồn tại, "false" nếu null
      login, // Hàm login trực tiếp (set token và user)
      loginWithService, // Hàm login gọi service
      loginMock, // Hàm login mock để test
      logout,
    }),
    [token, user, isLoading] // Phụ thuộc
  );

  // 6. Trả về Provider
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

/**
 * Custom Hook: `useAuth`
 * Giúp các component con truy cập AuthContext dễ dàng
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth phải được dùng bên trong AuthProvider");
  }

  return context;
};
