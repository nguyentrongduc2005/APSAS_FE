import { useState, useEffect } from "react";

export default function UserEditModal({ open, onClose, onSave, user }) {
  const [form, setForm] = useState(
    user ?? {
      name: "",
      email: "",
      role: "student",
      status: "active",
      verified: false,
    }
  );

  useEffect(() => {
    if (user) {
      setForm(user);
    } else {
      setForm({
        name: "",
        email: "",
        role: "student",
        status: "active",
        verified: false,
      });
    }
  }, [user, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="w-[720px] rounded-xl bg-[#0b0f14] border border-[#1e2630] p-5">
        <h3 className="text-slate-100 text-lg font-semibold">
          {user ? "Sửa người dùng" : "Tạo người dùng mới"}
        </h3>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm text-slate-400">Họ tên</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400">Vai trò</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200"
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="provider">Provider</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-400">Trạng thái</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200"
            >
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          <div className="col-span-2 flex items-center gap-2">
            <input
              id="verified"
              type="checkbox"
              checked={form.verified}
              onChange={(e) => setForm({ ...form, verified: e.target.checked })}
            />
            <label htmlFor="verified" className="text-slate-300 text-sm">
              Email đã xác thực
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-3 py-2 rounded-md bg-slate-700/50 text-slate-200"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-3 py-2 rounded-md bg-sky-600 hover:bg-sky-500 text-white"
            onClick={() => onSave(form)}
          >
            {user ? "Lưu" : "Tạo"}
          </button>
        </div>
      </div>
    </div>
  );
}
