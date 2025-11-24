import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { BookOpen, CheckCircle, Clock, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import StudentCourseCard from "../../components/student/CourseCard";
import { studentCourseService } from "../../services/studentCourseService";

export default function StudentMyCourses() {
  const { user } = useAuth();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");
  
  // API state management
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 6,
    totalPages: 0,
    totalElements: 0,
    first: true,
    last: true
  });
  const [activeTab, setActiveTab] = useState("all");

  // Load courses from API
  const loadCourses = async (page = 0) => {
    setLoading(true);
    try {
      const response = await studentCourseService.getMyCourses({
        page,
        size: 6
      });
      
      if (response.code === "ok") {
        setCourses(response.data.content);
        setPagination({
          pageNumber: response.data.number,
          pageSize: response.data.size,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          first: response.data.first,
          last: response.data.last
        });
      }
    } catch (err) {
      console.error('Error loading courses:', err);
      setError("Không thể tải danh sách khóa học");
    } finally {
      setLoading(false);
    }
  };

  // Load courses on component mount
  useEffect(() => {
    loadCourses();
  }, []);

  const handleJoinCourse = async () => {
    if (!courseCode.trim()) {
      setError("Vui lòng nhập mã khóa học");
      return;
    }

    setIsJoining(true);
    setError("");

    try {
      const response = await studentCourseService.joinCourse(courseCode);
      
      if (response.code === "ok") {
        alert(`Tham gia khóa học thành công với mã: ${courseCode}`);
        setShowJoinModal(false);
        setCourseCode("");
        // Reload courses after joining
        loadCourses(pagination.pageNumber);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Mã khóa học không hợp lệ");
    } finally {
      setIsJoining(false);
    }
  };

  // Filter courses based on active tab
  const getFilteredCourses = () => {
    switch (activeTab) {
      case "active":
        return courses.filter(course => course.totalAssignmentCurrent > 0 && course.totalAssignmentCurrent < course.totalAssignment);
      case "completed":
        return courses.filter(course => course.totalAssignmentCurrent === course.totalAssignment);
      default:
        return courses;
    }
  };

  const filteredCourses = getFilteredCourses();

  // Calculate stats from actual data
  const stats = {
    total: courses.length,
    completed: courses.filter(course => course.totalAssignmentCurrent === course.totalAssignment).length,
    active: courses.filter(course => course.totalAssignmentCurrent > 0 && course.totalAssignmentCurrent < course.totalAssignment).length
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (!pagination.first) {
      loadCourses(pagination.pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (!pagination.last) {
      loadCourses(pagination.pageNumber + 1);
    }
  };

  const goToPage = (page) => {
    loadCourses(page);
  };

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
                {stats.total}
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
                {stats.completed}
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
                {stats.active}
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
        <button 
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 font-medium whitespace-nowrap transition ${
            activeTab === "all" 
              ? "text-emerald-400 border-b-2 border-emerald-400" 
              : "text-gray-400 hover:text-white"
          }`}
        >
          Tất cả ({stats.total})
        </button>
        <button 
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 font-medium whitespace-nowrap transition ${
            activeTab === "active" 
              ? "text-emerald-400 border-b-2 border-emerald-400" 
              : "text-gray-400 hover:text-white"
          }`}
        >
          Đang học ({stats.active})
        </button>
        <button 
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 font-medium whitespace-nowrap transition ${
            activeTab === "completed" 
              ? "text-emerald-400 border-b-2 border-emerald-400" 
              : "text-gray-400 hover:text-white"
          }`}
        >
          Đã hoàn thành ({stats.completed})
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-[#0f1419] border border-[#202934] rounded-lg p-6 animate-pulse">
              <div className="bg-gray-700 h-40 rounded-lg mb-4"></div>
              <div className="bg-gray-700 h-4 rounded mb-2"></div>
              <div className="bg-gray-700 h-3 rounded mb-4 w-3/4"></div>
              <div className="flex gap-2">
                <div className="bg-gray-700 h-3 rounded w-1/4"></div>
                <div className="bg-gray-700 h-3 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Course Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <StudentCourseCard 
              key={course.id} 
              course={{
                  id: course.id,
                  title: course.name, // Chỉ truyền title từ course.name
                  instructor: course.lecture.name,
                  instructorAvatar: course.lecture.avatarUrl,
                  thumbnail: course.avatarUrl,
                  language: course.visibility,
                  studentCount: course.currentMember,
                  lessonCount: course.totalLession,
                  duration: course.totalLession * 2,
                  progress: Math.round((course.totalAssignmentCurrent / course.totalAssignment) * 100) || 0,
                  lastAccessed: "Vừa xem",
                  type: course.type
                }} 
              />
          ))}
        </div>
      )}

      {/* Empty State (nếu không có khóa học) */}
      {!loading && filteredCourses.length === 0 && (
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

      {/* Pagination */}
      {!loading && filteredCourses.length > 0 && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={pagination.first}
            className="p-2 rounded-lg border border-[#202934] text-gray-400 hover:text-white hover:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-1">
            {[...Array(pagination.totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                  pagination.pageNumber === index
                    ? "bg-emerald-500 text-black"
                    : "text-gray-400 hover:text-white border border-[#202934] hover:border-emerald-500"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleNextPage}
            disabled={pagination.last}
            className="p-2 rounded-lg border border-[#202934] text-gray-400 hover:text-white hover:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronRight size={20} />
          </button>
          
          <span className="text-sm text-gray-400 ml-4">
            Trang {pagination.pageNumber + 1} / {pagination.totalPages} 
            ({pagination.totalElements} khóa học)
          </span>
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
