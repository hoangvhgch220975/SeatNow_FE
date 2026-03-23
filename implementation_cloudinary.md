# Giải pháp tối ưu hóa việc Upload hình ảnh cho SeatNow

Hệ thống SeatNow hiện đang sử dụng kiến trúc Microservices. Để tối ưu hóa hiệu năng, bảo mật và khả năng mở rộng cho việc xử lý hình ảnh, tôi đề xuất giải pháp **Cloudinary CDN (Free Tier)**. Giải pháp này giúp tự động tối ưu hóa dung lượng ảnh, hỗ trợ CDN toàn cầu và cho phép thay đổi kích thước ảnh linh hoạt qua URL.

## Vấn đề của phương pháp truyền thống (Proxy qua Backend)
- **Tiêu tốn tài nguyên**: Nếu upload qua Backend, server sẽ tốn băng thông và CPU để xử lý binary.
- **Tốc độ hiển thị chậm**: Nếu không có CDN, ảnh sẽ tải chậm nếu server đặt tại vị trí địa lý xa người dùng.
- **Không có Dynamic Resizing**: Phải tự tạo nhiều phiên bản ảnh (thumbnail, mobile, v.v.) thủ công.

## Giải pháp đề xuất: Direct Upload (FE ➔ Cloud Storage)

Đây là quy trình tối ưu nhất cho Cloudinary (Free Tier):

### Quy trình thực hiện:
1. **Thiết lập Upload Preset**: Cấu hình "Unsigned Upload Preset" trong dashboard Cloudinary để cho phép FE upload trực tiếp mà không cần signature từ Backend.
2. **FE Upload trực tiếp**: Frontend dùng `fetch` hoặc `axios` gửi dữ liệu file lên endpoint của Cloudinary.
3. **Lưu trữ Image ID/URL**: Sau khi upload thành công, Cloudinary trả về `secure_url`. FE gửi URL này về cho Backend (`user_service`, `restaurant-service`, v.v.) để lưu vào DB.

### Ưu điểm vượt trội:
- **Zero-Load on Backend**: Backend không bao giờ phải "chạm" vào dữ liệu file thật sự.
- **Bảo mật**: Chỉ những user hợp lệ mới có thể yêu cầu Presigned URL để upload.
- **Tốc độ**: Tận dụng hạ tầng băng thông cực lớn của các nhà cung cấp Cloud.

---

## Chi tiết triển khai với Cloudinary (Cấu trúc mới)

Dựa trên cấu trúc dự án mới tại [stucture.md](file:///c:/Users/Admin/OneDrive/Desktop/FInal%20Project%20FE/frontend/stucture.md), dưới đây là chi tiết các file cần triển khai:

### 1. Cấu hình Environment Variables (.env)
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=seatnow_preset
```

### 2. Tầng Low-level (src/lib/cloudinary.js)
Đây là nơi chứa logic gọi API trực tiếp của Cloudinary.

```javascript
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) throw new Error('Upload failed');
  return await response.json();
};
```

### 3. Feature Media: Utils (src/features/media/utils/optimizeCloudinaryUrl.js)
Xử lý tối ưu hóa ảnh qua URL.

```javascript
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const optimizeCloudinaryUrl = (publicId, options = {}) => {
  if (!publicId) return '';
  
  const { 
    width, 
    height, 
    crop = 'fill', 
    quality = 'auto', 
    format = 'auto' 
  } = options;
  
  let transformations = `f_${format},q_${quality}`;
  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  if (crop) transformations += `,c_${crop}`;

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
};
```

### 4. Feature Media: API (src/features/media/api.js)
Bọc lại hàm upload để dùng trong feature.

```javascript
import { uploadToCloudinary } from '@/lib/cloudinary';

export const uploadMedia = async (file) => {
  const data = await uploadToCloudinary(file);
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
};
```

### 5. Feature Media: Hooks (src/features/media/hooks.js)
Hook `useImageUpload` để quản lý state upload.

```javascript
import { useState } from 'react';
import { uploadMedia } from './api';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const upload = async (file) => {
    setIsUploading(true);
    setError(null);
    try {
      const result = await uploadMedia(file);
      setIsUploading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setIsUploading(false);
      throw err;
    }
  };

  return { upload, isUploading, error };
};
```

### 6. Component dùng chung (src/features/media/components/ImageUploader.jsx)

```javascript
import { useImageUpload } from '../hooks';

const ImageUploader = ({ onUploadSuccess, currentImage }) => {
  const { upload, isUploading } = useImageUpload();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const result = await upload(file);
      onUploadSuccess(result.url); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="image-uploader">
      {currentImage && <img src={currentImage} alt="Preview" className="w-20 h-20 object-cover" />}
      <input type="file" onChange={handleFileChange} disabled={isUploading} />
      {isUploading && <span>Uploading...</span>}
    </div>
  );
};

export default ImageUploader;
```

## Đánh giá cấu hình của bạn:
- **Cloudinary Preset**: `seatnow_preset` đã được thiết lập là **Unsigned** -> **Đúng**. Bạn có thể upload trực tiếp từ FE.
- **Project Structure**: Cấu trúc mới trong `stucture.md` rất chuyên nghiệp, giúp dự án dễ mở rộng và bảo trì -> **Rất tốt**.
