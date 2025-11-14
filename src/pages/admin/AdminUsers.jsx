// src/pages/admin/AdminUsers.jsx
import { useMemo, useState } from "react";
import { MOCK_USERS } from "../../data/mockUsers";

const roleColor = {
  admin: "bg-purple-500/15 text-purple-300 border border-purple-500/30",
  lecturer: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  teacher: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
  student: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  provider: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
};

function Badge({ children, tone = "blue", className = "" }) {
  const map = {
    green:
      "bg-green-500/15 text-green-300 border border-green-500/30",
    red: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
    gray:
      "bg-slate-500/15 text-slate-300 border border-slate-500/30",
    blue: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-md text-xs ${map[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

function Toolbar({ q, setQ, role, setRole, status, setStatus, onCreate }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm theo tên / email / ID"
        className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200 placeholder:text-slate-500 w-80 outline-none focus:border-sky-600"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200"
      >
        <option value="">Tất cả vai trò</option>
        <option value="student">Student</option>
        <option value="lecturer">Lecturer</option>
        <option value="provider">Provider</option>
        <option value="admin">Admin</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200"
      >
        <option value="">Trạng thái</option>
        <option value="active">Đang hoạt động</option>
        <option value="blocked">Bị khóa</option>
      </select>

      <button
        onClick={onCreate}
        className="ml-auto px-3 py-2 rounded-md bg-sky-600 hover:bg-sky-500 text-white"
      >
        + Tạo người dùng
      </button>
    </div>
  );
}

function EditModal({ open, onClose, onSave, user }) {
  const [form, setForm] = useState(
    user ?? {
      name: "",
      email: "",
      role: "student",
      status: "active",
      verified: false,
    }
  );

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
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400">Email</label>
            <input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400">Vai trò</label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
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
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
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
              onChange={(e) =>
                setForm({ ...form, verified: e.target.checked })
              }
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

export default function AdminUsers() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [items, setItems] = useState(MOCK_USERS);
  const [modal, setModal] = useState({ open: false, data: null });

  const filtered = useMemo(() => {
    return items
      .filter((u) => (role ? u.role === role : true))
      .filter((u) => (status ? u.status === status : true))
      .filter((u) => {
        if (!q.trim()) return true;
        const s = (u.name + u.email + u.id).toLowerCase();
        return s.includes(q.toLowerCase());
      });
  }, [q, role, status, items]);

  const openCreate = () => setModal({ open: true, data: null });
  const openEdit = (u) => setModal({ open: true, data: u });
  const closeModal = () => setModal({ open: false, data: null });

  const saveUser = (data) => {
    if (modal.data) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === modal.data.id ? { ...it, ...data } : it
        )
      );
    } else {
      const newId = "U" + String(items.length + 1).padStart(3, "0");
      setItems((prev) => [
        ...prev,
        {
          ...data,
          id: newId,
          createdAt: new Date().toISOString().slice(0, 10),
        },
      ]);
    }
    closeModal();
  };

  const toggleLock = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? {
              ...it,
              status: it.status === "active" ? "blocked" : "active",
            }
          : it
      )
    );
  };

  const removeUser = (id) => {
    if (confirm("Xóa người dùng này?")) {
      setItems((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold text-slate-100 mb-4">
        Quản lý tài khoản người dùng
      </h1>

      <div className="rounded-xl border border-[#1e2630] bg-[#0b0f14] p-4">
        <Toolbar
          q={q}
          setQ={setQ}
          role={role}
          setRole={setRole}
          status={status}
          setStatus={setStatus}
          onCreate={openCreate}
        />

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm text-slate-300">
            <thead className="text-xs uppercase bg-[#0f141a] text-slate-400">
              <tr>
                <th className="px-3 py-3 text-left">Người dùng</th>
                <th className="px-3 py-3 text-left">Email</th>
                <th className="px-3 py-3 text-left">Vai trò</th>
                <th className="px-3 py-3 text-left">Trạng thái</th>
                <th className="px-3 py-3 text-left">Ngày tạo</th>
                <th className="px-3 py-3 text-left">Hoạt động gần</th>
                <th className="px-3 py-3 text-right">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-t border-[#1f2937] hover:bg-white/5"
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700/60 flex items-center justify-center text-xs">
                        {u.name.split(" ").slice(-1)[0][0]}
                      </div>
                      <div className="leading-tight">
                        <div className="text-slate-100">{u.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {u.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3">{u.email}</td>

                  <td className="px-3 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs ${roleColor[u.role]}`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="px-3 py-3">
                    {u.status === "active" ? (
                      <Badge tone="green">Active</Badge>
                    ) : (
                      <Badge tone="red">Blocked</Badge>
                    )}
                    {!u.verified && (
                      <Badge tone="gray" className="ml-2">
                        Unverified
                      </Badge>
                    )}
                  </td>

                  <td className="px-3 py-3">{u.createdAt}</td>
                  <td className="px-3 py-3">
                    {u.lastLogin || "-"}
                  </td>

                  <td className="px-3 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        className="px-2 py-1 rounded bg-[#101826] border border-[#223]"
                        onClick={() => openEdit(u)}
                      >
                        Sửa
                      </button>
                      <button
                        className="px-2 py-1 rounded bg-[#101826] border border-[#223]"
                        onClick={() => toggleLock(u.id)}
                      >
                        {u.status === "active" ? "Khóa" : "Mở khóa"}
                      </button>
                      <button
                        className="px-2 py-1 rounded bg-[#2a0e12] border border-rose-900 text-rose-300"
                        onClick={() => removeUser(u.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-slate-500"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditModal
        open={modal.open}
        onClose={closeModal}
        onSave={saveUser}
        user={modal.data}
      />
    </div>
  );
}
