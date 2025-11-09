import React from "react";
import { Link, useParams } from "react-router-dom";
import { BookOpen, FileText, Users, Layers } from "lucide-react";
import LecturerCard from "../components/lecturer/LecturerCard.jsx";
import OutcomeCard from "../components/student/OutcomeCard.jsx";
import { getCourseById } from "../constants/courses";

const FALLBACK_BANNER =
  "https://huongnghiep.hocmai.vn/wp-content/uploads/2022/07/nganh-cong-nghe-thong-tin-hoc-truong-nao-1.jpg";

function StatPill({ icon: Icon, head, val }) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg
                 border border-[#202934] bg-[#0f1419] px-3 py-2
                 transition hover:border-emerald-500/50"
    >
      <div className="text-emerald-400">
        <Icon size={18} />
      </div>
      <div className="leading-tight">
        <div className="text-xs text-gray-400">{head}</div>
        <div className="text-sm font-semibold text-white">{val}</div>
      </div>
    </div>
  );
}

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = getCourseById?.(courseId) || {
    title: "Lập trình Java cơ bản",
    desc: "Khóa học giúp sinh viên nắm vững Java OOP và cấu trúc chương trình cơ bản.",
    stats: { learners: 1500 },
    category: "Lập trình cơ bản",
    image: FALLBACK_BANNER,
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px]">
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div
          className="inline-flex items-center gap-2 rounded-full
                      border border-[#202934] bg-[#0f1419] px-5 py-2 text-sm text-slate-200"
        >
          <span>Explore</span>
          <span className="opacity-50">/</span>
          <span className="text-emerald-400">{course.category}</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Course Banner */}
          <section
            className="relative overflow-hidden rounded-xl
                     border border-[#202934] bg-[#0f1419] shadow-lg"
          >
            <div className="relative h-[500px] md:h-[600px]">
              <img
                src={course.image || FALLBACK_BANNER}
                alt="Banner"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80" />

              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white leading-tight mb-2">
                    {course.title}
                  </h1>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {course.desc}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <StatPill icon={BookOpen} head="Bài học" val="45 bài học" />
                  <StatPill icon={FileText} head="Bài tập" val="150 bài tập" />
                  <StatPill icon={Layers} head="Modules" val="7 modules" />
                  <StatPill
                    icon={Users}
                    head="Thành viên"
                    val={`${course.stats?.learners ?? 1500} học viên`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Right Column - Sidebar Cards */}
          <aside className="flex flex-col gap-6">
            {/* Lecturer Card */}
            <div className="rounded-xl border border-[#202934] bg-[#0f1419] p-5">
              <h3 className="text-white font-bold text-lg mb-4">Giảng viên</h3>
              <div className="[&_a]:text-emerald-400 [&_a:hover]:underline">
                <LecturerCard />
              </div>
            </div>

            {/* Outcomes Card */}
            <div className="rounded-xl border border-[#202934] bg-[#0f1419] p-5">
              <h3 className="text-white font-bold text-lg mb-4">
                Kết quả học tập
              </h3>
              <OutcomeCard />
            </div>
          </aside>
        </div>

        {/* Register Button - Full Width Below */}
        <button
          className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 
                   text-white font-bold rounded-xl transition shadow-lg text-lg"
          aria-label="Đăng ký khóa học"
        >
          Đăng ký khóa học
        </button>
      </div>
    </div>
  );
}
