import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  Edit,
  Eye,
  Image as ImageIcon,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { getContentById } from "../../services/resourceService";

export default function ContentDetailView() {
  const { resourceId, contentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content"); // content, images

  // Determine back path based on current URL path
  const isViewMode = location.pathname.includes("/view/");
  const backPath = isViewMode
    ? `/provider/resources/${resourceId}/view`
    : `/provider/resources/${resourceId}`;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await getContentById(resourceId, contentId);
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [resourceId, contentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-white text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-white text-lg">Không tìm thấy nội dung</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(backPath)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            Quay lại
          </button>

          <button
            onClick={() =>
              navigate(
                `/provider/resources/${resourceId}/content/${contentId}/edit`
              )
            }
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#202934] text-gray-300 hover:text-white hover:border-emerald-500/50 transition"
          >
            <Edit size={18} />
            Chỉnh sửa
          </button>
        </div>

        {/* Title & Metadata */}
        <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-6">
          <h1 className="text-3xl font-bold text-white mb-4">
            {content.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <User size={16} />
              Giảng viên
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              Tạo: {new Date().toLocaleDateString("vi-VN")}
            </span>
            <span>•</span>
            <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs">
              Order: {content.orderNo}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#0b0f12] border border-[#202934] rounded-xl overflow-hidden">
          <div className="flex border-b border-[#202934]">
            <button
              onClick={() => setActiveTab("content")}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition relative ${
                activeTab === "content"
                  ? "text-emerald-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Eye size={18} />
              Nội dung
              {activeTab === "content" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("images")}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition relative ${
                activeTab === "images"
                  ? "text-emerald-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <ImageIcon size={18} />
              Hình ảnh
              {content.images && content.images.length > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                  {content.images.length}
                </span>
              )}
              {activeTab === "images" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"></div>
              )}
            </button>
          </div>

          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="p-8">
              <div
                className="prose prose-invert prose-emerald max-w-none
                  prose-headings:text-white 
                  prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-0
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-3 prose-h2:mt-8
                  prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-6
                  prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-semibold
                  prose-em:text-gray-300 prose-em:italic
                  prose-code:text-emerald-400 prose-code:bg-emerald-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-[#0f1419] prose-pre:border prose-pre:border-[#202934] prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-4
                  prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:text-gray-300
                  prose-ul:text-gray-300 prose-ul:list-disc prose-ul:ml-6 prose-ul:my-4
                  prose-ol:text-gray-300 prose-ol:list-decimal prose-ol:ml-6 prose-ol:my-4
                  prose-li:mb-2 prose-li:text-gray-300
                  prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400 prose-blockquote:my-4
                  prose-table:w-full prose-table:border-collapse prose-table:my-4
                  prose-thead:border-b-2 prose-thead:border-[#202934]
                  prose-th:text-left prose-th:p-3 prose-th:text-white prose-th:font-semibold prose-th:bg-[#0f1419]
                  prose-td:p-3 prose-td:text-gray-300 prose-td:border-t prose-td:border-[#202934]
                  prose-tr:border-b prose-tr:border-[#202934]
                  prose-img:rounded-lg prose-img:my-4
                  prose-hr:border-[#202934] prose-hr:my-8
                "
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                >
                  {content.markdown || "*Chưa có nội dung*"}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === "images" && (
            <div className="p-8">
              {content.images && content.images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.images.map((image) => (
                    <div
                      key={image.id}
                      className="bg-[#0f1419] border border-[#202934] rounded-xl overflow-hidden hover:border-emerald-500/50 transition"
                    >
                      <div className="aspect-video bg-[#0b0f12] flex items-center justify-center overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.caption || "Image"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {image.caption && (
                        <div className="p-3 border-t border-[#202934]">
                          <p className="text-sm text-gray-300">
                            {image.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ImageIcon size={48} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400">Chưa có hình ảnh nào</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
