import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/authStore";
import { NAV_BY_ROLE } from "../../constants/navConfig";
import { fetchMe, logout } from "../../services/authService";
import Header from "./Header.jsx";
import Footer from "./Footer";

export default function ProtectedLayout() {
  // const navigate = useNavigate();
  // const { user, token, loadFromStorage, clearAuth } = useAuth();
  // const [ready, setReady] = useState(false);

  // // useEffect(() => {
  // //   loadFromStorage();
  // // }, [loadFromStorage]);

  // useEffect(() => {
  //   (async () => {
  //     if (!token) {
  //       navigate("/auth/login", { replace: true });
  //       return;
  //     }
  //     const me = await fetchMe();
  //     if (!me) {
  //       clearAuth();
  //       navigate("/auth/login", { replace: true });
  //       return;
  //     }
  //     setReady(true);
  //   })();
  // }, [token, clearAuth, navigate]);

  // if (!ready) return null; // hoặc spinner

  // const navItems = NAV_BY_ROLE[user?.role] ?? [];

  return (
    <div
      className="app-shell"
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "100vh",
        background: "#0b0f12",
        color: "#eaf0f6",
      }}
    >
      {/* Main */}
      <div style={{ display: "grid", gridTemplateRows: "56px 1fr" }}>
        {/* Header */}
        <Header />
        {/* Content */}
        <main style={{ padding: 20 }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
