// src/pages/student/MyCourses.jsx
import React, { useState, useEffect } from "react";
import { BookOpen, CheckCircle, Clock, Plus, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import StudentCourseCard from "../../components/student/CourseCard";
import courseService from "../../services/courseService";

export default function MyCourses() {
  const { user } = useAuth();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // 1. Load danh sách khóa học từ BE
  // =========================
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoadingCourses(true);
        setError("");

        // GỌI API BE: GET /api/courses/student/my-courses
        const data = await courseService.getStudentCourses();

        // data có thể là:
        // - mảng: [ {id, ...}, ... ]
        // - hoặc object phân trang: { content: [...] }
        const list = data?.content ?? data ?? [];

        setEnrolledCourses(list);
      } catch (e) {
        console.error("Error loading student courses:", e);
        setError("Không tải được danh sách khoá học, vui lòng thử lại.");
      } finally {
        setIsLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);

  // =========================
  // 2. Join khoá học bằng mã code
  // =========================
  const handleJoinCourse = async () => {
    if (!courseCode.trim()) {
      setError("Vui lòng nhập mã lớp.");
      return;
    }

    try {
      setIsJoining(true);
      setError("");

      // Gọi API join bằng code
      await courseService.joinCourseByCode(courseCode.trim());

      // Join xong thì load lại danh sách khoá học
      const data = await courseService.getStudentCourses();
      const list = data?.content ?? data ?? [];
      setEnrolledCourses(list);

      setShowJoinModal(false);
      setCourseCode("");
    } catch (e) {
      console.error("Join course error:", e);
      setError("Không tham gia được khoá học. Vui lòng kiểm tra lại mã.");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
            <BookOpen size={24} className="text-emerald-400" />
            Khoá học của tôi
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Xin chào, {user?.fullName || user?.username || "bạn"} 👋. 
            Đây là các khoá học bạn đang tham gia.
          </p>
        </div>

        <button
          onClick={() => {
            setShowJoinModal(true);
            setError("");
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-black font-medium text-sm hover:bg-emerald-400 transition"
        >
          <Plus size={18} />
          Tham gia khoá học
        </button>
      </div>

      {/* Stats (tuỳ thích) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0f1419] border border-[#202934] rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle size={20} />
          </div>
          <div>
            <div className="text-xs text-slate-400">Tổng khoá học</div>
            <div className="text-lg font-semibold text-white">
              {enrolledCourses.length}
            </div>
          </div>
        </div>

        <div className="bg-[#0f1419] border border-[#202934] rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
            <Clock size={20} />
          </div>
          <div>
            <div className="text-xs text-slate-400">Tiến độ</div>
            <div className="text-lg font-semibold text-white">
              Đang phát triển
            </div>
          </div>
        </div>

        <div className="bg-[#0f1419] border border-[#202934] rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
            <BookOpen size={20} />
          </div>
          <div>
            <div className="text-xs text-slate-400">Chế độ</div>
            <div className="text-lg font-semibold text-white">
              Student mode
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách khoá học */}
      {isLoadingCourses ? (
        <div className="text-slate-300">Đang tải danh sách khoá học...</div>
      ) : error ? (
        <div className="text-red-400 text-sm">{error}</div>
      ) : enrolledCourses.length === 0 ? (
        <div className="text-slate-300 text-sm">
          Bạn chưa tham gia khoá học nào.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {enrolledCourses.map((course) => (
            <StudentCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {/* Modal join khoá học */}
      {showJoinModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="bg-[#0f1419] border border-[#202934] rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                Tham gia khoá học
              </h2>
              <button
                onClick={() => {
                  setShowJoinModal(false);
                  setError("");
                }}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <label className="block text-sm text-slate-300 mb-2">
              Nhập mã khoá học:
            </label>
            <input
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#111827] border border-[#1f2937] text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="VD: ABC123"
            />

            {error && (
              <p className="text-xs text-red-400 mt-2">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowJoinModal(false);
                  setError("");
                }}
                className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5"
              >
                Hủy
              </button>
              <button
                onClick={handleJoinCourse}
                disabled={isJoining}
                className="px-4 py-2 rounded-lg text-sm bg-emerald-500 text-black font-medium hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isJoining ? "Đang tham gia..." : "Tham gia"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
