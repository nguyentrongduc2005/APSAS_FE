import api from "./api";

// Service cho Lecturer Resources và Courses
const lecturerService = {
  /**
   * Lấy danh sách khóa học của giảng viên
   * @param {Object} params - Query parameters
   * @param {number} params.page - Số trang (0-indexed for API)
   * @param {number} params.size - Kích thước trang
   * @param {string} params.search - Từ khóa tìm kiếm
   * @returns {Promise} API response
   */
  async getMyCourses(params = {}) {
    try {
      const { page = 0, size = 6, search = '' } = params;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      if (search) {
        queryParams.append('search', search);
      }

      const response = await api.get(`/courses/lecture/my-courses?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer courses:', error);
      throw error;
    }
  },

  /**
   * Lấy thống kê tổng quan của giảng viên
   * @returns {Promise} API response
   */
  async getStats() {
    try {
      const response = await api.get('/teacher/stats/total-students');
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer stats:', error);
      throw error;
    }
  },

  async getResources(params = {}) {
    try {
      const { page = 1, limit = 10, keyword = "" } = params;

      const res = await api.get("/tutorials", {
        params: {
          page: page - 1,
          size: limit,
          keyword: keyword || undefined,
          // nếu sau này BE cho filter chỉ tutorial đã được duyệt thì thêm status vào đây
          // status: "PUBLISHED"
        },
      });

      const data = res.data?.data || {};
      const content = data.content || [];

      const mappedResources = content.map((tut) => ({
        id: tut.id,
        title: tut.title,
        description: tut.summary,
        createdBy: tut.createdByName || `User #${tut.createdBy}`,
        contentCount: tut.totalLessons ?? 0,
        exerciseCount: tut.totalAssignments ?? 0,
        imageCount: tut.totalImages ?? 0,
        createdAt: tut.createdAt?.substring(0, 10) || "",
        type: tut.type || "VIDEO",
      }));

      return {
        data: mappedResources,
        pagination: {
          page,
          limit,
          total: data.totalElements ?? mappedResources.length,
          totalPages: data.totalPages ?? 1,
        },
      };
    } catch (error) {
      console.error("Error fetching lecturer resources:", error);
      throw error;
    }
  },
};

export default lecturerService;
