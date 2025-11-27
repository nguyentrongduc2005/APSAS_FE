import { useState, useEffect } from "react";
import { FileText, ListChecks, Eye } from "lucide-react";
import adminContentService from "../../services/adminContentService";

export default function ContentViewModal({ open, onClose, data, onDecision }) {
  const [note, setNote] = useState("");
  const [tutorialDetail, setTutorialDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    if (open && data) {
      setNote(data.note || "");
      setTutorialDetail(null);
      setShowDetail(false);
    }
  }, [open, data]);

  const fetchTutorialDetail = async () => {
    if (!data?.id) return;
    
    try {
      setLoadingDetail(true);
      const result = await adminContentService.getTutorialById(data.id);
      if (result.code === "ok" || result.code === "OK") {
        setTutorialDetail(result.data);
        setShowDetail(true);
      }
    } catch (error) {
      console.error("Error fetching tutorial detail:", error);
      alert("Không thể tải chi tiết tutorial");
    } finally {
      setLoadingDetail(false);
    }
  };

  if (!open || !data) return null;

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
            <div className="text-slate-200">{data.submittedAt}</div>
          </div>

          <div className="col-span-2">
            <div className="text-slate-400">Trạng thái</div>
            <div className="text-slate-200">
              <span className={`px-2 py-0.5 rounded-md text-xs ${
                data.status === "pending" ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" :
                data.status === "approved" || data.status === "published" ? "bg-green-500/15 text-green-300 border border-green-500/30" :
                data.status === "rejected" ? "bg-rose-500/15 text-rose-300 border border-rose-500/30" :
                "bg-slate-500/15 text-slate-300 border border-slate-500/30"
              }`}>
                {data.status === "pending" ? "Chờ duyệt" :
                 data.status === "approved" || data.status === "published" ? "Đã duyệt" :
                 data.status === "rejected" ? "Đã từ chối" :
                 data.status}
              </span>
            </div>
          </div>
        </div>

        {/* Tutorial Detail Section */}
        {!showDetail ? (
          <div className="mt-4">
            <button
              onClick={fetchTutorialDetail}
              disabled={loadingDetail}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye size={16} />
              {loadingDetail ? "Đang tải..." : "Xem chi tiết tutorial"}
            </button>
          </div>
        ) : tutorialDetail && (
          <div className="mt-4 p-4 bg-[#0d1117] border border-[#223] rounded-md">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-200">Chi tiết tutorial</h4>
              <button
                onClick={() => setShowDetail(false)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Ẩn
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-slate-400">Mô tả: </span>
                <span className="text-slate-200">{tutorialDetail.summary || tutorialDetail.description || "—"}</span>
              </div>
              
              {tutorialDetail.items && tutorialDetail.items.length > 0 && (
                <div>
                  <div className="text-slate-400 mb-2">Danh sách nội dung ({tutorialDetail.items.length}):</div>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {tutorialDetail.items.map((item, idx) => (
                      <div key={item.id || idx} className="flex items-center gap-2 p-2 bg-[#0b0f14] rounded text-xs">
                        <div className={`p-1 rounded ${
                          item.itemType === "CONTENT" ? "bg-blue-500/10" : "bg-purple-500/10"
                        }`}>
                          {item.itemType === "CONTENT" ? (
                            <FileText size={12} className="text-blue-400" />
                          ) : (
                            <ListChecks size={12} className="text-purple-400" />
                          )}
                        </div>
                        <span className="text-slate-200 flex-1">{item.title}</span>
                        <span className="text-slate-500">Order: {item.orderNo || idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-4">
          <label className="text-sm text-slate-400">Ghi chú phản hồi</label>
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
          {/* Only show action buttons if status is PENDING */}
          {(data.status === "pending" || data.status === "PENDING") && (
            <>
              <button
                className="px-3 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700"
                onClick={() => onDecision("rejected", note)}
              >
                Từ chối
              </button>
              <button
                className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={() => onDecision("approved", note)}
              >
                Duyệt
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
