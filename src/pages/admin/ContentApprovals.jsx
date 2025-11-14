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

  // Fetch contents
  const fetchContents = async () => {
    try {
      setLoading(true);
      const result = await adminContentService.getContents({
        keyword: q,
        type,
        status,
      });
      setContents(result.data);
    } catch (error) {
      console.error("Error fetching contents:", error);
      setContents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, type, status]);

  const openView = (row) => setModal({ open: true, data: row });
  const closeView = () => setModal({ open: false, data: null });

  const decide = async (decision, note) => {
    try {
      if (decision === "approved") {
        await adminContentService.approveContent(modal.data.id, note);
      } else {
        await adminContentService.rejectContent(modal.data.id, note);
      }

      setContents((prev) =>
        prev.map((it) =>
          it.id === modal.data.id ? { ...it, status: decision, note } : it
        )
      );
      
      closeView();
    } catch (error) {
      console.error("Error deciding content:", error);
      alert("Thao tác thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold text-slate-100 mb-4">
        Xác nhận nội dung
      </h1>

      <div className="rounded-xl border border-[#1e2630] bg-[#0b0f14] p-4">
        <ContentToolbar
          q={q}
          setQ={setQ}
          type={type}
          setType={setType}
          status={status}
          setStatus={setStatus}
        />

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
