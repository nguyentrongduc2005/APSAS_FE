import { Routes, Route, Navigate } from "react-router-dom";

import Landing     from "../pages/landing/Landing.jsx";
import Login       from "../pages/auth/Login.jsx";
import Register    from "../pages/auth/Register.jsx";
import VerifyOtp   from "../pages/auth/VerifyOtp.jsx";
import PublicCourses from "../pages/PublicCourses.jsx";

import Navbar from "../components/common/Navbar.jsx";
import ProtectedLayout from "../components/common/ProtectedLayout.jsx";

// (demo) trang private – thay bằng trang thật của bạn
const Dashboard = () => <div>Dashboard</div>;
const Profile   = () => <div>Trang cá nhân</div>;
// const AdminUsers = () => <div>Quản trị người dùng</div>;

export default function AppRoutes() {
  return (
    <Routes>
      {/* ===== PUBLIC (dùng Navbar) ===== */}
      <Route element={<Navbar />}>
        <Route index element={<Landing />} />
        <Route path="courses" element={<PublicCourses />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/verify" element={<VerifyOtp />} />
      </Route>

      {/* ===== PRIVATE (dùng ProtectedLayout: layout + guard) ===== */}
      <Route element={<ProtectedLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile"   element={<Profile />} />
      </Route>

      {/* ===== ADMIN (ví dụ chỉ cho admin) ===== */}
      {/*
      <Route element={<ProtectedLayout allow={["admin"]} />}>
        <Route path="admin/users" element={<AdminUsers />} />
      </Route>
      */}

      {/* 404 → về trang chủ */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
