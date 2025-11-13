import { useEffect, useState } from "react";
import axios from "axios";

function ResourceModeration() {
  const [resources, setResources] = useState([]);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/resources", {
        params: {
          status: status !== "ALL" ? status : undefined,
        },
      });
      setResources(res.data || []);
    } catch (e) {
      console.error(e);
      alert("Lỗi load danh sách resource");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
    // eslint-disable-next-line
  }, [status]);

  const handleAction = async (id, action) => {
    try {
      const url =
        action === "APPROVE"
          ? `/api/admin/resources/${id}/approve`
          : `/api/admin/resources/${id}/reject`;
      await axios.patch(url);
      setResources((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
      alert("Thao tác thất bại");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Resource Moderation</h1>
        <p className="muted">
          Quản lý tất cả các tài nguyên do Provider tạo: phê duyệt, từ chối.
        </p>
      </div>

      <div className="card filters">
        <label>
          Status:{" "}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="DRAFT">Draft</option>
            <option value="ALL">All</option>
          </select>
        </label>
      </div>

      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : resources.length === 0 ? (
          <p>Không có resource nào.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Provider</th>
                <th>Type</th>
                <th>Topic</th>
                <th>Status</th>
                <th>Created</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {resources.map((r) => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td>{r.providerName}</td>
                  <td>{r.type}</td>
                  <td>{r.topic}</td>
                  <td>{r.status}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                  <td>
                    {r.status === "PENDING" && (
                      <>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleAction(r.id, "APPROVE")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleAction(r.id, "REJECT")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        (window.location.href = `/admin/resources/${r.id}`)
                      }
                    >
                      View detail
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

export default ResourceModeration;
