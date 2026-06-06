"use client";
import Link from 'next/link';
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
    router.push('/dashboard');
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
        <p className="text-slate-500 mt-2 text-sm">Please enter your details to sign in.</p>
      </div>

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
          <input 
            type="password" 
            {...register("password")} 
            className={`block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'
            }`}
            placeholder="••••••••"
          />
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