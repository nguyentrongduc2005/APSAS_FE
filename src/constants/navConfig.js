export const NAV_BY_ROLE = {
  student: [
    { to: "/dashboard",   label: "Dashboard",     icon: "🏠" },
    { to: "/courses",     label: "Khóa học",      icon: "📚" },
    { to: "/assignments", label: "Bài tập",       icon: "🧩" },
    { to: "/profile",     label: "Trang cá nhân", icon: "👤" },
  ],
  lecturer: [
    { to: "/dashboard", label: "Dashboard", icon: "🏠" },
    { to: "/manage/courses", label: "Quản lý khóa học", icon: "🛠️" },
    { to: "/assignments", label: "Bài tập", icon: "🧩" },
    { to: "/profile", label: "Trang cá nhân", icon: "👤" },
  ],
  admin: [
    { to: "/dashboard", label: "Dashboard", icon: "🏠" },
    { to: "/admin/users", label: "Người dùng", icon: "👥" },
    { to: "/admin/settings", label: "Cấu hình", icon: "⚙️" },
  ],
};
