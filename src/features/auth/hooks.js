import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { auth, googleProvider } from '../../lib/firebase.js';
import { signInWithRedirect, getRedirectResult, signInWithPopup } from 'firebase/auth';
import { authApi } from './api.js';
import { useAuthStore } from './store.js';
import { toast } from 'react-hot-toast';
import { parseApiError, parseApiSuccess } from '../../shared/utils/parseApiError.js'; // Import helper xử lý lỗi/thành công API

/**
 * @file hooks.js
 * @description Hook quản lý logic xác thực, tích hợp React Query.
 */

// ============================================================
// ĐĂNG NHẬP
// ============================================================
export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (response) => {
      const { user, accessToken } = response.data || response;
      setAuth(user, accessToken);
      
      // Delay 1.5s trước khi thông báo và chuyển trang
      setTimeout(() => {
        const displayName = user?.fullName || user?.name || 'User';
        toast.success(response.message || `Welcome back, ${displayName}!`, { duration: 1000 });
        navigate('/customer/dashboard');
      }, 1500);
    },
    onError: (error) => {
      // Bóc tách thông báo lỗi thông qua bộ dịch parseApiError
      const { message: msg } = parseApiError(error);
      toast.error(msg || 'Login failed. Please try again!');
    },
  });
};

// ============================================================
// ĐĂNG NHẬP GOOGLE
// ============================================================
export const useGoogleLoginMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);

  const mutation = useMutation({
    mutationFn: (idToken) => authApi.googleSignIn(idToken),
    onSuccess: (response) => {
      const { user, accessToken } = response.data || response;
      setAuth(user, accessToken);
      
      setTimeout(() => {
        const displayName = user?.fullName || user?.name || 'User';
        toast.success(response.message || `Welcome, ${displayName}!`, { duration: 1000 });
        navigate('/customer/dashboard');
      }, 1500);
    },
    onError: (error) => {
      const { message: msg } = parseApiError(error);
      toast.error(msg || 'Google authentication failed with the system!');
    },
  });

  const loginWithGoogle = async (method = 'popup', options = {}) => {
    try {
      if (method === 'redirect') {
        await signInWithRedirect(auth, googleProvider);
      } else {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        mutation.mutate(idToken, options);
      }
    } catch (error) {
      toast.error('Could not connect to Google: ' + error.message);
    }
  };

  return {
    ...mutation,
    loginWithGoogle,
  };
};

// ============================================================
// LẮNG NGHE KẾT QUẢ REDIRECT GOOGLE
// ============================================================
export const useHandleGoogleRedirect = () => {
  const gMutation = useGoogleLoginMutation();

  const handleRedirect = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        const idToken = await result.user.getIdToken();
        gMutation.mutate(idToken);
      }
    } catch (error) {
      console.error('Redirect Error:', error);
    }
  };

  return { handleRedirect, isPending: gMutation.isPending };
};

// ============================================================
// ĐĂNG KÝ - BƯỚC 1: GỬI FORM & KÍCH HOẠT OTP
// ============================================================
/**
 * Hook gửi thông tin đăng ký và yêu cầu OTP từ Backend.
 * Khi thành công: Backend đã ghi dữ liệu tạm và gửi OTP qua Firebase.
 * Callback onSuccess nhận về { email, phone } để truyền cho bước verify.
 */
export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (formData) => authApi.register(formData),
    onSuccess: (response) => {
      // Backend trả về token + user sau khi đăng ký thành công kèm OTP
      const { user, accessToken } = response.data || response;
      
      if (user && accessToken) {
        setAuth(user, accessToken);
        
        setTimeout(() => {
          const displayName = user?.fullName || user?.name || 'User';
          toast.success(`🎉 Welcome ${displayName}! Your account has been created successfully.`, { duration: 1000 });
          navigate('/customer/dashboard');
        }, 1500);
      } else {
        setTimeout(() => {
          toast.success('Registration successful! Please log in to continue.', { duration: 1000 });
          navigate('/login');
        }, 1500);
      }
    },
    onError: (error) => {
      // In lỗi ra Console để hỗ trợ debug thực tế
      console.error('Registration API Error:', error.response?.data || error);

      // Bóc tách thông báo lỗi từ Backend
      const { message: msg } = parseApiError(error);

      // Hiển thị thông báo lỗi chi tiết cho người dùng
      toast.error(msg || 'Registration failed. Please try again.');
    },
  });
};

// ============================================================
// ĐĂNG KÝ - BƯỚC 2: XÁC THỰC OTP
// ============================================================
/**
 * Hook xác thực mã OTP sau khi đăng ký.
 * Khi OTP hợp lệ: Backend tạo tài khoản chính thức và trả về token.
 */
export const useVerifyOtpMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (payload) => authApi.verifyOtp(payload),
    onSuccess: (response) => {
      // Backend trả về token + user sau khi tạo tài khoản thành công
      const { user, accessToken } = response.data || response;

      if (user && accessToken) {
        // Nếu BE trả về token ngay sau verify -> tự động đăng nhập
        setAuth(user, accessToken);
        
        // Delay 1.5s trước khi thông báo và chuyển trang
        setTimeout(() => {
          const displayName = user?.fullName || user?.name || 'User';
          toast.success(`🎉 Welcome ${displayName}! Your account has been created successfully.`, { duration: 1000 });
          navigate('/customer/dashboard');
        }, 1500);
      } else {
        // Nếu BE chỉ verify và chưa trả token -> thông báo và chuyển tới login
        setTimeout(() => {
          toast.success('Authentication successful! Please log in to continue.', { duration: 1000 });
          navigate('/login');
        }, 1500);
      }
    },
    onError: (error) => {
      const { message: msg } = parseApiError(error);
      toast.error(msg || 'Invalid or expired OTP code. Please try again.');
    },
  });
};

// ============================================================
// GỬI LẠI OTP
// ============================================================
export const useSendOtpMutation = () => {
  return useMutation({
    mutationFn: (payload) => authApi.sendOtp(payload),
    onSuccess: () => {
      toast.success('A new OTP code has been sent!');
    },
    onError: (error) => {
      const { message: msg } = parseApiError(error);
      toast.error(msg || 'Could not resend the code. Please try again later.');
    },
  });
};

// ============================================================
// QUÊN MẬT KHẨU - BƯỚC 1: GỬI YÊU CẦU OTP
// ============================================================
/**
 * Gửi OTP về email liên kết với số điện thoại.
 * onSuccess callback nhận về response để trang có thể chuyển bước.
 */
export const useForgotPasswordRequestMutation = () => {
  return useMutation({
    mutationFn: (payload) => authApi.forgotPasswordRequest(payload),
    onSuccess: (response) => {
      const msg = parseApiSuccess(response);
      toast.success(msg || 'Reset code sent! Check your registered email.');
    },
    onError: (error) => {
      const { message: msg } = parseApiError(error);
      toast.error(msg || 'Could not find an account with this phone number.');
    },
  });
};

// ============================================================
// QUÊN MẬT KHẨU - BƯỚC 2: XÁC THỰC OTP & ĐẶT LẠI MẬT KHẨU
// ============================================================
/**
 * Xác thực OTP và kích hoạt tạo mật khẩu mới.
 * Sau khi thành công, chuyển hướng người dùng về trang đăng nhập.
 */
export const useForgotPasswordResetMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload) => authApi.forgotPasswordReset(payload),
    onSuccess: (response) => {
      const msg = parseApiSuccess(response);
      toast.success(msg || 'Password reset successfully! Check your email for the new password.', {
        duration: 5000,
      });
      setTimeout(() => navigate('/login'), 2500);
    },
    onError: (error) => {
      const { message: msg } = parseApiError(error);
      toast.error(msg || 'Invalid or expired OTP. Please try again.');
    },
  });
};
