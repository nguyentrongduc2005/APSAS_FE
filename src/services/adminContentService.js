import api from "./api";

/**
 * Service for Admin Tutorial/Content Management
 * Based on APSAS Admin API specification
 */
const adminContentService = {
  /**
   * Get list of tutorials waiting for approval
   * Required permission: MANAGE_TUTORIALS
   * @returns {Promise<{code: string, message: string, data: Array}>}
   */
  async getPendingTutorials() {
    try {
      const response = await api.get("/admin/tutorials/pending");
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
   * Approve and publish a tutorial
   * Required permission: PUBLISH_TUTORIALS
   * @param {number} tutorialId - The ID of the tutorial to publish
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async publishTutorial(tutorialId) {
    try {
      const response = await api.put(`/admin/tutorials/${tutorialId}/publish`);
      if (response.data.code === "ok") {
        return response.data;
      }
      throw new Error(response.data.message || "Failed to publish tutorial");
    } catch (error) {
      console.error("Error publishing tutorial:", error);
      throw error;
    }
  },

  /**
   * Reject a tutorial (Note: This endpoint may not exist yet in backend)
   * Required permission: MANAGE_TUTORIALS
   * @param {number} tutorialId - The ID of the tutorial to reject
   * @param {string} note - Rejection reason
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async rejectTutorial(tutorialId, note = "") {
    try {
      const response = await api.put(`/admin/tutorials/${tutorialId}/reject`, { note });
      if (response.data.code === "ok") {
        return response.data;
      }
      throw new Error(response.data.message || "Failed to reject tutorial");
    } catch (error) {
      console.error("Error rejecting tutorial:", error);
      // If endpoint doesn't exist, provide a helpful error
      if (error.response?.status === 404) {
        throw new Error("Chức năng từ chối tutorial chưa được hỗ trợ bởi backend API");
      }
      throw error;
    }
  },

  // Legacy methods for backward compatibility with ContentApprovals page
  async getContents(params = {}) {
    return this.getPendingTutorials();
  },

  async approveContent(contentId, note = "") {
    return this.publishTutorial(contentId);
  },

  async rejectContent(contentId, note = "") {
    return this.rejectTutorial(contentId, note);
  },
};

export default adminContentService;
