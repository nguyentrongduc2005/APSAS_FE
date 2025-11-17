import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Clock, CheckCircle, Plus, X } from "lucide-react";
import resourceService from "../../services/resourceService";
import SearchBar from "../../components/provider/SearchBar";
import ResourceManagementCard from "../../components/provider/ResourceManagementCard";
import Pagination from "../../components/provider/Pagination";

function ResourceManagement() {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all, pending, approved
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newResource, setNewResource] = useState({ title: "", summary: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [insights, setInsights] = useState({
    total: 0,
    pending: 0,
    approved: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0,
  });

  // Fetch insights
  const fetchInsights = async () => {
    try {
      const data = await resourceService.getInsights();
      setInsights(data);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  // Fetch resources
  const fetchResources = async (
    page = 1,
    searchKeyword = keyword,
    status = activeTab
  ) => {
    try {
      setLoading(true);
      const result = await resourceService.getResources({
        page,
        limit: pagination.limit,
        keyword: searchKeyword,
        status,
      });

      setResources(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error("Error fetching resources:", error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResource = async () => {
    if (!newResource.title.trim() || !newResource.summary.trim()) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      setIsCreating(true);
      const result = await resourceService.createResource(newResource);
      alert("Tạo tài nguyên thành công!");
      setShowCreateModal(false);
      setNewResource({ title: "", summary: "" });
      navigate(`/provider/resources/${result.id}`);
    } catch (error) {
      console.error("Error creating resource:", error);
      alert("Có lỗi xảy ra khi tạo tài nguyên!");
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    fetchInsights();
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchResources(1, keyword, activeTab);
  };

  const handlePageChange = (page) => {
    fetchResources(page, keyword, activeTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchResources(1, keyword, tab);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white">Quản lý tài nguyên</h1>
          <p className="text-sm text-gray-400">
            Quản lý và theo dõi trạng thái tài nguyên học tập của bạn
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Tạo tài nguyên
        </button>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Resources */}
        <div className="bg-[#0f1419] border border-[#202934] rounded-xl p-5 hover:border-emerald-500 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg">
              <FileText size={24} className="text-emerald-400" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Tổng số tài nguyên</div>
              <div className="text-2xl font-bold text-white">
                {insights.total}
              </div>
            </div>
          </div>
        </div>

        {/* Pending Resources */}
        <div className="bg-[#0f1419] border border-[#202934] rounded-xl p-5 hover:border-yellow-500 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Clock size={24} className="text-yellow-400" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Chờ duyệt</div>
              <div className="text-2xl font-bold text-white">
                {insights.pending}
              </div>
            </div>
          </div>
        </div>

        {/* Approved Resources */}
        <div className="bg-[#0f1419] border border-[#202934] rounded-xl p-5 hover:border-blue-500 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <CheckCircle size={24} className="text-blue-400" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Đã duyệt</div>
              <div className="text-2xl font-bold text-white">
                {insights.approved}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        onSearch={handleSearch}
      />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#202934]">
        <button
          onClick={() => handleTabChange("all")}
          className={`px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "all"
              ? "text-emerald-400 border-b-2 border-emerald-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => handleTabChange("pending")}
          className={`px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "pending"
              ? "text-emerald-400 border-b-2 border-emerald-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Chờ duyệt
        </button>
        <button
          onClick={() => handleTabChange("approved")}
          className={`px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "approved"
              ? "text-emerald-400 border-b-2 border-emerald-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Đã duyệt
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Đang tải...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && resources.length === 0 && (
        <div className="text-center py-12 bg-[#0f1419] border border-[#202934] rounded-xl">
          <p className="text-gray-400 text-lg">
            {keyword
              ? "Không tìm thấy tài nguyên nào phù hợp"
              : "Chưa có tài nguyên nào"}
          </p>
        </div>
      )}

      {/* Resources Grid */}
      {!loading && resources.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <ResourceManagementCard key={resource.id} resource={resource} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}

          {/* Summary */}
          <div className="text-center text-sm text-gray-400">
            Hiển thị {resources.length} trong tổng số {pagination.total} tài
            nguyên
          </div>
        </>
      )}

      {/* Create Resource Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl max-w-md w-full">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  Tạo tài nguyên mới
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewResource({ title: "", summary: "" });
                  }}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tiêu đề <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={(e) =>
                    setNewResource({ ...newResource, title: e.target.value })
                  }
                  placeholder="Nhập tiêu đề tài nguyên..."
                  className="w-full bg-[#0f1419] border border-[#202934] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mô tả ngắn <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={newResource.summary}
                  onChange={(e) =>
                    setNewResource({ ...newResource, summary: e.target.value })
                  }
                  placeholder="Nhập mô tả ngắn về tài nguyên..."
                  rows={4}
                  className="w-full bg-[#0f1419] border border-[#202934] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewResource({ title: "", summary: "" });
                  }}
                  className="px-4 py-2 rounded-lg border border-[#202934] text-gray-300 hover:text-white hover:border-gray-600 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreateResource}
                  disabled={
                    isCreating ||
                    !newResource.title.trim() ||
                    !newResource.summary.trim()
                  }
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? "Đang tạo..." : "Tạo tài nguyên"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResourceManagement;
