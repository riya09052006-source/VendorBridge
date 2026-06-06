"use client";
import Link from 'next/link';
import { UserCircle2 } from 'lucide-react';

export default function LoginScreen() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
        <p className="text-sm text-gray-600 mt-2">Sign in to your VendorBridge account</p>
      </div>

      <form className="space-y-6">
        {/* Profile Avatar Placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
             <UserCircle2 className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        {/* Username / Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username or Email</label>
          <input 
            type="text" 
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
            placeholder="Enter your username"
          />
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Link href="#" className="text-xs font-medium text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
          </div>
          <input 
            type="password" 
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
            placeholder="••••••••"
          />
        </div>

        {/* Login Button */}
        <button 
          type="button" 
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-colors"
        >
          Sign In
        </button>
      </form>

      {/* Toggle to Registration */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
          Register here
        </Link>
      </p>
    </div>
  );
}