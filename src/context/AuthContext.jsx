import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";
import * as authService from "../services/authService.js";

const AuthContext = createContext(null);

const TOKEN_KEY = "token";
const REFRESH_KEY = "refreshToken";
const USER_KEY = "user";

// Chuẩn hóa role từ backend (ADMIN, STUDENT, PROVIDER, LECTURER) -> FE (admin, student,...)
function normalizeRoleName(roleStr) {
  if (!roleStr) return undefined;
  const normalized = String(roleStr).toLowerCase();
  if (normalized.includes("admin")) return "admin";
  if (normalized.includes("student")) return "student";
  if (normalized.includes("lecturer")) return "lecturer";
  if (normalized.includes("provider")) return "provider";
  if (normalized.includes("teacher")) return "teacher";
  return normalized;
}

// Tạo user object từ JWT accessToken
function buildUserFromToken(token) {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    const scope = decoded.scope || "";
    const scopeParts = String(scope).split(" ").filter(Boolean);
    const roleFromScope = scopeParts.find((s) => s.startsWith("ROLE_"));
    const normalizedRole = roleFromScope
      ? normalizeRoleName(roleFromScope.replace("ROLE_", ""))
      : undefined;

    return {
      id: decoded.sub ? Number(decoded.sub) : undefined,
      name: decoded.name,
      email: decoded.email,
      role: normalizedRole,
      roles: normalizedRole ? [normalizedRole] : [],
      avatar: null,
    };
  } catch (e) {
    console.error("Không decode được JWT:", e);
    return null;
  }
}

// Chuẩn hóa user nhận từ API LoginResponse.user (AuthUserDto)
function normalizeUserFromApi(userFromApi, token) {
  if (!userFromApi && token) {
    return buildUserFromToken(token);
  }
  if (!userFromApi) return null;

  const rawRoles = Array.isArray(userFromApi.roles)
    ? userFromApi.roles
    : [];
  const normalizedRoles = rawRoles.map(normalizeRoleName).filter(Boolean);
  const primaryRole = normalizedRoles[0];

  return {
    id: userFromApi.id,
    name: userFromApi.name,
    email: userFromApi.email,
    avatar: userFromApi.avatar,
    roles: normalizedRoles,
    role: primaryRole,
  };
}

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token && !!user;

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  };

  // Khởi tạo / kiểm tra lại token mỗi khi token thay đổi
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        // Không có token -> clear user
        if (!token) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Nếu chưa có user, thì thử lấy từ localStorage hoặc decode JWT
        if (!user) {
          const localUserRaw = localStorage.getItem(USER_KEY);
          if (localUserRaw) {
            try {
              const parsed = JSON.parse(localUserRaw);
              setUser(parsed);
            } catch {
              const decodedUser = buildUserFromToken(token);
              setUser(decodedUser);
              if (decodedUser) {
                localStorage.setItem(USER_KEY, JSON.stringify(decodedUser));
              }
            }
          } else {
            const decodedUser = buildUserFromToken(token);
            setUser(decodedUser);
            if (decodedUser) {
              localStorage.setItem(USER_KEY, JSON.stringify(decodedUser));
            }
          }
        }

        // Gọi introspect để check token còn valid không
        const result = await authService.fetchMe(token);
        if (!cancelled && !result?.valid) {
          console.warn("Token không còn hợp lệ, tiến hành logout");
          logout();
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Lỗi init auth:", err);
          logout();
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    init();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Hàm login: gọi service + cập nhật context + localStorage
  const login = async ({ email, password }) => {
    const res = await authService.login({ email, password });
    const normalizedUser = normalizeUserFromApi(res.user, res.accessToken);

    setToken(res.accessToken);
    setUser(normalizedUser);

    localStorage.setItem(TOKEN_KEY, res.accessToken);
    if (res.refreshToken) {
      localStorage.setItem(REFRESH_KEY, res.refreshToken);
    }
    localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));

    return normalizedUser;
  };

  // (tuỳ chọn) bung hàm register từ context, nếu muốn gọi qua context
  const register = async (payload) => {
    return authService.register(payload);
  };

  const value = {
    token,
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

/**
 * Custom Hook: `useAuth`
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth phải được dùng bên trong AuthProvider");
  }

  return context;
};
