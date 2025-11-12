// src/pages/admin/AdminAccessPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  ShieldBan,
  ShieldCheck,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  X,
} from "lucide-react";

/**
 * AdminAccessPage (JS/JSX)
 * - Trang quản lý tài khoản người dùng cho admin
 * - Có: lọc/tìm/ sort, chọn nhiều, chặn/bỏ chặn/xóa, phân trang
 * - Popup: Tạo người dùng mới, Sửa người dùng
 * - Không đụng file cũ: chỉ là 1 file page độc lập
 *
 * LƯU Ý: cần cài icon:
 *   npm i lucide-react
 */

// ====== Cấu hình mock (thay bằng API thật khi sẵn sàng) ======
const ROLES = ["student", "teacher", "moderator", "admin"];
const STATUSES = ["Active", "Blocked"];

const seedUsers = [
  {
    id: "u1",
    name: "Phạm D",
    email: "pham.d@gmail.com",
    roles: ["student"],
    status: "Blocked",
    createdAt: "2025-09-20",
    lastLogin: "2025-09-21 12:00",
  },
  {
    id: "u2",
    name: "Lê Văn C",
    email: "levanc@gmail.com",
    roles: ["moderator", "teacher"],
    status: "Active",
    createdAt: "2025-09-05",
    lastLogin: "—",
  },
  {
    id: "u3",
    name: "Trần Thị B",
    email: "ttb@univ.edu",
    roles: ["teacher"],
    status: "Active",
    createdAt: "2025-10-08",
    lastLogin: "2025-10-30 08:12",
  },
  {
    id: "u4",
    name: "Admin Root",
    email: "admin@apsas.app",
    roles: ["admin"],
    status: "Active",
    createdAt: "2025-01-15",
    lastLogin: "2025-10-30 10:05",
  },
];

// ====== UI helpers ======
function RoleBadge({ role }) {
  const map = {
    student: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
    teacher: "bg-purple-500/15 text-purple-300 border border-purple-500/30",
    moderator: "bg-yellow-500/15 text-yellow-300 border border-yellow-500/30",
    admin: "bg-red-500/15 text-red-300 border border-red-500/30",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[role]}`}>{role}</span>
  );
}

function StatusBadge({ status }) {
  const cls =
    status === "Active"
      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
      : "bg-rose-500/15 text-rose-300 border border-rose-500/30";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>{status}</span>;
}

function SimpleSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center justify-between gap-2 w-56 px-4 h-10 rounded-lg bg-[#0f141a] border border-white/10 text-white/80 hover:bg-white/5"
      >
        <span className="truncate text-sm">
          {value ? options.find((o) => o.value === value)?.label : placeholder || "Chọn"}
        </span>
        <ChevronDown className="w-4 h-4 opacity-70" />
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-56 rounded-lg bg-[#0f141a] border border-white/10 shadow-2xl">
          <ul className="py-1 max-h-64 overflow-auto">
            {options.map((o) => (
              <li key={o.value}>
                <button
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-white/5 ${
                    value === o.value ? "text-white" : "text-white/70"
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SolidButton({ onClick, children, intent = "neutral", icon, className = "" }) {
  const color = {
    neutral: "bg-white/5 hover:bg-white/10 text-white",
    danger: "bg-rose-600 hover:bg-rose-500 text-white",
    success: "bg-emerald-600 hover:bg-emerald-500 text-white",
    primary: "bg-sky-600 hover:bg-sky-500 text-white",
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 h-10 rounded-lg border border-white/10 ${color[intent]} ${className}`}
    >
      {icon}
      <span className="text-sm font-medium">{children}</span>
    </button>
  );
}

function Check({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-5 h-5 rounded border border-white/20 bg-[#0c1116] flex items-center justify-center"
      aria-pressed={checked}
    >
      {checked ? <CheckSquare className="w-4 h-4 text-sky-400" /> : <Square className="w-4 h-4 text-white/40" />}
    </button>
  );
}

// ====== Modal: Tạo người dùng ======
function CreateUserModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    status: "Active",
    roles: [],
  });
  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  if (!open) return null;

  const submit = () => {
    const id = `u_${Date.now()}`;
    const payload = {
      id,
      name: form.name.trim() || "Nguyễn Văn A",
      email: form.email.trim() || "user@gmail.com",
      roles: form.roles.length ? form.roles : ["student"],
      status: form.status,
      createdAt: new Date().toISOString().slice(0, 10),
      lastLogin: "—",
    };
    onCreate(payload);
    onClose();
  };

  const toggleRole = (role) => {
    setForm((s) => ({
      ...s,
      roles: s.roles.includes(role) ? s.roles.filter((r) => r !== role) : [...s.roles, role],
    }));
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[800px] max-w-[95vw] rounded-xl border border-white/10 bg-[#0d1218] text-white shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <h3 className="text-lg font-semibold">Tạo người dùng mới</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm mb-1 text-white/70">Họ tên</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full h-10 rounded-lg bg-[#0f141a] border border-white/10 px-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white/70">Email</label>
              <input
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="user@gmail.com"
                className="w-full h-10 rounded-lg bg-[#0f141a] border border-white/10 px-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white/70">Mật khẩu</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="Tối thiểu 8 ký tự"
                className="w-full h-10 rounded-lg bg-[#0f141a] border border-white/10 px-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white/70">Trạng thái</label>
              <div className="relative">
                <select
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                  className="w-full h-10 appearance-none rounded-lg bg-[#0f141a] border border-white/10 px-3 text-sm"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3 pointer-events-none opacity-70" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/70">Vai trò</label>
            <div className="rounded-xl border border-white/10 p-2 bg-[#0f141a]">
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => toggleRole(r)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 last:mb-0 hover:bg-white/5 ${
                    form.roles.includes(r) ? "bg-white/10" : ""
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-1">Nhấn để chọn/bỏ chọn vai trò</p>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-white/10 flex items-center justify-end gap-2">
          <button onClick={onClose} className="h-10 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
            Hủy
          </button>
          <button onClick={submit} className="h-10 px-5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white">
            Tạo
          </button>
        </div>
      </div>
    </div>
  );
}

// ====== Modal: Sửa người dùng ======
function EditUserModal({ open, user, onClose, onSave, onResetPwd }) {
  const [form, setForm] = useState({ name: "", email: "", status: "Active", roles: [] });
  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  useEffect(() => {
    if (user && open) {
      setForm({ name: user.name, email: user.email, status: user.status, roles: [...user.roles] });
    }
  }, [user, open]);

  if (!open || !user) return null;

  const toggleRole = (role) => {
    setForm((s) => ({
      ...s,
      roles: s.roles.includes(role) ? s.roles.filter((r) => r !== role) : [...s.roles, role],
    }));
  };

  const save = () => {
    onSave({
      ...user,
      name: form.name.trim(),
      email: form.email.trim(),
      status: form.status,
      roles: form.roles,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[800px] max-w-[95vw] rounded-xl border border-white/10 bg-[#0d1218] text-white shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <h3 className="text-lg font-semibold">Sửa người dùng</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm mb-1 text-white/70">Họ tên</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="w-full h-10 rounded-lg bg-[#0f141a] border border-white/10 px-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white/70">Email</label>
              <input
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="w-full h-10 rounded-lg bg-[#0f141a] border border-white/10 px-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white/70">Trạng thái</label>
              <div className="relative">
                <select
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                  className="w-full h-10 appearance-none rounded-lg bg-[#0f141a] border border-white/10 px-3 text-sm"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3 pointer-events-none opacity-70" />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm mb-2 text-white/70">Vai trò</label>
              <div className="rounded-xl border border-white/10 p-2 bg-[#0f141a]">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => toggleRole(r)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 last:mb-0 hover:bg-white/5 ${
                      form.roles.includes(r) ? "bg-white/10" : ""
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="text-xs text-rose-300 mt-1">Cẩn trọng khi gán role admin</p>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => onResetPwd(user)}
            className="h-10 px-4 rounded-lg bg-rose-800/60 hover:bg-rose-700 text-rose-50 border border-white/10"
          >
            Đặt lại mật khẩu
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="h-10 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
              Đóng
            </button>
            <button onClick={save} className="h-10 px-5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== Bảng người dùng ======
function UsersTable({ data, pageSize = 10, onRowBlock, onRowUnblock, onRowEdit, onRowDelete }) {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const pages = Math.max(1, Math.ceil(data.length / pageSize));
  const start = (page - 1) * pageSize;
  const view = data.slice(start, start + pageSize);

  useEffect(() => setSelected([]), [page]);

  const allOnPageIds = view.map((u) => u.id);
  const allSelected = allOnPageIds.every((id) => selected.includes(id)) && allOnPageIds.length > 0;

  const toggleAllOnPage = (checked) => {
    if (checked) setSelected((prev) => Array.from(new Set([...prev, ...allOnPageIds])));
    else setSelected((prev) => prev.filter((id) => !allOnPageIds.includes(id)));
  };

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("admin-selected-change", { detail: selected }));
  }, [selected]);

  return (
    <div className="mt-6">
      <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0b1015]">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-white/70">
            <tr>
              <th className="py-3 pl-4 pr-2 text-left w-10">
                <Check checked={allSelected} onChange={toggleAllOnPage} />
              </th>
              <th className="py-3 px-2 text-left font-medium">Người dùng</th>
              <th className="py-3 px-2 text-left font-medium">Email</th>
              <th className="py-3 px-2 text-left font-medium">Vai trò</th>
              <th className="py-3 px-2 text-left font-medium">Trạng thái</th>
              <th className="py-3 px-2 text-left font-medium">Ngày tạo</th>
              <th className="py-3 px-2 text-left font-medium">Đăng nhập cuối</th>
              <th className="py-3 px-4 text-right font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {view.map((u) => {
              const isChecked = selected.includes(u.id);
              return (
                <tr key={u.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="py-3 pl-4 pr-2">
                    <Check
                      checked={isChecked}
                      onChange={(v) =>
                        setSelected((prev) => (v ? [...prev, u.id] : prev.filter((id) => id !== u.id)))
                      }
                    />
                  </td>
                  <td className="py-3 px-2 text-white/90">{u.name}</td>
                  <td className="py-3 px-2 text-white/70">{u.email}</td>
                  <td className="py-3 px-2 space-x-2">
                    {u.roles.map((r) => (
                      <RoleBadge key={r} role={r} />
                    ))}
                  </td>
                  <td className="py-3 px-2">
                    <StatusBadge status={u.status} />
                  </td>
                  <td className="py-3 px-2 text-white/70">{u.createdAt}</td>
                  <td className="py-3 px-2 text-white/70">{u.lastLogin}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 justify-end">
                      {u.status === "Active" ? (
                        <SolidButton
                          onClick={() => onRowBlock(u.id)}
                          className="h-9 px-3"
                          intent="neutral"
                          icon={<ShieldBan className="w-4 h-4" />}
                        >
                          Chặn
                        </SolidButton>
                      ) : (
                        <SolidButton
                          onClick={() => onRowUnblock(u.id)}
                          className="h-9 px-3"
                          intent="success"
                          icon={<ShieldCheck className="w-4 h-4" />}
                        >
                          Bỏ chặn
                        </SolidButton>
                      )}
                      <SolidButton onClick={() => onRowEdit(u.id)} className="h-9 px-3" intent="neutral">
                        Sửa
                      </SolidButton>
                      <SolidButton
                        onClick={() => onRowDelete(u.id)}
                        className="h-9 px-3"
                        intent="danger"
                        icon={<Trash2 className="w-4 h-4" />}
                      >
                        Xóa
                      </SolidButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-white/70">
        <div>
          <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 border border-white/10">
            {view.length} mục
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>
            {page}/{pages}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-40"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Trang trước"
            >
              <ChevronLeft className="w-4 h-4 mx-auto" />
            </button>
            <button
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-40"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              aria-label="Trang sau"
            >
              <ChevronRight className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== Page chính ======
export default function AdminAccessPage() {
  const [users, setUsers] = useState(seedUsers);

  const [q, setQ] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("created_desc"); // created_desc | created_asc
  const [selectedIds, setSelectedIds] = useState([]);

  // Modal Create
  const [openCreate, setOpenCreate] = useState(false);

  // Modal Edit
  const [openEdit, setOpenEdit] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const handle = (e) => setSelectedIds(e.detail || []);
    window.addEventListener("admin-selected-change", handle);
    return () => window.removeEventListener("admin-selected-change", handle);
  }, []);

  const filtered = useMemo(() => {
    let out = [...users];
    if (q) {
      const s = q.toLowerCase();
      out = out.filter((u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
    }
    if (role) out = out.filter((u) => u.roles.includes(role));
    if (status) out = out.filter((u) => u.status === status);
    if (sort === "created_desc") out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    if (sort === "created_asc") out.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    return out;
  }, [users, q, role, status, sort]);

  // Hành động hàng loạt
  const blockMany = () =>
    selectedIds.length && setUsers((prev) => prev.map((u) => (selectedIds.includes(u.id) ? { ...u, status: "Blocked" } : u)));
  const unblockMany = () =>
    selectedIds.length && setUsers((prev) => prev.map((u) => (selectedIds.includes(u.id) ? { ...u, status: "Active" } : u)));
  const deleteMany = () => selectedIds.length && setUsers((prev) => prev.filter((u) => !selectedIds.includes(u.id)));

  // Hành động từng hàng
  const onRowBlock = (id) => setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: "Blocked" } : u)));
  const onRowUnblock = (id) => setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: "Active" } : u)));
  const onRowEdit = (id) => {
    const u = users.find((x) => x.id === id);
    if (u) {
      setEditUser(u);
      setOpenEdit(true);
    }
  };
  const onRowDelete = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));

  // Tạo / Sửa / Reset mật khẩu
  const onCreateUser = (payload) => setUsers((prev) => [payload, ...prev]);
  const onSaveEditUser = (updated) => setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  const onResetPassword = (user) => {
    console.log("Reset password for:", user);
    // TODO: gọi API reset password
  };

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Quản lý tài khoản người dùng</h1>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-white/50" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo tên hoặc email..."
            className="pl-9 pr-3 h-10 w-72 rounded-lg bg-[#0f141a] border border-white/10 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-600/50"
          />
        </div>

        <SimpleSelect
          value={role}
          onChange={setRole}
          placeholder="Tất cả vai trò"
          options={[{ label: "Tất cả vai trò", value: "" }, ...ROLES.map((r) => ({ label: r, value: r }))]}
        />
        <SimpleSelect
          value={status}
          onChange={setStatus}
          placeholder="Tất cả trạng thái"
          options={[{ label: "Tất cả trạng thái", value: "" }, ...STATUSES.map((s) => ({ label: s, value: s }))]}
        />
        <SimpleSelect
          value={sort}
          onChange={setSort}
          placeholder="Sắp xếp"
          options={[
            { label: "Mới tạo", value: "created_desc" },
            { label: "Cũ nhất", value: "created_asc" },
          ]}
        />

        <div className="grow" />

        {/* Hành động hàng loạt + tạo mới */}
        <div className="flex items-center gap-2">
          <SolidButton onClick={blockMany} intent="neutral" icon={<ShieldBan className="w-4 h-4" />}>
            Chặn
          </SolidButton>
          <SolidButton onClick={unblockMany} intent="success" icon={<ShieldCheck className="w-4 h-4" />}>
            Bỏ chặn
          </SolidButton>
          <SolidButton onClick={deleteMany} intent="danger" icon={<Trash2 className="w-4 h-4" />}>
            Xóa
          </SolidButton>
          <SolidButton onClick={() => setOpenCreate(true)} intent="primary" icon={<Plus className="w-4 h-4" />}>
            +Tạo người dùng
          </SolidButton>
        </div>
      </div>

      {/* Bảng */}
      <UsersTable
        data={filtered}
        pageSize={10}
        onRowBlock={onRowBlock}
        onRowUnblock={onRowUnblock}
        onRowEdit={onRowEdit}
        onRowDelete={onRowDelete}
      />

      {/* Modal Tạo */}
      <CreateUserModal open={openCreate} onClose={() => setOpenCreate(false)} onCreate={onCreateUser} />

      {/* Modal Sửa */}
      <EditUserModal
        open={openEdit}
        user={editUser}
        onClose={() => setOpenEdit(false)}
        onSave={onSaveEditUser}
        onResetPwd={onResetPassword}
      />
    </div>
  );
}
