import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "../components/common/CourseCard";
import {
  continueCourse,
  featured,
  interview,
  learn,
} from "../constants/courses";
import courseService from "../services/courseService";

function Section({ title, children, action }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {action}
      </div>
      <div>{children}</div>
    </section>
  );
}

export default function PublicCourses() {
  const navigate = useNavigate();

  // state cho list khóa public lấy từ API
  const [publicCourses, setPublicCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // số khóa học mỗi trang (trùng với BE)
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // state cho ô search
  const [searchText, setSearchText] = useState("");

  // gọi API mỗi khi đổi trang hoặc đổi search
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await courseService.getPublicCourses({
          page: currentPage - 1, // FE (1-based) -> BE (0-based)
          size: itemsPerPage,
          search: searchText.trim(),
        });

        // BE trả về { code, message, data: pageObject }
        // => res.data chính là pageObject
        const data = res?.data || res;

        setPublicCourses(data?.content || []);
        setTotalPages(data?.totalPages || 1);
      } catch (error) {
        console.error("Failed to load public courses", error);
        setPublicCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage, searchText]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px]">
      <div className="space-y-6">
        {/* Hero + Continue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-6 bg-[#0f1419] border border-[#202934] rounded-lg">
          <div className="space-y-4">
            <div>
              <p className="text-emerald-400 text-sm font-medium mb-2">
                Welcome to
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                APSAS
              </h1>
            </div>

            <div>
              <label className="text-white font-semibold mb-3 block text-sm">
                ■ Continue Previous:
              </label>
              <div
                className="bg-[#0b0f12] border border-[#202934] rounded-lg overflow-hidden hover:border-emerald-500/50 transition cursor-pointer"
                onClick={() => navigate(`/course/${continueCourse.id}`)}
              >
                <div className="flex gap-3 p-3">
                  <div className="w-24 h-16 shrink-0 rounded overflow-hidden">
                    <img
                      src={continueCourse.image}
                      alt="continue"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold mb-1 truncate text-sm">
                      {continueCourse.title}
                    </h3>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                      {continueCourse.desc}
                    </p>
                    <div className="flex gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {continueCourse.stats.learners}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {continueCourse.stats.progress}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white leading-tight">
              Học các kỹ năng sống và
              <br />
              nghề nghiệp thiết yếu
            </h2>
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-lg transition text-sm">
                Bắt đầu học →
              </button>
              <button className="px-5 py-2.5 bg-transparent border border-[#202934] hover:border-emerald-500 text-white font-medium rounded-lg transition text-sm">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#202934]"></div>

        {/* Featured */}
        <Section
          title="Featured"
          action={
            <button className="px-4 py-2 bg-[#0f1419] border border-[#202934] hover:border-emerald-500 text-white text-sm rounded-lg transition">
              xem thêm
            </button>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((c, i) => (
              <CourseCard key={i} {...c} />
            ))}
          </div>
        </Section>

        {/* Divider */}
        <div className="border-t border-[#202934]"></div>

        {/* Interview */}
        <Section
          title="Interview"
          action={
            <button className="px-4 py-2 bg-[#0f1419] border border-[#202934] hover:border-emerald-500 text-white text-sm rounded-lg transition">
              xem thêm
            </button>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {interview.map((c, i) => (
              <CourseCard key={i} {...c} />
            ))}
          </div>
        </Section>

        {/* Divider */}
        <div className="border-t border-[#202934]"></div>

        {/* Learn */}
        <Section
          title="Learn"
          action={
            <button className="px-4 py-2 bg-[#0f1419] border border-[#202934] hover:border-emerald-500 text-white text-sm rounded-lg transition">
              xem thêm
            </button>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {learn.map((c, i) => (
              <CourseCard key={i} {...c} />
            ))}
          </div>
        </Section>

        {/* Divider */}
        <div className="border-t border-[#202934]"></div>

        {/* All Courses with Pagination (dữ liệu từ API) */}
        <Section title="Tất cả khóa học">
          <div className="space-y-4">
            {/* Ô search nhỏ cho phần tất cả khóa học */}
            <div className="flex justify-between items-center gap-3 flex-wrap">
              <input
                type="text"
                value={searchText}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearchText(e.target.value);
                }}
                placeholder="Tìm kiếm khóa học..."
                className="w-full sm:w-72 px-3 py-2 rounded-lg bg-[#0b0f12] border border-[#202934] text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {loading ? (
              <p className="text-gray-400 text-sm">
                Đang tải danh sách khóa học...
              </p>
            ) : publicCourses.length === 0 ? (
              <p className="text-gray-400 text-sm">
                Hiện chưa có khóa học public nào.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {publicCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.name}
                    desc={
                      course.description ||
                      "Khóa học lập trình trên nền tảng APSAS."
                    }
                    image={
                      course.avatarUrl ||
                      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop"
                    }
                    stats={{
                      learners: course.studentsCount ?? 0,
                      progress:
                        course.lessonsCount && course.lessonsCountTotal
                          ? `${course.lessonsCount}/${course.lessonsCountTotal}`
                          : "",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg border transition ${
              currentPage === 1
                ? "border-[#202934] text-gray-600 cursor-not-allowed"
                : "border-[#202934] text-white hover:border-emerald-500 hover:text-emerald-400"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`min-w-10 h-10 rounded-lg border transition font-medium ${
                  currentPage === page
                    ? "bg-emerald-500 border-emerald-500 text-black"
                    : "border-[#202934] text-white hover:border-emerald-500 hover:text-emerald-400"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg border transition ${
              currentPage === totalPages
                ? "border-[#202934] text-gray-600 cursor-not-allowed"
                : "border-[#202934] text-white hover:border-emerald-500 hover:text-emerald-400"
            }`}
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
