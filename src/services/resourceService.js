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

  // Tạo resource mới (Provider)
  async createResource(data) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.post("/api/provider/resources", data);
      // return response.data;

      // Mock response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "Resource created successfully",
            id: `resource-${Date.now()}`,
          });
        }, 1000);
      });
    } catch (error) {
      console.error("Error creating resource:", error);
      throw error;
    }
  },

  // Lấy chi tiết resource
  async getResourceDetail(resourceId) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get(`/api/provider/resources/${resourceId}`);
      // return response.data;

      // Mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: resourceId,
            title: "Cấu trúc dữ liệu và giải thuật",
            summary:
              "Khóa học về cấu trúc dữ liệu cơ bản và nâng cao, bao gồm Array, Linked List, Stack, Queue, Tree, Graph và các giải thuật liên quan.",
            author: "TS. Nguyễn Văn A",
            createdAt: "2024-10-15",
            updatedAt: "2024-11-15",
            status: "published",
            totalContents: 5,
            totalAssignments: 3,
            items: [
              {
                id: "content-1",
                type: "content",
                title: "Giới thiệu Linked List",
                orderNo: 1,
              },
              {
                id: "content-2",
                type: "content",
                title: "Stack và Queue",
                orderNo: 2,
              },
              {
                id: "assignment-1",
                type: "assignment",
                title: "Implement Linked List",
                orderNo: 3,
              },
              {
                id: "content-3",
                type: "content",
                title: "Binary Tree",
                orderNo: 4,
              },
              {
                id: "assignment-2",
                type: "assignment",
                title: "Tree Traversal",
                orderNo: 5,
              },
            ],
          });
        }, 600);
      });
    } catch (error) {
      console.error("Error fetching resource detail:", error);
      throw error;
    }
  },

  // Tạo content mới
  async createContent(resourceId, contentData) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.post(`/api/provider/resources/${resourceId}/contents`, contentData);
      // return response.data;

      // Mock response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "Content created successfully",
            id: `content-${Date.now()}`,
          });
        }, 1000);
      });
    } catch (error) {
      console.error("Error creating content:", error);
      throw error;
    }
  },

  // Cập nhật content
  async updateContent(resourceId, contentId, contentData) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.put(`/api/provider/resources/${resourceId}/contents/${contentId}`, contentData);
      // return response.data;

      // Mock response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "Content updated successfully",
          });
        }, 1000);
      });
    } catch (error) {
      console.error("Error updating content:", error);
      throw error;
    }
  },

  // Lấy content theo ID
  async getContentById(resourceId, contentId) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get(`/api/provider/resources/${resourceId}/contents/${contentId}`);
      // return response.data;

      // Mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: contentId,
            title: "Giới thiệu Linked List",
            orderNo: 1,
            markdown: `# Linked List

Linked List là một cấu trúc dữ liệu tuyến tính trong đó các phần tử không được lưu trữ ở các vị trí liền kề.

## Đặc điểm chính

- Dynamic size
- Ease of insertion/deletion
- No memory waste

## Implementation

\`\`\`java
class Node {
    int data;
    Node next;
}
\`\`\``,
            images: [
              {
                id: 1,
                url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
                caption: "Sơ đồ Linked List",
              },
            ],
          });
        }, 500);
      });
    } catch (error) {
      console.error("Error fetching content:", error);
      throw error;
    }
  },

  // Tạo assignment mới
  async createAssignment(resourceId, assignmentData) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.post(`/api/provider/resources/${resourceId}/assignments`, assignmentData);
      // return response.data;

      // Mock response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "Assignment created successfully",
            id: `assignment-${Date.now()}`,
          });
        }, 1000);
      });
    } catch (error) {
      console.error("Error creating assignment:", error);
      throw error;
    }
  },

  // Cập nhật assignment
  async updateAssignment(resourceId, assignmentId, assignmentData) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.put(`/api/provider/resources/${resourceId}/assignments/${assignmentId}`, assignmentData);
      // return response.data;

      // Mock response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "Assignment updated successfully",
          });
        }, 1000);
      });
    } catch (error) {
      console.error("Error updating assignment:", error);
      throw error;
    }
  },

  // Lấy assignment theo ID
  async getAssignmentById(resourceId, assignmentId) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get(`/api/provider/resources/${resourceId}/assignments/${assignmentId}`);
      // return response.data;

      // Mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: assignmentId,
            title: "Implement Linked List",
            orderNo: 3,
            maxScore: 100,
            attemptLimit: 3,
            proficiency: 3,
            skillId: "skill-1",
            statement: `# Linked List Implementation

Implement a singly linked list data structure with the following operations:

## Requirements

- Create a Node class with data and next pointer
- Implement add, remove, and display methods
- Handle edge cases (empty list, single element)

## Example

\`\`\`
Input: [1, 2, 3]
Output: 1 -> 2 -> 3 -> null

Input: []
Output: null
\`\`\`

## Constraints

- Time complexity: O(n) for most operations
- Space complexity: O(1) for additional space`,
            testCases: [
              {
                input: "[1, 2, 3]",
                output: "1 -> 2 -> 3 -> null",
                visibility: "public",
              },
              {
                input: "[5, 10]",
                output: "5 -> 10 -> null",
                visibility: "public",
              },
              {
                input: "[]",
                output: "null",
                visibility: "private",
              },
            ],
          });
        }, 500);
      });
    } catch (error) {
      console.error("Error fetching assignment:", error);
      throw error;
    }
  },

  // Lấy danh sách skills
  async getSkills() {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get("/api/skills");
      // return response.data;

      // Mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: "skill-1", name: "Data Structures" },
            { id: "skill-2", name: "Algorithms" },
            { id: "skill-3", name: "Object Oriented Programming" },
            { id: "skill-4", name: "Problem Solving" },
            { id: "skill-5", name: "Database Design" },
            { id: "skill-6", name: "Web Development" },
          ]);
        }, 300);
      });
    } catch (error) {
      console.error("Error fetching skills:", error);
      throw error;
    }
  },
};

// Named exports for convenience
export const getResources = resourceService.getResources;
export const getInsights = resourceService.getInsights;
export const createResource = resourceService.createResource;
export const getResourceDetail = resourceService.getResourceDetail;
export const createContent = resourceService.createContent;
export const updateContent = resourceService.updateContent;
export const getContentById = resourceService.getContentById;
export const createAssignment = resourceService.createAssignment;
export const updateAssignment = resourceService.updateAssignment;
export const getAssignmentById = resourceService.getAssignmentById;
export const getSkills = resourceService.getSkills;

export default resourceService;
