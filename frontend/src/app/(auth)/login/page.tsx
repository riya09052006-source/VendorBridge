"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import Cookies from 'js-cookie';

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter(); 
  
  // The memory switch for the password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await apiClient.post('/auth/login/', {
        email: data.email, 
        password: data.password,
      });

      Cookies.set('access_token', response.data.access, { expires: 1 }); 
      if (response.data.refresh) {
         Cookies.set('refresh_token', response.data.refresh, { expires: 7 }); 
      }

      router.push('/dashboard');
      
    } catch (error: any) {
      console.error("Login failed:", error);
      const data = error.response?.data;
      if (data?.detail) {
        setApiError(data.detail);
      } else {
        setApiError("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
        <p className="text-slate-500 mt-2 text-sm">Please enter your details to sign in.</p>
      </div>

      {apiError && (
        <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-red-600 font-medium">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Email address</label>
          <input 
            type="email" 
            {...register("email")} 
            className={`block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'
            }`}
            placeholder="you@company.com"
          />
          {errors.email && <p className="text-red-500 font-medium text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <Link href="/forgot-password" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              {...register("password")} 
              className={`block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 pr-10 ${
                  errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-500 font-medium text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* Login Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
}