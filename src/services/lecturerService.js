import api from "./api";

// Service cho Lecturer Resources
const lecturerService = {
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
