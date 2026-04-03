import React from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../../config/routes.js';
import logo from '../../../assets/logos/logo.png';
import { useLoginMutation, useGoogleLoginMutation } from '../hooks.js';
import LoginForm from '../components/LoginForm.jsx';

/**
 * @file LoginPage.jsx
 * @description Trang Đăng nhập của SeatNow. Sử dụng LoginForm component.
 */
const LoginPage = () => {
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  const loginMutation = useLoginMutation();
  const { loginWithGoogle, isPending: isGooglePending } = useGoogleLoginMutation();

  const handleLogin = (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => setIsRedirecting(true),
    });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle('popup', {
      onSuccess: () => setIsRedirecting(true),
    });
  };

  return (
    <div className="w-full max-w-[500px] mx-auto bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 ambient-shadow border border-white/40 shadow-2xl">
      {/* Brand & Welcome Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center mb-6">
          <div className="bg-primary p-2 rounded-xl flex items-center justify-center transform rotate-12 shadow-lg shadow-primary/20 mr-4">
            <img src={logo} alt="SeatNow" className="w-7 h-7 object-contain" />
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tighter headline">SeatNow</h1>
        </div>
        <h2 className="text-2xl font-headline font-bold text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-slate-500 font-medium text-sm">Please enter your details to sign in</p>
      </div>

      {/* Login Form Component */}
      <LoginForm 
        onSubmit={handleLogin} 
        isLoading={loginMutation.isPending || isRedirecting}
        onGoogleLogin={handleGoogleLogin}
        isGooglePending={isGooglePending}
      />

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
          Don't have an account? 
          <Link to={ROUTES.REGISTER} className="text-primary font-black hover:underline underline-offset-4 transition-all ml-2 underline decoration-primary/20">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
