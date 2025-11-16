import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BookOpen, CheckCircle, Clock, Plus, X } from "lucide-react";
import StudentCourseCard from "../../components/student/CourseCard";

export default function StudentMyCourses() {
  const { user } = useAuth();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");

  const handleJoinCourse = async () => {
    if (!courseCode.trim()) {
      setError("Vui lòng nhập mã khóa học");
      return;
    }

    setIsJoining(true);
    setError("");

    try {
      // TODO: Gọi API để tham gia khóa học với courseCode
      // await courseService.joinCourse(courseCode);

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Thành công
      alert(`Tham gia khóa học thành công với mã: ${courseCode}`);
      setShowJoinModal(false);
      setCourseCode("");
    } catch (err) {
      setError(err.message || "Mã khóa học không hợp lệ");
    } finally {
      setIsJoining(false);
    }
  };

  // Mock data - thay bằng API call
  const enrolledCourses = [
    {
      id: 1,
      title: "Java Programming Fundamentals",
      instructor: "TS. Trần Minh Quân",
      instructorAvatar: "/images/avatar-lecturer1.png",
      thumbnail: "/images/course-java.png",
      language: "Public",
      studentCount: 45,
      lessonCount: 13,
      duration: 18,
      progress: 65,
      lastAccessed: "2 days ago",
    },
    {
      id: 2,
      title: "Web Development with React",
      instructor: "TS. Nguyễn Văn A",
      instructorAvatar: "/images/avatar-lecturer2.png",
      thumbnail: "/images/course-react.png",
      language: "Public",
      studentCount: 120,
      lessonCount: 24,
      duration: 32,
      progress: 30,
      lastAccessed: "5 days ago",
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "TS. Lê Văn C",
      instructorAvatar: "/images/avatar-lecturer3.png",
      thumbnail: "/images/course-python.png",
      language: "Public",
      studentCount: 89,
      lessonCount: 18,
      duration: 24,
      progress: 90,
      lastAccessed: "1 day ago",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Khóa học của tôi
          </h1>
          <p className="text-gray-400 mt-1">
            Chào {user?.name}! Tiếp tục hành trình học tập của bạn.
          </p>
        </div>

        <button
          onClick={() => setShowJoinModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-lg transition whitespace-nowrap"
        >
          <Plus size={20} />
          Tham gia khóa học
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Khóa đã đăng ký</p>
              <p className="text-2xl font-bold text-white mt-1">
                {enrolledCourses.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <BookOpen size={24} className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Đã hoàn thành</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">
                {enrolledCourses.filter((c) => c.progress === 100).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Đang học</p>
              <p className="text-2xl font-bold text-blue-400 mt-1">
                {
                  enrolledCourses.filter(
                    (c) => c.progress > 0 && c.progress < 100
                  ).length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 border-b border-[#202934] overflow-x-auto">
        <button className="px-4 py-2 text-emerald-400 border-b-2 border-emerald-400 font-medium whitespace-nowrap">
          Tất cả
        </button>
        <button className="px-4 py-2 text-gray-400 hover:text-white transition whitespace-nowrap">
          Đang học
        </button>
        <button className="px-4 py-2 text-gray-400 hover:text-white transition whitespace-nowrap">
          Đã hoàn thành
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <StudentCourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Empty State (nếu không có khóa học) */}
      {enrolledCourses.length === 0 && (
        <div className="text-center py-12 bg-[#0f1419] border border-[#202934] rounded-lg">
          <div className="flex justify-center mb-4">
            <BookOpen size={64} className="text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Chưa có khóa học
          </h3>
          <p className="text-gray-400 mb-6">
            Bắt đầu học bằng cách đăng ký một khóa học
          </p>
          <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-lg transition">
            Khám phá khóa học
          </button>
        </div>
      )}

      {/* Join Course Modal */}
      {showJoinModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowJoinModal(false)}
        >
          <div
            className="bg-[#0f1419] border border-[#202934] rounded-xl max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                Tham gia khóa học
              </h3>
              <button
                onClick={() => setShowJoinModal(false)}
                className="p-1 hover:bg-[#202934] rounded-lg transition"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm">
              Nhập mã khóa học mà giảng viên đã cung cấp để tham gia
            </p>

            {/* Input */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">
                Mã khóa học
              </label>
              <input
                type="text"
                value={courseCode}
                onChange={(e) => {
                  setCourseCode(e.target.value.toUpperCase());
                  setError("");
                }}
                placeholder="VD: ABC123"
                className="w-full px-4 py-3 bg-[#0b0f12] border border-[#202934] rounded-lg text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition"
                autoFocus
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setShowJoinModal(false);
                  setCourseCode("");
                  setError("");
                }}
                className="flex-1 px-4 py-2.5 bg-[#0b0f12] border border-[#202934] hover:border-emerald-500 text-white font-medium rounded-lg transition"
                disabled={isJoining}
              >
                Hủy
              </button>
              <button
                onClick={handleJoinCourse}
                disabled={isJoining}
                className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
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
