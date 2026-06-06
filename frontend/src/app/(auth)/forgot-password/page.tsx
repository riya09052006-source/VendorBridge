"use client";
import { useState } from 'react';
import Link from 'next/link';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// 1. Define the validation rule (we only need email here)
const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  // We use this state to switch from the form to a success message
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
    // Simulate API call to Django
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Show the success message
    setIsSubmitted(true);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Reset Password</h2>
        <p className="text-sm text-gray-600 mt-2">Enter your email to receive a reset link</p>
      </div>

      {/* If not submitted, show the form. If submitted, show the success message. */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          
          {/* Key Icon Placeholder */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
               <KeyRound className="w-12 h-12 text-gray-400" />
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
              placeholder="enter your registered email"
            />
            {errors.email && <p className="text-red-600 font-bold text-xs mt-1.5">{errors.email.message}</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none disabled:bg-blue-400 transition-colors"
          >
            {isSubmitting ? "Sending Link..." : "Send Reset Link"}
          </button>
        </form>
      ) : (
        /* Success Message UI */
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-green-900 mb-2">Check your inbox</h3>
          <p className="text-sm text-green-700">
            We have sent a password reset link to your email address. Please check your spam folder if you don't see it.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Try another email address
          </button>
        </div>
      )}

      {/* Back to Login Link */}
      <div className="mt-8 text-center">
        <Link href="/login" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
        </Link>
      </div>
    </div>
  );
}