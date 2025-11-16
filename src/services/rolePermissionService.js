import api from "./api";

/**
 * Service for handling role and permission operations
 */
const rolePermissionService = {
  /**
   * Get all roles
   * @returns {Promise} List of roles
   */
  getRoles: async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/admin/roles');
      // return response.data;

      // Mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
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
          ]);
        }, 300);
      });
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },

  /**
   * Get all permissions
   * @returns {Promise} List of permissions
   */
  getPermissions: async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/admin/permissions');
      // return response.data;

      // Mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              name: "Xem danh sách người dùng",
              description:
                "Cho phép xem danh sách tất cả người dùng trong hệ thống",
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
          ]);
        }, 300);
      });
    } catch (error) {
      console.error("Error fetching permissions:", error);
      throw error;
    }
  },

  /**
   * Search roles by keyword
   * @param {string} keyword - Search keyword
   * @returns {Promise} Filtered roles
   */
  searchRoles: async (keyword) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get(`/admin/roles/search?q=${keyword}`);
      // return response.data;

      const roles = await rolePermissionService.getRoles();
      return roles.filter(
        (role) =>
          role.name.toLowerCase().includes(keyword.toLowerCase()) ||
          role.description.toLowerCase().includes(keyword.toLowerCase())
      );
    } catch (error) {
      console.error("Error searching roles:", error);
      throw error;
    }
  },

  /**
   * Search permissions by keyword
   * @param {string} keyword - Search keyword
   * @returns {Promise} Filtered permissions
   */
  searchPermissions: async (keyword) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get(`/admin/permissions/search?q=${keyword}`);
      // return response.data;

      const permissions = await rolePermissionService.getPermissions();
      return permissions.filter(
        (permission) =>
          permission.name.toLowerCase().includes(keyword.toLowerCase()) ||
          permission.description.toLowerCase().includes(keyword.toLowerCase())
      );
    } catch (error) {
      console.error("Error searching permissions:", error);
      throw error;
    }
  },
};

export default rolePermissionService;
