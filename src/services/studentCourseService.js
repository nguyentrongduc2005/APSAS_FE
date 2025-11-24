// src/services/studentCourseService.js
import api from './api';

/**
 * Student Course Service - Xử lý API liên quan đến khóa học của sinh viên
 */
export const studentCourseService = {
  /**
   * Lấy danh sách khóa học của sinh viên hiện tại
   * @param {Object} params - Query parameters
   * @param {number} params.page - Số trang (0-indexed)
   * @param {number} params.size - Kích thước trang
   * @param {string} params.sort - Sắp xếp (vd: "name,asc")
   * @returns {Promise} API response
   */
  async getMyCourses(params = {}) {
    const {
      page = 0,
      size = 6,
      sort = '',
    } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (sort) {
      queryParams.append('sort', sort);
    }

    try {
      const response = await api.get(`/courses/student/my-courses?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student courses:', error);
      throw error;
    }
  },

  /**
   * Tham gia khóa học bằng mã khóa học
   * @param {string} courseCode - Mã khóa học
   * @returns {Promise} API response
   */
  async joinCourse(courseCode) {
    try {
      const response = await api.post('/courses/student/join', {
        courseCode: courseCode.trim()
      });
      return response.data;
    } catch (error) {
      console.error('Error joining course:', error);
      throw error;
    }
  },

  /**
   * Rời khỏi khóa học
   * @param {number} courseId - ID khóa học
   * @returns {Promise} API response
   */
  async leaveCourse(courseId) {
    try {
      const response = await api.delete(`/courses/student/${courseId}/leave`);
      return response.data;
    } catch (error) {
      console.error('Error leaving course:', error);
      throw error;
    }
  }
};

export default studentCourseService;