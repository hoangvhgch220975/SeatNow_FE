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

/**
 * @description Tìm kiếm Token và User một cách linh hoạt trong dữ liệu trả về của API.
 * Hỗ trợ bóc tách từ lớp ngoài hoặc lớp data lồng nhau.
 */
const extractTokenAndUser = (response) => {
  const root = response.data || response;
  
  // Danh sách các trường có thể chứa token (bao gồm cả lồng nhau)
  const tokenCandidates = [
    root.accessToken, root.token, root.access_token,
    root.data?.accessToken, root.data?.token, root.data?.access_token,
    root.userData?.token, root.userData?.accessToken
  ];
  
  let rawToken = tokenCandidates.find(t => !!t);

  // NẾU TOKEN LÀ OBJECT HOẶC JSON STRING: Bóc tiếp lớp bên trong
  const unwrap = (val) => {
    if (!val) return val;
    if (typeof val === 'object') {
        return val.token || val.accessToken || val.access_token || JSON.stringify(val);
    }
    if (typeof val === 'string' && val.trim().startsWith('{')) {
        try {
            const p = JSON.parse(val);
            return p.token || p.accessToken || p.access_token || p.refreshToken || p.refresh_token || val;
        } catch(e) { return val; }
    }
    return val;
  };

  rawToken = unwrap(rawToken);

  // CHUẨN HÓA: Cắt bỏ "Bearer " nếu có
  if (typeof rawToken === 'string') {
    rawToken = rawToken.replace(/^Bearer\s+/i, '').trim();
  }
  
  // User extraction
  const userCandidates = [
    root.user, root.data?.user, root.profile, root.data?.profile, root.userData?.user
  ];

  // Refresh token extraction
  const refreshCandidates = [
    root.refreshToken, root.refresh_token, root.data?.refreshToken, root.data?.refresh_token
  ];

  let rawRefreshToken = unwrap(refreshCandidates.find(r => !!r));

  return {
    user: userCandidates.find(u => !!u) || root,
    token: typeof rawToken === 'string' ? rawToken : null,
    refreshToken: typeof rawRefreshToken === 'string' ? rawRefreshToken : null
  };
};

// ============================================================
// ĐĂNG NHẬP
// ============================================================
export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (response) => {
      const { user, token, refreshToken } = extractTokenAndUser(response);
      
      if (token) {
        setAuth(user, token, refreshToken);
      }
      
      // Delay 1.5s trước khi thông báo và chuyển trang
      setTimeout(() => {
        const displayName = user?.fullName || user?.name || 'User';
        toast.success(response.message || `Welcome back, ${displayName}!`, { duration: 1000 });
        navigate('/');
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
      const { user, token, refreshToken } = extractTokenAndUser(response);
      
      if (token) {
        setAuth(user, token, refreshToken);
      }
      
      setTimeout(() => {
        const displayName = user?.fullName || user?.name || 'User';
        toast.success(response.message || `Welcome, ${displayName}!`, { duration: 1000 });
        navigate('/');
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
export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (formData) => authApi.register(formData),
    onSuccess: (response) => {
      // Backend trả về token + user sau khi đăng ký thành công kèm OTP
      const { user, token, refreshToken } = extractTokenAndUser(response);
      
      if (user && token) {
        setAuth(user, token, refreshToken);
        
        setTimeout(() => {
          const displayName = user?.fullName || user?.name || 'User';
          toast.success(`🎉 Welcome ${displayName}! Your account has been created successfully.`, { duration: 1000 });
          navigate('/');
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
export const useVerifyOtpMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (payload) => authApi.verifyOtp(payload),
    onSuccess: (response) => {
      // Backend trả về token + user sau khi tạo tài khoản thành công
      const { user, token, refreshToken } = extractTokenAndUser(response);

      if (user && token) {
        // Nếu BE trả về token ngay sau verify -> tự động đăng nhập
        setAuth(user, token, refreshToken);
        
        // Delay 1.5s trước khi thông báo và chuyển trang
        setTimeout(() => {
          const displayName = user?.fullName || user?.name || 'User';
          toast.success(`🎉 Welcome ${displayName}! Your account has been created successfully.`, { duration: 1000 });
          navigate('/');
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
