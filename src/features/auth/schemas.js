import { z } from 'zod';

/**
 * @file schemas.js
 * @description Định nghĩa các Schema validation bằng Zod cho module Auth.
 */

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Please enter Email or Phone Number'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(0|\+84)[0-9]{9,11}$/, 'Invalid phone number (e.g. 0912345678 or +84912345678)'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Please enter your current password'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
  confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords do not match",
  path: ["confirmPassword"],
});
