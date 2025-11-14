import api from "./api";

// Service cho Provider Resources
const providerService = {
  // Lấy danh sách tài nguyên của provider
  async getResources(params = {}) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get("/api/provider/resources", { params });
      // return response.data;

      // Mock data tạm thời
      const { page = 1, limit = 10, keyword = "" } = params;

      const allResources = [
        {
          id: 1,
          title: "Introduction to React Hooks",
          description:
            "Comprehensive guide to React Hooks including useState, useEffect, and custom hooks",
          createdBy: "Nguyễn Văn A",
          contentCount: 15,
          exerciseCount: 8,
          imageCount: 12,
          createdAt: "2024-01-15",
          type: "VIDEO",
        },
        {
          id: 2,
          title: "Advanced JavaScript Patterns",
          description:
            "Design patterns and best practices for modern JavaScript development",
          createdBy: "Trần Thị B",
          contentCount: 22,
          exerciseCount: 15,
          imageCount: 8,
          createdAt: "2024-02-20",
          type: "PDF",
        },
        {
          id: 3,
          title: "Node.js and Express Tutorial",
          description:
            "Building RESTful APIs with Node.js and Express framework",
          createdBy: "Lê Minh C",
          contentCount: 18,
          exerciseCount: 10,
          imageCount: 5,
          createdAt: "2024-03-10",
          type: "VIDEO",
        },
        {
          id: 4,
          title: "Database Design Principles",
          description:
            "Learn database normalization, indexing, and query optimization",
          createdBy: "Phạm Thị D",
          contentCount: 12,
          exerciseCount: 6,
          imageCount: 15,
          createdAt: "2024-04-05",
          type: "PDF",
        },
        {
          id: 5,
          title: "CSS Grid and Flexbox Mastery",
          description: "Complete guide to modern CSS layout techniques",
          createdBy: "Hoàng Văn E",
          contentCount: 10,
          exerciseCount: 12,
          imageCount: 20,
          createdAt: "2024-05-12",
          type: "VIDEO",
        },
        {
          id: 6,
          title: "Git Version Control Fundamentals",
          description:
            "Master Git commands, branching strategies, and collaboration workflows",
          createdBy: "Đỗ Thị F",
          contentCount: 8,
          exerciseCount: 5,
          imageCount: 3,
          createdAt: "2024-06-18",
          type: "PDF",
        },
        {
          id: 7,
          title: "Python Data Analysis",
          description:
            "Data manipulation and visualization using Pandas and Matplotlib",
          createdBy: "Nguyễn Văn G",
          contentCount: 20,
          exerciseCount: 18,
          imageCount: 25,
          createdAt: "2024-07-22",
          type: "VIDEO",
        },
        {
          id: 8,
          title: "Docker and Containerization",
          description:
            "Learn Docker basics, Dockerfile, docker-compose, and best practices",
          createdBy: "Trần Minh H",
          contentCount: 14,
          exerciseCount: 9,
          imageCount: 7,
          createdAt: "2024-08-30",
          type: "PDF",
        },
      ];

      // Filter by keyword
      let filtered = allResources;
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        filtered = allResources.filter(
          (r) =>
            r.title.toLowerCase().includes(lowerKeyword) ||
            r.description.toLowerCase().includes(lowerKeyword) ||
            r.createdBy.toLowerCase().includes(lowerKeyword)
        );
      }

      // Pagination
      const total = filtered.length;
      const totalPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const end = start + limit;
      const data = filtered.slice(start, end);

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
      console.error("Error fetching provider resources:", error);
      throw error;
    }
  },

  // Xóa tài nguyên
  async deleteResource(id) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.delete(`/api/provider/resources/${id}`);
      // return response.data;

      // Mock thành công
      return { success: true, message: "Xóa tài nguyên thành công" };
    } catch (error) {
      console.error("Error deleting resource:", error);
      throw error;
    }
  },
};

export default providerService;
