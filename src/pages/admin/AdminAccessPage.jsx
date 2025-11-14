// src/pages/admin/AdminAccessPage.jsx
import React, { useMemo, useState } from "react";
import AdminAccessHeader from "../../components/admin/AdminAccessHeader";
import AdminAccessFilter from "../../components/admin/AdminAccessFilter";
import AdminAccessTable from "../../components/admin/AdminAccessTable";
import AdminAccessModal from "../../components/admin/AdminAccessModal";

// Dữ liệu mock
const INITIAL_PERMISSIONS = [
  {
    id: 1,
    role: "Admin",
    module: "Quản lý người dùng",
    canView: true,
    canEdit: true,
    canDelete: true,
  },
  {
    id: 2,
    role: "Admin",
    module: "Quản lý khóa học",
    canView: true,
    canEdit: true,
    canDelete: true,
  },
  {
    id: 3,
    role: "Teacher",
    module: "Khóa học của tôi",
    canView: true,
    canEdit: true,
    canDelete: false,
  },
  {
    id: 4,
    role: "Teacher",
    module: "Điểm sinh viên",
    canView: true,
    canEdit: true,
    canDelete: false,
  },
  {
    id: 5,
    role: "Student",
    module: "Khóa học đã đăng ký",
    canView: true,
    canEdit: false,
    canDelete: false,
  },
  {
    id: 6,
    role: "Student",
    module: "Lịch học",
    canView: true,
    canEdit: false,
    canDelete: false,
  },
  {
    id: 7,
    role: "Staff",
    module: "Hỗ trợ người dùng",
    canView: true,
    canEdit: true,
    canDelete: false,
  },
];

export default function AdminAccessPage() {
  const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS);
  const [selectedRole, setSelectedRole] = useState("Tất cả");
  const [searchText, setSearchText] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" | "edit"
  const [editingRecord, setEditingRecord] = useState(null);

  const handleTogglePermission = (id, key) => {
    setPermissions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [key]: !item[key] } : item
      )
    );
  };

  const filteredPermissions = useMemo(() => {
    return permissions.filter((item) => {
      if (selectedRole !== "Tất cả" && item.role !== selectedRole) return false;

      if (!searchText.trim()) return true;
      const text = searchText.toLowerCase();
      return (
        item.module.toLowerCase().includes(text) ||
        item.role.toLowerCase().includes(text)
      );
    });
  }, [permissions, selectedRole, searchText]);

  // mở modal tạo mới
  const handleOpenCreate = () => {
    setModalMode("create");
    setEditingRecord(null);
    setModalOpen(true);
  };

  // mở modal sửa
  const handleOpenEdit = (row) => {
    setModalMode("edit");
    setEditingRecord(row);
    setModalOpen(true);
  };

  // lưu từ modal
  const handleSaveFromModal = (formData) => {
    if (modalMode === "create") {
      const nextId =
        permissions.length > 0
          ? Math.max(...permissions.map((p) => p.id)) + 1
          : 1;
      setPermissions((prev) => [
        ...prev,
        {
          id: nextId,
          ...formData,
        },
      ]);
    } else if (modalMode === "edit" && editingRecord) {
      setPermissions((prev) =>
        prev.map((item) =>
          item.id === editingRecord.id ? { ...item, ...formData } : item
        )
      );
    }

    setModalOpen(false);
    setEditingRecord(null);
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-gray-200">
      <AdminAccessHeader />

      <div className="bg-gray-800 border border-gray-700 rounded p-4 shadow-md">
        {/* Thanh filter + nút Thêm */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <AdminAccessFilter
            selectedRole={selectedRole}
            onChangeRole={setSelectedRole}
            searchText={searchText}
            onChangeSearch={setSearchText}
          />

          <button
            type="button"
            onClick={handleOpenCreate}
            className="self-start md:self-auto px-4 py-2 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-500"
          >
            + Thêm quyền mới
          </button>
        </div>

        <AdminAccessTable
          data={filteredPermissions}
          onTogglePermission={handleTogglePermission}
          onEditRow={handleOpenEdit}
        />
      </div>

      {/* Modal tạo / sửa */}
      <AdminAccessModal
        open={modalOpen}
        mode={modalMode}
        initialData={editingRecord}
        onClose={() => {
          setModalOpen(false);
          setEditingRecord(null);
        }}
        onSave={handleSaveFromModal}
      />
    </div>
  );
}
