// src/components/common/AuthGuard.jsx
// (Đây LÀ logic của ProtectedLayout, nhưng không có UI)

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchMe } from "../../services/authService.js";

export default function AuthGuard({ allow }) {
  const nav = useNavigate();
  const location = useLocation();
  const { user, token, logout, isLoading: isContextLoading } = useAuth();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isContextLoading) return;

    if (!token) {
      // Nhớ 'state' để quay lại trang này sau khi login
      nav("/auth/login", { replace: true, state: { from: location } });
      return;
    }

    // Kiểm tra role nếu có yêu cầu
    if (allow && user && !allow.includes(user.role)) {
      nav("/403", { replace: true });
      return;
    }

    // Nếu có user, cho phép render ngay
    if (user) {
      setIsChecked(true);
      return;
    }

    // Nếu chưa có user, thử fetch từ API (chỉ cho token thật)
    (async () => {
      try {
        const me = await fetchMe(token);
        if (!me) {
          logout();
          nav("/auth/login", { replace: true, state: { from: location } });
          return;
        }

        if (allow && !allow.includes(me.role)) {
          nav("/403", { replace: true });
          return;
        }

        setIsChecked(true); // Đã kiểm tra, cho phép render
      } catch (error) {
        console.error("Lỗi khi fetch user:", error);
        logout();
        nav("/auth/login", { replace: true, state: { from: location } });
      }
    })();
  }, [isContextLoading, token, user, allow, nav, logout, location]);

  // Loader (trong khi chờ fetchMe)
  if (isContextLoading || !isChecked) {
    return <div>Đang xác thực...</div>;
  }

  // Đã qua kiểm tra -> render trang con (Dashboard, Profile...)
  return <Outlet />;
}
