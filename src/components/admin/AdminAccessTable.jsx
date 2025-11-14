// src/components/admin/AdminAccessTable.jsx
import React from "react";

export default function AdminAccessTable({ data, onTogglePermission, onEditRow }) {
  if (!data || data.length === 0) {
    return (
      <div className="border border-gray-700 rounded p-4 text-sm text-gray-400 bg-gray-900">
        Không có bản ghi phù hợp.
      </div>
    );
  }

  return (
    <div className="border border-gray-700 rounded overflow-x-auto bg-gray-900">
      <table className="min-w-full text-sm text-gray-200">
        <thead className="bg-gray-800 text-gray-300 border-b border-gray-700">
          <tr>
            <th className="px-3 py-2 text-left">Vai trò</th>
            <th className="px-3 py-2 text-left">Module</th>
            <th className="px-3 py-2 text-center">Xem</th>
            <th className="px-3 py-2 text-center">Sửa</th>
            <th className="px-3 py-2 text-center">Xóa</th>
            <th className="px-3 py-2 text-center w-28">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-t border-gray-700 hover:bg-gray-800/70 transition-colors"
            >
              <td className="px-3 py-2">{row.role}</td>
              <td className="px-3 py-2">{row.module}</td>
              {["canView", "canEdit", "canDelete"].map((permKey) => (
                <td key={permKey} className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={row[permKey]}
                    onChange={() => onTogglePermission(row.id, permKey)}
                    className="rounded border-gray-600 bg-gray-800 text-blue-500"
                  />
                </td>
              ))}

              <td className="px-3 py-2 text-center">
                <button
                  type="button"
                  onClick={() => onEditRow && onEditRow(row)}
                  className="px-3 py-1 rounded text-xs border border-gray-500 bg-gray-800 hover:bg-gray-700"
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
