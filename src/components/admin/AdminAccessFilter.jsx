// src/components/admin/AdminAccessFilter.jsx
import React from "react";

const ROLE_OPTIONS = ["Tất cả", "Admin", "Teacher", "Student", "Staff"];

export default function AdminAccessFilter({
  selectedRole,
  onChangeRole,
  searchText,
  onChangeSearch,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      {/* chọn role */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-200">Vai trò:</span>
        <select
          value={selectedRole}
          onChange={(e) => onChangeRole(e.target.value)}
          className="border border-gray-700 bg-gray-800 text-gray-200 rounded px-2 py-1 text-sm"
        >
          {ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* search */}
      <div className="flex-1 md:max-w-xs">
        <input
          type="text"
          placeholder="Tìm theo module / quyền..."
          value={searchText}
          onChange={(e) => onChangeSearch(e.target.value)}
          className="w-full border border-gray-700 bg-gray-800 text-gray-200 rounded px-3 py-1 text-sm placeholder-gray-500"
        />
      </div>
    </div>
  );
}
