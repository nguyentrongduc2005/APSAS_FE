import api from "./api";

// Service cho Resource Management (Lecturer)
const resourceService = {
  // Lấy danh sách tài nguyên theo status + search
  async getResources(params = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        keyword = "",
        status = "all",      
        hasAssignment,       
      } = params;

      // Map status ở FE -> status enum ở BE
      let backendStatus;
      switch (status) {
        case "pending":
          backendStatus = "PENDING";
          break;
        case "approved":
          backendStatus = "PUBLISHED";
          break;
        case "rejected":
          backendStatus = "REJECTED";
          break;
        case "draft":
          backendStatus = "DRAFT";
          break;
        default:
          backendStatus = undefined; // tab "all" thì không filter status
      }

      const response = await api.post(
        "/tutorials/my",
        null,
        {
          params: {
            keyword: keyword || undefined,
            status: backendStatus,
            hasAssignment:
              typeof hasAssignment === "boolean"
                ? hasAssignment
                : undefined,
          },
        }
      );

      const list = response.data?.data || [];

      // Map dữ liệu BE -> shape resource mà ResourceManagementCard đang dùng
      const allResources = list.map((item) => {
        // Map status BE -> status FE
        let feStatus = "pending";
        switch (item.status) {
          case "PUBLISHED":
            feStatus = "approved";
            break;
          case "PENDING":
            feStatus = "pending";
            break;
          case "REJECTED":
            feStatus = "rejected";
            break;
          case "DRAFT":
            feStatus = "draft";
            break;
          default:
            feStatus = "pending";
        }

        return {
          id: item.id,
          title: item.title,
          description: item.summary,
          status: feStatus,
          contentCount: item.lessonCount ?? 0,
          exerciseCount: item.assignmentCount ?? 0,
          imageCount: 0,          
          createdAt: "",          
          type: "VIDEO",          
        };
      });

      
      const total = allResources.length;
      const totalPages = Math.max(1, Math.ceil(total / limit));
      const start = (page - 1) * limit;
      const end = start + limit;
      const data = allResources.slice(start, end);

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
