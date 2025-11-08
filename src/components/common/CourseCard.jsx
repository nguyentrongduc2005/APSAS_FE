import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Clock } from "lucide-react";

export default function CourseCard({ id, title, desc, stats, image, badge }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/course/${id}`);
    }
  };

  return (
    <article
      className="course-card"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      style={{ cursor: id ? "pointer" : "default" }}
    >
      <div className="thumb">
        <img src={image} alt={title} />
        {badge && <span className="badge">{badge}</span>}
      </div>
      <div className="meta">
        <h3 title={title}>{title}</h3>
        <p title={desc}>{desc}</p>
        <div className="stat">
          <span className="flex items-center gap-1">
            <Users size={14} /> {stats.learners}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {stats.progress}
          </span>
        </div>
      </div>
    </article>
  );
}
