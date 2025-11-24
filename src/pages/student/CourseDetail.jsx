// src/pages/student/CourseDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Users, Clock, ArrowLeft } from "lucide-react";
import courseService from "../../services/courseService";

export default function StudentCourseDetail() {
  // ✅ ĐÚNG với route "student/my-courses/:courseId"
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;

      try {
        setLoading(true);
        setError("");

        // ✅ Gọi hàm detail cho student
        const data = await courseService.getStudentCourseDetail(courseId);
        setCourse(data);
      } catch (err) {
        console.error("Error loading course detail:", err);
        setError("Không tải được thông tin khoá học.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="p-6 text-slate-200">Đang tải thông tin khoá học...</div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400 text-sm">
        {error}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6 text-slate-200">
        Không tìm thấy khoá học.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm mb-2"
      >
        <ArrowLeft size={18} />
        Quay lại
      </button>

      {/* Header */}
      <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-semibold text-white">
            {course.title || course.name || "Khoá học"}
          </h1>
          <p className="text-sm text-slate-300">
            {course.description || "Khoá học chưa có mô tả."}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-slate-300 pt-2">
            <div className="inline-flex items-center gap-2">
              <Users size={16} className="text-emerald-400" />
              <span>
                {course.totalStudents ?? course.studentsCount ?? 0} học viên
              </span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Clock size={16} className="text-sky-400" />
              <span>
                {course.lessonsCount ?? course.totalLessons ?? 0} bài học
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung khác (lessons, assignments, …) sau này bạn bổ sung thêm */}
      <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-3">
          Nội dung khoá học
        </h2>
        <p className="text-sm text-slate-300">
          Phần này bạn có thể render danh sách bài học, bài tập,... từ BE khi có API tương ứng.
        </p>
      </div>
    </div>
  );
}
