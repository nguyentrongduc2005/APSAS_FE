import api from "./api";

// Service cho Resource Management (Lecturer)
const resourceService = {
  // Lấy danh sách tài nguyên theo status
  async getResources(params = {}) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get("/api/lecturer/resources", { params });
      // return response.data;

      // Mock data tạm thời
      const { page = 1, limit = 10, keyword = "", status = "all" } = params;

      const allResources = [
        {
          id: 1,
          title: "Introduction to React Hooks",
          description:
            "Comprehensive guide to React Hooks including useState, useEffect, and custom hooks",
          contentCount: 15,
          exerciseCount: 8,
          imageCount: 12,
          createdAt: "2024-01-15",
          status: "approved",
          type: "VIDEO",
        },
        {
          id: 2,
          title: "Advanced JavaScript Patterns",
          description:
            "Design patterns and best practices for modern JavaScript development",
          contentCount: 22,
          exerciseCount: 15,
          imageCount: 8,
          createdAt: "2024-02-20",
          status: "pending",
          type: "PDF",
        },
        {
          id: 3,
          title: "Node.js and Express Tutorial",
          description:
            "Building RESTful APIs with Node.js and Express framework",
          contentCount: 18,
          exerciseCount: 10,
          imageCount: 5,
          createdAt: "2024-03-10",
          status: "approved",
          type: "VIDEO",
        },
        {
          id: 4,
          title: "Database Design Principles",
          description:
            "Learn database normalization, indexing, and query optimization",
          contentCount: 12,
          exerciseCount: 6,
          imageCount: 15,
          createdAt: "2024-04-05",
          status: "pending",
          type: "PDF",
        },
        {
          id: 5,
          title: "CSS Grid and Flexbox Mastery",
          description: "Complete guide to modern CSS layout techniques",
          contentCount: 10,
          exerciseCount: 12,
          imageCount: 20,
          createdAt: "2024-05-12",
          status: "approved",
          type: "VIDEO",
        },
        {
          id: 6,
          title: "Git Version Control Fundamentals",
          description:
            "Master Git commands, branching strategies, and collaboration workflows",
          contentCount: 8,
          exerciseCount: 5,
          imageCount: 3,
          createdAt: "2024-06-18",
          status: "rejected",
          type: "PDF",
        },
        {
          id: 7,
          title: "Python Data Analysis",
          description:
            "Data manipulation and visualization using Pandas and Matplotlib",
          contentCount: 20,
          exerciseCount: 18,
          imageCount: 25,
          createdAt: "2024-07-22",
          status: "pending",
          type: "VIDEO",
        },
        {
          id: 8,
          title: "React State Management with Redux",
          description:
            "Complete guide to Redux, Redux Toolkit, and state management patterns",
          contentCount: 16,
          exerciseCount: 11,
          imageCount: 9,
          createdAt: "2024-08-15",
          status: "approved",
          type: "VIDEO",
        },
        {
          id: 9,
          title: "Docker and Containerization",
          description:
            "Learn Docker basics, container orchestration, and deployment",
          contentCount: 14,
          exerciseCount: 7,
          imageCount: 11,
          createdAt: "2024-09-10",
          status: "pending",
          type: "PDF",
        },
        {
          id: 10,
          title: "TypeScript for Beginners",
          description:
            "Master TypeScript fundamentals and advanced type systems",
          contentCount: 19,
          exerciseCount: 13,
          imageCount: 6,
          createdAt: "2024-10-05",
          status: "approved",
          type: "VIDEO",
        },
      ];

      // Lọc theo status
      let filteredResources = allResources;
      if (status === "pending") {
        filteredResources = allResources.filter((r) => r.status === "pending");
      } else if (status === "approved") {
        filteredResources = allResources.filter((r) => r.status === "approved");
      }

      // Lọc theo keyword
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        filteredResources = filteredResources.filter(
          (r) =>
            r.title.toLowerCase().includes(lowerKeyword) ||
            r.description.toLowerCase().includes(lowerKeyword)
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

  // Lấy thống kê insights
  async getInsights() {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get("/api/lecturer/resources/insights");
      // return response.data;

      // Mock data tạm thời
      return {
        total: 10,
        pending: 4,
        approved: 5,
        rejected: 1,
      };
    } catch (error) {
      console.error("Error fetching insights:", error);
      throw error;
    }
  },
};

export default resourceService;
