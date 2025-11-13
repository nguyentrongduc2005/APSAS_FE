import { useEffect, useState } from "react";
import axios from "axios";

const STATUS_OPTIONS = [
  { value: "ALL", label: "Tất cả" },
  { value: "DRAFT", label: "Draft" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

const TYPE_OPTIONS = [
  { value: "ALL", label: "All types" },
  { value: "VIDEO", label: "Video" },
  { value: "PDF", label: "PDF" },
  { value: "PROBLEM_SET", label: "Problem set" },
  { value: "QUIZ", label: "Quiz" },
];

const statusBadgeClass = (status) => {
  switch (status) {
    case "APPROVED":
      return "bg-emerald-500/10 text-emerald-300 border-emerald-500/50";
    case "PENDING":
      return "bg-amber-500/10 text-amber-300 border-amber-500/50";
    case "REJECTED":
      return "bg-rose-500/10 text-rose-300 border-rose-500/50";
    case "DRAFT":
      return "bg-slate-500/10 text-slate-300 border-slate-500/50";
    default:
      return "bg-slate-600/10 text-slate-200 border-slate-600/50";
  }
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

      const raw = res.data;
      let list = [];

      if (Array.isArray(raw)) list = raw;
      else if (Array.isArray(raw?.content)) list = raw.content;
      else if (Array.isArray(raw?.data)) list = raw.data;

      setResources(list);
    } catch (e) {
      console.error(e);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá tài nguyên này?")) return;
    try {
      await axios.delete(`/api/provider/resources/${id}`);
      setResources((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
      alert("Xoá thất bại");
    }
  };

  const handleCreate = () => {
    // tuỳ bạn định nghĩa route form tạo mới
    // ví dụ: /provider/resources/create
    window.location.href = "/provider/resources/create";
  };

  return (
    <div className="page-wrapper p-6 space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Tutorial Management
          </h1>
          <p className="text-sm text-slate-400">
            Quản lý toàn bộ tài nguyên / tutorial mà bạn đã tạo: chỉnh sửa, gửi
            duyệt, hoặc xoá nếu không dùng nữa.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md shadow-emerald-500/30 hover:bg-emerald-400 transition"
        >
          <span className="mr-2 text-lg">＋</span>
          Tạo tài nguyên mới
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Tìm theo tiêu đề, chủ đề, tag..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 min-w-[200px] rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          onClick={fetchResources}
          className="ml-auto inline-flex items-center rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 border border-slate-600 hover:bg-slate-700 transition"
        >
          Lọc
        </button>
      </div>

      {/* List / Table */}
      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-sm text-slate-400">
            Đang tải dữ liệu...
          </div>
        ) : resources.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-sm text-slate-500 gap-2">
            <div className="text-4xl">📂</div>
            <p>Hiện bạn chưa có tài nguyên nào.</p>
            <p className="text-xs text-slate-500">
              Hãy bắt đầu bằng cách tạo một tutorial mới.
            </p>
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/90 border-b border-slate-700/70">
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 text-left">Tiêu đề</th>
                <th className="px-5 py-3 text-left">Loại</th>
                <th className="px-5 py-3 text-left">Chủ đề</th>
                <th className="px-5 py-3 text-left">Level</th>
                <th className="px-5 py-3 text-left">Trạng thái</th>
                <th className="px-5 py-3 text-left">Được dùng bởi</th>
                <th className="px-5 py-3 text-left">Ngày tạo</th>
                <th className="px-5 py-3 text-right">Thao tác</th>
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
                    {r.type}
                  </td>
                  <td className="px-5 py-3 align-top text-slate-200">
                    {r.topic || "—"}
                  </td>
                  <td className="px-5 py-3 align-top text-slate-200">
                    {r.level || "—"}
                  </td>
                  <td className="px-5 py-3 align-top">
                    <span
                      className={
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border " +
                        statusBadgeClass(r.status)
                      }
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 align-top text-slate-300 text-xs">
                    {r.usedByCourseCount
                      ? `${r.usedByCourseCount} courses`
                      : "Chưa dùng"}
                  </td>
                  <td className="px-5 py-3 align-top text-slate-300 text-xs">
                    {r.createdAt
                      ? new Date(r.createdAt).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-5 py-3 align-top">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          (window.location.href = `/provider/resources/${r.id}/edit`)
                        }
                        className="rounded-lg border border-slate-600 px-3 py-1.5 text-[11px] text-slate-200 hover:border-emerald-400 hover:text-emerald-300 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="rounded-lg bg-rose-500 px-3 py-1.5 text-[11px] font-semibold text-slate-50 hover:bg-rose-400 transition"
                      >
                        Delete
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

export default ProviderResources;
