import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Book,
  BarChart3,
  FileText,
  Calendar,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";

export default function CourseOverview() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  // Mock data - trong thực tế sẽ fetch từ API dựa trên courseId
  const course = {
    id: courseId,
    title: "Java Programming Fundamentals",
    description: "Khóa học lập trình Java từ cơ bản đến nâng cao, bao gồm OOP, Collections, Exception Handling và nhiều chủ đề khác.",
    instructor: "Trần Minh Khôi",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop",
    totalStudents: 45,
    totalLessons: 13,
    totalAssignments: 8,
    progress: 85,
    avgProgress: 72,
    avgRating: 4.8,
    totalReviews: 32,
    createdAt: "2024-01-15",
    lastUpdated: "2024-11-01",
  };

  const recentActivities = [
    {
      id: 1,
      type: "submission",
      message: "Nguyễn Văn A đã nộp bài tập 'Java Collections'",
      time: "2 giờ trước",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    },
    {
      id: 2,
      type: "completion",
      message: "Trần Thị B đã hoàn thành bài học 'Object-Oriented Programming'",
      time: "4 giờ trước",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    },
    {
      id: 3,
      type: "question",
      message: "Lê Văn C đã đặt câu hỏi về 'Exception Handling'",
      time: "6 giờ trước",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/lecturer/my-courses")}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
            >
              <ArrowLeft size={18} />
              Khóa học của tôi
            </button>
            <span className="text-gray-700">/</span>
            <span className="text-sm text-emerald-400 font-medium">Tổng quan</span>
          </div>
          <div className="text-sm text-blue-400 font-semibold">
            Tiến độ khóa học: {course.progress}%
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm text-emerald-400 font-medium">Khóa học</p>
            <h1 className="text-3xl font-bold text-white">{course.title}</h1>
            <p className="text-gray-400 leading-relaxed">{course.description}</p>
            <p className="text-gray-400">Giảng viên: {course.instructor}</p>
          </div>
          <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden bg-[#0b0f12]">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Users size={22} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Sinh viên</p>
              <p className="text-xl font-semibold text-white">{course.totalStudents}</p>
            </div>
          </div>
          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Book size={22} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Bài học</p>
              <p className="text-xl font-semibold text-white">{course.totalLessons}</p>
            </div>
          </div>
          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <BarChart3 size={22} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Tiến độ TB</p>
              <p className="text-xl font-semibold text-white">{course.avgProgress}%</p>
            </div>
          </div>
          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <FileText size={22} className="text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Bài tập</p>
              <p className="text-xl font-semibold text-white">{course.totalAssignments}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 text-white">
            Tổng quan
          </button>
          <Link
            to={`/lecturer/courses/${courseId}/assignments`}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white transition"
          >
            Bài tập
          </Link>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Course Stats */}
          <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Thống kê khóa học</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Đánh giá trung bình</span>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{course.avgRating}</span>
                    <span className="text-gray-400 text-sm">({course.totalReviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tỷ lệ hoàn thành</span>
                  <span className="text-emerald-400 font-semibold">{course.avgProgress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Ngày tạo</span>
                  <span className="text-white">{course.createdAt}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Cập nhật lần cuối</span>
                  <span className="text-white">{course.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tổng bài tập</span>
                  <span className="text-white">{course.totalAssignments}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tình trạng</span>
                  <span className="text-emerald-400 font-semibold">Đang hoạt động</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activities */}
          <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Hoạt động gần đây</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-4 bg-[#0b0f12] border border-[#202934] rounded-xl">
                  <img
                    src={activity.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.message}</p>
                    <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Hành động nhanh</h3>
            <div className="space-y-3">
              <Link
                to={`/lecturer/courses/${courseId}/assignments`}
                className="flex items-center gap-3 p-3 bg-[#0b0f12] hover:bg-[#151a24] border border-[#202934] hover:border-emerald-500/40 rounded-xl transition"
              >
                <FileText size={18} className="text-emerald-400" />
                <span className="text-white text-sm font-medium">Quản lý bài tập</span>
              </Link>
              <button className="flex items-center gap-3 p-3 bg-[#0b0f12] hover:bg-[#151a24] border border-[#202934] hover:border-blue-500/40 rounded-xl transition w-full text-left">
                <TrendingUp size={18} className="text-blue-400" />
                <span className="text-white text-sm font-medium">Xem báo cáo</span>
              </button>
              <button className="flex items-center gap-3 p-3 bg-[#0b0f12] hover:bg-[#151a24] border border-[#202934] hover:border-yellow-500/40 rounded-xl transition w-full text-left">
                <Calendar size={18} className="text-yellow-400" />
                <span className="text-white text-sm font-medium">Lên lịch học</span>
              </button>
            </div>
          </section>

          {/* Course Progress */}
          <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tiến độ khóa học</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">{course.progress}%</div>
                <div className="text-sm text-gray-400">Hoàn thành</div>
              </div>
              <div className="h-2 bg-[#0b0f12] rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Bài học: {Math.floor(course.totalLessons * course.progress / 100)}/{course.totalLessons}</span>
                <span className="text-gray-400">Còn lại: {course.totalLessons - Math.floor(course.totalLessons * course.progress / 100)}</span>
              </div>
            </div>
          </section>

          {/* Course Info */}
          <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Thông tin khóa học</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={14} />
                <span>Cập nhật: {course.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Users size={14} />
                <span>{course.totalStudents} sinh viên đang học</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Star size={14} />
                <span>{course.avgRating}/5 ({course.totalReviews} đánh giá)</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}