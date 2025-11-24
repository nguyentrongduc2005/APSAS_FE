// src/pages/admin/ContentApprovals.jsx
import { useState, useEffect } from "react";
import adminContentService from "../../services/adminContentService";
import ContentToolbar from "../../components/admin/ContentToolbar";
import ContentTable from "../../components/admin/ContentTable";
import ContentViewModal from "../../components/admin/ContentViewModal";

export default function ContentApprovals() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("pending");
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, data: null });
  const [error, setError] = useState(null);

  // Fetch contents
  const fetchContents = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await adminContentService.getContents({
        keyword: q,
        type,
        status,
      });
      
      if (result.code === "ok" && Array.isArray(result.data)) {
        // Map API response to expected format
        const mappedContents = result.data.map(tutorial => ({
          id: tutorial.id,
          title: tutorial.title || "Untitled",
          type: tutorial.type || "UNKNOWN",
          author: tutorial.author?.fullname || tutorial.author?.username || "Unknown",
          submittedAt: tutorial.createdAt ? new Date(tutorial.createdAt).toLocaleDateString('vi-VN') : "N/A",
          status: tutorial.status?.toLowerCase() || "pending",
          note: tutorial.note || "",
        }));
        setContents(mappedContents);
      } else {
        setContents([]);
      }
    } catch (error) {
      console.error("Error fetching contents:", error);
      setError(error.message || "Không thể tải danh sách nội dung");
      setContents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]); // Only refetch when status changes

  // Manual search trigger
  const handleSearch = () => {
    fetchContents();
  };

  const openView = (row) => setModal({ open: true, data: row });
  const closeView = () => setModal({ open: false, data: null });

  const decide = async (decision, note) => {
    try {
      if (decision === "approved") {
        const result = await adminContentService.approveContent(modal.data.id, note);
        if (result.code === "ok") {
          alert("Nội dung đã được duyệt thành công!");
          // Refresh the list
          fetchContents();
          closeView();
        } else {
          throw new Error(result.message || "Duyệt nội dung thất bại");
        }
      } else {
        const result = await adminContentService.rejectContent(modal.data.id, note);
        if (result.code === "ok") {
          alert("Nội dung đã bị từ chối!");
          // Refresh the list
          fetchContents();
          closeView();
        } else {
          throw new Error(result.message || "Từ chối nội dung thất bại");
        }
      }
    } catch (error) {
      console.error("Error deciding content:", error);
      alert(error.message || "Thao tác thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold text-slate-100 mb-4">
        Xác nhận nội dung
      </h1>

      <div className="rounded-xl border border-[#1e2630] bg-[#0b0f14] p-4">
        <div className="flex items-center gap-2">
          <ContentToolbar
            q={q}
            setQ={setQ}
            type={type}
            setType={setType}
            status={status}
            setStatus={setStatus}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tìm kiếm
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 mt-4">Đang tải...</p>
          </div>
        ) : (
          <ContentTable contents={contents} onView={openView} />
        )}
      </div>

      <ContentViewModal
        open={modal.open}
        onClose={closeView}
        data={modal.data}
        onDecision={decide}
      />
    </div>
  );
}
