"use client";

import React, { useState } from "react";
import Link from "next/link";

const Page = () =>
 {
  // --- STATE ---
  const [activeFilter, setActiveFilter] = useState("All");

  // --- MOCK DATA ---
  const logs = [
    {
      id: 1,
      category: "Quotations",
      text: "Quotation selected - Infra supplies pvt ltd selected for office furniture Q2",
      date: "23 may 2025, 9:15 PM",
      iconType: "check",
    },
    {
      id: 2,
      category: "Approvals",
      text: "Approval pending - PO-2024 awaiting L2 approval by priya shah",
      date: "22 may 2025, 09:15 AM",
      iconType: "clock",
    },
    {
      id: 3,
      category: "RFQ",
      text: "RFQ published - office furniture Q2 sent to 3 vendors",
      date: "19 may 2025",
      iconType: "document",
    },
    {
      id: 4,
      category: "Vendors",
      text: "Vendor added - FastLog transport registered and pending verifications",
      date: "18 may, 2025, 3:20 PM",
      iconType: "user",
    },
  ];

  const filters = ["All", "RFQ", "Approvals", "Invoices", "Vendors", "Quotations"];

  // Filter Logic
  const filteredLogs = activeFilter === "All" 
    ? logs 
    : logs.filter(log => log.category === activeFilter);

  // Helper function to render the correct SVG icon
  const renderIcon = (type) => {
    switch (type) {
      case "check":
        return (
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "clock":
        return (
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "document":
        return (
          <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "user":
        return (
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#111111] text-gray-300 font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-gray-800 p-6 flex flex-col gap-6 shrink-0">
        <div className="text-xl tracking-wide font-medium border border-gray-700 rounded-full py-2 px-4 text-center text-white mb-4">
          VendorBridge
        </div>
        <nav className="flex flex-col gap-1">
          {["Dashboard", "Vendors", "RFQ's", "Quotations", "Approvals", "Purchase orders", "Invoices", "Reports"].map((navItem) => (
            <Link key={navItem} href="#" className="py-3 px-4 text-gray-400 hover:text-white transition-colors">
              - {navItem}
            </Link>
          ))}
          {/* Active State */}
          <Link href="#" className="py-3 px-4 text-green-500 border border-green-900 bg-green-950/20 rounded-lg font-medium">
            - Activity
          </Link>
        </nav>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 p-10 max-w-6xl grid grid-cols-1 xl:grid-cols-3 gap-12">
        
        {/* Left/Center Column: Activity Feed */}
        <div className="xl:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl text-white font-medium mb-2 tracking-wide">
              Activity & Logs
            </h1>
            <p className="text-gray-400 text-lg">
              Procurement audit trail
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  activeFilter === filter
                    ? "bg-blue-900/30 text-blue-400 border-blue-800"
                    : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Activity Log List */}
          <div className="space-y-2">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <div key={log.id} className="flex gap-5 items-center border-b border-gray-800 py-6 last:border-0 hover:bg-[#161616] transition-colors rounded-lg px-2">
                  <div className="w-12 h-12 rounded-full border border-gray-700 bg-[#1a1a1a] flex items-center justify-center shrink-0">
                    {renderIcon(log.iconType)}
                  </div>
                  <div>
                    <p className="text-gray-200 font-medium leading-relaxed mb-1">
                      {log.text}
                    </p>
                    <p className="text-sm text-gray-500">
                      {log.date}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-gray-500 border border-dashed border-gray-800 rounded-xl">
                No logs found for the "{activeFilter}" category.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Security/Admin Notice (From Wireframe) */}
        <div className="hidden xl:block">
          <div className="border border-gray-700 bg-[#161616] rounded-xl p-6 sticky top-10">
            <h3 className="text-gray-300 font-medium mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              System Note
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Audit logs must be immutable. These entries must be write-once, no edit or delete. Make sure your DB schema reflects this (no soft-delete on log records).
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Page;