import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/authStore.js";
import { NAV_BY_ROLE } from "../../constants/navConfig.js";
import { useUI } from "../../store/uiStore.js"; // nếu bạn đã có toggle sidebar

const itemBase = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 10,
  textDecoration: "none",
  color: "#c9d2e0",
  fontSize: 14,
};

export default function Sidebar() {
  const { user } = useAuth();
  const { sidebarOpen } = useUI?.() ?? { sidebarOpen: true }; // fallback nếu chưa có store
  const items = NAV_BY_ROLE[user?.role] ?? [
    { to: "/dashboard", label: "Dashboard", icon: "🏠" },
    { to: "/courses", label: "Khóa học", icon: "📚" },
    { to: "/assignments", label: "Bài tập", icon: "🧩" },
    { to: "/profile", label: "Trang cá nhân", icon: "👤" },
  ];

  return (
    <aside
      aria-label="Sidebar"
      style={{
        width: 240,
        background: "#0f1419",
        padding: 12,
        borderRight: "1px solid #202934",
        // nếu muốn ẩn/hiện theo toggle
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 200ms ease",
      }}
    >
      <div style={{ display: "grid", gap: 8 }}>
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            style={({ isActive }) => ({
              ...itemBase,
              background: isActive ? "#18212b" : "transparent",
              color: isActive ? "#ffffff" : "#c9d2e0",
              border: "1px solid",
              borderColor: isActive ? "#2a3441" : "transparent",
            })}
          >
            <span style={{ width: 20, textAlign: "center" }}>{it.icon}</span>
            <span>{it.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
