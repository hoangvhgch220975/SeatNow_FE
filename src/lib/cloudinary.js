import { ENV } from '../config/env.js';

/**
 * Hàm upload ảnh trực tiếp từ Frontend lên Cloudinary
 * Dùng luồng Unsigned Upload (Không cần Backend ký gửi)
 * Cần truyền file object (từ thẻ <input type="file" />)
 */
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', ENV.CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${ENV.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || 'Error uploading image');
    }

    return await response.json();
  } catch (err) {
    console.error('Cloudinary Direct Upload Error:', err);
    throw err;
  }
};
