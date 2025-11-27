import { useState, useEffect, useRef } from "react";
import { Bell, Check, CheckCheck, Trash2, X, Eye, Clock, User, BookOpen, FileText, HelpCircle } from "lucide-react";
import notificationService from "../../services/notificationService";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // all, unread, read
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // Map filter to isRead parameter
      let isReadParam = undefined;
      if (filter === "unread") {
        isReadParam = false;
      } else if (filter === "read") {
        isReadParam = true;
      }
      
      const params = {
        page: 1,
        limit: 20,
        isRead: isReadParam,
      };
      
      const result = await notificationService.getNotifications(params);
      
      // Handle response format: { code, message, data: { data: [...], pagination: {...} } }
      let notificationList = [];
      if (result && result.code === "ok" && result.data) {
        if (Array.isArray(result.data)) {
          notificationList = result.data;
        } else if (result.data.data && Array.isArray(result.data.data)) {
          notificationList = result.data.data;
        } else if (result.data.content && Array.isArray(result.data.content)) {
          notificationList = result.data.content;
        }
      }
      
      setNotifications(notificationList);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const result = await notificationService.getUnreadCount();
      // Extract unreadCount from response
      const count = result?.data?.unreadCount || 
                   result?.unreadCount || 
                   (typeof result?.data === 'number' ? result.data : 0);
      setUnreadCount(count);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  // Mark as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      // Update local state
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
      // Refresh unread count
      fetchUnreadCount();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      // Update local state
      setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
      // Refresh unread count
      fetchUnreadCount();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  // Delete notification
  const handleDelete = async (notificationId, e) => {
    e?.stopPropagation(); // Prevent opening detail modal
    try {
      await notificationService.deleteNotification(notificationId);
      // Remove from local state
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      // Refresh unread count
      fetchUnreadCount();
      // Close detail modal if deleted notification is currently selected
      if (selectedNotification?.id === notificationId) {
        setShowDetailModal(false);
        setSelectedNotification(null);
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // View notification detail
  const handleViewDetail = async (notification) => {
    setSelectedNotification(notification);
    setShowDetailModal(true);
    
    // Auto mark as read when viewing detail
    if (!notification.isRead) {
      try {
        await notificationService.markAsRead(notification.id);
        // Update local state
        setNotifications(prev =>
          prev.map(notif =>
            notif.id === notification.id ? { ...notif, isRead: true } : notif
          )
        );
        // Refresh unread count
        fetchUnreadCount();
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }
  };

  // Parse payload to get detailed information
  const parsePayload = (notification) => {
    if (!notification.payload) return null;
    
    try {
      if (typeof notification.payload === 'string') {
        return JSON.parse(notification.payload);
      }
      return notification.payload;
    } catch (e) {
      return null;
    }
  };

  // Get notification type icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case "HELP_REQUEST":
        return <HelpCircle size={20} className="text-amber-400" />;
      case "ASSIGNMENT":
        return <FileText size={20} className="text-blue-400" />;
      case "SUBMISSION":
        return <BookOpen size={20} className="text-emerald-400" />;
      case "SYSTEM":
        return <Bell size={20} className="text-purple-400" />;
      default:
        return <Bell size={20} className="text-gray-400" />;
    }
  };

  // Get notification type label
  const getNotificationTypeLabel = (type) => {
    switch (type) {
      case "HELP_REQUEST":
        return "Yêu cầu hỗ trợ";
      case "ASSIGNMENT":
        return "Bài tập mới";
      case "SUBMISSION":
        return "Nộp bài tập";
      case "SYSTEM":
        return "Thông báo hệ thống";
      default:
        return type || "Thông báo";
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      fetchNotifications();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, filter]);

  // Fetch unread count on mount and periodically
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;
    return date.toLocaleDateString("vi-VN");
  };

  const getNotificationMessage = (notification) => {
    // Ưu tiên sử dụng field `message` từ backend (đã được parse sẵn)
    if (notification.message) {
      return notification.message;
    }
    
    // Fallback: Parse payload nếu không có message (tương thích ngược)
    if (notification.payload) {
      if (typeof notification.payload === 'string') {
        try {
          const parsed = JSON.parse(notification.payload);
          if (parsed.message) {
            return parsed.message;
          }
        } catch (e) {
          // Nếu không phải JSON, dùng payload như string
          return notification.payload;
        }
      } else if (notification.payload.message) {
        return notification.payload.message;
      }
    }
    
    // Fallback cuối cùng: dùng type
    if (notification.type) {
      return `Bạn có thông báo mới: ${notification.type}`;
    }
    
    return "Bạn có thông báo mới";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-9 w-9 rounded-lg border border-[#202934] bg-[#0b0f12] text-white hover:bg-[#131a22] transition flex items-center justify-center"
        title="Thông báo"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-[#0b0f12] border border-[#202934] rounded-xl shadow-xl z-50 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#202934]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Thông báo</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs text-slate-400 hover:text-slate-200 transition flex items-center gap-1"
                    title="Đánh dấu tất cả đã đọc"
                  >
                    <CheckCheck size={14} />
                    Đọc tất cả
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-200 transition"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            {/* Filter tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-2 py-1 text-xs rounded transition ${
                  filter === "all"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-2 py-1 text-xs rounded transition ${
                  filter === "unread"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Chưa đọc {unreadCount > 0 && `(${unreadCount})`}
              </button>
              <button
                onClick={() => setFilter("read")}
                className={`px-2 py-1 text-xs rounded transition ${
                  filter === "read"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Đã đọc
              </button>
            </div>
          </div>

          {/* Notifications list */}
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                Đang tải...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                Không có thông báo nào
              </div>
            ) : (
              <div className="divide-y divide-[#202934]">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleViewDetail(notification)}
                    className={`p-4 hover:bg-[#131a22] transition cursor-pointer ${
                      !notification.isRead ? "bg-[#0f1419]" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-slate-200 line-clamp-2">
                            {getNotificationMessage(notification)}
                          </p>
                          {!notification.isRead && (
                            <div className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-slate-400">
                            {formatDate(notification.createdAt)}
                          </p>
                          {notification.type && (
                            <span className="text-xs text-slate-500">
                              • {getNotificationTypeLabel(notification.type)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-1 text-slate-400 hover:text-emerald-400 transition"
                            title="Đánh dấu đã đọc"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        <button
                          onClick={(e) => handleDelete(notification.id, e)}
                          className="p-1 text-slate-400 hover:text-red-400 transition"
                          title="Xóa"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notification Detail Modal */}
      {showDetailModal && selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => {
              setShowDetailModal(false);
              setSelectedNotification(null);
            }}
          ></div>
          <div className="relative bg-[#0b0f12] border border-[#202934] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#0b0f12] border-b border-[#202934] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getNotificationIcon(selectedNotification.type)}
                <h3 className="text-lg font-semibold text-white">
                  Chi tiết thông báo
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedNotification(null);
                }}
                className="text-slate-400 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Type */}
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wide">Loại thông báo</label>
                <div className="mt-1 flex items-center gap-2">
                  {getNotificationIcon(selectedNotification.type)}
                  <span className="text-sm text-white font-medium">
                    {getNotificationTypeLabel(selectedNotification.type)}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wide">Nội dung</label>
                <p className="mt-1 text-sm text-slate-200 leading-relaxed">
                  {getNotificationMessage(selectedNotification)}
                </p>
              </div>

              {/* Parsed Payload Details */}
              {(() => {
                const parsedPayload = parsePayload(selectedNotification);
                if (parsedPayload) {
                  return (
                    <div>
                      <label className="text-xs text-slate-400 uppercase tracking-wide mb-2 block">
                        Thông tin chi tiết
                      </label>
                      <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-4 space-y-2">
                        {parsedPayload.studentName && (
                          <div className="flex items-center gap-2 text-sm">
                            <User size={16} className="text-slate-400" />
                            <span className="text-slate-300">
                              <span className="text-slate-400">Học sinh: </span>
                              {parsedPayload.studentName}
                            </span>
                          </div>
                        )}
                        {parsedPayload.helpRequestTitle && (
                          <div className="flex items-center gap-2 text-sm">
                            <HelpCircle size={16} className="text-slate-400" />
                            <span className="text-slate-300">
                              <span className="text-slate-400">Tiêu đề: </span>
                              {parsedPayload.helpRequestTitle}
                            </span>
                          </div>
                        )}
                        {parsedPayload.assignmentTitle && (
                          <div className="flex items-center gap-2 text-sm">
                            <FileText size={16} className="text-slate-400" />
                            <span className="text-slate-300">
                              <span className="text-slate-400">Bài tập: </span>
                              {parsedPayload.assignmentTitle}
                            </span>
                          </div>
                        )}
                        {parsedPayload.courseId && (
                          <div className="flex items-center gap-2 text-sm">
                            <BookOpen size={16} className="text-slate-400" />
                            <span className="text-slate-300">
                              <span className="text-slate-400">Khóa học ID: </span>
                              {parsedPayload.courseId}
                            </span>
                          </div>
                        )}
                        {parsedPayload.assignmentId && (
                          <div className="flex items-center gap-2 text-sm">
                            <FileText size={16} className="text-slate-400" />
                            <span className="text-slate-300">
                              <span className="text-slate-400">Bài tập ID: </span>
                              {parsedPayload.assignmentId}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Timestamp */}
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wide">Thời gian</label>
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-300">
                  <Clock size={16} className="text-slate-400" />
                  <span>{formatDate(selectedNotification.createdAt)}</span>
                  {selectedNotification.createdAt && (
                    <span className="text-slate-500">
                      ({new Date(selectedNotification.createdAt).toLocaleString('vi-VN')})
                    </span>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wide">Trạng thái</label>
                <div className="mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedNotification.isRead
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {selectedNotification.isRead ? "Đã đọc" : "Chưa đọc"}
                  </span>
                </div>
              </div>

              {/* Raw Payload (for debugging) */}
              {selectedNotification.payload && (
                <details className="mt-4">
                  <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-300">
                    Xem payload (JSON)
                  </summary>
                  <pre className="mt-2 p-3 bg-[#0f1419] border border-[#202934] rounded-lg text-xs text-slate-400 overflow-x-auto">
                    {typeof selectedNotification.payload === 'string'
                      ? selectedNotification.payload
                      : JSON.stringify(selectedNotification.payload, null, 2)}
                  </pre>
                </details>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#0b0f12] border-t border-[#202934] p-4 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedNotification(null);
                }}
                className="px-4 py-2 rounded-lg border border-[#202934] text-slate-300 hover:text-white hover:border-gray-600 transition font-medium"
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

