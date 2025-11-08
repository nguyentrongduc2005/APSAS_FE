import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { useUI } from "../../store/uiStore.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Header() {
  const { toggleSidebar, sidebarOpen } = useUI();
  const { user } = useAuth();

  return (
    <header className="app-header">
      <div className="container header-grid">
        {/* Brand */}
        <div className="brand">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Menu"
            className="
              inline-flex items-center justify-center
              h-9 w-9 rounded-xl border border-[#2a3441] bg-[#131a22] text-white
              p-0 m-0 leading-none align-middle
            "
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="block"
              aria-hidden="true"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <img
            src={logo}
            alt="APSAS"
            className="h-7 w-auto block align-middle"
          />
          <span className="font-extrabold text-xl tracking-wide leading-none">
            APSAS
          </span>
        </div>

        {/* Search */}
        <label className="search" aria-label="Search">
          <span className="search-ico">🔍</span>
          <input placeholder="Search" />
        </label>

        {/* Actions + User */}
        <div className="actions">
          <button className="icon-btn" title="Notifications">
            🔔
          </button>
          <button className="icon-btn" title="Theme">
            🌙
          </button>
          <div className="user">
            <div className="avatar" />
            <div className="user-info">
              <strong>Họ và tên</strong>
              <small>Sinh viên Công nghệ</small>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
