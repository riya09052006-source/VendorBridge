"use client";
import Link from 'next/link';
import { Upload } from 'lucide-react';

export default function RegisterScreen() {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create an account</h2>
        <p className="text-slate-500 mt-2 text-sm">Join the VendorBridge network to get started.</p>
      </div>

      <form className="space-y-5">
        {/* Profile Photo Upload Placeholder */}
        <div className="flex justify-center mb-2">
          <label className="flex flex-col items-center justify-center w-20 h-20 rounded-full border border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:bg-slate-100 hover:border-indigo-300 transition-all group">
            <Upload className="w-5 h-5 text-slate-400 mb-1 group-hover:text-indigo-500 transition-colors" />
            <span className="text-[10px] text-slate-500 font-medium group-hover:text-indigo-600">Upload</span>
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">First name</label>
            <input type="text" className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 bg-white transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-indigo-500 focus:ring-indigo-500/20" placeholder="John" />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Last name</label>
            <input type="text" className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 bg-white transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-indigo-500 focus:ring-indigo-500/20" placeholder="Doe" />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Email address</label>
            <input type="email" className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 bg-white transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-indigo-500 focus:ring-indigo-500/20" placeholder="you@company.com" />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Phone number</label>
            <input type="tel" className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 bg-white transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-indigo-500 focus:ring-indigo-500/20" placeholder="+1 (555) 000-0000" />
          </div>
        </div>

        {/* Role & Country */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Role</label>
            <select className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 bg-white transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-indigo-500 focus:ring-indigo-500/20 appearance-none">
              <option value="" disabled selected>Select a role</option>
              <option value="vendor">Vendor</option>
              <option value="procurement_officer">Procurement Officer</option>
              <option value="manager">Manager / Approver</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Country</label>
            <input type="text" className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 bg-white transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-indigo-500 focus:ring-indigo-500/20" placeholder="United States" />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input type="password" className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 bg-white transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-indigo-500 focus:ring-indigo-500/20" placeholder="Create a password (min. 8 chars)" />
        </div>

        {/* Submit Button */}
        <button type="button" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98]">
          Create account
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}