import React, { useState } from "react";
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
  Play,
  ListChecks,
  Image,
  HelpCircle,
  MessageSquare,
  Upload,
  X,
} from "lucide-react";

export default function CourseOverview() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [courseThumbnail, setCourseThumbnail] = useState(
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop"
  );

  // Mock data - trong thực tế sẽ fetch từ API dựa trên courseId
  const course = {
    id: courseId,
    title: "Java Programming Fundamentals",
    description:
      "Khóa học lập trình Java từ cơ bản đến nâng cao, bao gồm OOP, Collections, Exception Handling và nhiều chủ đề khác.",
    instructor: "Trần Minh Khôi",
    thumbnail: courseThumbnail,
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

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước ảnh không được vượt quá 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadThumbnail = async () => {
    if (!thumbnailPreview) {
      alert("Vui lòng chọn ảnh");
      return;
    }

    try {
      setIsUploading(true);

      // TODO: Call API to upload image
      // const formData = new FormData();
      // formData.append('thumbnail', file);
      // await api.post(`/courses/${courseId}/thumbnail`, formData);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCourseThumbnail(thumbnailPreview);
      setShowUploadModal(false);
      setThumbnailPreview(null);
      alert("Cập nhật ảnh thành công!");
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      alert("Có lỗi xảy ra khi tải ảnh lên");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setShowUploadModal(false);
    setThumbnailPreview(null);
  };

  // Mock course content modules
  const modules = [
    {
      id: 1,
      type: "content",
      title: "Introduction to Java",
      duration: "45 phút",
      imageCount: 5,
    },
    {
      id: 2,
      type: "content",
      title: "Variables and Data Types",
      duration: "60 phút",
      imageCount: 8,
    },
    {
      id: 3,
      type: "assignment",
      title: "Lab 1: Basic Java Programming",
      deadline: "2024-03-20",
    },
    {
      id: 4,
      type: "content",
      title: "Control Flow Statements",
      duration: "50 phút",
      imageCount: 6,
    },
    {
      id: 5,
      type: "assignment",
      title: "Lab 2: Control Structures",
      deadline: "2024-03-25",
    },
    {
      id: 6,
      type: "content",
      title: "Object-Oriented Programming",
      duration: "90 phút",
      imageCount: 12,
    },
  ];

  // Mock help requests from students
  const helpRequests = [
    {
      id: 1,
      studentName: "Nguyễn Văn A",
      studentAvatar: "https://i.pravatar.cc/150?img=1",
      content:
        "Em không hiểu rõ về cách sử dụng Collections trong Java. Thầy có thể giải thích thêm không ạ?",
      createdAt: "2024-11-15 14:30",
      status: "pending",
    },
    {
      id: 2,
      studentName: "Trần Thị B",
      studentAvatar: "https://i.pravatar.cc/150?img=5",
      content:
        "Bài tập số 3 em chạy bị lỗi NullPointerException nhưng không biết sửa thế nào. Có thể hướng dẫn em không ạ?",
      createdAt: "2024-11-15 10:15",
      status: "resolved",
    },
    {
      id: 3,
      studentName: "Lê Văn C",
      studentAvatar: "https://i.pravatar.cc/150?img=3",
      content:
        "Thầy ơi, em muốn hỏi về sự khác biệt giữa ArrayList và LinkedList. Khi nào thì nên dùng cái nào ạ?",
      createdAt: "2024-11-14 16:45",
      status: "pending",
    },
    {
      id: 4,
      studentName: "Phạm Thị D",
      studentAvatar: "https://i.pravatar.cc/150?img=9",
      content:
        "Em không hiểu phần Exception Handling, đặc biệt là try-catch-finally. Thầy có thể cho ví dụ thực tế không ạ?",
      createdAt: "2024-11-14 09:20",
      status: "resolved",
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
            <span className="text-sm text-emerald-400 font-medium">
              Tổng quan
            </span>
          </div>
          <div className="text-sm text-blue-400 font-semibold">
            Tiến độ khóa học: {course.progress}%
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm text-emerald-400 font-medium">Khóa học</p>
            <h1 className="text-3xl font-bold text-white">{course.title}</h1>
            <p className="text-gray-400 leading-relaxed">
              {course.description}
            </p>
            <p className="text-gray-400">Giảng viên: {course.instructor}</p>
          </div>
          <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden bg-[#0b0f12] group">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            {/* Upload Button Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition"
              >
                <Upload size={18} />
                Đổi ảnh
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Users size={22} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Sinh viên</p>
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
              <BarChart3 size={22} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Tiến độ TB</p>
              <p className="text-xl font-semibold text-white">
                {course.avgProgress}%
              </p>
            </div>
          </div>
          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <FileText size={22} className="text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Bài tập</p>
              <p className="text-xl font-semibold text-white">
                {course.totalAssignments}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "overview"
                ? "bg-white/5 border border-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setActiveTab("assignments")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "assignments"
                ? "bg-white/5 border border-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Bài tập
          </button>
          <button
            onClick={() => setActiveTab("help-requests")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === "help-requests"
                ? "bg-white/5 border border-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <HelpCircle size={16} />
            Yêu cầu hỗ trợ
            {helpRequests.filter((r) => r.status === "pending").length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold">
                {helpRequests.filter((r) => r.status === "pending").length}
              </span>
            )}
          </button>
        </div>
      </section>

      <div className="space-y-6">
        {/* Course Content List - Overview Tab */}
        {activeTab === "overview" && (
          <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Nội dung khóa học
            </h2>
            <div className="space-y-2">
              {modules.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.type === "assignment") {
                      navigate(`/lecturer/assignments/${item.id}`);
                    } else if (item.type === "content") {
                      navigate(`/contents/${item.id}`);
                    }
                  }}
                  className={`flex items-center gap-4 p-4 bg-[#0b0f12] border border-[#202934] rounded-xl hover:border-emerald-500/50 transition cursor-pointer`}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {item.type === "content" ? (
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <Play size={18} className="text-emerald-400" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <ListChecks size={18} className="text-blue-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      {item.type === "content" ? (
                        <>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {item.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Image size={14} />
                            {item.imageCount} ảnh
                          </span>
                        </>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          Hạn: {item.deadline}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Assignments Tab */}
        {activeTab === "assignments" && (
          <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Bài tập</h2>
            <div className="space-y-2">
              {modules
                .filter((item) => item.type === "assignment")
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/lecturer/assignments/${item.id}`)}
                    className="flex items-center gap-4 p-4 bg-[#0b0f12] border border-[#202934] rounded-xl hover:border-emerald-500/50 transition cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <ListChecks size={18} className="text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          Hạn: {item.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Help Requests Tab */}
        {activeTab === "help-requests" && (
          <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Yêu cầu hỗ trợ từ học sinh
              </h2>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
                  Chờ xử lý (
                  {helpRequests.filter((r) => r.status === "pending").length})
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                  Đã giải quyết (
                  {helpRequests.filter((r) => r.status === "resolved").length})
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {helpRequests.length > 0 ? (
                helpRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-5 bg-[#0b0f12] border border-[#202934] rounded-xl hover:border-emerald-500/50 transition"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={request.studentAvatar}
                        alt={request.studentName}
                        className="w-12 h-12 rounded-full object-cover bg-[#0f1419]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-white font-semibold">
                              {request.studentName}
                            </h3>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                request.status === "pending"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              }`}
                            >
                              {request.status === "pending"
                                ? "Chờ xử lý"
                                : "Đã giải quyết"}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {request.createdAt}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                          {request.content}
                        </p>
                        <div className="flex gap-2">
                          {request.status === "pending" && (
                            <>
                              <button className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium transition flex items-center gap-1">
                                <MessageSquare size={14} />
                                Trả lời
                              </button>
                              <button className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-medium transition">
                                Đánh dấu đã giải quyết
                              </button>
                            </>
                          )}
                          {request.status === "resolved" && (
                            <button className="px-3 py-1.5 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 text-xs font-medium transition flex items-center gap-1">
                              <MessageSquare size={14} />
                              Xem chi tiết
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <HelpCircle size={48} className="mx-auto mb-3 opacity-50" />
                  <p>Chưa có yêu cầu hỗ trợ nào</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Upload Thumbnail Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1419] border border-[#202934] rounded-xl max-w-lg w-full p-6 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Đổi ảnh khóa học</h3>
              <button
                onClick={handleCancelUpload}
                className="text-gray-400 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Image Preview */}
            <div className="space-y-3">
              <div className="aspect-video rounded-lg overflow-hidden bg-[#0b0f12] border border-[#202934]">
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Upload size={48} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Chọn ảnh để xem trước</p>
                    </div>
                  </div>
                )}
              </div>

              {/* File Input */}
              <div>
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <div className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0b0f12] border border-[#202934] rounded-lg text-gray-300 hover:border-emerald-500 hover:text-emerald-400 transition cursor-pointer">
                    <Upload size={18} />
                    <span className="font-medium">Chọn ảnh từ máy tính</span>
                  </div>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Định dạng: JPG, PNG. Kích thước tối đa: 5MB
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCancelUpload}
                disabled={isUploading}
                className="flex-1 px-4 py-2.5 bg-[#0b0f12] border border-[#202934] text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Hủy
              </button>
              <button
                onClick={handleUploadThumbnail}
                disabled={isUploading || !thumbnailPreview}
                className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Đang tải..." : "Cập nhật"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
