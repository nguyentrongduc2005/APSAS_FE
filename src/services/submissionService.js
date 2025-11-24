// src/services/submissionService.js
import api from "./api";

const submissionService = {
  // Lấy chi tiết 1 submission theo id
  async getSubmissionDetail(submissionId) {
    // Giả định BE có endpoint: GET /api/student/submissions/{id}
    const res = await api.get(`/student/submissions/${submissionId}`);
    const wrapper = res.data || {};
    return wrapper.data || wrapper;
  },

  // Nếu sau này BE có API lấy lịch sử run/test case, có thể thêm ở đây
};

export default submissionService;
