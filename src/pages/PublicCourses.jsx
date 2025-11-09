import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "../components/common/CourseCard";
import {
  continueCourse,
  featured,
  interview,
  learn,
} from "../constants/courses";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số khóa học mỗi trang

  // Tính toán pagination
  const allCourses = [...featured, ...interview, ...learn];
  const totalPages = Math.ceil(allCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = allCourses.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
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

        {/* All Courses with Pagination */}
        <Section title="Tất cả khóa học">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourses.map((c, i) => (
              <CourseCard key={i} {...c} />
            ))}
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
