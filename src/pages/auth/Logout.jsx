import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi logout từ context
    logout();

    // Redirect về trang login
    navigate("/auth/login", { replace: true });
  }, [logout, navigate]);

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        background: "#0b0f12",
        color: "#eaf0f6",
      }}
    >
      <div>Đang đăng xuất...</div>
    </div>
  );
}
