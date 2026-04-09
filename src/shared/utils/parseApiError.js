/**
 * @file parseApiError.js
 * @description Chuẩn hoá Error và Success response từ API thành thông báo thân thiện với người dùng.
 */

/* ─────────────────────────────────────────────────────────
   TỪ ĐIỂN THÔNG BÁO — Error & Success Codes
   Bao gồm tất cả các mã BE trả về (SNAKE_UPPER_CASE).
───────────────────────────────────────────────────────── */
const MESSAGE_MAP = {
  // ── Auth ──
  'USER_NOT_FOUND':                   "We couldn't find an account with that phone number or email.",
  'INVALID_PASSWORD':                 "The password you entered is incorrect. Please try again.",
  'INVALID_CREDENTIALS':              "Invalid email/phone or password. Please try again.",
  'EMAIL_ALREADY_EXISTS':             "This email address is already in use by another account.",
  'PHONE_ALREADY_EXISTS':             "This phone number is already in use by another account.",
  'ACCOUNT_SUSPENDED':                "Your account has been suspended. Please contact support.",
  'ACCOUNT_NOT_FOUND':                "Account does not exist. Please check your phone number.",

  // ── OTP ──
  'OTP_INVALID':                      "The code you entered is incorrect. Please check and try again.",
  'OTP_INCORRECT':                    "The code you entered is incorrect. Please check and try again.",
  'OTP_EXPIRED':                      "This code has expired. Please request a new one.",
  'OTP_SENT':                         "A verification code has been sent to your email.",
  'OTP_VERIFIED':                     "Code verified successfully.",

  // ── Forgot Password ──
  'OTP_SENT_TO_EMAIL':                "Reset code sent! Please check your registered email.",
  'NEW_PASSWORD_SENT_TO_EMAIL':       "Done! A new password has been sent to your registered email. You can now sign in.",
  'RESET_OTP_SENT':                   "Reset code sent! Please check your registered email.",
  'PASSWORD_RESET_SUCCESS':           "Password reset successfully. Please check your email for the new password.",
  'INVALID_RESET_OTP':                "Invalid or expired reset code. Please try again.",

  // ── Change Password ──
  'PASSWORD_CHANGED_SUCCESSFULLY':    "Your password has been updated. Please sign in with your new password.",
  'OLD_PASSWORD_INCORRECT':           "Current password is incorrect. Please try again.",
  'PASSWORDS_DO_NOT_MATCH':           "Passwords do not match. Please check and try again.",

  // ── Registration ──
  'REGISTRATION_SUCCESS':             "Account created successfully! Welcome to SeatNow.",
  'REGISTRATION_PENDING_OTP':         "Account created! Please verify the OTP sent to your email.",

  // ── Permission ──
  'UNAUTHORIZED':                     "Your session has expired. Please sign in again.",
  'FORBIDDEN':                        "You don't have permission to perform this action.",
  'TOKEN_EXPIRED':                    "Your session has expired. Please sign in again.",

  // ── System ──
  'INTERNAL_SERVER_ERROR':            "A server error occurred. Our team has been notified.",
  'VALIDATION_ERROR':                 "Please check your input and try again.",
  'RATE_LIMIT_EXCEEDED':              "Too many requests. Please wait a moment and try again.",
  'MISSING_REQUIRED_FIELDS':          "Please fill in all required fields, including your business license.",
};

/* ─────────────────────────────────────────────────────────
   PARSE API ERROR
   Dùng trong onError callback của useMutation / useQuery.
───────────────────────────────────────────────────────── */
export const parseApiError = (error) => {
  const defaultMessage = 'Something went wrong. Please try again later.';

  // Log để debug (Vietnamese comment) *)
  const errorData = error.response?.data;
  console.group('🚀 API Error Details');
  console.error('Core Message:', errorData?.message || error.message);
  if (errorData?.errors) console.table(errorData.errors);
  console.log('Full Response:', errorData);
  console.groupEnd();

  if (!error.response) {
    return {
      message: error.message || defaultMessage,
      status: null,
      errors: null,
    };
  }

  const { data, status } = error.response;

  // Lấy raw message từ BE
  const rawMessage = data?.message || defaultMessage;

  // Map sang thông báo thân thiện, fallback về rawMessage nếu chưa có mapping
  let friendlyMessage = MESSAGE_MAP[rawMessage] || rawMessage;

  // Nếu có validation errors → gộp vào
  if (data?.errors && typeof data.errors === 'object') {
    const errorDetails = Object.values(data.errors).flat().join(', ');
    if (errorDetails) friendlyMessage = `${friendlyMessage}: ${errorDetails}`;
  }

  return {
    message: friendlyMessage,
    status,
    errors: data?.errors || null,
  };
};

/* ─────────────────────────────────────────────────────────
   PARSE API SUCCESS
   Dùng trong onSuccess callback — map các code thành text đẹp.
───────────────────────────────────────────────────────── */
export const parseApiSuccess = (response) => {
  const raw = response?.data?.message || response?.message || '';
  return MESSAGE_MAP[raw] || raw;
};
