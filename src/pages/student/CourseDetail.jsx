import React, { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Book,
  BarChart3,
  FileText,
  CalendarDays,
  Calendar,
  Clock,
  Play,
  ListChecks,
  ChevronsRight,
  PenSquare,
} from "lucide-react";
import { lecturerAssignments } from "../../constants/lecturerAssignments";

export default function StudentCourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab =
    searchParams.get("tab") === "assignments" ? "assignments" : "overview";
  const [activeTab, setActiveTab] = useState(initialTab);

  const course = {
    id: courseId,
    title: "Cấu trúc dữ liệu nâng cao",
    instructor: "TS. Nguyễn Văn A",
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=450&fit=crop",
    totalLessons: 13,
    totalAssignments: 8,
    progress: 65,
    avgProgress: 58,
    totalStudents: 120,
    lastUpdated: "12/10/2024",
  };

  const modules = [
    { id: "lesson-1", title: "Giới thiệu Linked List", duration: "15 phút", type: "lesson", status: "completed" },
    { id: "assignment-1", title: "Bài tập: Implement Singly Linked List", deadline: "2024-10-15", type: "assignment", status: "review" },
    { id: "lesson-2", title: "Stack và Queue", duration: "20 phút", type: "lesson", status: "locked" },
  ];

  const recentActivities = [
    {
      id: "activity-1",
      message: "Bạn đã hoàn thành bài tập Implement Linked List với điểm 92%",
      time: "2 giờ trước",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: "activity-2",
      message: "Giảng viên đã cập nhật deadline bài tập Stack & Queue",
      time: "Hôm qua",
      avatar: "https://i.pravatar.cc/100?img=15",
    },
    {
      id: "activity-3",
      message: "Bạn đã xem bài giảng Stack và Queue",
      time: "2 ngày trước",
      avatar: "https://i.pravatar.cc/100?img=18",
    },
  ];

  const assignments = useMemo(() => lecturerAssignments, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams(tab === "assignments" ? { tab } : {});
  };

  return (
    <div className="space-y-6">
      <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/student/my-courses")}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
            >
              <ArrowLeft size={18} />
              Khóa học của tôi
            </button>
            <span className="text-gray-700">/</span>
            <span className="text-sm text-emerald-400 font-medium">Chi tiết</span>
          </div>
          <div className="text-sm text-blue-400 font-semibold">
            Tiến độ hiện tại: {course.progress}%
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm text-emerald-400 font-medium">Khóa học</p>
            <h1 className="text-3xl font-bold text-white">{course.title}</h1>
            <p className="text-gray-400">
              Khóa học bao gồm các cấu trúc dữ liệu nâng cao, bài giảng minh họa
              và hệ thống bài tập thực hành theo phong cách phỏng vấn.
            </p>
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
              <p className="text-sm text-gray-400">Học viên</p>
              <p className="text-xl font-semibold text-white">
                {course.totalStudents}
              </p>
            </div>
          </div>
          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Book size={22} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Bài học</p>
              <p className="text-xl font-semibold text-white">
                {course.totalLessons}
              </p>
            </div>
          </div>
          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <FileText size={22} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Bài tập</p>
              <p className="text-xl font-semibold text-white">
                {course.totalAssignments}
              </p>
            </div>
          </div>
          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <BarChart3 size={22} className="text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Tiến độ TB</p>
              <p className="text-xl font-semibold text-white">
                {course.avgProgress}%
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleTabChange("overview")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "overview"
                ? "bg-white/5 border border-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => handleTabChange("assignments")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "assignments"
                ? "bg-white/5 border border-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Bài tập
          </button>
        </div>
      </section>

      {activeTab === "overview" ? (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  Nội dung khóa học
                </h2>
                <span className="text-sm text-gray-400">
                  {modules.length} mục
                </span>
              </div>
              <div className="space-y-3">
                {modules.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-[#202934] bg-[#0b0f12] p-4 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-[#121922] text-emerald-400">
                          {item.type === "lesson" ? <Play size={16} /> : <ListChecks size={16} />}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{item.title}</p>
                          <p className="text-xs text-gray-500">
                            {item.type === "lesson"
                              ? item.duration
                              : `Deadline: ${item.deadline}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs uppercase font-semibold">
                        {item.status === "completed" && (
                          <span className="text-emerald-400">Đã hoàn thành</span>
                        )}
                        {item.status === "review" && (
                          <span className="text-amber-400">Chờ đánh giá</span>
                        )}
                        {item.status === "locked" && (
                          <span className="text-gray-500">Chưa mở</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  Hoạt động gần đây
                </h2>
                <span className="text-sm text-gray-400">
                  {recentActivities.length} cập nhật
                </span>
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-4 bg-[#0b0f12] border border-[#202934] rounded-xl"
                  >
                    <img
                      src={activity.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.message}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Hành động nhanh
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleTabChange("assignments")}
                  className="flex items-center gap-3 p-3 bg-[#0b0f12] hover:bg-[#151a24] border border-[#202934] hover:border-emerald-500/40 rounded-xl transition w-full text-left"
                >
                  <FileText size={18} className="text-emerald-400" />
                  <span className="text-white text-sm font-medium">
                    Quản lý bài tập
                  </span>
                </button>
                <button className="flex items-center gap-3 p-3 bg-[#0b0f12] hover:bg-[#151a24] border border-[#202934] hover:border-blue-500/40 rounded-xl transition w-full text-left">
                  <Calendar size={18} className="text-blue-400" />
                  <span className="text-white text-sm font-medium">
                    Lịch học & sự kiện
                  </span>
                </button>
              </div>
            </section>

            <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Tiến độ cá nhân
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">
                    {course.progress}%
                  </div>
                  <div className="text-sm text-gray-400">Hoàn thành</div>
                </div>
                <div className="h-2 bg-[#0b0f12] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>
                    Bài học: {Math.floor((course.totalLessons * course.progress) / 100)}/{course.totalLessons}
                  </span>
                  <span>
                    Bài tập: {course.totalAssignments - 3}/{course.totalAssignments}
                  </span>
                </div>
              </div>
            </section>

            <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Thông tin khóa học
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={14} />
                  <span>Cập nhật gần nhất: {course.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Users size={14} />
                  <span>{course.totalStudents} học viên đang học</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <BarChart3 size={14} />
                  <span>Tiến độ trung bình: {course.avgProgress}%</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Danh sách bài tập</h2>
              <p className="text-sm text-gray-400">
                Theo dõi trạng thái và truy cập nhanh từng bài.
              </p>
            </div>
            <span className="text-sm text-gray-400">
              Tổng {assignments.length} bài tập
            </span>
          </div>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="rounded-2xl border border-[#202934] bg-[#0b0f12] p-5 space-y-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Bài tập</p>
                    <h3 className="text-lg font-semibold text-white">
                      {assignment.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <CalendarDays size={16} />
                      Deadline: {assignment.deadline}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      assignment.status === "completed"
                        ? "text-emerald-400 bg-emerald-500/10"
                        : assignment.status === "in-progress"
                        ? "text-amber-400 bg-amber-500/10"
                        : "text-gray-400 bg-white/5"
                    }`}
                  >
                    {assignment.status === "completed"
                      ? "Đã hoàn thành"
                      : assignment.status === "in-progress"
                      ? "Đang làm"
                      : "Chưa bắt đầu"}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Đã nộp {assignment.submitted}/{assignment.total}
                </div>
                <div className="h-2 bg-[#10151c] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${assignment.progress}%` }}
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-emerald-400 font-semibold">
                    Điểm TB:{" "}
                    {assignment.avgScore != null ? `${assignment.avgScore}%` : "--"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-white/10 text-white hover:border-emerald-500 transition">
                      <PenSquare size={16} />
                      Luyện lại
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/student/assignments/${assignment.id}`, {
                          state: {
                            from: `/student/my-courses/${courseId}?tab=assignments`,
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-500 text-black hover:bg-blue-400 transition"
                    >
                      Xem bài tập
                      <ChevronsRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
