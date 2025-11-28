import api from "./api";

/**
 * Service for Admin Tutorial/Content Management
 * Based on APSAS Admin API specification
 */
const adminContentService = {
  /**
   * Get published tutorials (public API)
   * GET /api/tutorials
   * 
   * API này lấy danh sách tất cả tutorials đã được PUBLISHED (đã duyệt).
   * Dùng chung cho cả Admin và Provider.
   * 
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (0-based)
   * @param {number} params.size - Page size
   * @param {string} params.search - Search keyword (title or summary)
   * @param {string|string[]} params.sort - Sort fields. Format: "field,direction" or ["field1,direction1", "field2,direction2"]
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async getPublishedTutorials(params = {}) {
    try {
      const queryParams = {
        page: params.page !== undefined ? params.page : 0,
        size: params.size || 10,
      };
      
      if (params.search && params.search.trim()) {
        queryParams.search = params.search.trim();
      }
      
      // Handle sort - can be string or array
      if (params.sort) {
        const sortArray = Array.isArray(params.sort) ? params.sort : [params.sort];
        const validSorts = sortArray.filter(s => s && s.trim());
        if (validSorts.length > 0) {
          queryParams.sort = validSorts.map(s => s.trim());
        }
      } else {
        // Default sort
        queryParams.sort = ["createdAt,desc"];
      }
      
      const response = await api.get("/tutorials", { params: queryParams });
      
      const responseCode = (response.data?.code || "").toUpperCase();
      if (responseCode === "OK" || responseCode === "200" || response.data?.code === "ok") {
        return response.data;
      }
      
      throw new Error(response.data?.message || "Failed to fetch published tutorials");
    } catch (error) {
      console.error("Error fetching published tutorials:", error);
      throw error;
    }
  },
  /**
   * Get draft tutorials (chờ duyệt - DRAFT status)
   * GET /api/admin/tutorials/pending
   * Query params: keyword, page, size, sortBy, sortDirection
   * Required permission: MANAGE_TUTORIALS
   * Note: Endpoint vẫn là /pending nhưng trả về tutorials có status DRAFT
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (0-based)
   * @param {number} params.size - Page size
   * @param {string} params.keyword - Search by title
   * @param {string} params.sortBy - Sort field (e.g., "createdAt", "title")
   * @param {string} params.sortDirection - Sort direction ("ASC" or "DESC")
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async getPendingTutorials(params = {}) {
    try {
      const queryParams = {
        page: params.page !== undefined ? params.page : 0,
        size: params.size || 10,
      };
      
      if (params.keyword) queryParams.keyword = params.keyword;
      if (params.sortBy) queryParams.sortBy = params.sortBy;
      if (params.sortDirection) queryParams.sortDirection = params.sortDirection;
      
      const response = await api.get("/admin/tutorials/pending", { params: queryParams });
      const responseCode = (response.data?.code || "").toUpperCase();
      if (responseCode === "OK" || responseCode === "200") {
        return response.data;
      }
      throw new Error(response.data?.message || "Failed to fetch pending tutorials");
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
   * @param {string} params.status - Filter by status (DRAFT, PUBLISHED, REJECTED)
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
      const responseCode = (response.data?.code || "").toUpperCase();
      if (responseCode === "OK" || responseCode === "200") {
        return response.data;
      }
      throw new Error(response.data?.message || "Failed to fetch tutorials");
    } catch (error) {
      console.error("Error fetching tutorials:", error);
      throw error;
    }
  },

  /**
   * Get detailed information of a specific tutorial for review (includes items)
   * GET /api/admin/tutorials/{tutorialId}
   * Required permission: MANAGE_TUTORIALS
   * Response includes items array (contents + assignments sorted by orderNo)
   * @param {number} tutorialId - The ID of the tutorial
   * @returns {Promise<{code: string, message: string, data: Object}>}
   * @returns {Object} data - Tutorial detail with items array
   */
  async getTutorialById(tutorialId) {
    try {
      const response = await api.get(`/admin/tutorials/${tutorialId}`);
      const responseCode = (response.data?.code || "").toUpperCase();
      if (responseCode === "OK" || responseCode === "200" || response.data?.code === "ok") {
        return response.data;
      }
      throw new Error(response.data?.message || "Failed to fetch tutorial detail");
    } catch (error) {
      console.error("Error fetching tutorial detail:", error);
      throw error;
    }
  },

  /**
   * Get detailed information of a specific tutorial with items (contents + assignments)
   * GET /api/admin/tutorials/{tutorialId}/detail
   * Required permission: MANAGE_TUTORIALS
   * Alternative endpoint that also returns items
   * @param {number} tutorialId - The ID of the tutorial
   * @returns {Promise<{code: string, message: string, data: Object}>}
   * @returns {Object} data - Tutorial detail with items array (sorted by orderNo)
   */
  async getTutorialDetailById(tutorialId) {
    try {
      const response = await api.get(`/admin/tutorials/${tutorialId}/detail`);
      const responseCode = (response.data?.code || "").toUpperCase();
      if (responseCode === "OK" || responseCode === "200" || response.data?.code === "ok") {
        return response.data;
      }
      throw new Error(response.data?.message || "Failed to fetch tutorial detail");
    } catch (error) {
      console.error("Error fetching tutorial detail with items:", error);
      throw error;
    }
  },

  /**
   * Get detailed information of a specific content
   * GET /api/tutorials/contents/{contentId}
   * Required permission: RESOURCE_READ
   * @param {number} contentId - The ID of the content
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async getContentById(contentId) {
    try {
      const response = await api.get(`/tutorials/contents/${contentId}`);
      const responseCode = (response.data?.code || "").toUpperCase();
      if (responseCode === "OK" || responseCode === "200" || response.data?.code === "ok") {
        return response.data;
      }
      throw new Error(response.data?.message || "Failed to fetch content detail");
    } catch (error) {
      console.error("Error fetching content detail:", error);
      throw error;
    }
  },

  /**
   * Get detailed information of a specific assignment
   * GET /api/tutorials/assignments/{assignmentId}
   * Required permission: RESOURCE_READ or VIEW_OWN_TUTORIALS
   * @param {number} assignmentId - The ID of the assignment
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async getAssignmentById(assignmentId) {
    try {
      const response = await api.get(`/tutorials/assignments/${assignmentId}`);
      const responseCode = (response.data?.code || "").toUpperCase();
      if (responseCode === "OK" || responseCode === "200" || response.data?.code === "ok") {
        return response.data;
      }
      throw new Error(response.data?.message || "Failed to fetch assignment detail");
    } catch (error) {
      console.error("Error fetching assignment detail:", error);
      throw error;
    }
  },

  /**
   * Publish a tutorial (duyệt tutorial - chuyển trạng thái thành PUBLISHED)
   * PUT /api/admin/tutorials/{tutorialId}/publish (legacy)
   * PUT /api/admin/tutorials/{tutorialId}/review (new - preferred)
   * Required permission: PUBLISH_TUTORIALS or MANAGE_TUTORIALS
   * @param {number} tutorialId - The ID of the tutorial to publish
   * @param {string} reviewNote - Optional review note
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async publishTutorial(tutorialId, reviewNote = "") {
    try {
      // Try new review API first (preferred)
      try {
        return await this.reviewTutorial(tutorialId, "PUBLISHED", reviewNote);
      } catch (reviewError) {
        // Fallback to legacy publish API
        console.warn("Review API failed, trying legacy publish API:", reviewError);
        const response = await api.put(`/admin/tutorials/${tutorialId}/publish`);
        const responseCode = (response.data?.code || "").toUpperCase();
        if (responseCode === "OK" || responseCode === "200") {
          return response.data;
        }
        throw new Error(response.data?.message || "Failed to publish tutorial");
      }
    } catch (error) {
      console.error("Error publishing tutorial:", error);
      throw error;
    }
  },

  /**
   * Approve a tutorial (alias for backward compatibility)
   * Note: Uses review API with PUBLISHED status, or falls back to publish API
   * @param {number} tutorialId - The ID of the tutorial to approve
   * @param {string} reviewNote - Optional review note
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async approveTutorial(tutorialId, reviewNote = "") {
    return this.publishTutorial(tutorialId, reviewNote);
  },

  /**
   * Review a tutorial (approve or reject)
   * PUT /api/admin/tutorials/{tutorialId}/review
   * Required permission: MANAGE_TUTORIALS
   * 
   * Validation:
   * - status bắt buộc, phải là PUBLISHED hoặc REJECTED
   * - Tutorial phải ở trạng thái DRAFT mới có thể review
   * 
   * @param {number} tutorialId - The ID of the tutorial to review
   * @param {string} status - Status: "PUBLISHED" or "REJECTED"
   * @param {string} reviewNote - Optional review note/reason
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async reviewTutorial(tutorialId, status, reviewNote = "") {
    try {
      // Validate status
      const upperStatus = status.toUpperCase();
      if (upperStatus !== "PUBLISHED" && upperStatus !== "REJECTED") {
        throw new Error("Status phải là PUBLISHED hoặc REJECTED");
      }

      const payload = {
        status: upperStatus, // PUBLISHED or REJECTED (uppercase)
      };
      
      // reviewNote is optional
      if (reviewNote && reviewNote.trim()) {
        payload.reviewNote = reviewNote.trim();
      }
      
      console.log("🔵 Review tutorial request:", {
        tutorialId,
        payload,
        endpoint: `/admin/tutorials/${tutorialId}/review`
      });
      
      const response = await api.put(`/admin/tutorials/${tutorialId}/review`, payload);
      
      // Check response code (can be "ok", "OK", "200", etc.)
      const responseCode = response.data?.code?.toUpperCase();
      if (responseCode === "OK" || responseCode === "200" || response.data?.code === "ok") {
        return response.data;
      }
      
      // Handle specific error messages from backend
      const errorMessage = response.data?.message || "Failed to review tutorial";
      
      // Check for common validation errors
      if (errorMessage.includes("DRAFT") || errorMessage.includes("status")) {
        throw new Error("Chỉ có thể review tutorial ở trạng thái DRAFT. Tutorial này đã được review trước đó.");
      }
      
      throw new Error(errorMessage);
    } catch (error) {
      console.error("Error reviewing tutorial:", error);
      
      // Handle HTTP errors with better messages
      if (error.response) {
        const statusCode = error.response.status;
        const responseData = error.response.data || {};
        const backendMessage = responseData.message || responseData.error || "";
        const errorCode = responseData.code || "";
        
        console.error("API Error Response:", {
          status: statusCode,
          code: errorCode,
          data: responseData,
          message: backendMessage,
          payload: { status: upperStatus, reviewNote }
        });
        
        if (statusCode === 400) {
          // Backend trả về error code E4000 với message chi tiết
          if (errorCode === "E4000" || backendMessage.includes("E4000")) {
            // Backend message đã rõ ràng, dùng trực tiếp
            throw new Error(backendMessage || "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
          }
          
          // Check for specific validation errors
          if (backendMessage.includes("DRAFT") || backendMessage.includes("status") || backendMessage.includes("Status")) {
            throw new Error(backendMessage || "Chỉ có thể review tutorial ở trạng thái DRAFT. Tutorial này đã được review trước đó.");
          }
          
          if (backendMessage.includes("PUBLISHED") || backendMessage.includes("REJECTED")) {
            throw new Error(backendMessage || "Status phải là PUBLISHED hoặc REJECTED.");
          }
          
          throw new Error(backendMessage || "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
        }
        
        if (statusCode === 404) {
          throw new Error("Không tìm thấy tutorial với ID này.");
        }
        
        if (statusCode === 403) {
          throw new Error("Bạn không có quyền thực hiện thao tác này.");
        }
        
        if (statusCode === 500) {
          throw new Error(backendMessage || "Lỗi server. Vui lòng thử lại sau hoặc liên hệ quản trị viên.");
        }
        
        // Other status codes
        throw new Error(backendMessage || `Lỗi ${statusCode}. Vui lòng thử lại.`);
      }
      
      // Network error or other errors
      if (error.message) {
        // Re-throw if it's already a custom error
        if (!error.message.includes("Request failed") && !error.message.includes("Network Error")) {
          throw error;
        }
      }
      
      throw new Error(error.message || "Không thể review tutorial. Vui lòng thử lại.");
    }
  },

  /**
   * Reject a tutorial
   * POST /admin/tutorials/{tutorialId}/reject (legacy)
   * PUT /api/admin/tutorials/{tutorialId}/review (new - preferred)
   * Required permission: MANAGE_TUTORIALS
   * @param {number} tutorialId - The ID of the tutorial to reject
   * @param {string} reason - Rejection reason
   * @returns {Promise<{code: string, message: string, data: Object}>}
   */
  async rejectTutorial(tutorialId, reason = "") {
    try {
      // Use new review API (preferred)
      return await this.reviewTutorial(tutorialId, "REJECTED", reason);
    } catch (error) {
      console.error("Error rejecting tutorial:", error);
      
      // If it's a validation error or known error, re-throw it
      if (error.message && !error.message.includes("Request failed")) {
        throw error;
      }
      
      // Try legacy API as fallback only if it's a network/404 error
      if (error.response?.status === 404) {
        try {
          console.warn("Review API not found, trying legacy reject API");
          const response = await api.post(`/admin/tutorials/${tutorialId}/reject`, { reason });
          const responseCode = (response.data?.code || "").toUpperCase();
          if (responseCode === "OK" || responseCode === "200") {
            return response.data;
          }
          throw new Error(response.data?.message || "Failed to reject tutorial");
        } catch (legacyError) {
          console.error("Legacy reject API also failed:", legacyError);
          throw error; // Throw original error instead
        }
      }
      
      // Re-throw the original error
      throw error;
    }
  },

  // Legacy methods for backward compatibility with ContentApprovals page
  async getContents(params = {}) {
    const statusLower = (params.status || "").toLowerCase();
    
    // Map frontend status to backend status
    let backendStatus = null;
    if (statusLower === "draft") {
      // Use pending API (endpoint vẫn là /pending nhưng trả về DRAFT status)
      return this.getPendingTutorials({
        page: params.page || 0,
        size: params.size || 10,
        keyword: params.keyword,
        sortBy: params.sortBy || "createdAt",
        sortDirection: params.sortDirection || "DESC",
      });
    } else if (statusLower === "approved" || statusLower === "published") {
      backendStatus = "PUBLISHED";
    } else if (statusLower === "rejected") {
      backendStatus = "REJECTED";
    }
    
    // Use getTutorials with status filter for non-pending statuses
    if (backendStatus) {
      return this.getTutorials({
        page: params.page || 0,
        size: params.size || 10,
        status: backendStatus,
        search: params.keyword,
      });
    }
    
    // Default: get all tutorials (no status filter)
    return this.getTutorials({
      page: params.page || 0,
      size: params.size || 10,
      search: params.keyword,
    });
  },

  async approveContent(contentId, reviewNote = "") {
    return this.approveTutorial(contentId, reviewNote);
  },

  async rejectContent(contentId, reason = "") {
    return this.rejectTutorial(contentId, reason);
  },
};

export default adminContentService;
