import React, { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '../../../config/routes.js';
import googleLogo from '../../../assets/logos/logo-google.png';
import { loginSchema } from '../schemas.js';

/**
 * @file LoginForm.jsx
 * @description Thành phần Form Đăng nhập của SeatNow.
 */
const LoginForm = ({ onSubmit, isLoading, onGoogleLogin, isGooglePending }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Identifier Input */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2" htmlFor="identifier">
          Email / Phone Number
        </label>
        <div className="relative group">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 group-focus-within:text-primary transition-colors text-xl">
            person
          </span>
          <input 
            {...register('identifier')}
            className={`w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 transition-all text-slate-900 placeholder:text-slate-300 font-bold outline-none text-sm ${
              errors.identifier ? 'focus:ring-red-500/20 bg-red-50/30' : 'focus:ring-primary/20'
            }`} 
            id="identifier" 
            placeholder="example@mail.com or 09..." 
            autoComplete="username"
          />
        </div>
        {errors.identifier && (
          <p className="text-red-500 text-[10px] font-bold px-2">{errors.identifier.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center px-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest" htmlFor="password">
            Password
          </label>
          <Link to={ROUTES.FORGOT_PASSWORD} className="text-primary text-[10px] font-bold uppercase tracking-wider hover:underline underline-offset-4 transition-all">
            Forgot Password?
          </Link>
        </div>
        <div className="relative group">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 group-focus-within:text-primary transition-colors text-xl">
            lock
          </span>
          <input 
            {...register('password')}
            className={`w-full pl-12 pr-12 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 transition-all text-slate-900 placeholder:text-slate-300 font-bold outline-none text-sm ${
              errors.password ? 'focus:ring-red-500/20 bg-red-50/30' : 'focus:ring-primary/20'
            }`} 
            id="password" 
            placeholder="••••••••" 
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
          />
          <button 
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors" 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-[10px] font-bold px-2">{errors.password.message}</p>
        )}
      </div>

      {/* Sign In Button */}
      <div className="pt-2">
        <button 
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-4 rounded-full transition-all duration-300 hover:bg-primary/90 active:scale-95 shadow-xl shadow-primary/20 text-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
          type="submit"
        >
          {isLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Processing...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="relative py-1 flex items-center">
        <div className="flex-grow border-t border-slate-100"></div>
        <span className="flex-shrink mx-4 text-slate-300 text-[10px] uppercase tracking-widest font-black italic">OR</span>
        <div className="flex-grow border-t border-slate-100"></div>
      </div>

      {/* Google Sign In */}
      <button 
        disabled={isGooglePending || isLoading}
        className="w-full flex items-center justify-center space-x-3 bg-white border border-slate-100 text-slate-500 font-bold py-3.5 rounded-full transition-all hover:bg-slate-50 active:scale-95 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed" 
        type="button"
        onClick={onGoogleLogin}
      >
        {isGooglePending ? (
          <span className="w-4 h-4 border-2 border-slate-200 border-t-primary rounded-full animate-spin"></span>
        ) : (
          <img 
            alt="Google" 
            className="w-4 h-4 object-contain" 
            src={googleLogo} 
          />
        )}
        <span className="text-xs">
          {isGooglePending ? 'Authenticating...' : 'Sign in with Google'}
        </span>
      </button>
    </form>
  );
};

export default LoginForm;
