import { logout } from "../../services/authService.js";
import { useAuth } from "../../store/authStore.js";
import { useNavigate, Link } from "react-router-dom";

export default function Header(){
  const { user } = useAuth();
  const nav = useNavigate();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        height: 56,
        borderBottom: "1px solid #202934",
        background: "#0f1419",
        color: "#eaf0f6",
      }}
    >
      {/* BRAND (logo + text) */}
      <Link
        to="/dashboard"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          color: "#eaf0f6",
        }}
      >
        <img
          src="public/logo.png"   
          alt="APSAS"
          style={{ height: 28, width: "auto", display: "block" }}
        />
        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: ".5px" }}>
          APSAS
        </span>
      </Link>

      {/* RIGHT */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ opacity: 0.8, fontSize: 14 }}>
          {user?.name} • {user?.role}
        </span>
        <button
          onClick={() => {
            logout();
            nav("/auth/login");
          }}
          style={{
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 10px",
            cursor: "pointer",
          }}
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
