// src/components/common/MainAppLayout.jsx
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Các component UI
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useUI } from "../../store/uiStore";
import Navbar from "./Navbar";

export default function MainAppLayout() {
  const { isAuthenticated, isLoading, user, token } = useAuth();
  const { sidebarOpen } = useUI();

  // Debug log để kiểm tra
  console.log("MainAppLayout - Debug:", {
    isAuthenticated,
    isLoading,
    user,
    token: token ? `${token.substring(0, 20)}...` : null,
  });

  if (isLoading) {
    return (
      <div
        style={{
          /* Full page loader */ placeItems: "center",
          display: "grid",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        Đang tải...
      </div>
    );
  }

  if (!isAuthenticated) {
    // === TRƯỜNG HỢP 1: CHƯA ĐĂNG NHẬP ===
    // Chỉ render Navbar công khai + Trang (Outlet) + Footer
    return (
      <div className="public-wrapper">
        <Navbar />
        <main style={{ paddingTop: "64px" }}>
          {/* paddingTop để tránh bị Navbar (fixed) che */}
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  // === TRƯỜNG HỢP 2: ĐÃ ĐĂNG NHẬP ===
  // Render layout "Protected" (Header + Sidebar + Trang + Footer)
  // Đây là layout grid từ file ProtectedLayout cũ của bạn.
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: sidebarOpen ? "240px 1fr" : "0 1fr",
        minHeight: "100vh",
        background: "#0b0f12",
        transition: "grid-template-columns 200ms ease",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          borderRight: sidebarOpen ? "1px solid #202934" : "none",
        }}
      >
        <div
          style={{
            width: 240,
            transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 200ms ease",
          }}
        >
          <Sidebar />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateRows: "56px 1fr auto" }}>
        <Header />
        <main style={{ padding: 20, color: "#eaf0f6" }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
