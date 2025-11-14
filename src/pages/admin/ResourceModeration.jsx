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
    <div className="page-wrapper p-6 space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Resource Moderation
          </h1>
          <p className="text-sm text-slate-400">
            Quản lý tất cả tài nguyên do Provider tạo: phê duyệt hoặc từ chối
            trước khi hiển thị cho giảng viên.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="DRAFT">Draft</option>
            <option value="ALL">All</option>
          </select>
          <button
            onClick={fetchResources}
            className="inline-flex items-center rounded-xl bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 border border-slate-600 hover:bg-slate-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-sm text-slate-400">
            Đang tải dữ liệu...
          </div>
        ) : resources.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-sm text-slate-500">
            Không có resource nào.
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/90 border-b border-slate-700/70">
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 text-left">Title</th>
                <th className="px-5 py-3 text-left">Provider</th>
                <th className="px-5 py-3 text-left">Type</th>
                <th className="px-5 py-3 text-left">Topic</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Created</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r, idx) => (
                <tr
                  key={r.id ?? idx}
                  className="border-t border-slate-800/80 hover:bg-slate-900/90"
                >
                  <td className="px-5 py-3 align-top">
                    <div className="font-medium text-slate-50">
                      {r.title}
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-2">
                      {r.description}
                    </div>
                  </td>
                  <td className="px-5 py-3 align-top text-slate-200">
                    {r.providerName || "—"}
                  </td>
                  <td className="px-5 py-3 align-top">
                    <span className="inline-flex items-center rounded-full bg-sky-500/10 px-2 py-0.5 text-[11px] font-medium text-sky-300">
                      {r.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 align-top text-slate-200">
                    {r.topic || "—"}
                  </td>
                  <td className="px-5 py-3 align-top">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        r.status === "APPROVED"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : r.status === "REJECTED"
                          ? "bg-rose-500/10 text-rose-300"
                          : r.status === "PENDING"
                          ? "bg-amber-500/10 text-amber-300"
                          : "bg-slate-500/10 text-slate-300"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 align-top text-slate-300">
                    {r.createdAt
                      ? new Date(r.createdAt).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-5 py-3 align-top">
                    <div className="flex items-center justify-end gap-2">
                      {r.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => handleAction(r.id, "APPROVE")}
                            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-slate-900 hover:bg-emerald-400 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(r.id, "REJECT")}
                            className="rounded-lg bg-rose-500 px-3 py-1.5 text-[11px] font-semibold text-slate-50 hover:bg-rose-400 transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() =>
                          alert(JSON.stringify(r, null, 2))
                        }
                        className="rounded-lg border border-slate-600 px-3 py-1.5 text-[11px] text-slate-200 hover:border-slate-400 transition"
                      >
                        JSON
                      </button>
                    </div>
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
