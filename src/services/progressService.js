// src/services/progressService.js
import api from "./api";

/**
 * progressService
 * Gọi API thật từ backend APSAS:
 *
 *   GET /progress/{studentId}
 *
 * Trả về ApiResponse<List<StudentCourseProgressResponse>>
 */
const progressService = {
  // Lấy danh sách tiến độ học tập
  async getProgress(studentId) {
    try {
      const res = await api.get(`/progress/${studentId}`);
      return res.data?.data || [];
    } catch (error) {
      console.error("🔥 Error fetching progress:", error);
      throw error;
    }
  },

  // Tính thống kê tổng quan cho dashboard
  computeStats(progressList) {
    const totalCourses = progressList.length;

    const completed = progressList.filter((item) => {
      const p = Number(item.progressPercent || 0);
      return p >= 100;
    }).length;

    const avgProgress = totalCourses
      ? progressList.reduce(
          (sum, item) => sum + Number(item.progressPercent || 0),
          0
        ) / totalCourses
      : 0;

    return {
      totalCourses,
      completed,
      completionRate: Number(avgProgress.toFixed(1)),
    };
  },

  // Data dùng cho biểu đồ
  buildChartData(progressList) {
    return progressList.map((item, idx) => ({
      day: item.courseName?.slice(0, 10) || `C${idx + 1}`,
      value: Number(item.progressPercent || 0),
    }));
  },

  // Danh sách khóa học đang học
  buildCurrentCourses(progressList) {
    return progressList.map((item) => ({
      id: item.courseId ?? item.id,
      name: item.courseName,
      progress: Number(item.progressPercent || 0),
    }));
  },

  // Thành tích (tạm thời = các khóa đã hoàn thành)
  buildAchievements(progressList) {
    return progressList
      .filter((item) => Number(item.progressPercent || 0) >= 100)
      .map((item, idx) => ({
        id: item.courseId ?? idx,
        name: item.courseName || "Hoàn thành khóa học",
        description: "Bạn đã hoàn thành khóa học này.",
        date: item.completedAt || "—",
        icon: "Award",
        color: "purple",
      }));
  },
};

export default progressService;
