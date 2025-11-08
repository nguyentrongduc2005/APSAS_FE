import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import LecturerCourseCard from "../../components/lecturer/CourseCard";

export default function LecturerMyCourses() {
  const { user } = useAuth();

  // Mock data - thay bằng API call
  const myCourses = [
    {
      id: 1,
      title: "Java Programming Fundamentals",
      thumbnail:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop",
      language: "Public",
      studentCount: 45,
      lessonCount: 13,
      duration: 18,
      progress: 100,
    },
    {
      id: 2,
      title: "Advanced Java Concepts",
      thumbnail:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=450&fit=crop",
      language: "Public",
      studentCount: 30,
      lessonCount: 20,
      duration: 25,
      progress: 75,
    },
    {
      id: 3,
      title: "Spring Boot Masterclass",
      thumbnail:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
      language: "Public",
      studentCount: 89,
      lessonCount: 30,
      duration: 40,
      progress: 100,
    },
  ];

  const stats = {
    totalCourses: myCourses.length,
    totalStudents: myCourses.reduce((sum, c) => sum + c.studentCount, 0),
    totalLessons: myCourses.reduce((sum, c) => sum + c.lessonCount, 0),
    avgProgress: Math.round(
      myCourses.reduce((sum, c) => sum + c.progress, 0) / myCourses.length
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Khóa học của tôi
          </h1>
          <p className="text-gray-400 mt-1">
            Quản lý và theo dõi khóa học, {user?.name}
          </p>
        </div>

        <Link
          to="/lecturer/courses/create"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-lg transition whitespace-nowrap"
        >
          + Tạo khóa học mới
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tổng khóa học</p>
              <p className="text-2xl font-bold text-white mt-1">
                {stats.totalCourses}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tổng học viên</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">
                {stats.totalStudents}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tổng bài học</p>
              <p className="text-2xl font-bold text-blue-400 mt-1">
                {stats.totalLessons}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📖</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tiến độ TB</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">
                {stats.avgProgress}%
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#202934]"></div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course) => (
          <LecturerCourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Empty State (nếu không có khóa học) */}
      {myCourses.length === 0 && (
        <div className="text-center py-12 bg-[#0f1419] border border-[#202934] rounded-lg">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Chưa có khóa học
          </h3>
          <p className="text-gray-400 mb-6">
            Tạo khóa học đầu tiên và bắt đầu giảng dạy
          </p>
          <Link
            to="/lecturer/courses/create"
            className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-lg transition"
          >
            Tạo khóa học
          </Link>
        </div>
      )}
    </div>
  );
}
