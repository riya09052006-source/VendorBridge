import Link from 'next/link';
import { ArrowRight, BarChart3, FileText, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500/30 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">VendorBridge</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="text-sm font-medium bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-transform hover:scale-105 active:scale-95 shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Abstract Glowing Background Orbs (Light Mode Adjusted) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-300/30 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-medium mb-4">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_5px_rgba(99,102,241,0.5)]"></span>
            VendorBridge 2.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-900">
            Revolutionize Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
              Procurement Workflow
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
            Connect buyers and suppliers seamlessly. Automate RFQs, compare quotations intelligently, and issue purchase orders with a single click.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-full font-semibold transition-all shadow-[0_8_30px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2 group hover:scale-105 active:scale-95">
              Start for free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-sm rounded-full font-medium transition-all flex items-center justify-center backdrop-blur-sm">
              View Dashboard
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-24 relative bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Everything you need to scale</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Built for modern enterprise procurement teams and ambitious vendors.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-[0_8_30px_rgba(99,102,241,0.1)] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-200 transition-all">
                <FileText className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Automated RFQs</h3>
              <p className="text-slate-600 leading-relaxed">Create and distribute Request for Quotations to multiple registered vendors instantly, skipping the messy email chains.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-[0_8_30px_rgba(59,130,246,0.1)] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-200 transition-all">
                <BarChart3 className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Smart Comparison</h3>
              <p className="text-slate-600 leading-relaxed">Intelligently compare incoming quotes side-by-side. Automatically highlight the most cost-effective and fastest decisions.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-cyan-300 hover:shadow-[0_8_30px_rgba(6,182,212,0.1)] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-200 transition-all">
                <ShieldCheck className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">One-Click POs</h3>
              <p className="text-slate-600 leading-relaxed">Convert approved quotations directly into secure, trackable Purchase Orders and generate automated Invoices instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center">
               <Zap className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <span className="font-semibold text-slate-700 tracking-wider">VENDORBRIDGE</span>
          </div>
          <p>© 2026 VendorBridge Inc. All rights reserved. Designed with precision.</p>
        </div>
      </footer>
    </div>
  );
}
