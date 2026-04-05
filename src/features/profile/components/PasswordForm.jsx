import React from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePasswordMutation } from '../../auth/hooks.js';
import { changePasswordSchema } from '../../auth/schemas.js';

/**
 * @file PasswordForm.jsx
 * @description Form thay đổi mật khẩu khách hàng với validation tương tự Login (React Hook Form + Zod).
 */
const PasswordForm = () => {
  const changePasswordMutation = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await changePasswordMutation.mutateAsync(data);
      toast.success("Password updated successfully!");
      reset(); // Xóa trắng form sau khi thành công
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to change password. Please check your current password.";
      toast.error(errorMsg);
    }
  };


  return (
    <div className="bg-white/50 backdrop-blur-sm p-10 rounded-[3rem] border-2 border-slate-200/60 shadow-soft h-full animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
           <span className="material-symbols-outlined text-primary">security</span>
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Security Settings</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Manage your digital identity</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
        {/* Current Password */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Current Password</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">lock_open</span>
            <input 
              {...register('oldPassword')}
              type="password"
              placeholder="Enter current password"
              className={`w-full bg-slate-50/50 border-2 rounded-3xl py-4 pl-14 pr-6 text-sm font-bold placeholder:text-slate-300 outline-none transition-all shadow-inner ${
                errors.oldPassword ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-100 focus:border-primary/20 focus:bg-white'
              }`}
            />
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 text-[10px] font-bold px-4">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New Password & Confirm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">New Password</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">lock</span>
                <input 
                  {...register('newPassword')}
                  type="password"
                  placeholder="At least 8 chars"
                  className={`w-full bg-slate-50/50 border-2 rounded-3xl py-4 pl-14 pr-6 text-sm font-bold placeholder:text-slate-300 outline-none transition-all shadow-inner ${
                    errors.newPassword ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-100 focus:border-primary/20 focus:bg-white'
                  }`}
                />
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-[10px] font-bold px-4 leading-tight">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Repeat New Password</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">verified_user</span>
                <input 
                  {...register('confirmPassword')}
                  type="password"
                  placeholder="Repeat new password"
                  className={`w-full bg-slate-50/50 border-2 rounded-3xl py-4 pl-14 pr-6 text-sm font-bold placeholder:text-slate-300 outline-none transition-all shadow-inner ${
                    errors.confirmPassword ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-100 focus:border-primary/20 focus:bg-white'
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-[10px] font-bold px-4 leading-tight">{errors.confirmPassword.message}</p>
              )}
            </div>
        </div>


        {/* Action Button */}
        <div className="pt-4">
          <button 
            type="submit"
            disabled={changePasswordMutation.isPending}
            className={`w-full md:w-fit px-12 py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3 ${changePasswordMutation.isPending ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-primary/30 hover:-translate-y-0.5'}`}
          >
            {changePasswordMutation.isPending ? (
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
            ) : (
              <span className="material-symbols-outlined text-[20px]">save</span>
            )}
            {changePasswordMutation.isPending ? 'UPDATING...' : 'UPDATE PASSWORD'}
          </button>
        </div>

      </form>

      {/* Safety Notice */}
      <div className="mt-12 p-6 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-start gap-4 h-fit">
         <span className="material-symbols-outlined text-amber-500">info</span>
         <p className="text-[11px] text-amber-700 font-bold leading-relaxed italic">
          To ensure the highest security, you should use a password with at least 8 characters, including letters, numbers, and special symbols. 
          <br/>
          Avoid using common passwords or information related to your date of birth.
         </p>
      </div>
    </div>
  );
};

export default PasswordForm;
