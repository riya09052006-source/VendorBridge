"use client";
import { useState } from 'react';
import Link from 'next/link';
import { UserCircle2, Eye, EyeOff } from 'lucide-react';
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
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
        <p className="text-sm text-gray-600 mt-2">Sign in to your VendorBridge account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
             <UserCircle2 className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="email" 
            {...register("email")} 
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="enter your email"
          />
          {errors.email && <p className="text-red-600 font-bold text-xs mt-1.5">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Link href="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
          </div>
          
          {/* UPDATED: Password field with relative container and eye button */}
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              {...register("password")} 
              className={`mt-1 block w-full rounded-md border px-3 py-2 pr-10 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 mt-1"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-600 font-bold text-xs mt-1.5">{errors.password.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 transition-colors"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
          Register here
        </Link>
      </p>
    </div>
  );
}