import React from 'react'

export default function CourseCard({ title, desc, stats, image, badge }) {
  return (
    <article className="course-card" role="button" tabIndex={0}>
      <div className="thumb">
        <img src={image} alt={title} />
        {badge && <span className="badge">{badge}</span>}
      </div>
      <div className="meta">
        <h3 title={title}>{title}</h3>
        <p title={desc}>{desc}</p>
        <div className="stat">
          <span>👥 {stats.learners}</span>
          <span>⏱ {stats.progress}</span>
        </div>
      </div>
    </article>
  )
}
