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
        sortBy = "createdAt",
        order = "DESC",
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

      const response = await api.get("/tutorials/my", {
        params: {
          keyword: keyword || undefined,
          status: backendStatus,
          hasAssignment:
            typeof hasAssignment === "boolean" ? hasAssignment : undefined,
          page: page - 1,
          size: limit,
          sortBy,
          order,
        },
      });

      console.log("📤 API Request params:", {
        originalPage: page,
        backendPage: page - 1,
        size: limit,
        keyword,
        status: backendStatus,
      });
      console.log("📦 Full API response:", response);
      console.log("📦 response.data:", response.data);
      console.log("📦 response.data.data:", response.data?.data);

      // Kiểm tra cấu trúc response
      // Có thể là: response.data.data hoặc response.data trực tiếp
      let responseData;
      if (response.data?.data && typeof response.data.data === "object") {
        // Trường hợp: { code, message, data: { content: [], totalElements, ... } }
        responseData = response.data.data;
      } else if (
        response.data?.content &&
        Array.isArray(response.data.content)
      ) {
        // Trường hợp: { content: [], totalElements, ... } trực tiếp
        responseData = response.data;
      } else {
        console.error("❌ Unexpected response structure");
        responseData = {};
      }

      const list = responseData?.content || [];
      const totalElements = responseData?.totalElements || 0;
      const totalPages = responseData?.totalPages || 0;
      const currentPageFromBE =
        responseData?.number !== undefined ? responseData.number : page - 1;
      const currentPage = currentPageFromBE + 1; // Convert 0-indexed to 1-indexed

      console.log("📊 Parsed pagination info:", {
        currentPage,
        totalPages,
        totalElements,
        listLength: list.length,
        rawNumber: responseData?.number,
      });

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
          imageCount: item.mediaCount ?? 0,
          createdAt: item.createdDate
            ? new Date(item.createdDate).toLocaleDateString("vi-VN")
            : "",
          type: "VIDEO",
        };
      });

      return {
        data: allResources,
        pagination: {
          page: currentPage,
          limit,
          total: totalElements,
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
      // Gọi API để lấy tất cả resources (không filter status)
      const response = await api.get("/tutorials/my", {
        params: {
          page: 0,
          size: 1000, // Lấy nhiều để đếm chính xác
          sortBy: "createdAt",
          order: "DESC",
        },
      });

      console.log("📊 Insights API response:", response.data);

      const responseData = response.data?.data || response.data;
      const list = responseData?.content || [];
      const totalElements = responseData?.totalElements || 0;

      // Đếm theo status
      const pending = list.filter((item) => item.status === "PENDING").length;
      const approved = list.filter(
        (item) => item.status === "PUBLISHED"
      ).length;
      const rejected = list.filter((item) => item.status === "REJECTED").length;

      console.log("📈 Insights calculated:", {
        total: totalElements,
        pending,
        approved,
        rejected,
      });

      return {
        total: totalElements,
        pending,
        approved,
        rejected,
      };
    } catch (error) {
      console.error("Error fetching insights:", error);
      // Trả về giá trị mặc định nếu có lỗi
      return {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
      };
    }
  },

  // Tạo tutorial mới (API 21)
  async createResource(payload) {
    try {
      const res = await api.post("/tutorials", payload);
      // BE trả { code, message, data }
      return res.data?.data;
    } catch (error) {
      console.error("Error creating tutorial:", error);
      throw error;
    }
  },

  // Lấy chi tiết tutorial (API 24)
  async getResourceDetail(tutorialId) {
    try {
      const res = await api.get(`/tutorials/${tutorialId}`);
      return res.data?.data;
    } catch (error) {
      console.error("Error fetching tutorial detail:", error);
      throw error;
    }
  },

  // Tạo content mới cho tutorial (API 23)
  async createContent(tutorialId, contentData) {
    try {
      const res = await api.post(
        `/tutorials/${tutorialId}/contents`,
        contentData
      );
      return res.data?.data;
    } catch (error) {
      console.error("Error creating content:", error);
      throw error;
    }
  },

  // Cập nhật content (API 28)
  async updateContent(tutorialId, contentId, contentData) {
    try {
      const res = await api.put(
        `/tutorials/contents/${contentId}`,
        contentData
      );
      return res.data?.data;
    } catch (error) {
      console.error("Error updating content:", error);
      throw error;
    }
  },

  // Lấy content theo ID (API 26)
  async getContentById(tutorialId, contentId) {
    try {
      const res = await api.get(`/tutorials/contents/${contentId}`);
      return res.data?.data;
    } catch (error) {
      console.error("Error fetching content detail:", error);
      throw error;
    }
  },

  // Tạo assignment mới cho tutorial (API 22)
  async createAssignment(tutorialId, assignmentData) {
    try {
      const res = await api.post(
        `/tutorials/${tutorialId}/assignments`,
        assignmentData
      );
      return res.data?.data;
    } catch (error) {
      console.error("Error creating assignment:", error);
      throw error;
    }
  },

  // Cập nhật assignment (API 29)
  async updateAssignment(tutorialId, assignmentId, assignmentData) {
    try {
      const res = await api.put(
        `/tutorials/assignments/${assignmentId}`,
        assignmentData
      );
      return res.data?.data;
    } catch (error) {
      console.error("Error updating assignment:", error);
      throw error;
    }
  },

  // Lấy assignment theo ID (API 27)
  async getAssignmentById(tutorialId, assignmentId) {
    try {
      const res = await api.get(`/tutorials/assignments/${assignmentId}`);
      // Debug: sometimes backend returns different shapes (data vs payload)
      console.debug("getAssignmentById response:", {
        status: res.status,
        data: res.data,
      });

      // Try multiple possible shapes to avoid returning undefined
      return res.data?.data ?? res.data ?? null;
    } catch (error) {
      console.error("Error fetching assignment detail:", error);
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
