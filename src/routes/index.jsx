import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProtectedLayout from "../components/common/ProtectedLayout";

// Lazy pages
const Landing       = lazy(() => import("../pages/landing/Landing"));
const PublicCourses = lazy(() => import("../pages/PublicCourses"));
const Login         = lazy(() => import("../pages/auth/Login"));
const Register      = lazy(() => import("../pages/auth/Register"));
const VerifyOtp     = lazy(() => import("../pages/auth/VerifyOtp"));

/** Layout dùng chung cho mọi trang (Header + Footer chỉ render 1 lần) */
const RootLayout = () => (
  <div className="flex min-h-screen flex-col bg-black text-white">
    <Header />
    {/* chừa khoảng cho header/footer (có thể đổi sang pt-16/pb-12 nếu bạn không dùng CSS vars) */}
    <main className="flex-1 pt-[var(--hdr)] pb-[var(--ftr)]">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// 404
function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center text-white/80">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">404 — Page Not Found</h1>
        <p className="mt-2 opacity-70">The page you are looking for doesn’t exist.</p>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-6 text-white/80">Loading…</div>}>
      <Routes>
        {/* MỌI ROUTE ở trong đây đều dùng chung Header + Footer của RootLayout */}
        <Route element={<RootLayout />}>
          {/* Public */}
          <Route index element={<Landing />} />
          <Route path="courses" element={<PublicCourses />} />

          {/* Auth + alias */}
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/verify" element={<VerifyOtp />} />
          <Route path="signin" element={<Navigate to="/auth/login" replace />} />
          <Route path="register" element={<Navigate to="/auth/register" replace />} />

          {/* Private (bọc thêm ProtectedLayout bên trong RootLayout để vẫn dùng chung Header/Footer) */}
          <Route element={<ProtectedLayout />}>
            <Route path="dashboard" element={<div className="p-6">Dashboard</div>} />
            <Route path="profile"   element={<div className="p-6">Trang cá nhân</div>} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
