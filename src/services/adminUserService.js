import api from "./api";

/**
 * Service for Admin User Management
 * All endpoints require appropriate admin permissions
 */
const adminUserService = {
  /**
   * Get paginated list of users
   * Required permission: VIEW_USERS
   */
  async getUsers(params = {}) {
    try {
      const queryParams = {
        page: params.page !== undefined ? params.page : 0,
        size: params.size || 10,
        sort: params.sort || "createdAt,desc",
      };

      if (params.search) queryParams.search = params.search;
      if (params.status) queryParams.status = params.status;
      if (params.role) queryParams.role = params.role;

      const response = await api.get("/admin/users", { params: queryParams });
      return response.data;

      const allUsers = [
        {
          id: "U001",
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          role: "student",
          status: "active",
          verified: true,
          createdAt: "2024-01-15",
          lastLogin: "2024-11-10",
        },
        {
          id: "U002",
          name: "Trần Thị B",
          email: "tranthib@example.com",
          role: "lecturer",
          status: "active",
          verified: true,
          createdAt: "2024-02-20",
          lastLogin: "2024-11-12",
        },
        {
          id: "U003",
          name: "Lê Minh C",
          email: "leminhc@example.com",
          role: "provider",
          status: "active",
          verified: true,
          createdAt: "2024-03-10",
          lastLogin: "2024-11-11",
        },
        {
          id: "U004",
          name: "Phạm Thị D",
          email: "phamthid@example.com",
          role: "student",
          status: "blocked",
          verified: false,
          createdAt: "2024-04-05",
          lastLogin: "2024-10-20",
        },
        {
          id: "U005",
          name: "Hoàng Văn E",
          email: "hoangvane@example.com",
          role: "admin",
          status: "active",
          verified: true,
          createdAt: "2024-05-12",
          lastLogin: "2024-11-14",
        },
      ];

      // Lọc theo role
      let filteredUsers = allUsers;
      if (role) {
        filteredUsers = filteredUsers.filter((u) => u.role === role);
      }

      // Lọc theo status
      if (status) {
        filteredUsers = filteredUsers.filter((u) => u.status === status);
      }

      // Lọc theo keyword
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        filteredUsers = filteredUsers.filter(
          (u) =>
            u.name.toLowerCase().includes(lowerKeyword) ||
            u.email.toLowerCase().includes(lowerKeyword) ||
            u.id.toLowerCase().includes(lowerKeyword)
        );
      }

      // Tính toán pagination
      const total = filteredUsers.length;
      const totalPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const end = start + limit;
      const data = filteredUsers.slice(start, end);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  /**
   * Get user detail by ID
   * Required permission: VIEW_USERS
   */
  async getUserById(userId) {
    try {
      const response = await api.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user detail:", error);
      throw error;
    }
  },

  /**
   * Create new user
   * Required permission: CREATE_USERS
   */
  async createUser(userData) {
    try {
      const response = await api.post("/admin/users", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  /**
   * Update user status (ACTIVE, BLOCKED, UNVERIFIED)
   * No specific permission required (accessible by admins)
   */
  async updateUserStatus(userId, status) {
    try {
      const response = await api.put(`/admin/users/${userId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user status:", error);
      throw error;
    }
  },

  /**
   * Update user roles
   * Required permission: UPDATE_USERS
   */
  async updateUserRoles(userId, roleIds) {
    try {
      const response = await api.put(`/admin/users/${userId}/roles`, {
        roleIds,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  /**
   * Delete user permanently
   * Required permission: DELETE_USERS
   */
  async deleteUser(userId) {
    try {
      const response = await api.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  /**
   * Get user statistics
   * Required permission: VIEW_USERS
   */
  async getUserStatistics() {
    try {
      const response = await api.get("/admin/users/statistics");
      return response.data;
    } catch (error) {
      console.error("Error fetching user statistics:", error);
      throw error;
    }
  },

  // Legacy method for backward compatibility
  async toggleUserStatus(userId, newStatus) {
    return this.updateUserStatus(userId, newStatus);
  },

  // Legacy method for backward compatibility
  async updateUser(userId, userData) {
    if (userData.roleIds) {
      return this.updateUserRoles(userId, userData.roleIds);
    }
    if (userData.status) {
      return this.updateUserStatus(userId, userData.status);
    }
    throw new Error("Invalid update data");
  },
};

export default adminUserService;
