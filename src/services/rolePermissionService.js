import api from "./api";

/**
 * Service for handling role and permission operations
 * Based on APSAS Admin API specification
 */
const rolePermissionService = {
  /**
   * Get all roles with their permissions
   * Required permission: VIEW_ROLES
   */
  getRoles: async () => {
    try {
      const response = await api.get('/admin/roles');
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },

  /**
   * Get all permissions
   * Required permission: VIEW_ROLES
   */
  getPermissions: async () => {
    try {
      const response = await api.get('/admin/permissions');
      return response.data;
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
      console.error("Error fetching permissions:", error);
      throw error;
    }
  },

  /**
   * Get role detail by ID
   * Required permission: VIEW_ROLES
   */
  getRoleById: async (roleId) => {
    try {
      const response = await api.get(`/admin/roles/${roleId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching role detail:", error);
      throw error;
    }
  },

  /**
   * Create new role
   * Required permission: CREATE_ROLES
   */
  createRole: async (roleData) => {
    try {
      const response = await api.post('/admin/roles', roleData);
      return response.data;
    } catch (error) {
      console.error("Error creating role:", error);
      throw error;
    }
  },

  /**
   * Update existing role
   * Required permission: UPDATE_ROLES
   */
  updateRole: async (roleId, roleData) => {
    try {
      const response = await api.put(`/admin/roles/${roleId}`, roleData);
      return response.data;
    } catch (error) {
      console.error("Error updating role:", error);
      throw error;
    }
  },

  /**
   * Delete role permanently
   * Required permission: DELETE_ROLES
   */
  deleteRole: async (roleId) => {
    try {
      const response = await api.delete(`/admin/roles/${roleId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting role:", error);
      throw error;
    }
  },
};

export default rolePermissionService;
