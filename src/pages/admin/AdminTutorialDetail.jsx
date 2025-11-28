import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  ListChecks,
  User,
  Eye,
} from "lucide-react";
import adminContentService from "../../services/adminContentService";

export default function AdminTutorialDetail() {
  const { tutorialId } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewingItem, setViewingItem] = useState(null);
  const [itemDetail, setItemDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        setLoading(true);
        // API /admin/tutorials/{id} returns items according to documentation
        const result = await adminContentService.getTutorialById(tutorialId);
        
        const responseCode = (result.code || "").toUpperCase();
        if (responseCode === "OK" || responseCode === "200" || result.code === "ok") {
          setTutorial(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch tutorial");
        }
      } catch (error) {
        console.error("Error fetching tutorial:", error);
        alert("Không thể tải thông tin tutorial");
        navigate("/admin/resources");
      } finally {
        setLoading(false);
      }
    };

    if (tutorialId) {
      fetchTutorial();
    }
  }, [tutorialId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-white text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-white text-lg">Không tìm thấy tutorial</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewItem = async (item) => {
    try {
      setViewingItem(item);
      setLoadingDetail(true);
      setItemDetail(null);

      if (item.itemType === "CONTENT" || item.type === "content") {
        const result = await adminContentService.getContentById(item.id);
        if (result.code === "ok" || result.code === "OK") {
          setItemDetail(result.data);
        }
      } else {
        const result = await adminContentService.getAssignmentById(item.id);
        if (result.code === "ok" || result.code === "OK") {
          setItemDetail(result.data);
        }
      }
    } catch (error) {
      console.error("Error fetching item detail:", error);
      alert("Không thể tải chi tiết nội dung");
    } finally {
      setLoadingDetail(false);
    }
  };

  const closeItemDetail = () => {
    setViewingItem(null);
    setItemDetail(null);
  };

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-4 flex-1">
            <button
              onClick={() => navigate("/admin/resources")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
            >
              <ArrowLeft size={16} />
              Quay lại
            </button>

            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {tutorial.title || "Untitled"}
              </h1>
              <p className="text-gray-400">{tutorial.summary || tutorial.description || ""}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <span>Tạo: {formatDate(tutorial.createdAt)}</span>
                <span>•</span>
                <span>Cập nhật: {formatDate(tutorial.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FileText size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Bài học</p>
                <p className="text-xl font-bold text-white">
                  {tutorial.lessonCount || tutorial.contentCount || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <ListChecks size={20} className="text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Bài tập</p>
                <p className="text-xl font-bold text-white">
                  {tutorial.assignmentCount || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <User size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Trạng thái</p>
                <p className="text-sm font-bold text-white">
                  {tutorial.status === "PUBLISHED" 
                    ? "Đã duyệt" 
                    : tutorial.status === "DRAFT" || tutorial.status === "PENDING"
                    ? "Chờ duyệt"
                    : tutorial.status === "REJECTED"
                    ? "Đã từ chối"
                    : tutorial.status || "Nháp"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Danh sách nội dung
          </h2>

          {tutorial.items && tutorial.items.length > 0 ? (
            <div className="space-y-3">
              {tutorial.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-[#0f1419] border border-[#202934] rounded-lg hover:border-emerald-500/30 transition"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`p-2 rounded-lg ${
                        item.itemType === "CONTENT" || item.type === "content"
                          ? "bg-blue-500/10"
                          : "bg-purple-500/10"
                      }`}
                    >
                      {item.itemType === "CONTENT" || item.type === "content" ? (
                        <FileText size={18} className="text-blue-400" />
                      ) : (
                        <ListChecks size={18} className="text-purple-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        Order: {item.orderNo || item.order || "—"} •{" "}
                        {item.itemType === "CONTENT" || item.type === "content"
                          ? "Bài học"
                          : "Bài tập"}
                        {item.itemType === "CONTENT" && (item.imageCount > 0 || item.videoCount > 0) && (
                          <> • {item.imageCount || 0} ảnh, {item.videoCount || 0} video</>
                        )}
                        {item.itemType === "ASSIGNMENT" && item.maxScore && (
                          <> • Điểm tối đa: {item.maxScore}</>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewItem(item)}
                      className="p-2 hover:bg-[#202934] rounded-lg transition"
                      title="Xem chi tiết"
                    >
                      <Eye size={18} className="text-gray-400 hover:text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <FileText size={48} className="mx-auto mb-3 opacity-50" />
              <p>Chưa có nội dung nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Item Detail Modal */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] rounded-xl bg-[#0b0f14] border border-[#1e2630] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#202934] flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {viewingItem.itemType === "CONTENT" ? "Chi tiết bài học" : "Chi tiết bài tập"}
              </h3>
              <button
                onClick={closeItemDetail}
                className="p-1 hover:bg-[#202934] rounded-lg transition"
              >
                <ArrowLeft size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loadingDetail ? (
                <div className="text-center py-12">
                  <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-400 mt-4">Đang tải...</p>
                </div>
              ) : itemDetail ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{itemDetail.title}</h4>
                    {itemDetail.bodyMd && (
                      <div className="prose prose-invert max-w-none">
                        <div className="text-gray-300 whitespace-pre-wrap">{itemDetail.bodyMd}</div>
                      </div>
                    )}
                    {itemDetail.statementHtml && (
                      <div 
                        className="text-gray-300"
                        dangerouslySetInnerHTML={{ __html: itemDetail.statementHtml }}
                      />
                    )}
                  </div>
                  {itemDetail.mediaList && itemDetail.mediaList.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-gray-400 mb-2">Media</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {itemDetail.mediaList.map((media, idx) => (
                          <div key={idx} className="bg-[#0f1419] p-2 rounded">
                            <p className="text-xs text-gray-400">{media.type || "Media"}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {itemDetail.testCases && itemDetail.testCases.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-gray-400 mb-2">Test Cases</h5>
                      <div className="space-y-2">
                        {itemDetail.testCases.map((testCase, idx) => (
                          <div key={idx} className="bg-[#0f1419] p-3 rounded border border-[#202934]">
                            <p className="text-xs text-gray-400">Test {idx + 1}</p>
                            {testCase.input && <p className="text-sm text-gray-300">Input: {testCase.input}</p>}
                            {testCase.expectedOutput && <p className="text-sm text-gray-300">Expected: {testCase.expectedOutput}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  Không có dữ liệu
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#202934] flex items-center justify-end">
              <button
                onClick={closeItemDetail}
                className="px-4 py-2 rounded-lg bg-[#202934] text-gray-300 hover:bg-[#2a3441] transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

