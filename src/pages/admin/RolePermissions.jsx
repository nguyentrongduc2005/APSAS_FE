import { useState } from "react";
import { Users } from "lucide-react";

function RolePermissions() {
  const [activeTab, setActiveTab] = useState("roles");

  // Mock data for roles
  const roles = [
    {
      id: 1,
      name: "Quản trị viên",
      description: "Toàn quyền quản lý hệ thống",
      userCount: 3,
    },
    {
      id: 2,
      name: "Giảng viên",
      description: "Quản lý bài tập và điểm sinh viên",
      userCount: 12,
    },
    {
      id: 3,
      name: "Sinh viên",
      description: "Nộp bài và xem kết quả",
      userCount: 156,
    },
  ];

  // Mock data for permissions
  const permissions = [
    {
      id: 1,
      name: "Xem danh sách người dùng",
      description: "Cho phép xem danh sách tất cả người dùng trong hệ thống",
    },
    {
      id: 2,
      name: "Tạo người dùng mới",
      description: "Cho phép thêm người dùng mới vào hệ thống",
    },
    {
      id: 3,
      name: "Chỉnh sửa người dùng",
      description: "Cho phép chỉnh sửa thông tin người dùng",
    },
    {
      id: 4,
      name: "Xóa người dùng",
      description: "Cho phép xóa người dùng khỏi hệ thống",
    },
    {
      id: 5,
      name: "Xem danh sách bài tập",
      description: "Cho phép xem tất cả bài tập trên hệ thống",
    },
    {
      id: 6,
      name: "Tạo bài tập mới",
      description: "Cho phép tạo bài tập mới",
    },
    {
      id: 7,
      name: "Chấm điểm tự động",
      description: "Cho phép sử dụng hệ thống chấm điểm tự động",
    },
    {
      id: 8,
      name: "Xem báo cáo",
      description: "Cho phép xem các báo cáo và thống kê",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Quản lý Role & Permission</h1>
          <p className="text-gray-400 text-sm">
            Xem thông tin về vai trò và quyền truy cập trong hệ thống
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 bg-[#0b0f12] border border-[#202934] rounded-xl p-1 w-fit">
          <button
            onClick={() => setActiveTab("roles")}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition ${
              activeTab === "roles"
                ? "bg-[#0f1419] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Vai trò
          </button>
          <button
            onClick={() => setActiveTab("permissions")}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition ${
              activeTab === "permissions"
                ? "bg-[#0f1419] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Quyền hạn
          </button>
        </div>

        {/* Content */}
        <div className="bg-[#0b0f12] border border-[#202934] rounded-2xl overflow-hidden">
          {activeTab === "roles" ? (
            <>
              {/* Roles Header */}
              <div className="px-6 py-4 border-b border-[#202934] bg-[#0f1419]">
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      placeholder="Tìm kiếm vai trò ......."
                      className="w-full bg-[#0b0f12] border border-[#202934] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                    />
                    <svg
                      className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Roles Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0f1419] border-b border-[#202934]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Tên vai trò
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Mô tả
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Số người dùng
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#202934]">
                    {roles.map((role) => (
                      <tr
                        key={role.id}
                        className="hover:bg-[#0f1419] transition"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-white">
                            {role.name}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-400">
                            {role.description}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Users className="w-4 h-4" />
                            <span>{role.userCount}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition">
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              {/* Permissions Header */}
              <div className="px-6 py-4 border-b border-[#202934] bg-[#0f1419]">
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      placeholder="Tìm kiếm quyền ......."
                      className="w-full bg-[#0b0f12] border border-[#202934] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                    />
                    <svg
                      className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Permissions Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0f1419] border-b border-[#202934]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Tên quyền
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Mô tả
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#202934]">
                    {permissions.map((permission) => (
                      <tr
                        key={permission.id}
                        className="hover:bg-[#0f1419] transition"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-white">
                            {permission.name}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-400">
                            {permission.description}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition">
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RolePermissions;
