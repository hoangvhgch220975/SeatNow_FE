/**
 * Export tất cả biến môi trường một cách an toàn và có typing
 * Mọi file khác trong dự án bắt buộc import từ file này thay vì dùng trực tiếp import.meta.env
 */

export const ENV = {
  // Base URL của API Gateway
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:7000/api/v1',
  
  // Cloudinary Config cho Frontend Unsigned Upload
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_API_KEY: import.meta.env.VITE_CLOUDINARY_API_KEY,
  // CẢNH BÁO: API Secret không nên dùng ở Frontend. Chỉ để ở đây nếu thực sự cần thiết cho logic ký (signed upload)
  CLOUDINARY_API_SECRET: import.meta.env.VITE_CLOUDINARY_API_SECRET,
};
