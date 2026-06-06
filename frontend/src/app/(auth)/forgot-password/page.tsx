"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    console.log("Sending password reset link to:", data.email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Reset password</h2>
        <p className="text-slate-500 mt-2 text-sm">Enter your email and we&apos;ll send you a reset link.</p>
      </div>

      {!isSubmitted ? (
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

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
          >
            {isSubmitting ? "Sending link..." : "Send reset link"}
          </button>
        </form>
      ) : (
        /* Success Message UI */
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="flex justify-center mb-4">
             <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
             </div>
          </div>
          <h3 className="text-lg font-semibold text-emerald-900 mb-2">Check your inbox</h3>
          <p className="text-sm text-emerald-700 mb-6 leading-relaxed">
            We sent a password reset link to your email. Please check your spam folder if you don&apos;t see it.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            Try another email address
          </button>
        </div>
      )}

      {/* Back to Login Link */}
      <div className="mt-8">
        <Link href="/login" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to log in
        </Link>
      </div>
    </div>
  );
}