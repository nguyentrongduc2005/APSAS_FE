export const NAV_BY_ROLE = {
  student: [
    { to: "/dashboard", label: "Dashboard", icon: "🏠" },
    { to: "/student/my-courses", label: "My Courses", icon: "📚" },
    { to: "/courses", label: "Browse Courses", icon: "�" },
    { to: "/assignments", label: "Bài tập", icon: "🧩" },
    { to: "/profile", label: "Trang cá nhân", icon: "👤" },
  ],
  lecturer: [
    { to: "/dashboard", label: "Dashboard", icon: "🏠" },
    { to: "/lecturer/my-courses", label: "My Courses", icon: "�" },
    { to: "/assignments", label: "Bài tập", icon: "🧩" },
    { to: "/profile", label: "Trang cá nhân", icon: "👤" },
  ],
  admin: [
    { to: "/dashboard", label: "Dashboard", icon: "🏠" },
    { to: "/admin/users", label: "Người dùng", icon: "👥" },
    { to: "/admin/settings", label: "Cấu hình", icon: "⚙️" },
  ],
};
