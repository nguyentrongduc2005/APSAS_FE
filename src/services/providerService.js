import api from "./api";

// Service cho Provider Resources
const providerService = {
  // Lấy danh sách tài nguyên của provider (API 32)
  async getResources(params = {}) {
    try {
      const { page = 1, limit = 10, keyword = "" } = params;

      // Gọi đúng API 32: POST /api/tutorials/my
      const res = await api.post(
        "/tutorials/my",
        null,
        {
          params: {
            page: page - 1,
            size: limit,
            keyword: keyword || undefined,
          },
        }
      );

      const list = res.data?.data || [];

      // Map dữ liệu từ BE -> FE resource card
      const mapped = list.map((t) => ({
        id: t.id,
        title: t.title,
        description: t.summary,
        status: t.status,
        contentCount: t.lessonCount ?? 0,
        exerciseCount: t.assignmentCount ?? 0,
        imageCount: 0,
        createdAt: "",
        type: "VIDEO",
      }));

      return {
        data: mapped,
        pagination: {
          page,
          limit,
          total: mapped.length,
          totalPages: 1,
        },
      };
    } catch (error) {
      console.error("Error fetching provider resources:", error);
      throw error;
    }
  },

  // Xóa tài nguyên
  async deleteResource(id) {
    try {
      const response = await api.delete(`/api/tutorials/${id}`);

      return {
        success: true,
        message: response.data?.message || "Xóa tài nguyên thành công",
      };
    } catch (error) {
      console.error("Error deleting resource:", error);
      throw error;
    }
  },
};

export default providerService;
