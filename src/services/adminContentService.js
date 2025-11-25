import api from "./api";

/**
 * Service for Admin Tutorial/Content Management
 * Based on APSAS Admin API specification
 */
const adminContentService = {
  /**
   * Get list of tutorials waiting for approval
   * GET /admin/tutorials/pending?page=0&size=10&keyword=
   * Required permission: MANAGE_TUTORIALS
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (0-based)
   * @param {number} params.size - Page size
   * @param {string} params.keyword - Search by title
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async getPendingTutorials(params = {}) {
    try {
      const queryParams = {
        page: params.page !== undefined ? params.page : 0,
        size: params.size || 10,
      };
      
      if (params.keyword) queryParams.keyword = params.keyword;
      
      const response = await api.get("/admin/tutorials/pending", { params: queryParams });
      if (response.data.code === "ok") {
        return response.data;
      }
      throw new Error(response.data.message || "Failed to fetch pending tutorials");
    } catch (error) {
      console.error("Error fetching pending tutorials:", error);
      throw error;
    }
  },

  /**
   * Get all tutorials with filters and pagination
   * Required permission: MANAGE_TUTORIALS
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (0-based)
   * @param {number} params.size - Page size
   * @param {string} params.status - Filter by status (PENDING, PUBLISHED, REJECTED)
   * @param {string} params.search - Search keyword
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async getTutorials(params = {}) {
    try {
      const queryParams = {
        page: params.page !== undefined ? params.page : 0,
        size: params.size || 10,
      };
      
      if (params.status) queryParams.status = params.status;
      if (params.search) queryParams.search = params.search;
      
      const response = await api.get("/admin/tutorials", { params: queryParams });
      if (response.data.code === "ok") {
        return response.data;
      }
      throw new Error(response.data.message || "Failed to fetch tutorials");
    } catch (error) {
      console.error("Error fetching tutorials:", error);
      throw error;
    }
  },

  /**
   * Get detailed information of a specific tutorial for review
   * Required permission: MANAGE_TUTORIALS
   * @param {number} tutorialId - The ID of the tutorial
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async getTutorialById(tutorialId) {
    try {
      const response = await api.get(`/admin/tutorials/${tutorialId}`);
      if (response.data.code === "ok") {
        return response.data;
      }
      throw new Error(response.data.message || "Failed to fetch tutorial detail");
    } catch (error) {
      console.error("Error fetching tutorial detail:", error);
      throw error;
    }
  },

  /**
   * Approve a tutorial
   * POST /admin/tutorials/{tutorialId}/approve
   * Required permission: PUBLISH_TUTORIALS
   * @param {number} tutorialId - The ID of the tutorial to approve
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async approveTutorial(tutorialId) {
    try {
      // API uses POST method for approve
      const response = await api.post(`/admin/tutorials/${tutorialId}/approve`);
      if (response.data.code === "ok") {
        return response.data;
      }
      throw new Error(response.data.message || "Failed to approve tutorial");
    } catch (error) {
      console.error("Error approving tutorial:", error);
      throw error;
    }
  },

  // Alias for backward compatibility
  async publishTutorial(tutorialId) {
    return this.approveTutorial(tutorialId);
  },

  /**
   * Reject a tutorial
   * POST /admin/tutorials/{tutorialId}/reject
   * Required permission: MANAGE_TUTORIALS
   * @param {number} tutorialId - The ID of the tutorial to reject
   * @param {string} reason - Rejection reason
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async rejectTutorial(tutorialId, reason = "") {
    try {
      // API uses POST method with { reason: "..." }
      const response = await api.post(`/admin/tutorials/${tutorialId}/reject`, { reason });
      if (response.data.code === "ok") {
        return response.data;
      }
      throw new Error(response.data.message || "Failed to reject tutorial");
    } catch (error) {
      console.error("Error rejecting tutorial:", error);
      throw error;
    }
  },

  // Legacy methods for backward compatibility with ContentApprovals page
  async getContents(params = {}) {
    // If status is specified and not "pending", use getTutorials with status filter
    if (params.status && params.status.toLowerCase() !== "pending") {
      return this.getTutorials({
        page: params.page || 0,
        size: params.size || 10,
        status: params.status.toUpperCase(),
        search: params.keyword,
      });
    }
    // Default to pending tutorials
    return this.getPendingTutorials({
      page: params.page || 0,
      size: params.size || 10,
    });
  },

  async approveContent(contentId) {
    return this.approveTutorial(contentId);
  },

  async rejectContent(contentId, reason = "") {
    return this.rejectTutorial(contentId, reason);
  },
};

export default adminContentService;
