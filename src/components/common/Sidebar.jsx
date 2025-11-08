import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  FileText,
  User,
  Users,
  GraduationCap,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { NAV_BY_ROLE } from "../../constants/navConfig.js";
import { useUI } from "../../store/uiStore.js";

// Icon mapping
const ICON_MAP = {
  "🏠": Home,
  "📚": BookOpen,
  "🧩": FileText,
  "👤": User,
  "👥": Users,
  "🎓": GraduationCap,
  "📊": LayoutDashboard,
  "⚙️": Settings,
  "🚪": LogOut,
};

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

  // Debug log để kiểm tra user và role
  console.log("🔍 Sidebar - User:", user);
  console.log("🔍 Sidebar - Role:", user?.role);

  const items = NAV_BY_ROLE[user?.role] ?? [
    { to: "/dashboard", label: "Dashboard", icon: "🏠" },
    { to: "/courses", label: "Khóa học", icon: "📚" },
    { to: "/assignments", label: "Bài tập", icon: "🧩" },
    { to: "/profile", label: "Trang cá nhân", icon: "👤" },
  ];

  console.log("🔍 Sidebar - Nav items:", items);

  const getIconComponent = (iconEmoji) => {
    const IconComponent = ICON_MAP[iconEmoji] || Home;
    return IconComponent;
  };

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
        {items.map((it) => {
          const IconComponent = getIconComponent(it.icon);
          return (
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
              <span
                style={{
                  width: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconComponent size={18} />
              </span>
              <span>{it.label}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
