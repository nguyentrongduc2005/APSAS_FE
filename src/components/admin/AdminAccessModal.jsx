// src/components/admin/AdminAccessModal.jsx
import React, { useEffect, useState } from "react";

// Không import ROLE_OPTIONS nữa!
// import { ROLE_OPTIONS } from "./AdminAccessFilter";

const ROLE_OPTIONS = ["Admin", "Teacher", "Student", "Staff"];

export default function AdminAccessModal({
  open,
  mode = "create",
  initialData,
  onClose,
  onSave,
}) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    role: "Admin",
    module: "",
    canView: true,
    canEdit: true,
    canDelete: false,
  });

  useEffect(() => {
    if (open) {
      if (isEdit && initialData) {
        setForm({
          role: initialData.role,
          module: initialData.module,
          canView: initialData.canView,
          canEdit: initialData.canEdit,
          canDelete: initialData.canDelete,
        });
      } else {
        setForm({
          role: "Admin",
          module: "",
          canView: true,
          canEdit: true,
          canDelete: false,
        });
      }
    }
  }, [open, isEdit, initialData]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.module.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-4xl rounded-lg bg-gray-900 border border-gray-700 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-gray-100">
            {isEdit ? "Sửa quyền truy cập" : "Tạo quyền truy cập mới"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Vai trò */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Vai trò</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded border border-gray-700 bg-gray-800 text-gray-200 px-3 py-2 text-sm"
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Module */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Module</label>
              <input
                type="text"
                name="module"
                value={form.module}
                onChange={handleChange}
                placeholder="Ví dụ: Quản lý người dùng"
                className="w-full rounded border border-gray-700 bg-gray-800 text-gray-200 px-3 py-2 text-sm placeholder-gray-500"
              />
            </div>
          </div>

          {/* Quyền thao tác */}
          <div>
            <p className="text-sm text-gray-300 mb-2">Quyền thao tác</p>
            <div className="flex gap-6 flex-wrap">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="canView"
                  checked={form.canView}
                  onChange={handleCheckbox}
                />
                Xem
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="canEdit"
                  checked={form.canEdit}
                  onChange={handleCheckbox}
                />
                Sửa
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="canDelete"
                  checked={form.canDelete}
                  onChange={handleCheckbox}
                />
                Xóa
              </label>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-gray-200"
          >
            Đóng
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 text-white rounded"
          >
            {isEdit ? "Lưu" : "Tạo"}
          </button>
        </div>
      </div>
    </div>
  );
}
