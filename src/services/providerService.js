import api from "./api";

// Service cho Provider Resources
const providerService = {
  // Lấy danh sách tài nguyên của provider
async getResources(params = {}) {
  try {
    const { page = 1, limit = 10, keyword = "" } = params;

    // Gọi API 25: search tutorial
    const res = await api.get("/tutorials", {
      params: {
        // nếu BE dùng page 0-based thì page - 1, nếu 1-based thì để page
        page: page - 1,
        size: limit,
        // đổi tên param cho đúng với BE: keyword / search / keySearch...
        keyword: keyword || undefined,
      },
    });

    // BE đang trả: { code, message, data: { content: [...], totalElements, totalPages, ... } }
    const data = res.data?.data || {};
    const content = data.content || [];

    // Map từ tutorial BE -> resource FE đang dùng
    const mappedResources = content.map((tut) => ({
      id: tut.id,
      title: tut.title,
      description: tut.summary,
      // nếu BE có trường createdByName thì dùng, không thì tạm hiển thị ID
      createdBy: tut.createdByName || `User #${tut.createdBy}`,
      // các số liệu dưới nếu BE chưa có thì để 0 tạm
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
    console.error("Error fetching provider resources:", error);
    throw error;
  }
},


  // Xóa tài nguyên (tutorial)
async deleteResource(id) {
  try {
    const response = await api.delete(`/tutorials/${id}`);

    // BE có thể trả { code, message, data } → lấy message nếu có
    return {
      success: true,
      message:
        response.data?.message || "Xóa tài nguyên thành công",
    };
  } catch (error) {
    console.error("Error deleting resource:", error);
    // quăng ra để component hiển thị thông báo lỗi
    throw error;
   }
  },
};

export default providerService;
