// src/pages/admin/AdminUsers.jsx
import { useState, useEffect } from "react";
import adminUserService from "../../services/adminUserService";
import UserToolbar from "../../components/admin/UserToolbar";
import UserTable from "../../components/admin/UserTable";
import UserEditModal from "../../components/admin/UserEditModal";

export default function AdminUsers() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, data: null });

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const result = await adminUserService.getUsers({
        keyword: q,
        role,
        status,
      });
      setUsers(result.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, role, status]);

  const openCreate = () => setModal({ open: true, data: null });
  const openEdit = (u) => setModal({ open: true, data: u });
  const closeModal = () => setModal({ open: false, data: null });

  const saveUser = async (data) => {
    try {
      if (modal.data) {
        // Update existing user
        await adminUserService.updateUser(modal.data.id, data);
        setUsers((prev) =>
          prev.map((it) => (it.id === modal.data.id ? { ...it, ...data } : it))
        );
      } else {
        // Create new user
        const response = await adminUserService.createUser(data);
        setUsers((prev) => [...prev, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Lưu thất bại. Vui lòng thử lại.");
    }
  };

  const toggleLock = async (id) => {
    try {
      const user = users.find((u) => u.id === id);
      const newStatus = user.status === "active" ? "blocked" : "active";

      await adminUserService.toggleUserStatus(id, newStatus);

      setUsers((prev) =>
        prev.map((it) => (it.id === id ? { ...it, status: newStatus } : it))
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
      alert("Thao tác thất bại. Vui lòng thử lại.");
    }
  };

  const removeUser = async (id) => {
    if (!window.confirm("Xóa người dùng này?")) return;

    try {
      await adminUserService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Xóa thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold text-slate-100 mb-4">
        Quản lý tài khoản người dùng
      </h1>

      <div className="rounded-xl border border-[#1e2630] bg-[#0b0f14] p-4">
        <UserToolbar
          q={q}
          setQ={setQ}
          role={role}
          setRole={setRole}
          status={status}
          setStatus={setStatus}
          onCreate={openCreate}
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 mt-4">Đang tải...</p>
          </div>
        ) : (
          <UserTable
            users={users}
            onEdit={openEdit}
            onToggleLock={toggleLock}
            onDelete={removeUser}
          />
        )}
      </div>

      <UserEditModal
        open={modal.open}
        onClose={closeModal}
        onSave={saveUser}
        user={modal.data}
      />
    </div>
  );
}
