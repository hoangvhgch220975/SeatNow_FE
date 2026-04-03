import React, { useState, useRef, useEffect } from 'react';

/**
 * @file OtpForm.jsx
 * @description Form nhập mã OTP gồm 6 ô số riêng biệt.
 * Hỗ trợ: auto-focus, paste mã, đếm ngược gửi lại, trạng thái loading.
 * @param {function} onSubmit - Hàm gọi khi submit, nhận (otpString)
 * @param {function} onResend - Hàm gửi lại mã OTP
 * @param {boolean} isLoading - Đang xử lý
 * @param {boolean} isResending - Đang gửi lại mã
 * @param {string} [hint] - Gợi ý SĐT/Email đã gửi tới
 */
const OTP_LENGTH = 6;

const OtpForm = ({ onSubmit, onResend, isLoading, isResending, hint }) => {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);

  // --- Đếm ngược Resend ---
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Reset countdown khi resend
  const handleResend = () => {
    if (countdown > 0 || isResending) return;
    setCountdown(60);
    setDigits(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
    onResend();
  };

  // --- Xử lý thay đổi ô nhập ---
  const handleChange = (index, value) => {
    // Chỉ nhận số
    const digit = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);

    // Tự động chuyển sang ô tiếp theo
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit khi điền đủ 6 số
    if (newDigits.every((d) => d !== '') && newDigits.join('').length === OTP_LENGTH) {
      onSubmit(newDigits.join(''));
    }
  };

  // --- Xử lý phím bấm (Backspace, Arrow) ---
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // --- Xử lý Paste ---
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const newDigits = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((char, i) => {
      newDigits[i] = char;
    });
    setDigits(newDigits);
    // Focus vào ô cuối cùng được điền
    const lastFilledIndex = Math.min(pasted.length - 1, OTP_LENGTH - 1);
    inputRefs.current[lastFilledIndex]?.focus();

    // Auto-submit nếu paste đủ 6 số
    if (pasted.length === OTP_LENGTH) {
      onSubmit(pasted);
    }
  };

  // --- Submit thủ công ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = digits.join('');
    if (otp.length === OTP_LENGTH) {
      onSubmit(otp);
    }
  };

  const otpValue = digits.join('');
  const isComplete = otpValue.length === OTP_LENGTH;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Gợi ý gửi tới đâu */}
      {hint && (
        <p className="text-center text-slate-500 text-sm">
          Code sent to{' '}
          <span className="font-bold text-slate-700">{hint}</span>
        </p>
      )}

      {/* 6 ô số */}
      <div className="flex gap-2.5 justify-center" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-11 h-14 text-center text-xl font-black rounded-xl border-2 outline-none
                       transition-all duration-150
                       ${digit ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 bg-slate-50 text-slate-900'}
                       focus:border-primary focus:ring-2 focus:ring-primary/20
                       disabled:opacity-50`}
            disabled={isLoading}
            aria-label={`OTP digit ${index + 1}`}
            id={`otp-digit-${index}`}
            autoComplete="one-time-code"
          />
        ))}
      </div>

      {/* Nút xác nhận */}
      <button
        type="submit"
        disabled={!isComplete || isLoading}
        className="w-full bg-primary text-white font-bold py-3.5 rounded-xl
                   shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all
                   active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
            Verifying...
          </span>
        ) : (
          'Verify Code'
        )}
      </button>

      {/* Gửi lại mã */}
      <div className="text-center">
        {countdown > 0 ? (
          <p className="text-slate-400 text-xs font-medium">
            Resend code in{' '}
            <span className="text-primary font-bold tabular-nums">{countdown}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-primary text-xs font-bold hover:underline underline-offset-4
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isResending ? 'Sending...' : 'Resend OTP'}
          </button>
        )}
      </div>
    </form>
  );
};

export default OtpForm;
