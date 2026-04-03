Hướng dẫn tích hợp OTP (One-Time Password) Authentication sử dụng Firebase Authentication vào ứng dụng ReactJS, bao gồm gửi SMS OTP và xác thực người dùng.

📋 Các bước triển khai chi tiết
1. Setup Firebase Project

Copy code
- Tạo project Firebase mới
- Bật Phone Authentication trong Authentication
- Cấu hình Phone numbers for testing (số test)
- Lấy Firebase config (apiKey, authDomain, projectId...)
2. Cài đặt Dependencies
bash

Copy code
npm install firebase
# hoặc
yarn add firebase
3. Khởi tạo Firebase trong React
javascript

Copy code
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "..."
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
4. Tạo UI Components
Phone Input Form
jsx

Copy code
function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  
  const sendOTP = async () => {
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container');
    await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    setShowOTP(true);
  }
}
OTP Verification Form
jsx

Copy code
function OTPVerification() {
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  
  const verifyOTP = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      console.log('User verified:', result.user);
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  }
}
5. Implement Full Authentication Flow
jsx

Copy code
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from 'firebase/auth';
import { useState, useRef, useEffect } from 'react';

function PhoneAuth() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: phone, 2: otp
  const [confirmationResult, setConfirmationResult] = useState(null);
  const recaptchaRef = useRef();

  // Bước 1: Gửi OTP
  const sendOTP = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        recaptchaRef.current,
        {
          size: 'invisible'
        },
        auth
      );
      
      const result = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier
      );
      
      setConfirmationResult(result);
      setStep(2);
    } catch (error) {
      console.error('Lỗi gửi OTP:', error);
    }
  };

  // Bước 2: Xác thực OTP
  const verifyOTP = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      console.log('Đăng nhập thành công:', result.user);
    } catch (error) {
      console.error('OTP không đúng:', error);
    }
  };

  return (
    <div>
      {step === 1 ? (
        <div>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại"
          />
          <div id="recaptcha-container" ref={recaptchaRef}></div>
          <button onClick={sendOTP}>Gửi OTP</button>
        </div>
      ) : (
        <div>
          <input 
            type="text" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Nhập mã OTP"
          />
          <button onClick={verifyOTP}>Xác thực</button>
        </div>
      )}
    </div>
  );
}
6. Xử lý các trường hợp đặc biệt
Auto-detect OTP (Android/iOS)
javascript

Copy code
// Trong useEffect
useEffect(() => {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container');
}, []);
Resend OTP
javascript

Copy code
const resendOTP = async () => {
  await sendOTP(); // Gọi lại hàm gửi OTP
};
Logout
javascript

Copy code
import { signOut } from 'firebase/auth';
await signOut(auth);
7. Error Handling

Copy code
Các lỗi thường gặp:
- auth/invalid-phone-number: Số ĐT không hợp lệ
- auth/code-expired: OTP hết hạn
- auth/invalid-verification-code: OTP sai
- auth/too-many-requests: Gửi quá nhiều OTP
8. Production Checklist

Copy code
✅ Cấu hình reCAPTCHA v3 (invisible)
✅ Giới hạn số lần gửi OTP
✅ Timeout cho OTP (10 phút mặc định)
✅ Test trên real device
✅ Xử lý network error
✅ UI loading states
🚀 Kết quả cuối cùng
✅ Giao diện đẹp với 2 bước (Phone → OTP)
✅ Tích hợp Firebase Phone Auth hoàn chỉnh
✅ Xử lý lỗi đầy đủ
✅ Responsive design
✅ Ready for production
Video duration: ~20-30 phút
Level: Beginner → Intermediate
Code hoàn chỉnh: Có trong description YouTube hoặc GitHub repo của tác giả

💡 Pro tip: Sử dụng react-phone-number-input library để validate số điện thoại quốc tế!




