import { useEffect, useState } from "react";
import axios from "axios";

function LecturerTutorialLibrary() {
  const [resources, setResources] = useState([]); // luôn cố gắng giữ là array
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("ALL");
  const [level, setLevel] = useState("ALL");
  const [topic, setTopic] = useState("");

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/lecturer/resources", {
        params: {
          keyword: keyword || undefined,
          type: type !== "ALL" ? type : undefined,
          level: level !== "ALL" ? level : undefined,
          topic: topic || undefined,
        },
      });

      console.log("🔥 /api/lecturer/resources response = ", res.data);

      const raw = res.data;

      // ĐOÁN CÁC KIỂU RESPONSE THƯỜNG GẶP:
      // 1) Array trực tiếp: [ ... ]
      // 2) Spring Pageable: { content: [ ... ], totalElements, ... }
      // 3) Wrapper: { data: [ ... ], ... }
      let list = [];

      if (Array.isArray(raw)) {
        list = raw;
      } else if (Array.isArray(raw?.content)) {
        list = raw.content;
      } else if (Array.isArray(raw?.data)) {
        list = raw.data;
      } else {
        // fallback: không phải array thì log để dev xem
        console.warn("⚠️ resources is not array, raw =", raw);
        list = [];
      }

      setResources(list);
    } catch (e) {
      console.error(e);
      alert("Lỗi load thư viện tutorial");
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
        `/api/lecturer/courses/${courseId}/resources/${resourceId}`
      );
      alert("Đã thêm resource vào course");
    } catch (e) {
      console.error(e);
      alert("Thêm thất bại");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Tutorial &amp; Resource Library</h1>
        <p className="muted">
          Các tài nguyên do Provider tạo và đã được Admin phê duyệt.
        </p>
      </div>

      {/* Filter */}
      <div className="card filters">
        <input
          type="text"
          placeholder="Search by title, topic, tag..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Topic (e.g. Recursion, Array, DP...)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="ALL">All types</option>
          <option value="VIDEO">Video</option>
          <option value="PDF">PDF</option>
          <option value="PROBLEM_SET">Problem set</option>
          <option value="QUIZ">Quiz</option>
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="ALL">All levels</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
        <button className="btn" onClick={fetchResources}>
          Apply
        </button>
      </div>

      {/* List */}
      <div className="resource-grid">
        {loading ? (
          <p>Loading...</p>
        ) : !Array.isArray(resources) ? (
          // Nếu lỡ đâu vẫn không phải array thì tránh .map và show debug
          <pre style={{ color: "white" }}>
            Dữ liệu trả về không phải array. Xem console log để debug.
          </pre>
        ) : resources.length === 0 ? (
          <p>Không tìm thấy resource phù hợp.</p>
        ) : (
          resources.map((r) => (
            <div key={r.id} className="card resource-card">
              <div className="resource-header">
                <h3>{r.title}</h3>
                <span className="badge">{r.type}</span>
              </div>
              <p className="muted">{r.description}</p>
              <div className="resource-meta">
                <span>Topic: {r.topic}</span>
                <span>Level: {r.level}</span>
                <span>Provider: {r.providerName}</span>
              </div>
              <div className="resource-actions">
                <button
                  className="btn btn-sm"
                  onClick={() =>
                    (window.location.href = `/lecturer/tutorials/${r.id}`)
                  }
                >
                  Preview
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    const courseId = window.prompt(
                      "Nhập courseId để gán resource này:"
                    );
                    if (courseId) handleAddToCourse(courseId, r.id);
                  }}
                >
                  Add to course
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LecturerTutorialLibrary;
