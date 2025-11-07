import React from 'react'
import CourseCard from '../components/common/CourseCard'
import { continueCourse, featured, interview, learn } from '../constants/courses'

function Section({ title, children, action }) {
  return (
    <section className="section">
      <div className="container section-head">
        <h2>{title}</h2>
        {action}
      </div>
      <div className="container">{children}</div>
    </section>
  )
}

export default function PublicCourses() {
  return (
    <div className="public-courses">
      {/* Hero + Continue */}
      <div className="container hero">
        <div className="hero-left">
          <p className="eyebrow">Welcome to</p>
          <h1 className="hero-title">APSAS</h1>

          <label className="continue-label">■ Continue Previous:</label>
          <div className="continue-card">
            <div className="thumb">
              <img src={continueCourse.image} alt="continue" />
            </div>
            <div className="meta">
              <h3>{continueCourse.title}</h3>
              <p>{continueCourse.desc}</p>
              <div className="stat">
                <span>👥 {continueCourse.stats.learners}</span>
                <span>⏱ {continueCourse.stats.progress}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <h2>
            Học các kỹ năng sống và
            <br />nghề nghiệp thiết yếu
          </h2>
          <div className="hero-actions">
            <button className="btn primary">Bắt đầu học →</button>
            <button className="btn ghost">Tìm hiểu thêm</button>
          </div>
        </div>
      </div>

      {/* Featured */}
      <Section title="Featured" action={<button className="pill">xem thêm</button>}>
        <div className="grid">
          {featured.map((c, i) => (
            <CourseCard key={i} {...c} />
          ))}
        </div>
      </Section>

      {/* Interview */}
      <Section title="Interview" action={<button className="pill">xem thêm</button>}>
        <div className="grid">
          {interview.map((c, i) => (
            <CourseCard key={i} {...c} />
          ))}
        </div>
      </Section>

      {/* Learn */}
      <Section title="Learn" action={<button className="pill">xem thêm</button>}>
        <div className="grid">
          {learn.map((c, i) => (
            <CourseCard key={i} {...c} />
          ))}
        </div>
      </Section>
    </div>
  )
}
