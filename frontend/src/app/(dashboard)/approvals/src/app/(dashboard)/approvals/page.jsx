"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Page() 
{
  const [remarks, setRemarks] = useState("");

  const handleAction = (action) => {
    alert(`Quotation ${action} successfully! Remarks: ${remarks}`);
    setRemarks("");
  };

  return (
    <div className="flex min-h-screen bg-[#111111] text-gray-300 font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-gray-800 p-6 flex flex-col gap-6 shrink-0">
        <div className="text-xl tracking-wide font-medium border border-gray-700 rounded-full py-2 px-4 text-center text-white mb-4">
          VendorBridge
        </div>
        <nav className="flex flex-col gap-1">
          {["Dashboard", "Vendors", "RFQ's", "Quotations"].map((navItem) => (
            <Link key={navItem} href="#" className="py-3 px-4 text-gray-400 hover:text-white transition-colors">
              - {navItem}
            </Link>
          ))}
          {/* Active State */}
          <Link href="#" className="py-3 px-4 text-green-500 border border-green-900 bg-green-950/20 rounded-lg font-medium">
            - Approvals
          </Link>
          {["Purchase orders", "Invoices", "Reports", "Activity"].map((navItem) => (
            <Link key={navItem} href="#" className="py-3 px-4 text-gray-400 hover:text-white transition-colors">
              - {navItem}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 p-10 max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl text-white font-medium mb-3 tracking-wide">
            Approval Workflow
          </h1>
          <p className="text-gray-400 text-lg">
            RFQ: office furniture Q2 - Vendor: Infra Supplies - 185400
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="mb-12 relative">
          <div className="absolute top-4 left-8 right-8 h-[1px] bg-gray-700 z-0"></div>
          <div className="relative z-10 flex justify-between">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-gray-500 bg-[#111] flex items-center justify-center text-gray-300 text-sm">1</div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Submitted</span>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-gray-500 bg-[#111] flex items-center justify-center text-gray-300 text-sm">2</div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">L1 Review</span>
            </div>
            {/* Step 3 (Active) */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-blue-500 bg-[#111] flex items-center justify-center text-blue-400 text-sm">3</div>
              <span className="text-xs text-blue-400 uppercase tracking-wider">L2 approval</span>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-gray-700 bg-[#111] flex items-center justify-center text-gray-600 text-sm">4</div>
              <span className="text-xs text-gray-600 uppercase tracking-wider">Generate PO</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Chain & Remarks */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Approval Chain</h3>
              <div className="space-y-6">
                
                {/* L1 Approver */}
                <div className="flex gap-4 items-start border-b border-gray-800 pb-6">
                  {/* Inline Check SVG */}
                  <svg className="w-8 h-8 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-200">
                      <span className="font-medium text-white">Rahul Mehta</span> (Procurement head)
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Approved on may 20, 10:32 Am</p>
                  </div>
                </div>
                
                {/* L2 Approver (Pending) */}
                <div className="flex gap-4 items-start border-b border-gray-800 pb-6">
                  {/* Inline Clock SVG */}
                  <svg className="w-8 h-8 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-200">
                      <span className="font-medium text-white">Priya Shah</span> (finance manager)
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Awaiting</p>
                    <p className="text-sm text-gray-600 mt-0.5">Assigned may 21</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Remarks Input */}
            <div>
              <h3 className="text-sm text-gray-400 mb-3">Approval Remarks</h3>
              <textarea
                className="w-full h-32 bg-transparent border border-gray-700 rounded-xl p-4 text-white outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-gray-600"
                placeholder="Add your comments or conditions...."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </div>

          {/* Right Column: Summary & Buttons */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Quotations Summary</h3>
            
            {/* Data Card */}
            <div className="border border-gray-700 rounded-xl p-6 bg-[#161616] mb-8 space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-gray-500">Vendor:</span>
                <span className="text-gray-200">Infra Supplies PVT LTD</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-gray-500">Total:</span>
                <span className="text-[#fca5a5] font-mono text-lg">1,85,400</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-gray-500">Delivery:</span>
                <span className="text-gray-200">10 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Rating:</span>
                <span className="text-gray-200">4.5/5</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => handleAction("Approved")}
                className="flex-1 py-3 px-4 border border-gray-500 text-gray-200 rounded-lg hover:bg-white hover:text-black transition-colors font-medium"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction("Rejected")}
                className="flex-1 py-3 px-4 border border-gray-700 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-colors font-medium"
              >
                Reject
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

