/**
 * Hàm hỗ trợ định dạng Date / DateTime cho hiển thị giao diện UI
 * Chuẩn múi giờ vi-VN (Ví dụ: 08/11/2026 15:30)
 */

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

/**
 * Hàm hỗ trợ định dạng giờ (HH:mm)
 * Xử lý cả chuỗi ISO (1970-01-01T19:00:00Z) và chuỗi giờ chuẩn (19:00)
 */
export const formatTime = (timeString) => {
  if (!timeString) return '';
  try {
    // Trường hợp là ISO string gửi về từ .NET (VD: 1970-01-01T19:00:00.000Z)
    if (timeString.includes('T') && timeString.includes('Z')) {
      const date = new Date(timeString);
      return new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(date);
    }
    // Trường hợp là chuỗi giờ HH:mm:ss hoặc HH:mm
    return timeString.substring(0, 5);
  } catch (error) {
    return timeString;
  }
};

