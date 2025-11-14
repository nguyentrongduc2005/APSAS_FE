import api from "./api";

// Service cho Admin Content Approvals
const adminContentService = {
  // Lấy danh sách nội dung cần duyệt
  async getContents(params = {}) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get("/api/admin/contents", { params });
      // return response.data;

      // Mock data tạm thời
      const { page = 1, limit = 10, type = "", status = "pending", keyword = "" } = params;

      const allContents = [
        {
          id: "C001",
          title: "Introduction to React Hooks",
          type: "VIDEO",
          author: "Nguyễn Văn A",
          submittedAt: "2024-11-10",
          status: "pending",
          note: "",
        },
        {
          id: "C002",
          title: "Advanced JavaScript Patterns",
          type: "PDF",
          author: "Trần Thị B",
          submittedAt: "2024-11-11",
          status: "pending",
          note: "",
        },
        {
          id: "C003",
          title: "Node.js Best Practices",
          type: "VIDEO",
          author: "Lê Minh C",
          submittedAt: "2024-11-08",
          status: "approved",
          note: "Nội dung chất lượng cao",
        },
        {
          id: "C004",
          title: "CSS Grid Tutorial",
          type: "PDF",
          author: "Phạm Thị D",
          submittedAt: "2024-11-09",
          status: "rejected",
          note: "Nội dung chưa đầy đủ",
        },
        {
          id: "C005",
          title: "Python Data Analysis",
          type: "VIDEO",
          author: "Hoàng Văn E",
          submittedAt: "2024-11-12",
          status: "pending",
          note: "",
        },
        {
          id: "C006",
          title: "Database Design Principles",
          type: "PDF",
          author: "Đỗ Thị F",
          submittedAt: "2024-11-13",
          status: "pending",
          note: "",
        },
        {
          id: "C007",
          title: "React State Management",
          type: "VIDEO",
          author: "Nguyễn Văn G",
          submittedAt: "2024-11-07",
          status: "approved",
          note: "Rất hay",
        },
        {
          id: "C008",
          title: "Docker Fundamentals",
          type: "PDF",
          author: "Trần Thị H",
          submittedAt: "2024-11-14",
          status: "pending",
          note: "",
        },
      ];

      // Lọc theo type
      let filteredContents = allContents;
      if (type) {
        filteredContents = filteredContents.filter((c) => c.type === type);
      }

      // Lọc theo status
      if (status) {
        filteredContents = filteredContents.filter((c) => c.status === status);
      }

      // Lọc theo keyword
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        filteredContents = filteredContents.filter(
          (c) =>
            c.title.toLowerCase().includes(lowerKeyword) ||
            c.author.toLowerCase().includes(lowerKeyword) ||
            c.id.toLowerCase().includes(lowerKeyword)
        );
      }

      // Tính toán pagination
      const total = filteredContents.length;
      const totalPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const end = start + limit;
      const data = filteredContents.slice(start, end);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    } catch (error) {
      console.error("Error fetching contents:", error);
      throw error;
    }
  },

  // Lấy chi tiết nội dung
  async getContentDetail(contentId) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get(`/api/admin/contents/${contentId}`);
      // return response.data;

      // Mock data chi tiết
      return {
        id: contentId,
        title: "Introduction to React Hooks",
        type: "VIDEO",
        author: "Nguyễn Văn A",
        submittedAt: "2024-11-10",
        status: "pending",
        note: "",
        description: "Comprehensive guide to React Hooks including useState, useEffect, and custom hooks",
        duration: "5 hours 30 minutes",
        contentCount: 15,
        exerciseCount: 8,
      };
    } catch (error) {
      console.error("Error fetching content detail:", error);
      throw error;
    }
  },

  // Duyệt nội dung
  async approveContent(contentId, note = "") {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.post(`/api/admin/contents/${contentId}/approve`, {
      //   note,
      // });
      // return response.data;

      // Mock success
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        success: true,
        message: "Nội dung đã được duyệt",
        data: {
          contentId,
          status: "approved",
          note,
          approvedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error("Error approving content:", error);
      throw error;
    }
  },

  // Từ chối nội dung
  async rejectContent(contentId, note = "") {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.post(`/api/admin/contents/${contentId}/reject`, {
      //   note,
      // });
      // return response.data;

      // Mock success
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        success: true,
        message: "Nội dung đã bị từ chối",
        data: {
          contentId,
          status: "rejected",
          note,
          rejectedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error("Error rejecting content:", error);
      throw error;
    }
  },
};

export default adminContentService;
