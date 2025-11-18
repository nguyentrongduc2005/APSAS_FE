import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  ListChecks,
  Calendar,
  User,
  CheckCircle,
  Circle,
  Save,
} from "lucide-react";
import { getResourceDetail } from "../../services/resourceService";

export default function ApplyResourceToCourse() {
  const { resourceId } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); // Array of { id, type, timeSettings }
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        setLoading(true);
        const data = await getResourceDetail(resourceId);
        setResource(data);
        // Auto-fill course name from resource
        setCourseName(data.title || "");
      } catch (error) {
        console.error("Error fetching resource:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [resourceId]);

  const isItemSelected = (itemId) => {
    return selectedItems.some((item) => item.id === itemId);
  };

  const toggleItemSelection = (item) => {
    if (isItemSelected(item.id)) {
      // Deselect
      setSelectedItems((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      // Select with default time settings
      const newItem = {
        id: item.id,
        type: item.type,
        title: item.title,
        orderNo: item.orderNo,
        timeSettings:
          item.type === "assignment"
            ? {
                duration: 60, // minutes
                deadline: 7, // days from now
              }
            : null,
      };
      setSelectedItems((prev) => [...prev, newItem]);
    }
  };

  const updateTimeSettings = (itemId, field, value) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              timeSettings: {
                ...item.timeSettings,
                [field]: parseInt(value) || 0,
              },
            }
          : item
      )
    );
  };

  const getItemTimeSettings = (itemId) => {
    const item = selectedItems.find((i) => i.id === itemId);
    return item?.timeSettings;
  };

  const handleCreateCourse = async () => {
    if (!courseName.trim()) {
      alert("Vui lòng nhập tên khóa học");
      return;
    }

    if (!courseDescription.trim()) {
      alert("Vui lòng nhập mô tả khóa học");
      return;
    }

    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một nội dung");
      return;
    }

    try {
      setIsSaving(true);

      // TODO: Call API to create course with selected items
      const courseData = {
        name: courseName,
        description: courseDescription,
        resourceId: resourceId,
        selectedItems: selectedItems,
      };

      console.log("Creating course with data:", courseData);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Tạo khóa học thành công!");
      navigate("/lecturer/my-courses");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Có lỗi xảy ra khi tạo khóa học");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-white text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-white text-lg">Không tìm thấy tài nguyên</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/resources")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
          >
            <ArrowLeft size={16} />
            Quay lại thư viện
          </button>

          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Áp dụng tài nguyên vào khóa học
            </h1>
            <p className="text-gray-400">{resource.summary}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <User size={14} />
                {resource.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                Tạo: {resource.createdAt}
              </span>
            </div>
          </div>
        </div>

        {/* Course Name Input */}
        <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tên khóa học <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Nhập tên khóa học..."
              className="w-full px-4 py-3 bg-[#0f1419] border border-[#202934] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mô tả khóa học <span className="text-red-400">*</span>
            </label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              placeholder="Nhập mô tả khóa học..."
              rows={4}
              className="w-full px-4 py-3 bg-[#0f1419] border border-[#202934] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition resize-none"
            />
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
                  {resource.totalContents || 0}
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
                  {resource.totalAssignments || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Đã chọn</p>
                <p className="text-xl font-bold text-white">
                  {selectedItems.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content List with Checkboxes */}
        <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Chọn nội dung cho khóa học
            </h2>
            <button
              onClick={() => {
                if (selectedItems.length === resource.items?.length) {
                  setSelectedItems([]);
                } else {
                  const allItems = resource.items.map((item) => ({
                    id: item.id,
                    type: item.type,
                    title: item.title,
                    orderNo: item.orderNo,
                    timeSettings:
                      item.type === "assignment"
                        ? { duration: 60, deadline: 7 }
                        : null,
                  }));
                  setSelectedItems(allItems);
                }
              }}
              className="text-sm text-emerald-400 hover:text-emerald-300 transition"
            >
              {selectedItems.length === resource.items?.length
                ? "Bỏ chọn tất cả"
                : "Chọn tất cả"}
            </button>
          </div>

          {resource.items && resource.items.length > 0 ? (
            <div className="space-y-3">
              {resource.items.map((item) => {
                const selected = isItemSelected(item.id);
                const timeSettings = getItemTimeSettings(item.id);

                return (
                  <div
                    key={item.id}
                    className={`border rounded-lg transition ${
                      selected
                        ? "bg-emerald-500/5 border-emerald-500/30"
                        : "bg-[#0f1419] border-[#202934]"
                    }`}
                  >
                    {/* Item Header with Checkbox */}
                    <div
                      onClick={() => toggleItemSelection(item)}
                      className="flex items-center gap-3 p-4 cursor-pointer hover:bg-[#0f1419]/50 transition"
                    >
                      <div className="shrink-0">
                        {selected ? (
                          <CheckCircle size={24} className="text-emerald-400" />
                        ) : (
                          <Circle size={24} className="text-gray-600" />
                        )}
                      </div>

                      <div
                        className={`p-2 rounded-lg ${
                          item.type === "content"
                            ? "bg-blue-500/10"
                            : "bg-purple-500/10"
                        }`}
                      >
                        {item.type === "content" ? (
                          <FileText size={18} className="text-blue-400" />
                        ) : (
                          <ListChecks size={18} className="text-purple-400" />
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="text-white font-medium">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          Order: {item.orderNo} •{" "}
                          {item.type === "content" ? "Bài học" : "Bài tập"}
                        </p>
                      </div>
                    </div>

                    {/* Time Settings for Assignments */}
                    {selected && item.type === "assignment" && timeSettings && (
                      <div className="px-4 pb-4 space-y-3 border-t border-[#202934] pt-4">
                        <p className="text-sm font-medium text-gray-300">
                          Cài đặt thời gian
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Thời gian làm bài (phút)
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={timeSettings.duration}
                              onChange={(e) =>
                                updateTimeSettings(
                                  item.id,
                                  "duration",
                                  e.target.value
                                )
                              }
                              onClick={(e) => e.stopPropagation()}
                              className="w-full px-3 py-2 bg-[#0f1419] border border-[#202934] rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Hạn nộp (số ngày từ bây giờ)
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={timeSettings.deadline}
                              onChange={(e) =>
                                updateTimeSettings(
                                  item.id,
                                  "deadline",
                                  e.target.value
                                )
                              }
                              onClick={(e) => e.stopPropagation()}
                              className="w-full px-3 py-2 bg-[#0f1419] border border-[#202934] rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <FileText size={48} className="mx-auto mb-3 opacity-50" />
              <p>Chưa có nội dung nào</p>
            </div>
          )}
        </div>

        {/* Create Course Button */}
        <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">
                Đã chọn {selectedItems.length} nội dung
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {selectedItems.filter((item) => item.type === "content").length}{" "}
                bài học,{" "}
                {
                  selectedItems.filter((item) => item.type === "assignment")
                    .length
                }{" "}
                bài tập
              </p>
            </div>
            <button
              onClick={handleCreateCourse}
              disabled={isSaving || selectedItems.length === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {isSaving ? "Đang tạo..." : "Tạo khóa học"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
