import api from "./api";

// Service cho Lecturer Resources
const lecturerService = {
  // Lấy danh sách tài nguyên từ Provider (đã được duyệt)
  async getResources(params = {}) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get("/api/lecturer/resources", { params });
      // return response.data;

      // Mock data tạm thời - Sử dụng data từ Provider nhưng chỉ lấy tài nguyên đã duyệt
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
          status: "approved",
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
          status: "approved",
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
          status: "approved",
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
          status: "approved",
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
          status: "approved",
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
          status: "approved",
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
          status: "approved",
        },
        {
          id: 8,
          title: "React State Management with Redux",
          description:
            "Complete guide to Redux, Redux Toolkit, and state management patterns",
          createdBy: "Trần Thị H",
          contentCount: 16,
          exerciseCount: 11,
          imageCount: 9,
          createdAt: "2024-08-15",
          type: "VIDEO",
          status: "approved",
        },
      ];

      // Lọc theo keyword
      let filteredResources = allResources;
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        filteredResources = allResources.filter(
          (r) =>
            r.title.toLowerCase().includes(lowerKeyword) ||
            r.description.toLowerCase().includes(lowerKeyword) ||
            r.createdBy.toLowerCase().includes(lowerKeyword)
        );
      }

      // Tính toán pagination
      const total = filteredResources.length;
      const totalPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const end = start + limit;
      const data = filteredResources.slice(start, end);

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
      console.error("Error fetching resources:", error);
      throw error;
    }
  },

  // Lấy chi tiết một tài nguyên
  async getResourceDetail(resourceId) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get(`/api/lecturer/resources/${resourceId}`);
      // return response.data;

      // Mock data chi tiết
      return {
        id: resourceId,
        title: "Introduction to React Hooks",
        description:
          "Comprehensive guide to React Hooks including useState, useEffect, and custom hooks. This course covers all the essential hooks and teaches you how to build custom hooks for reusable logic.",
        createdBy: "Nguyễn Văn A",
        contentCount: 15,
        exerciseCount: 8,
        imageCount: 12,
        createdAt: "2024-01-15",
        type: "VIDEO",
        status: "approved",
        duration: "5 hours 30 minutes",
        level: "Intermediate",
        topics: ["React", "Hooks", "State Management", "Custom Hooks"],
        contents: [
          { id: 1, title: "Introduction to Hooks", type: "video" },
          { id: 2, title: "useState Hook", type: "video" },
          { id: 3, title: "useEffect Hook", type: "video" },
        ],
      };
    } catch (error) {
      console.error("Error fetching resource detail:", error);
      throw error;
    }
  },

  // Thêm tài nguyên vào khóa học
  async addResourceToCourse(courseId, resourceId) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.post(`/api/lecturer/courses/${courseId}/resources`, {
      //   resourceId,
      // });
      // return response.data;

      // Mock success
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        success: true,
        message: "Tài nguyên đã được thêm vào khóa học",
        data: {
          courseId,
          resourceId,
          addedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error("Error adding resource to course:", error);
      throw error;
    }
  },
};

export default lecturerService;
