import api from "./api";

/**
 * Service for Admin User Management
 * All endpoints require appropriate admin permissions
 * Based on APSAS Admin API Documentation v2025-11-26
 */
const adminUserService = {
  /**
   * Get paginated list of users
   * GET /admin/users?page=0&size=10&keyword=&status=&roleId=
   * Required permission: VIEW_USERS
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (0-based)
   * @param {number} params.size - Items per page
   * @param {string} params.keyword - Search by name/email
   * @param {string} params.status - Filter: ACTIVE, INACTIVE, BANNED, BLOCKED
   * @param {number} params.roleId - Filter by role ID
   */
  async getUsers(params = {}) {
    try {
      const queryParams = {
        page: params.page !== undefined ? params.page : 0,
        size: params.size || 10,
      };

      // API uses 'keyword' for search (not 'search')
      if (params.keyword) queryParams.keyword = params.keyword;
      if (params.search) queryParams.keyword = params.search; // backward compatibility
      
      if (params.status) queryParams.status = params.status;
      
      // API uses 'roleId' (not 'role')
      if (params.roleId) queryParams.roleId = params.roleId;
      if (params.role) queryParams.roleId = params.role; // backward compatibility

      const response = await api.get("/admin/users", { params: queryParams });
      return response.data;
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
   * POST /admin/users
   * Required permission: CREATE_USERS
   * @param {Object} userData - User data
   * @param {string} userData.name - Full name
   * @param {string} userData.email - Email address
   * @param {string} userData.password - Password (min 8 chars with uppercase, lowercase, number, special char)
   * @param {number[]} userData.roleIds - Array of role IDs
   * @param {string} userData.status - Status: ACTIVE, INACTIVE, BANNED, BLOCKED
   */
  async createUser(userData) {
    try {
      // Transform payload to match API spec
      const payload = {
        name: userData.name || `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
        email: userData.email,
        password: userData.password,
        roleIds: userData.roleIds || (userData.roles ? userData.roles.map(r => typeof r === 'number' ? r : r.id) : [2]), // Default to STUDENT (id: 2)
        status: userData.status || "ACTIVE",
      };
      
      const response = await api.post("/admin/users", payload);
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
   * PUT /admin/users/{userId}/roles
   * Required permission: UPDATE_USERS
   * @param {number} userId - User ID
   * @param {number[]} roleIds - Array of role IDs
   */
  async updateUserRoles(userId, roleIds) {
    try {
      // API expects { roleIds: [1, 2] }
      const payload = { 
        roleIds: Array.isArray(roleIds) ? roleIds : [roleIds] 
      };
      const response = await api.put(`/admin/users/${userId}/roles`, payload);
      return response.data;
    } catch (error) {
      console.error("Error updating user roles:", error);
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
