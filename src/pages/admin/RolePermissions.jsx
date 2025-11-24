import { useState, useEffect } from "react";
import { Users, Plus, Edit2, Trash2 } from "lucide-react";
import rolePermissionService from "../../services/rolePermissionService";

function RolePermissions() {
  const [activeTab, setActiveTab] = useState("roles");
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roleSearch, setRoleSearch] = useState("");
  const [permSearch, setPermSearch] = useState("");

  // Fetch roles from API
  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await rolePermissionService.getRoles();
      if (response.code === "ok" && response.data) {
        setRoles(response.data);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      alert("Không thể tải danh sách vai trò");
    } finally {
      setLoading(false);
    }
  };

  // Fetch permissions from API
  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const response = await rolePermissionService.getPermissions();
      if (response.code === "ok" && response.data) {
        setPermissions(response.data);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
      alert("Không thể tải danh sách quyền");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "roles") {
      fetchRoles();
    } else {
      fetchPermissions();
    }
  }, [activeTab]);

  // Filter roles by search
  const filteredRoles = roles.filter((role) =>
    role.name?.toLowerCase().includes(roleSearch.toLowerCase()) ||
    role.description?.toLowerCase().includes(roleSearch.toLowerCase())
  );

  // Filter permissions by search
  const filteredPermissions = permissions.filter((perm) =>
    perm.name?.toLowerCase().includes(permSearch.toLowerCase()) ||
    perm.description?.toLowerCase().includes(permSearch.toLowerCase())
  );

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
                <div className="flex items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      placeholder="Tìm kiếm vai trò ......."
                      value={roleSearch}
                      onChange={(e) => setRoleSearch(e.target.value)}
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
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-400 mt-4">Đang tải...</p>
                </div>
              ) : (
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
                          Số quyền
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#202934]">
                      {filteredRoles.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                            Không tìm thấy vai trò nào
                          </td>
                        </tr>
                      ) : (
                        filteredRoles.map((role) => (
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
                                <span>{role.userCount || 0}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-gray-300">
                                {role.permissions?.length || 0} quyền
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition">
                                Xem chi tiết
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
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
                      value={permSearch}
                      onChange={(e) => setPermSearch(e.target.value)}
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
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-400 mt-4">Đang tải...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0f1419] border-b border-[#202934]">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Tên quyền
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Mô tả
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#202934]">
                      {filteredPermissions.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="px-6 py-8 text-center text-gray-400">
                            Không tìm thấy quyền nào
                          </td>
                        </tr>
                      ) : (
                        filteredPermissions.map((permission) => (
                          <tr
                            key={permission.id}
                            className="hover:bg-[#0f1419] transition"
                          >
                            <td className="px-6 py-4">
                              <span className="text-xs font-mono text-gray-500">
                                {permission.id}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm font-semibold text-white font-mono">
                                {permission.name}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-400">
                                {permission.description}
                              </p>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RolePermissions;
