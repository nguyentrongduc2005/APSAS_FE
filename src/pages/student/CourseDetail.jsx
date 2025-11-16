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
  Image,
  HelpCircle,
  X,
} from "lucide-react";
import { lecturerAssignments } from "../../constants/lecturerAssignments";

export default function StudentCourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab =
    searchParams.get("tab") === "assignments" ? "assignments" : "overview";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpContent, setHelpContent] = useState("");
  const [isSubmittingHelp, setIsSubmittingHelp] = useState(false);

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
    {
      id: "lesson-1",
      title: "Giới thiệu Linked List",
      duration: "15 phút",
      imageCount: 8,
      type: "content",
      status: "completed",
    },
    {
      id: "assignment-1",
      title: "Bài tập: Implement Singly Linked List",
      deadline: "2024-10-15",
      type: "assignment",
      status: "review",
    },
    {
      id: "lesson-2",
      title: "Stack và Queue",
      duration: "20 phút",
      imageCount: 12,
      type: "content",
      status: "in-progress",
    },
    {
      id: "lesson-3",
      title: "Cấu trúc dữ liệu Tree",
      duration: "25 phút",
      imageCount: 15,
      type: "content",
      status: "locked",
    },
    {
      id: "assignment-2",
      title: "Stack và Queue",
      deadline: "2024-10-20",
      type: "assignment",
      status: "not-started",
    },
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
            <span className="text-sm text-emerald-400 font-medium">
              Chi tiết
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-blue-400 font-semibold">
              Tiến độ hiện tại: {course.progress}%
            </span>
            <button
              onClick={() => setShowHelpModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-sm font-medium transition border border-amber-500/20"
            >
              <HelpCircle size={18} />
              Yêu cầu hỗ trợ
            </button>
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
        <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Nội dung khóa học
            </h2>
            <span className="text-sm text-gray-400">{modules.length} mục</span>
          </div>
          <div className="space-y-3">
            {modules.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.type === "assignment") {
                    navigate(`/student/assignments/${item.id}`);
                  } else if (item.type === "content") {
                    navigate(`/contents/${item.id}`);
                  }
                }}
                className={`rounded-xl border border-[#202934] bg-[#0b0f12] p-4 hover:border-emerald-500/40 transition cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`p-2 rounded-lg ${
                        item.type === "content"
                          ? "bg-blue-500/10"
                          : "bg-purple-500/10"
                      }`}
                    >
                      {item.type === "content" ? (
                        <Play size={18} className="text-blue-400" />
                      ) : (
                        <ListChecks size={18} className="text-purple-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium">{item.title}</p>
                      </div>
                      {item.type === "content" && (
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={12} />
                            {item.duration}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Image size={12} />
                            {item.imageCount} ảnh
                          </span>
                        </div>
                      )}
                      {item.type === "assignment" && (
                        <p className="text-xs text-gray-500 mt-1">
                          Hạn nộp: {item.deadline}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-xs font-medium">
                    {item.status === "completed" && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                        Hoàn thành
                      </span>
                    )}
                    {item.status === "review" && (
                      <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400">
                        Chờ đánh giá
                      </span>
                    )}
                    {item.status === "in-progress" && (
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">
                        Đang học
                      </span>
                    )}
                    {item.status === "not-started" && (
                      <span className="px-3 py-1 rounded-full bg-gray-500/10 text-gray-400">
                        Chưa bắt đầu
                      </span>
                    )}
                    {item.status === "locked" && (
                      <span className="px-3 py-1 rounded-full bg-gray-500/10 text-gray-500">
                        Chưa mở
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Danh sách bài tập
              </h2>
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
                <div className="h-2 bg-[#10151c] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${assignment.progress}%` }}
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <div className="flex flex-wrap gap-2">
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

      {/* Help Request Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowHelpModal(false)}
          ></div>
          <div className="relative bg-[#0f1419] border border-[#202934] rounded-2xl w-full max-w-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Yêu cầu hỗ trợ</h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Khóa học
                </label>
                <input
                  type="text"
                  value={course.title}
                  disabled
                  className="w-full bg-[#0b0f12] border border-[#202934] rounded-lg px-4 py-2.5 text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nội dung yêu cầu <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={helpContent}
                  onChange={(e) => setHelpContent(e.target.value)}
                  placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
                  rows={6}
                  className="w-full bg-[#0b0f12] border border-[#202934] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Vui lòng mô tả rõ ràng để giảng viên có thể hỗ trợ tốt nhất
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setShowHelpModal(false);
                  setHelpContent("");
                }}
                className="px-5 py-2.5 rounded-lg border border-[#202934] text-gray-300 hover:text-white hover:border-gray-600 transition font-medium"
              >
                Hủy
              </button>
              <button
                onClick={async () => {
                  if (!helpContent.trim()) {
                    alert("Vui lòng nhập nội dung yêu cầu");
                    return;
                  }

                  setIsSubmittingHelp(true);
                  try {
                    // TODO: Call API to submit help request
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    alert("Yêu cầu hỗ trợ đã được gửi thành công!");
                    setShowHelpModal(false);
                    setHelpContent("");
                  } catch (error) {
                    alert("Có lỗi xảy ra. Vui lòng thử lại!");
                  } finally {
                    setIsSubmittingHelp(false);
                  }
                }}
                disabled={isSubmittingHelp || !helpContent.trim()}
                className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingHelp ? "Đang gửi..." : "Gửi yêu cầu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
