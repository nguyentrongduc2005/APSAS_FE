import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing   from "../pages/landing/Landing.jsx";
import Login     from "../pages/auth/Login.jsx";
import Register  from "../pages/auth/Register.jsx";
import VerifyOtp from "../pages/auth/VerifyOtp.jsx";

import ProtectedLayout from "../components/common/ProtectedLayout.jsx";

// demo pages – thay bằng trang thật
const Dashboard  = () => <div>Dashboard</div>;
const Courses    = () => <div>Khóa học</div>;
const Profile    = () => <div>Trang cá nhân</div>;
const AdminUsers = () => <div>Quản trị người dùng</div>;

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/verify" element={<VerifyOtp />} />

        {/* PROTECTED (layout chung) */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses"   element={<Courses />} />
          <Route path="/profile"   element={<Profile />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
