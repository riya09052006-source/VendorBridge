import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-8 sm:p-12 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-12">
        
        {/* Left Side: Branding / Welcome (Hidden on mobile) */}
        <div className="hidden md:flex flex-col justify-center w-1/2 border-r border-gray-200 pr-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">VendorBridge</h1>
          <p className="text-gray-600 text-lg">
            Streamlining procurement operations, vendor management, and unified RFQ tracking.
          </p>
        </div>

        {/* Right Side: The Dynamic Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {children}
        </div>

      </div>
    </div>
  );
}