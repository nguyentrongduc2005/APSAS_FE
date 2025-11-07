// src/components/common/ProtectedLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/authStore.js";
import { fetchMe } from "../../services/authService.js";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import { useUI } from "../../store/uiStore.js";


export default function ProtectedLayout({ allow }) {
  const nav = useNavigate();
  const { sidebarOpen, closeSidebar } = useUI(); 

  // Một số dự án đặt tên load() hoặc loadFromStorage(), clear() hoặc clearAuth().
  // Lấy cả 2 để tương thích.
  const {
    token,
    user,
    load,
    loadFromStorage,
    clear,
    clearAuth,
  } = useAuth();

  const loadFn = loadFromStorage || load;
  const clearFn = clearAuth || clear;

  const [ready, setReady] = useState(false);

  // 1) Đọc token/user từ localStorage vào store (nếu có hàm)
  useEffect(() => {
    if (loadFn) loadFn();
  }, [loadFn]);

  // 2) Xác thực + điều hướng
  useEffect(() => {
    (async () => {
      // Chưa có token -> về login
      if (!token) {
        nav("/auth/login", { replace: true });
        return;
      }

      // Xác thực token (stub/BE thật)
      const me = await fetchMe();
      if (!me) {
        if (clearFn) clearFn();
        nav("/auth/login", { replace: true });
        return;
      }

      // Nếu có cấu hình allow theo role -> chặn sai quyền
      if (allow && !allow.includes(me.role)) {
        nav("/403", { replace: true });
        return;
      }

      setReady(true);
    })();
  }, [token, allow, nav, clearFn]);

  // 3) Loader tránh màn hình trắng khi đang chờ
  if (!ready) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          color: "#eaf0f6",
          background: "#0b0f12",
        }}
      >
        Đang tải…
      </div>
    );
  }

  // 4) Khung UI chung + trang con
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: sidebarOpen ? "240px 1fr" : "0 1fr",
        minHeight: "100vh",
        background: "#0b0f12",
        transition:"grid-template-columns 200ms ease"
      }}
    >
       <div style={{ overflow:"hidden", borderRight: sidebarOpen ? "1px solid #202934" : "none" }}>
        <div
          style={{
            width:240,
            transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)", // 👈 trượt
            transition:"transform 200ms ease"
          }}
        >
          <Sidebar/>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateRows:"56px 1fr auto"}}>
        <Header />
        <main style={{ padding: 20, color: "#eaf0f6" }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
