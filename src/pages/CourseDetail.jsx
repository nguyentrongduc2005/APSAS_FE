import React from "react";
import { Link, useParams } from "react-router-dom";
import LecturerCard from "../components/lecturer/LecturerCard.jsx";
import OutcomeCard from "../components/student/OutcomeCard.jsx";
import { getCourseById } from "../constants/courses";

const FALLBACK_BANNER =
  "https://huongnghiep.hocmai.vn/wp-content/uploads/2022/07/nganh-cong-nghe-thong-tin-hoc-truong-nao-1.jpg";

function StatPill({ ico, head, val }) {
  return (
    <div
      className="group flex items-center gap-3 rounded-2xl
                 border border-white/10 bg-white/5 px-3.5 py-2.5
                 backdrop-blur-sm transition hover:bg-white/[0.08]"
    >
      <div className="grid place-items-center h-10 w-10 rounded-xl bg-white/10 text-lg">
        {ico}
      </div>
      <div className="leading-tight">
        <div className="text-[12px] text-slate-400">{head}</div>
        <div className="text-[13px] font-semibold text-slate-100">{val}</div>
      </div>
    </div>
  );
}

export default function CourseDetail() {
  const { courseId } = useParams();
  const course =
    getCourseById?.(courseId) || {
      title: "Lập trình Java cơ bản",
      desc: "Khóa học giúp sinh viên nắm vững Java OOP và cấu trúc chương trình cơ bản.",
      stats: { learners: 1500 },
      category: "Lập trình cơ bản",
      image: FALLBACK_BANNER,
    };

  return (
    <div className="pb-16">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="mt-6 inline-flex w-full items-center gap-2 rounded-full
                        border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-200">
          <span>Explore</span>
          <span className="opacity-50">/</span>
          <span className="text-slate-100">{course.category}</span>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-7">
        <div className="lg:col-span-2 space-y-6">
          <section
            className="relative overflow-hidden rounded-3xl
                       border border-white/10 bg-[#0f1113] shadow-[0_20px_60px_rgba(0,0,0,.45)]"
          >
            <div className="relative h-[320px] md:h-[420px]">
              <img
                src={course.image || FALLBACK_BANNER}
                alt="Banner"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,.75)_0%,rgba(0,0,0,.55)_42%,rgba(0,0,0,.2)_64%,transparent_78%)]" />

      
              <div className="relative h-full px-7 md:px-9 py-8 md:py-10 flex items-center">
                <div>
                  <h1 className="text-[30px] md:text-[36px] font-extrabold text-white leading-tight">
                    {course.title}
                  </h1>
                  <p className="mt-2 max-w-[520px] text-slate-300 text-[15px]">
                    {course.desc}
                  </p>

                  <div className="mt-5 flex gap-3.5 pr-2 overflow-x-auto no-scrollbar">
                    <StatPill ico="🧾" head="Bài học" val="45 bài học" />
                    <StatPill ico="🧩" head="Bài tập" val="150 bài tập" />
                    <StatPill ico="📚" head="Modules" val="7 modules" />
                    <StatPill
                      ico="👥"
                      head="Thành viên"
                      val={`${course.stats?.learners ?? 1500} học viên`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <button
            className="relative inline-flex items-center justify-center rounded-2xl
                       bg-[#2F6EF5] px-7 py-4 text-white text-[18px] font-extrabold
                       shadow-[0_10px_30px_rgba(47,102,245,.45)] hover:brightness-110
                       focus:outline-none focus:ring-2 focus:ring-blue-400/60"
            aria-label="Đăng ký khóa học"
          >
            Đăng ký khóa học
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          </button>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-2xl border border-white/10 bg-[#141518]/90 backdrop-blur-sm p-5 md:p-6">
            <h3 className="text-white font-extrabold text-[18px] mb-3">Giảng viên</h3>
            <div className="[&_a]:text-sky-300 [&_a:hover]:underline">
              <LecturerCard />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#141518]/90 backdrop-blur-sm p-5 md:p-6">
            <h3 className="text-white font-extrabold text-[18px] mb-3">Kết quả học tập</h3>
            <OutcomeCard />
          </div>
        </aside>
      </div>

      <footer className="mt-10 border-t border-white/10">
        <div className="max-w-[1180px] mx-auto px-6 py-4 flex items-center justify-between text-[12px] text-slate-400">
          <span>Copyright 2025 APSAS</span>
          <nav className="flex gap-4 flex-wrap">
            <a className="hover:text-slate-200" href="#">Help Center</a>
            <a className="hover:text-slate-200" href="#">Jobs</a>
            <a className="hover:text-slate-200" href="#">Bug Bounty</a>
            <a className="hover:text-slate-200" href="#">Terms</a>
            <a className="hover:text-slate-200" href="#">Privacy Policy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
