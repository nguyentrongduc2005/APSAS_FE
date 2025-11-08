import { Routes, Route, Navigate } from "react-router-dom";

// Layouts & Guards
import AuthGuard from "../components/common/AuthGuard";
import MainAppLayout from "../components/common/MainAppLayout";
import AuthLayout from "../components/common/AuthLayout";

// Pages
import Landing from "../pages/landing/Landing.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import VerifyOtp from "../pages/auth/VerifyOtp.jsx";
import Logout from "../pages/auth/Logout.jsx";
import PublicCourses from "../pages/PublicCourses.jsx";
import CourseDetail from "../pages/CourseDetail.jsx";
const Dashboard = () => <div>Dashboard</div>;
const Profile = () => <div>Trang cá nhân</div>;
const AdminUsers = () => <div>Quản trị người dùng</div>;

export default function AppRoutes() {
  return (
    <Routes>
      {/* ===== 1. AUTH (Login, Register...) ===== */}
      {/* Dùng layout riêng không có nav/footer */}
      <Route element={<AuthLayout />}>
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/verify" element={<VerifyOtp />} />
      </Route>

      {/* ===== LOGOUT (Không dùng layout) ===== */}
      <Route path="logout" element={<Logout />} />

      {/* ===== 2. APP CHÍNH (Cả Public và Private) ===== */}
      {/* Tất cả dùng chung MainAppLayout */}
      <Route element={<MainAppLayout />}>
        {/* === Các trang Public (Ai cũng xem được) === */}
        <Route index element={<Landing />} />
        <Route path="courses" element={<PublicCourses />} />
        <Route path="course/:courseId" element={<CourseDetail />} />

        {/* === Các trang Private (Bọc trong "Gác cổng") === */}
        <Route element={<AuthGuard />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* === Các trang Admin (Bọc trong "Gác cổng" + role) === */}
        <Route element={<AuthGuard allow={["admin"]} />}>
          <Route path="admin/users" element={<AdminUsers />} />
        </Route>
      </Route>

      {/* ===== 3. LỖI (404, 403) ===== */}
      <Route path="/403" element={<div>Không có quyền truy cập</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
