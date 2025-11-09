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
import StudentMyCourses from "../pages/student/MyCourses.jsx";
import StudentProgress from "../pages/student/Progress.jsx";
import LecturerMyCourses from "../pages/lecturer/MyCourses.jsx";
import LecturerAssignments from "../pages/lecturer/Assignments.jsx";
import LecturerAssignmentDetail from "../pages/lecturer/AssignmentDetail.jsx";
import Profile from "../pages/Profile.jsx";

const Dashboard = () => <div>Dashboard</div>;
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

        {/* === Các trang Student (Chỉ student) === */}
        <Route element={<AuthGuard allow={["student"]} />}>
          <Route path="student/my-courses" element={<StudentMyCourses />} />
          <Route path="student/progress" element={<StudentProgress />} />
        </Route>

        {/* === Các trang Lecturer (Chỉ lecturer/giảng viên) === */}
        <Route element={<AuthGuard allow={["lecturer"]} />}>
          <Route path="lecturer/my-courses" element={<LecturerMyCourses />} />
          <Route path="lecturer/assignments" element={<LecturerAssignments />} />
          <Route
            path="lecturer/assignments/:assignmentId"
            element={<LecturerAssignmentDetail />}
          />
          <Route
            path="lecturer/courses/create"
            element={<div>Create Course Page</div>}
          />
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
