import React from 'react';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex font-sans bg-white">
      {/* Left Side: Branding / Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-50 border-r border-slate-200 overflow-hidden flex-col justify-between p-12">
        {/* Abstract subtle background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-300 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-900 hover:opacity-80 transition-opacity">
              VendorBridge
            </Link>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
            Seamlessly connect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              buyers and suppliers.
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-md leading-relaxed">
            Streamlining procurement operations, vendor management, and unified RFQ tracking into one intelligent platform.
          </p>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          © {new Date().getFullYear()} VendorBridge Inc. All rights reserved.
        </div>
      </div>

      {/* Right Side: Dynamic Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
         {/* Mobile Logo Header */}
         <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
              VendorBridge
            </Link>
         </div>

         <div className="w-full max-w-md">
            {children}
         </div>
      </div>
    </div>
  );
}