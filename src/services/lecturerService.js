import api from "./api";

// Service cho Lecturer Resources và Courses
const lecturerService = {
  // Inject api instance
  api,
  /**
   * Lấy danh sách khóa học của giảng viên
   * @param {Object} params - Query parameters
   * @param {number} params.page - Số trang (0-indexed for API)
   * @param {number} params.size - Kích thước trang
   * @param {string} params.search - Từ khóa tìm kiếm
   * @returns {Promise} API response
   */
  async getResources(params = {}) {
  try {
    const { page = 1, limit = 10, keyword = "" } = params;

    const res = await api.get("/tutorials", {
      params: {
        page: page - 1,
        size: limit,
        search: keyword || undefined,
      },
    });

    const data = res.data?.data || {};
    const content = data.content || [];

    const mappedResources = content.map((tut) => ({
      id: tut.id,
      title: tut.title,
      description: tut.summary,
      createdBy: tut.creatorName || `User #${tut.createdBy}`,
      contentCount: tut.lessonCount ?? 0,
      exerciseCount: tut.assignmentCount ?? 0,
      imageCount: tut.totalImages ?? 0,
      createdAt: tut.createdAt?.substring(0, 10) || "",
      type: "VIDEO",
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
