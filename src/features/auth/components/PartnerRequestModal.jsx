import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../../shared/ui/Modal';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';
import { useSubmitPartnerRequestMutation } from '../hooks';
import { useImageUpload } from '../../media/hooks';
import { Loader2, Upload, FileCheck, CheckCircle2 } from 'lucide-react';

/**
 * @file PartnerRequestModal.jsx
 * @description Modal dành cho khách hàng muốn trở thành đối tác nhà hàng.
 * Bao gồm form nhập thông tin cơ bản và upload giấy phép kinh doanh.
 */
const PartnerRequestModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const submitMutation = useSubmitPartnerRequestMutation();
  const { upload, isUploading } = useImageUpload();
  
  const [formData, setFormData] = useState({
    name: '', // Đổi từ fullName sang name (Vietnamese comment) *)
    email: '',
    phone: '',
    documentUrls: [] // Đổi từ documentUrl sang mảng (Vietnamese comment) *)
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // Xử lý thay đổi input (Vietnamese comment) *)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý upload tài liệu (Hỗ trợ nhiều ảnh) (Vietnamese comment) *)
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      // Upload từng file và cập nhật vào mảng (Vietnamese comment) *)
      const uploadPromises = files.map(file => upload(file));
      const urls = await Promise.all(uploadPromises);
      
      setFormData(prev => ({ 
        ...prev, 
        documentUrls: [...prev.documentUrls, ...urls] 
      }));
    } catch (error) {
      console.error('File upload failed', error);
    }
  };

  // Xóa ảnh đã upload (Vietnamese comment) *)
  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      documentUrls: prev.documentUrls.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Gửi form (Vietnamese comment) *)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Tạo payload khớp với yêu cầu nghiêm ngặt của Backend (name, phone, email, documentUrl)
    // Backend yêu cầu tên trường là 'documentUrl' (Vietnamese comment) *)
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      documentUrl: formData.documentUrls // Gửi mảng ảnh dưới tên trường documentUrl (Vietnamese comment) *)
    };

    submitMutation.mutate(payload, {
      onSuccess: () => {
        setIsSuccess(true);
      }
    });
  };

  // Reset trạng thái khi đóng (Vietnamese comment) *)
  const handleClose = () => {
    setIsSuccess(false);
    setFormData({ name: '', email: '', phone: '', documentUrls: [] });
    onClose();
  };

  // Giao diện khi thành công (Vietnamese comment) *)
  if (isSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="text-center py-8 space-y-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {t('auth.partner.successTitle')}
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            {t('auth.partner.successDesc')}
          </p>
          <Button 
            className="w-full py-4 rounded-xl font-bold" 
            onClick={handleClose}
          >
            {t('auth.partner.close')}
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title={t('auth.partner.title')}
    >
      <div className="space-y-6 pt-2">
        <p className="text-sm text-slate-500 font-medium">
          {t('auth.partner.subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label={t('auth.partner.fullName')}
            name="name" // Thay đổi name attribute (Vietnamese comment) *)
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label={t('auth.partner.email')}
              name="email"
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input 
              label={t('auth.partner.phone')}
              name="phone"
              placeholder="098..."
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Business License Upload (Hỗ trợ nhiều ảnh) (Vietnamese comment) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t('auth.partner.license')}
            </label>
            
            {/* Gallery hiển thị ảnh đã tải lên (Vietnamese comment) */}
            {formData.documentUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-3">
                {formData.documentUrls.map((url, index) => (
                  <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                    <img src={url} alt={`License ${index + 1}`} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className={`relative border-2 border-dashed rounded-2xl p-6 transition-all ${
              formData.documentUrls.length > 0 ? 'border-primary/20 bg-primary/5' : 'border-slate-200 hover:border-primary/40'
            }`}>
              <input 
                type="file" 
                id="doc-upload"
                className="hidden" 
                onChange={handleFileUpload}
                accept="image/*.jpg,image/jpeg,image/png"
                multiple
              />
              
              <label 
                htmlFor="doc-upload"
                className="flex flex-col items-center justify-center cursor-pointer gap-2"
              >
                {isUploading ? (
                  <Loader2 className="animate-spin text-primary" size={32} />
                ) : (
                  <Upload className="text-slate-400 group-hover:text-primary transition-colors" size={32} />
                )}
                
                <span className="text-xs font-bold text-slate-600">
                  {isUploading ? 'Uploading...' : t('auth.partner.uploadHint')}
                </span>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-base shadow-xl shadow-primary/20"
              isLoading={submitMutation.isPending}
              disabled={isUploading || formData.documentUrls.length === 0}
            >
              {t('auth.partner.submit')}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PartnerRequestModal;
