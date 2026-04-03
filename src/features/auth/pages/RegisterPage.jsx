import React, { useState } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../../config/routes.js';
import logo from '../../../assets/logos/logo.png';
import { normalizePhone } from '../../../shared/utils/normalizePhone.js';
import RegisterForm from '../components/RegisterForm.jsx';
import OtpForm from '../components/OtpForm.jsx';
import Modal from '../../../shared/ui/Modal.jsx';
import { useRegisterMutation, useSendOtpMutation } from '../hooks.js';
import { toast } from 'react-hot-toast';

/**
 * @file RegisterPage.jsx
 * @description Trang Đăng ký người dùng sử dụng Email OTP của Backend.
 */
const RegisterPage = () => {
  // --- State quản lý Popup OTP ---
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [pendingRegister, setPendingRegister] = useState(null); 
  const [isRedirecting, setIsRedirecting] = useState(false); // Trạng thái chờ chuyển hướng sau khi đăng ký thành công
  // --- Mutations ---
  const registerMutation = useRegisterMutation();
  const sendOtpMutation = useSendOtpMutation();

  // ========================================================
  // BƯỚC 1: Gửi OTP qua Email (Backend)
  // ========================================================
  const handleRegister = async (formData) => {
    // Lưu thông tin đăng ký tạm thời (đã chuẩn hóa phone)
    const normalizedData = {
      ...formData,
      phone: normalizePhone(formData.phone)
    };
    setPendingRegister(normalizedData);

    // Kích hoạt gửi OTP qua Email
    sendOtpMutation.mutate(
      { email: formData.email },
      {
        onSuccess: () => {
          setIsOtpOpen(true);
        }
      }
    );
  };

  // ========================================================
  // BƯỚC 2: Xác thực OTP và Hoàn tất Đăng ký (Lưu DB)
  // ========================================================
  const handleVerifyOtp = async (otpCode) => {
    if (!pendingRegister) return;

    // Gọi API đăng ký kèm mã OTP
    registerMutation.mutate(
      {
        ...pendingRegister,
        otp: otpCode,
      },
      {
        onSuccess: () => {
          setIsRedirecting(true); // Bắt đầu trạng thái chuyển hướng
          setIsOtpOpen(false); // Đóng Modal OTP
        }
      }
    );
  };

  const handleResendOtp = () => {
    if (!pendingRegister) return;
    sendOtpMutation.mutate({ email: pendingRegister.email });
  };

  const handleCloseOtp = () => {
    if (registerMutation.isPending || sendOtpMutation.isPending) return;
    setIsOtpOpen(false);
  };

  return (
    <>
      <div className="w-full max-w-[540px] mx-auto bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 ambient-shadow border border-white/40 shadow-2xl my-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center transform rotate-12 shadow-lg shadow-primary/20 mr-3">
              <img src={logo} alt="SeatNow" className="w-6 h-6 object-contain" />
            </div>
            <h1 className="text-3xl font-black text-primary tracking-tighter headline">SeatNow</h1>
          </div>
          <h2 className="text-2xl font-headline font-bold text-slate-900 mb-2">Create an Account</h2>
          <p className="text-slate-500 font-medium text-sm">Join us to discover and book the best tables</p>
        </div>

        <div className="space-y-6">
          <RegisterForm 
            onSubmit={handleRegister} 
            isLoading={sendOtpMutation.isPending || registerMutation.isPending || isRedirecting} 
          />
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-xs font-medium">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="text-primary font-bold hover:underline underline-offset-4 transition-all">Sign In</Link>
          </p>
        </div>
      </div>

      <Modal 
        isOpen={isOtpOpen} 
        onClose={handleCloseOtp} 
        closable={!registerMutation.isPending && !sendOtpMutation.isPending}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">mail</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">Verify Your Email</h3>
          <p className="text-slate-500 text-sm px-4">
            Enter the 6-digit code sent to<br/>
            <span className="font-bold text-slate-700 break-all">{pendingRegister?.email}</span>
          </p>
        </div>

        <OtpForm
          onSubmit={handleVerifyOtp}
          onResend={handleResendOtp}
          isLoading={registerMutation.isPending || isRedirecting}
          isResending={sendOtpMutation.isPending}
        />
        
        <p className="mt-4 text-center text-slate-400 text-[11px] px-6">
          Didn't receive a code? Please check your spam folder or wait 60s to resend.
        </p>
      </Modal>
    </>
  );
};

export default RegisterPage;
