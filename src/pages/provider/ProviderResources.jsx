import { useEffect, useState } from "react";
import axios from "axios";

const STATUS_LABELS = {
  DRAFT: "Draft",
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

const TYPE_LABELS = {
  VIDEO: "Video",
  PDF: "PDF",
  PROBLEM_SET: "Problem set",
  QUIZ: "Quiz",
};

function ProviderResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("ALL");
  const [type, setType] = useState("ALL");

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/provider/resources/me", {
        params: {
          keyword: keyword || undefined,
          status: status !== "ALL" ? status : undefined,
          type: type !== "ALL" ? type : undefined,
        },
      });
      setResources(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Lỗi load tài nguyên của bạn");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa resource này?")) return;
    try {
      await axios.delete(`/api/provider/resources/${id}`);
      setResources((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>My Tutorials & Resources</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            // điều hướng sang form create, ví dụ: /provider/resources/create
            window.location.href = "/provider/resources/create";
          }}
        >
          + New Resource
        </button>
      </div>

      {/* Filter */}
      <div className="card filters">
        <input
          type="text"
          placeholder="Search by title, topic, tag..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="ALL">All types</option>
          <option value="VIDEO">Video</option>
          <option value="PDF">PDF</option>
          <option value="PROBLEM_SET">Problem set</option>
          <option value="QUIZ">Quiz</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ALL">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <button className="btn" onClick={fetchResources}>
          Apply
        </button>
      </div>

      {/* List */}
      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : resources.length === 0 ? (
          <p>Chưa có tài nguyên nào. Hãy tạo mới.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Topic</th>
                <th>Level</th>
                <th>Status</th>
                <th>Used by</th>
                <th>Created</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {resources.map((r) => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td>{TYPE_LABELS[r.type] || r.type}</td>
                  <td>{r.topic}</td>
                  <td>{r.level}</td>
                  <td>
                    <span className={`badge badge-${r.status.toLowerCase()}`}>
                      {STATUS_LABELS[r.status] || r.status}
                    </span>
                  </td>
                  <td>{r.usedByCourseCount || 0} courses</td>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        (window.location.href = `/provider/resources/${r.id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(r.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProviderResources;
