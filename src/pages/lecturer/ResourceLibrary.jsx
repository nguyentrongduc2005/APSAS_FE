import { useEffect, useState } from "react";
import axios from "axios";

function TeacherTutorialLibrary() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("ALL");
  const [level, setLevel] = useState("ALL");
  const [topic, setTopic] = useState("");

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/teacher/resources", {
        params: {
          keyword: keyword || undefined,
          type: type !== "ALL" ? type : undefined,
          level: level !== "ALL" ? level : undefined,
          topic: topic || undefined,
        },
      });

      const raw = res.data;
      let list = [];

      if (Array.isArray(raw)) list = raw;
      else if (Array.isArray(raw?.content)) list = raw.content;
      else if (Array.isArray(raw?.data)) list = raw.data;

      setResources(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCourse = async (courseId, resourceId) => {
    try {
      await axios.post(
        `/api/teacher/courses/${courseId}/resources/${resourceId}`
      );
      alert("Đã thêm resource vào khóa học");
    } catch (e) {
      console.error(e);
      alert("Thêm thất bại");
    }
  };

  return (
    <div className="page-wrapper p-6 space-y-6 text-slate-100">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Tutorial &amp; Resource Library
        </h1>
        <p className="text-sm text-slate-400">
          Thư viện tài nguyên được Provider biên soạn và Admin phê duyệt, dành
          cho giảng viên sử dụng trong khóa học.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/70 border border-slate-700/60 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by title, topic, tag..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 min-w-[180px] rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
        />
        <input
          type="text"
          placeholder="Topic (e.g. Recursion, Array, DP...)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 min-w-[160px] rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
        >
          <option value="ALL">All types</option>
          <option value="VIDEO">Video</option>
          <option value="PDF">PDF</option>
          <option value="PROBLEM_SET">Problem set</option>
          <option value="QUIZ">Quiz</option>
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
        >
          <option value="ALL">All levels</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
        <button
          onClick={fetchResources}
          className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-emerald-400 transition"
        >
          Apply
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-sm text-slate-400">
          Đang tải dữ liệu...
        </div>
      ) : resources.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-sm text-slate-500">
          Không tìm thấy tài nguyên phù hợp.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {resources.map((r) => (
            <div
              key={r.id}
              className="group rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-lg shadow-black/30 hover:border-emerald-500/70 hover:bg-slate-900 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-slate-50 group-hover:text-emerald-300 transition">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {r.description}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-sky-500/10 px-2 py-0.5 text-[11px] font-medium text-sky-300">
                  {r.type}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div className="space-y-0.5">
                  <dt className="uppercase tracking-wide text-[10px] text-slate-500">
                    Topic
                  </dt>
                  <dd>{r.topic || "—"}</dd>
                </div>
                <div className="space-y-0.5">
                  <dt className="uppercase tracking-wide text-[10px] text-slate-500">
                    Level
                  </dt>
                  <dd>{r.level || "—"}</dd>
                </div>
                <div className="space-y-0.5">
                  <dt className="uppercase tracking-wide text-[10px] text-slate-500">
                    Provider
                  </dt>
                  <dd>{r.providerName || "—"}</dd>
                </div>
              </dl>

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  onClick={() =>
                    (window.location.href = `resources/${r.id}`)
                  }
                  className="inline-flex items-center rounded-xl border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-slate-400 transition"
                >
                  Preview
                </button>
                <button
                  onClick={() => {
                    const courseId = window.prompt(
                      "Nhập courseId để gán resource này:"
                    );
                    if (courseId) handleAddToCourse(courseId, r.id);
                  }}
                  className="inline-flex items-center rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-emerald-400 transition"
                >
                  Add to course
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherTutorialLibrary;
