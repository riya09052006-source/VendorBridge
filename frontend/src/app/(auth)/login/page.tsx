"use client";
import Link from 'next/link';
import { UserCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

// 1. Define the strict validation rules using Zod
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

// Create a TypeScript type from our schema
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  // Add this line to initialize the router!
  const router = useRouter(); 

  // 2. Initialize the form hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // 3. The function that runs when the user clicks "Sign In"
  const onSubmit = async (data: LoginFormData) => {
    console.log("Data ready to send to Django:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Add this line to actually trigger the redirect!
    router.push('/dashboard');
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

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="email" 
            {...register("email")} 
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 ${
                errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="enter your email"
          />
          {errors.email && <p className="text-red-600 font-bold text-xs mt-1.5">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Link href="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
          </div>
          <input 
            type="password" 
            {...register("password")} 
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 ${
                errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-600 font-bold text-xs mt-1.5">{errors.password.message}</p>}
        </div>

        {/* Login Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none disabled:bg-blue-400 transition-colors"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
          Register here
        </Link>
      </p>
    </div>
  );
}