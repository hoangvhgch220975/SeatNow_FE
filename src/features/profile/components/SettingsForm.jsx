import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useUpdateProfileMutation } from '../hooks.js';
import { profileSchema } from '../schemas.js';
import { uploadToCloudinary } from '../../../lib/cloudinary.js';

// Import các thành phần con đã được tách (Vietnamese comment)
import AvatarUploader from './AvatarUploader.jsx';
import ProfileForm from './ProfileForm.jsx';

/**
 * @file SettingsForm.jsx
 * @description Thành phần Container quản lý logic cập nhật hồ sơ người dùng. Hỗ trợ đa ngôn ngữ.
 * Phối hợp giữa AvatarUploader và ProfileForm.
 */
const SettingsForm = ({ user }) => {
  const { t } = useTranslation();
  
  // State quản lý hiển thị ảnh và file đã chọn (Vietnamese comment)
  const [previewUrl, setPreviewUrl] = useState(user?.avatar || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const updateProfileMutation = useUpdateProfileMutation();

  // Khởi tạo React Hook Form với Zod validation (Vietnamese comment)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || user?.fullName || '',
      phone: user?.phone || user?.phoneNumber || '',
      email: user?.email || '',
    },
  });

  // Cập nhật giá trị form khi dữ liệu người dùng từ Props thay đổi (Re-sync) (Vietnamese comment)
  useEffect(() => {
    if (user) {
      setValue('name', user.name || user.fullName || '');
      setValue('phone', user.phone || user.phoneNumber || '');
      setValue('email', user.email || '');
      setPreviewUrl(user.avatar || '');
    }
  }, [user, setValue]);

  /**
   * Xử lý khi người dùng chọn file ảnh mới
   * Tạo URL preview tạm thời để hiển thị ngay lập tức
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Trả về hàm cleanup để tránh rò rỉ bộ nhớ (Vietnamese comment)
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  /**
   * Xử lý lưu toàn bộ thông tin hồ sơ (bao gồm cả upload ảnh nếu có)
   */
  const onSubmit = async (data) => {
    try {
      setIsUploading(true);
      let avatarUrl = user?.avatar;

      // 1. Tải ảnh lên Cloudinary nếu người dùng có chọn ảnh mới (Vietnamese comment)
      if (selectedFile) {
        try {
          const uploadRes = await uploadToCloudinary(selectedFile);
          avatarUrl = uploadRes.secure_url;
        } catch (uploadError) {
          toast.error(t('profile.settings.upload_error'));
          return;
        }
      }

      // 2. Gọi API cập nhật thông tin hồ sơ thông qua mutation (Vietnamese comment)
      await updateProfileMutation.mutateAsync({
        name: data.name,
        email: data.email,
        avatar: avatarUrl,
      });

      toast.success(t('profile.settings.success_toast'));
      setSelectedFile(null); // Reset trạng thái file sau khi lưu thành công (Vietnamese comment)
    } catch (error) {
      console.error('Update Profile Error:', error);
      
      // Xử lý thông báo lỗi người dùng thân thiện (Vietnamese comment)
      if (error.response?.status === 409) {
        toast.error(t('profile.settings.email_conflict'));
      } else {
        toast.error(error.response?.data?.message || t('profile.settings.error_default'));
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Trạng thái đang xử lý (Loading) (Vietnamese comment)
  const isPending = updateProfileMutation.isPending || isUploading;

  return (
    <div className="bg-white/50 backdrop-blur-sm p-10 rounded-[3rem] border-2 border-slate-200/60 shadow-soft h-full animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Tiền đề (Header) của bảng cài đặt (Vietnamese comment) */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
           <span className="material-symbols-outlined text-primary">person_edit</span>
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {t('profile.settings.title')}
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">
            {t('profile.settings.subtitle')}
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {/* 1. Thành phần Upload ảnh đại diện (Vietnamese comment) */}
        <AvatarUploader 
          previewUrl={previewUrl}
          isUploading={isUploading}
          isPending={isPending}
          selectedFile={selectedFile}
          onFileChange={handleFileChange}
        />

        {/* 2. Thành phần Biểu mẫu nhập liệu thông tin (Vietnamese comment) */}
        <ProfileForm 
          register={register}
          errors={errors}
          user={user}
          isPending={isPending}
          onSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

export default SettingsForm;
