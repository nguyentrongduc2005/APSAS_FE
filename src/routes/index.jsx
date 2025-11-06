import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicCourses from "../pages/PublicCourses";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import Landing from "@/pages/landing/Landing";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";
import ProtectedLayout from "@/components/common/ProtectedLayout.jsx";
import Layout from "@/components/common/Layout.jsx";

// demo pages – thay bằng trang thật

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route index element={<Landing />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/verify" element={<VerifyOtp />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="courses" element={<PublicCourses />} />
      </Route>

      <Route
        path="*"
        element={
          <div className="container" style={{ padding: "40px 0" }}>
            <h2>404 — Not Found</h2>
          </div>
        }
      />
    </Routes>
  );
}
