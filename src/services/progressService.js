import api from "./api";

// Service để lấy dữ liệu tiến độ học sinh
const progressService = {
  // Lấy thống kê tổng quan
  async getStats(studentId) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get(`/api/students/${studentId}/stats`);
      // return response.data;

      // Mock data tạm thời
      return {
        totalCourses: 109,
        completed: 87,
        completionRate: 92.5,
      };
    } catch (error) {
      console.error("Error fetching stats:", error);
      throw error;
    }
  },

  // Lấy dữ liệu điểm số theo khoảng thời gian
  async getScoreData(studentId, dateRange = "7days") {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get(`/api/students/${studentId}/scores`, {
      //   params: { range: dateRange }
      // });
      // return response.data;

      // Mock data tạm thời
      const mockDataMap = {
        "7days": [
          { day: "T2", value: 85 },
          { day: "T3", value: 78 },
          { day: "T4", value: 92 },
          { day: "T5", value: 88 },
          { day: "T6", value: 95 },
          { day: "T7", value: 90 },
          { day: "CN", value: 87 },
        ],
        "30days": Array.from({ length: 30 }, (_, i) => ({
          day: `${i + 1}`,
          value: Math.floor(Math.random() * 30) + 70,
        })),
        "90days": Array.from({ length: 90 }, (_, i) => ({
          day: i % 10 === 0 ? `${i + 1}` : "",
          value: Math.floor(Math.random() * 30) + 70,
        })),
      };

      return mockDataMap[dateRange] || mockDataMap["7days"];
    } catch (error) {
      console.error("Error fetching score data:", error);
      throw error;
    }
  },

  // Lấy danh sách khóa học đang học
  async getCurrentCourses(studentId) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get(`/api/students/${studentId}/current-courses`);
      // return response.data;

      // Mock data tạm thời
      return [
        {
          id: 1,
          name: "Thiết kế Web nâng cao",
          progress: 75,
        },
        {
          id: 2,
          name: "Lập trình JavaScript",
          progress: 60,
        },
        {
          id: 3,
          name: "React Framework",
          progress: 45,
        },
        {
          id: 4,
          name: "Node.js Backend",
          progress: 30,
        },
      ];
    } catch (error) {
      console.error("Error fetching current courses:", error);
      throw error;
    }
  },

  // Lấy danh sách thành tích
  async getAchievements(studentId) {
    try {
      // TODO: Gọi API thực tế
      // const response = await api.get(`/api/students/${studentId}/achievements`);
      // return response.data;

      // Mock data tạm thời
      return [
        {
          id: 1,
          name: "First Blood",
          description: "Hoàn thành khóa học đầu tiên",
          date: "23-04-21",
          icon: "Award",
          color: "purple",
        },
        {
          id: 2,
          name: "Streak Master",
          description: "Học liên tục 7 ngày",
          date: "15-05-21",
          icon: "Zap",
          color: "blue",
        },
        {
          id: 3,
          name: "Perfect Score",
          description: "Đạt 100% trong bài kiểm tra",
          date: "28-06-21",
          icon: "Target",
          color: "pink",
        },
      ];
    } catch (error) {
      console.error("Error fetching achievements:", error);
      throw error;
    }
  },
};

export default progressService;
