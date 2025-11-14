// src/components/admin/AdminAccessHeader.jsx
import React from "react";

export default function AdminAccessHeader() {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold mb-1">
        Quản lý quyền truy cập
      </h1>
      <p className="text-sm text-gray-600">
        Xem và chỉnh sửa quyền truy cập theo vai trò (Admin, Giảng viên, Sinh viên, Staff).
      </p>
    </div>
  );
}
