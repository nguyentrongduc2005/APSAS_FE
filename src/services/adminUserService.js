import api from "./api";

// Service cho Admin User Management
const adminUserService = {
  // Lấy danh sách người dùng
  async getUsers(params = {}) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get("/api/admin/users", { params });
      // return response.data;

      // Mock data tạm thời
      const {
        page = 1,
        limit = 10,
        role = "",
        status = "",
        keyword = "",
      } = params;

      const allUsers = [
        {
          id: "U001",
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          role: "student",
          status: "active",
          verified: true,
          createdAt: "2024-01-15",
          lastLogin: "2024-11-10",
        },
        {
          id: "U002",
          name: "Trần Thị B",
          email: "tranthib@example.com",
          role: "lecturer",
          status: "active",
          verified: true,
          createdAt: "2024-02-20",
          lastLogin: "2024-11-12",
        },
        {
          id: "U003",
          name: "Lê Minh C",
          email: "leminhc@example.com",
          role: "provider",
          status: "active",
          verified: true,
          createdAt: "2024-03-10",
          lastLogin: "2024-11-11",
        },
        {
          id: "U004",
          name: "Phạm Thị D",
          email: "phamthid@example.com",
          role: "student",
          status: "blocked",
          verified: false,
          createdAt: "2024-04-05",
          lastLogin: "2024-10-20",
        },
        {
          id: "U005",
          name: "Hoàng Văn E",
          email: "hoangvane@example.com",
          role: "admin",
          status: "active",
          verified: true,
          createdAt: "2024-05-12",
          lastLogin: "2024-11-14",
        },
      ];

      // Lọc theo role
      let filteredUsers = allUsers;
      if (role) {
        filteredUsers = filteredUsers.filter((u) => u.role === role);
      }

      // Lọc theo status
      if (status) {
        filteredUsers = filteredUsers.filter((u) => u.status === status);
      }

      // Lọc theo keyword
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        filteredUsers = filteredUsers.filter(
          (u) =>
            u.name.toLowerCase().includes(lowerKeyword) ||
            u.email.toLowerCase().includes(lowerKeyword) ||
            u.id.toLowerCase().includes(lowerKeyword)
        );
      }

      // Tính toán pagination
      const total = filteredUsers.length;
      const totalPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const end = start + limit;
      const data = filteredUsers.slice(start, end);

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
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Tạo người dùng mới
  async createUser(userData) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.post("/api/admin/users", userData);
      // return response.data;

      // Mock success
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        success: true,
        message: "Người dùng đã được tạo thành công",
        data: {
          id: "U" + String(Math.floor(Math.random() * 1000)).padStart(3, "0"),
          ...userData,
          createdAt: new Date().toISOString().slice(0, 10),
        },
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Cập nhật người dùng
  async updateUser(userId, userData) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.put(`/api/admin/users/${userId}`, userData);
      // return response.data;

      // Mock success
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        success: true,
        message: "Người dùng đã được cập nhật",
        data: {
          id: userId,
          ...userData,
        },
      };
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Khóa/Mở khóa người dùng
  async toggleUserStatus(userId, newStatus) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.patch(`/api/admin/users/${userId}/status`, {
      //   status: newStatus,
      // });
      // return response.data;

      // Mock success
      await new Promise((resolve) => setTimeout(resolve, 300));

      return {
        success: true,
        message: `Người dùng đã được ${
          newStatus === "active" ? "mở khóa" : "khóa"
        }`,
        data: {
          userId,
          status: newStatus,
        },
      };
    } catch (error) {
      console.error("Error toggling user status:", error);
      throw error;
    }
  },

  // Xóa người dùng
  async deleteUser(userId) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.delete(`/api/admin/users/${userId}`);
      // return response.data;

      // Mock success
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        success: true,
        message: "Người dùng đã được xóa",
      };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};

export default adminUserService;
