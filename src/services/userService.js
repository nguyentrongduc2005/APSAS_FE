import api from "./api";

/**
 * User Service - Xử lý các API liên quan đến user profile
 */

/**
 * Lấy thông tin profile của user hiện tại
 * @returns {Promise} User profile data
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get("/api/user/profile");
    return response.data;
  } catch (error) {
    console.error("Get user profile error:", error);
    throw error;
  }
};

/**
 * Cập nhật thông tin profile của user
 * @param {Object} profileData - Dữ liệu profile cần cập nhật
 * @param {string} profileData.name - Tên người dùng
 * @param {string} profileData.email - Email
 * @param {string} profileData.password - Mật khẩu (optional)
 * @param {string} profileData.id - ID/Địa chỉ
 * @returns {Promise} Updated user data
 */
export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put("/api/user/profile", profileData);

    // Cập nhật localStorage với thông tin mới
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = {
      ...currentUser,
      ...response.data,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return response.data;
  } catch (error) {
    console.error("Update user profile error:", error);
    throw error;
  }
};

/**
 * Đổi mật khẩu
 * @param {Object} passwordData
 * @param {string} passwordData.currentPassword - Mật khẩu hiện tại
 * @param {string} passwordData.newPassword - Mật khẩu mới
 * @returns {Promise}
 */
export const changePassword = async (passwordData) => {
  try {
    const response = await api.post("/api/user/change-password", passwordData);
    return response.data;
  } catch (error) {
    console.error("Change password error:", error);
    throw error;
  }
};

/**
 * Upload avatar
 * @param {File} file - File ảnh avatar
 * @returns {Promise} Avatar URL
 */
export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.post("/api/user/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Cập nhật avatar trong localStorage
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    currentUser.avatar = response.data.avatarUrl;
    localStorage.setItem("user", JSON.stringify(currentUser));

    return response.data;
  } catch (error) {
    console.error("Upload avatar error:", error);
    throw error;
  }
};
