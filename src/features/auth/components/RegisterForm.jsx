import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas.js';

/**
 * @file RegisterForm.jsx
 * @description Thành phần form đăng ký người dùng (Customer).
 */
const RegisterForm = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2" htmlFor="name">
            Full Name
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 group-focus-within:text-primary transition-colors text-xl">
              person
            </span>
            <input 
              {...register('name')}
              className={`w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 transition-all text-slate-900 placeholder:text-slate-300 font-bold outline-none text-sm ${
                errors.name ? 'focus:ring-red-500/20 bg-red-50/30' : 'focus:ring-primary/20'
              }`} 
              id="name" 
              placeholder="John Doe" 
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-[10px] font-bold px-2">{errors.name.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2" htmlFor="phone">
            Phone Number
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 group-focus-within:text-primary transition-colors text-xl">
              call
            </span>
            <input 
              {...register('phone')}
              className={`w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 transition-all text-slate-900 placeholder:text-slate-300 font-bold outline-none text-sm ${
                errors.phone ? 'focus:ring-red-500/20 bg-red-50/30' : 'focus:ring-primary/20'
              }`} 
              id="phone" 
              placeholder="091..." 
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-[10px] font-bold px-2">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2" htmlFor="email">
          Email Address
        </label>
        <div className="relative group">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 group-focus-within:text-primary transition-colors text-xl">
            mail
          </span>
          <input 
            {...register('email')}
            className={`w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 transition-all text-slate-900 placeholder:text-slate-300 font-bold outline-none text-sm ${
              errors.email ? 'focus:ring-red-500/20 bg-red-50/30' : 'focus:ring-primary/20'
            }`} 
            id="email" 
            placeholder="example@mail.com" 
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-[10px] font-bold px-2">{errors.email.message}</p>
        )}
      </div>

      {/* Password Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2" htmlFor="password">
            Password
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 group-focus-within:text-primary transition-colors text-xl">
              lock
            </span>
            <input 
              {...register('password')}
              className={`w-full pl-11 pr-10 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 transition-all text-slate-900 placeholder:text-slate-300 font-bold outline-none text-sm ${
                errors.password ? 'focus:ring-red-500/20 bg-red-50/30' : 'focus:ring-primary/20'
              }`} 
              id="password" 
              placeholder="••••••••" 
              type={showPassword ? "text" : "password"}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">
                {showPassword ? 'visibility' : 'visibility_off'}
              </span>
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-[10px] font-bold px-2 line-clamp-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2" htmlFor="confirmPassword">
            Confirm
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 group-focus-within:text-primary transition-colors text-xl">
              lock_reset
            </span>
            <input 
              {...register('confirmPassword')}
              className={`w-full pl-11 pr-10 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 transition-all text-slate-900 placeholder:text-slate-300 font-bold outline-none text-sm ${
                errors.confirmPassword ? 'focus:ring-red-500/20 bg-red-50/30' : 'focus:ring-primary/20'
              }`} 
              id="confirmPassword" 
              placeholder="••••••••" 
              type={showConfirmPassword ? "text" : "password"}
            />
            <button 
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">
                {showConfirmPassword ? 'visibility' : 'visibility_off'}
              </span>
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-[10px] font-bold px-2 line-clamp-1">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button 
        className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
            <span>Processing...</span>
          </>
        ) : (
          'Get Started'
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
