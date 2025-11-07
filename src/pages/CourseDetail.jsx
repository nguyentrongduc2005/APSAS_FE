import React from "react";
import { useParams, Link } from "react-router-dom";
import LecturerCard from "../components/lecturer/LecturerCard";
import OutcomeCard from "../components/student/OutcomeCard";
import { getCourseById } from "../constants/courses";
import banner from "../assets/banner.png";

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = getCourseById(courseId) || {
    title: "Lập trình Java cơ bản",
    desc: "Khóa học giúp sinh viên nắm vững Java OOP và cấu trúc chương trình cơ bản.",
    stats: { learners: 1500 },
    category: "Lập trình cơ bản",
  };

  return (
    <div className="cd-wrap">
      {/* Breadcrumb pill */}
      <div className="container">
        <div className="cd-breadcrumb">
          <Link to="/" className="cd-crumb">
            Explore
          </Link>
          <span className="cd-sep">/</span>
          <span className="cd-crumb">{course.category}</span>
        </div>
      </div>

      <div className="container cd-layout">
        {/* LEFT: Hero card */}
        <section className="cd-hero-card">
          <div className="cd-hero-img">
            <img src={banner} alt="Course" />
          </div>

          <div className="cd-hero-body">
            <h1 className="cd-title">{course.title}</h1>
            <p className="cd-sub">{course.desc}</p>

            {/* Pills thống kê */}
            <div className="cd-pills">
              <div className="cd-pill">
                <span className="cd-pill-ico">🧾</span>
                <div>
                  <div className="cd-pill-head">Bài học</div>
                  <div className="cd-pill-val">
                    <b>45</b> bài học
                  </div>
                </div>
              </div>
              <div className="cd-pill">
                <span className="cd-pill-ico">🧩</span>
                <div>
                  <div className="cd-pill-head">Bài tập</div>
                  <div className="cd-pill-val">
                    <b>150</b> bài tập
                  </div>
                </div>
              </div>
              <div className="cd-pill">
                <span className="cd-pill-ico">📚</span>
                <div>
                  <div className="cd-pill-head">Modules</div>
                  <div className="cd-pill-val">
                    <b>7</b> modules
                  </div>
                </div>
              </div>
              <div className="cd-pill">
                <span className="cd-pill-ico">👥</span>
                <div>
                  <div className="cd-pill-head">Thành viên</div>
                  <div className="cd-pill-val">
                    <b>{course.stats.learners}</b> học viên
                  </div>
                </div>
              </div>
            </div>

            <button className="cd-cta-lg">Đăng ký khóa học</button>
          </div>
        </section>

        {/* RIGHT: Giảng viên + Kết quả/Yêu cầu */}
        <aside className="cd-right">
          <div className="cd-side-card">
            <h3 className="cd-side-title">Giảng viên</h3>
            <LecturerCard />
          </div>

          <div className="cd-side-card">
            <OutcomeCard />
          </div>
        </aside>
      </div>
    </div>
  );
}
