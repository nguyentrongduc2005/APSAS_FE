// src/services/courseService.js
import api from "./api";

const normalizeCourseDetail = (raw) => {
  if (!raw) return raw;
  return {
    ...raw,
    lessonsCount:
      raw.lessonsCount ?? raw.totalLessons ?? raw.totalLession ?? 0,
    totalAssignments: raw.totalAssignments ?? raw.totalAssignment ?? 0,
    totalStudents:
      raw.totalStudents ?? raw.studentsCount ?? raw.currentMember ?? 0,
  };
};

const courseService = {
  // ===============================
  // PUBLIC COURSE LIST  (/api/courses)
  // ===============================
  getPublicCoursesList: async ({ page = 0, size = 9, search = "" } = {}) => {
    const res = await api.get("/courses", {
      params: {
        page,
        size,
        sort: "title,asc",
        search: search || undefined,
      },
    });

    const raw = res.data?.data ?? res.data;

    return {
      content: raw.content ?? [],
      totalPages: raw.totalPages ?? 1,
      totalElements: raw.totalElements ?? 0,
    };
  },

  // ===============================
  // PUBLIC COURSE DETAIL  (/api/public/courses/{id})
  // ===============================
  getCourseRegisterDetails: async (courseId) => {
    console.log("[API REQUEST] GET -> /public/courses/" + courseId);
    const res = await api.get(`/public/courses/${courseId}`); 
    console.log("[API RESPONSE] /public/courses/" + courseId, res.data);
    const data = res.data?.data ?? res.data;
    return normalizeCourseDetail(data);
  },

  // ===============================
  // STUDENT – MY COURSES
  // ===============================
  getStudentCourses: async ({ page = 0, size = 20, search = "" } = {}) => {
    const res = await api.get("/courses/student/my-courses", {
      params: {
        page,
        size,
        sort: "title,asc",
        search: search || undefined,
      },
    });
    return res.data?.data ?? res.data;
  },

  getStudentCourseDetail: async (courseId) => {
    const res = await api.get(`/public/courses/${courseId}`);
    const data = res.data?.data ?? res.data;
    return normalizeCourseDetail(data);
  },
};

export default courseService;
