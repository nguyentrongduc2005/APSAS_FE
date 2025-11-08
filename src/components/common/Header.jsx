import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { useUI } from "../../store/uiStore.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Header() {
  const { toggleSidebar, sidebarOpen } = useUI();
  const { user } = useAuth();

  return (
    <header className="h-14 bg-[#0f1419] border-b border-[#202934] sticky top-0 z-20">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Menu + Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Menu"
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-[#202934] bg-[#0b0f12] text-white hover:bg-[#131a22] transition"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" className="block">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="APSAS" className="h-7 w-auto" />
            <span className="font-extrabold text-xl text-white hidden sm:block">
              APSAS
            </span>
          </Link>
        </div>

        {/* Center: Search (hidden on mobile) */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="search"
              placeholder="Tìm kiếm..."
              className="w-full h-9 pl-10 pr-4 bg-[#0b0f12] border border-[#202934] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* Right: Actions + User */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="h-9 w-9 rounded-lg border border-[#202934] bg-[#0b0f12] text-white hover:bg-[#131a22] transition flex items-center justify-center"
            title="Thông báo"
          >
            🔔
          </button>
          <button
            className="h-9 w-9 rounded-lg border border-[#202934] bg-[#0b0f12] text-white hover:bg-[#131a22] transition items-center justify-center hidden sm:flex"
            title="Chủ đề"
          >
            🌙
          </button>
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-[#202934]">
            <div className="h-9 w-9 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="hidden lg:block">
              <div className="text-sm font-medium text-white leading-tight">
                {user?.name || "Người dùng"}
              </div>
              <div className="text-xs text-gray-400 leading-tight">
                {user?.role === "admin" && "Quản trị viên"}
                {user?.role === "lecturer" && "Giảng viên"}
                {user?.role === "student" && "Sinh viên"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
