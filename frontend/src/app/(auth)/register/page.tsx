"use client";
import Link from 'next/link';
import { Upload } from 'lucide-react';

export default function RegisterScreen() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
        <p className="text-sm text-gray-600 mt-2">Join the VendorBridge network</p>
      </div>

      <form className="space-y-5">
        {/* Profile Photo Upload Placeholder */}
        <div className="flex justify-center mb-6">
          <label className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
            <Upload className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-[10px] text-gray-500">Upload</span>
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>

        {/* Role & Country */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option className="text-gray-900" value="">Select Role</option>
              <option className="text-gray-900" value="vendor">Vendor</option>
              <option className="text-gray-900" value="procurement_officer">Procurement Officer</option>
              <option className="text-gray-900" value="manager">Manager / Approver</option>
              <option className="text-gray-900" value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Information</label>
          <textarea rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
        </div>

        {/* Submit Button */}
        <button type="button" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Sign in
        </Link>
      </p>
    </div>
  );
}