import { useEffect, useState } from "react";
import adminContentService from "../../services/adminContentService";

function ResourceModeration() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  const fetchResources = async (page = 0) => {
    try {
      setLoading(true);
      
      // API GET /api/tutorials chỉ trả về PUBLISHED tutorials (đã duyệt)
      const result = await adminContentService.getPublishedTutorials({
        page,
        size: pagination.size,
        search: searchKeyword || undefined,
        sort: ["createdAt,desc"],
      });

      const responseCode = (result.code || "").toUpperCase();
      if (responseCode === "OK" || responseCode === "200") {
        // Handle paginated response
        let contentList = [];
        if (result.data?.content) {
          contentList = result.data.content;
          setPagination({
            page: result.data.pageable?.pageNumber || page,
            size: result.data.pageable?.pageSize || pagination.size,
            totalElements: result.data.totalElements || 0,
            totalPages: result.data.totalPages || 0,
          });
        } else if (Array.isArray(result.data)) {
          contentList = result.data;
        }

        // Map tutorial data to resource format
        const mappedResources = contentList.map((tutorial) => ({
          id: tutorial.id,
          title: tutorial.title || "Untitled",
          description: tutorial.summary || "",
          providerName: tutorial.creatorName || tutorial.author?.fullname || tutorial.author?.username || tutorial.createdByName || "Unknown",
          creatorAvatar: tutorial.creatorAvatar || null,
          type: tutorial.type || "UNKNOWN",
          topic: tutorial.topic || "—",
          status: "APPROVED", // Tất cả đều là PUBLISHED (đã duyệt)
          createdAt: tutorial.createdAt,
          lessonCount: tutorial.lessonCount || 0,
          assignmentCount: tutorial.assignmentCount || 0,
          mediaCount: tutorial.mediaCount || 0,
          courseCount: tutorial.courseCount || 0,
          tutorial: tutorial, // Keep full tutorial object for reference
        }));

        setResources(mappedResources);
      } else {
        setResources([]);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      alert(error.message || "Không thể tải danh sách tutorials");
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  const handleAction = async (id, action) => {
    try {
      if (action === "APPROVE") {
        // Duyệt tutorial (PUBLISHED)
        await adminContentService.reviewTutorial(id, "PUBLISHED", "");
        alert("Tutorial đã được duyệt thành công!");
      } else if (action === "REJECT") {
        // Từ chối tutorial (REJECTED)
        const reason = prompt("Nhập lý do từ chối (tùy chọn):");
        await adminContentService.reviewTutorial(id, "REJECTED", reason || "");
        alert("Tutorial đã bị từ chối!");
      }
      
      // Refresh list
      fetchResources(pagination.page);
    } catch (error) {
      console.error("Error performing action:", error);
      alert(error.message || "Thao tác thất bại");
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
          <input
            type="text"
            placeholder="Tìm kiếm tutorials..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                fetchResources(0);
              }
            }}
            className="rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
          />
          <button
            onClick={() => fetchResources(0)}
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
                      <button
                        onClick={() => {
                          setSelectedResource(r);
                          setShowDetailModal(true);
                        }}
                        className="rounded-lg border border-slate-600 px-3 py-1.5 text-[11px] text-slate-200 hover:border-slate-400 transition"
                        title="Xem chi tiết"
                      >
                        Chi tiết
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Hiển thị {resources.length} trong tổng số {pagination.totalElements} tutorials
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchResources(pagination.page - 1)}
              disabled={pagination.page === 0}
              className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-slate-300">
              Trang {pagination.page + 1} / {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchResources(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages - 1}
              className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedResource && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-100">
                  Chi tiết Tutorial
                </h2>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedResource(null);
                  }}
                  className="text-slate-400 hover:text-slate-200 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wide">
                    ID
                  </label>
                  <p className="text-slate-200 mt-1">{selectedResource.id}</p>
                </div>

                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wide">
                    Tiêu đề
                  </label>
                  <p className="text-slate-100 mt-1 font-medium">
                    {selectedResource.title}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wide">
                    Mô tả
                  </label>
                  <p className="text-slate-300 mt-1">
                    {selectedResource.description || "—"}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wide">
                    Người tạo
                  </label>
                  <p className="text-slate-200 mt-1">
                    {selectedResource.providerName || "—"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wide">
                      Trạng thái
                    </label>
                    <div className="mt-1">
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">
                        {selectedResource.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wide">
                      Loại
                    </label>
                    <div className="mt-1">
                      <span className="inline-flex items-center rounded-full bg-sky-500/10 px-2 py-1 text-xs font-medium text-sky-300">
                        {selectedResource.type || "UNKNOWN"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wide">
                      Bài học
                    </label>
                    <p className="text-slate-200 mt-1 text-lg font-semibold">
                      {selectedResource.lessonCount || 0}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wide">
                      Bài tập
                    </label>
                    <p className="text-slate-200 mt-1 text-lg font-semibold">
                      {selectedResource.assignmentCount || 0}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wide">
                      Media
                    </label>
                    <p className="text-slate-200 mt-1 text-lg font-semibold">
                      {selectedResource.mediaCount || 0}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wide">
                      Khóa học
                    </label>
                    <p className="text-slate-200 mt-1 text-lg font-semibold">
                      {selectedResource.courseCount || 0}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wide">
                    Ngày tạo
                  </label>
                  <p className="text-slate-200 mt-1">
                    {selectedResource.createdAt
                      ? new Date(selectedResource.createdAt).toLocaleString(
                          "vi-VN"
                        )
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedResource(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResourceModeration;
