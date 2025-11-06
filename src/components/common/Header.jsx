import React from "react";
import logo from "@/assets/logo.svg";
import { Outlet } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="app-header">
        <div className="container header-grid">
          {/* Brand */}
          <div className="brand">
            <button className="icon-btn" aria-label="Menu">
              ☰
            </button>
            <img src={logo} alt="APSAS" className="logo" />
            <span className="brand-name">APSAS</span>
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
      <Outlet />
    </>
  );
}
