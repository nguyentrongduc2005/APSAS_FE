// src/pages/admin/ContentApprovals.jsx
import { useMemo, useState } from "react";
import { MOCK_CONTENTS } from "../../data/mockContents";

function StatusPill({ s }) {
  const map = {
    pending:
      "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    approved:
      "bg-green-500/15 text-green-300 border border-green-500/30",
    rejected:
      "bg-rose-500/15 text-rose-300 border border-rose-500/30",
  };

  return (
    <span className={`px-2 py-0.5 rounded-md text-xs ${map[s]}`}>
      {s}
    </span>
  );
}

function ViewModal({ open, onClose, data, onDecision }) {
  const [note, setNote] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="w-[800px] rounded-xl bg-[#0b0f14] border border-[#1e2630] p-5">
        <h3 className="text-slate-100 text-lg font-semibold">
          Xem & xác nhận nội dung
        </h3>

        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <div className="text-slate-400">ID</div>
            <div className="text-slate-200">{data.id}</div>
          </div>

          <div>
            <div className="text-slate-400">Loại</div>
            <div className="text-slate-200">{data.type}</div>
          </div>

          <div className="col-span-2">
            <div className="text-slate-400">Tiêu đề</div>
            <div className="text-slate-200">{data.title}</div>
          </div>

          <div>
            <div className="text-slate-400">Tác giả</div>
            <div className="text-slate-200">{data.author}</div>
          </div>

          <div>
            <div className="text-slate-400">Nộp lúc</div>
            <div className="text-slate-200">
              {data.submittedAt}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm text-slate-400">
            Ghi chú phản hồi
          </label>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200"
            placeholder="(Không bắt buộc)"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-3 py-2 rounded-md bg-slate-700/50 text-slate-200"
            onClick={onClose}
          >
            Đóng
          </button>
          <button
            className="px-3 py-2 rounded-md bg-rose-600 text-white"
            onClick={() => onDecision("rejected", note)}
          >
            Từ chối
          </button>
          <button
            className="px-3 py-2 rounded-md bg-emerald-600 text-white"
            onClick={() => onDecision("approved", note)}
          >
            Duyệt
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContentApprovals() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("pending");
  const [items, setItems] = useState(MOCK_CONTENTS);
  const [modal, setModal] = useState({ open: false, data: null });

  const filtered = useMemo(() => {
    return items
      .filter((it) => (type ? it.type === type : true))
      .filter((it) => (status ? it.status === status : true))
      .filter((it) => {
        if (!q.trim()) return true;
        const s = (it.title + it.id + it.author).toLowerCase();
        return s.includes(q.toLowerCase());
      });
  }, [q, type, status, items]);

  const openView = (row) => setModal({ open: true, data: row });
  const closeView = () => setModal({ open: false, data: null });

  const decide = (decision, note) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === modal.data.id
          ? { ...it, status: decision, note }
          : it
      )
    );
    closeView();
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold text-slate-100 mb-4">
        Xác nhận nội dung
      </h1>

      <div className="rounded-xl border border-[#1e2630] bg-[#0b0f14] p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo tiêu đề / tác giả / ID"
            className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200 placeholder:text-slate-500 w-80 outline-none focus:border-sky-600"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200"
          >
            <option value="">Tất cả loại</option>
            <option value="course">Course</option>
            <option value="assignment">Assignment</option>
            <option value="resource">Resource</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#223] text-slate-200"
          >
            <option value="">Mọi trạng thái</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm text-slate-300">
            <thead className="text-xs uppercase bg-[#0f141a] text-slate-400">
              <tr>
                <th className="px-3 py-3 text-left">ID</th>
                <th className="px-3 py-3 text-left">Tiêu đề</th>
                <th className="px-3 py-3 text-left">Loại</th>
                <th className="px-3 py-3 text-left">Tác giả</th>
                <th className="px-3 py-3 text-left">Thời gian nộp</th>
                <th className="px-3 py-3 text-left">Trạng thái</th>
                <th className="px-3 py-3 text-right">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-[#1f2937] hover:bg-white/5"
                >
                  <td className="px-3 py-3">{r.id}</td>
                  <td className="px-3 py-3">{r.title}</td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-0.5 rounded-md text-xs bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {r.type}
                    </span>
                  </td>
                  <td className="px-3 py-3">{r.author}</td>
                  <td className="px-3 py-3">{r.submittedAt}</td>
                  <td className="px-3 py-3">
                    <StatusPill s={r.status} />
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        className="px-2 py-1 rounded bg-[#101826] border border-[#223]"
                        onClick={() => openView(r)}
                      >
                        Xem
                      </button>

                      {r.status === "pending" && (
                        <>
                          <button
                            className="px-2 py-1 rounded bg-emerald-600 text-white"
                            onClick={() =>
                              setModal({ open: true, data: r })
                            }
                          >
                            Duyệt
                          </button>
                          <button
                            className="px-2 py-1 rounded bg-rose-600 text-white"
                            onClick={() =>
                              setModal({ open: true, data: r })
                            }
                          >
                            Từ chối
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-slate-500"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ViewModal
        open={modal.open}
        onClose={closeView}
        data={modal.data || {}}
        onDecision={decide}
      />
    </div>
  );
}
