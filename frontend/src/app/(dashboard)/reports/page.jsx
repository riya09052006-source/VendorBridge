"use client";

import React from "react";
import Link from "next/link";

const Page = () => 
{
  const handleExport = () => {
    alert("Exporting Procurement Insights report for May 2025...");
  };

  return (
    <div className="flex min-h-screen bg-[#111111] text-gray-300 font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-gray-800 p-6 flex flex-col gap-6 shrink-0">
        <div className="text-xl tracking-wide font-medium border border-gray-700 rounded-full py-2 px-4 text-center text-white mb-4">
          VendorBridge
        </div>
        <nav className="flex flex-col gap-1">
          {["Dashboard", "Vendors", "RFQ's", "Quotations", "Approvals", "Purchase orders", "Invoices"].map((navItem) => (
            <Link key={navItem} href="#" className="py-3 px-4 text-gray-400 hover:text-white transition-colors">
              - {navItem}
            </Link>
          ))}
          {/* Active State */}
          <Link href="#" className="py-3 px-4 text-green-500 border border-green-900 bg-green-950/20 rounded-lg font-medium">
            - Reports
          </Link>
          <Link href="#" className="py-3 px-4 text-gray-400 hover:text-white transition-colors">
            - Activity
          </Link>
        </nav>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 p-10 max-w-6xl">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl text-white font-medium mb-2 tracking-wide">
              Reports & analytics
            </h1>
            <p className="text-gray-400 text-lg">
              Procurement Insights- may 2025
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
              May 2025
            </button>
            <button 
              onClick={handleExport}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Export
            </button>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {/* Card 1 */}
          <div className="border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center bg-[#161616]">
            <span className="text-3xl font-medium text-blue-400 mb-2">12.4 L</span>
            <span className="text-sm text-blue-400">total spend</span>
          </div>
          {/* Card 2 */}
          <div className="border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center bg-[#161616]">
            <span className="text-3xl font-medium text-green-500 mb-2">28</span>
            <span className="text-sm text-green-500">Active vendors</span>
          </div>
          {/* Card 3 */}
          <div className="border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center bg-[#161616]">
            <span className="text-3xl font-medium text-orange-400 mb-2">94%</span>
            <span className="text-sm text-orange-400">PO Fulfillment</span>
          </div>
          {/* Card 4 */}
          <div className="border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center bg-[#161616]">
            <span className="text-3xl font-medium text-red-400 mb-2">3</span>
            <span className="text-sm text-red-400">overdue invoices</span>
          </div>
        </div>

        {/* Main Dashboard Content (White Background matching the wireframe) */}
        <div className="bg-white rounded-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 text-gray-800 shadow-lg">
          
          {/* LEFT SIDE: Spend By Category */}
          <div className="flex flex-col border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">Spend By Category</h3>
            <div className="space-y-6">
              
              {/* Category 1 */}
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>IT Hardware</span>
                  <span>₹4.8L</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>

              {/* Category 2 */}
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>Furniture</span>
                  <span>₹3.2L</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>

              {/* Category 3 */}
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>Stationery</span>
                  <span>₹2.1L</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>

              {/* Category 4 */}
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>Logistics</span>
                  <span>₹2.3L</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-orange-500 h-3 rounded-full" style={{ width: "22%" }}></div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Vendors & Trend */}
          <div className="flex flex-col gap-8">
            
            {/* Top Vendors Table */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Top Vendors By Spend</h3>
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-4 font-semibold text-gray-600">Vendor</th>
                      <th className="p-4 font-semibold text-gray-600">Spend (₹)</th>
                      <th className="p-4 font-semibold text-gray-600 text-center">POs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="p-4 font-medium text-gray-800">TechCore Ltd</td>
                      <td className="p-4 text-gray-600">4,20,000</td>
                      <td className="p-4 text-center text-gray-600">6</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-800">Infra Supplies</td>
                      <td className="p-4 text-gray-600">3,10,000</td>
                      <td className="p-4 text-center text-gray-600">4</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-800">FastLog</td>
                      <td className="p-4 text-gray-600">1,90,000</td>
                      <td className="p-4 text-center text-gray-600">3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Monthly Trend Chart (Built with pure CSS/Tailwind) */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Monthly Trend</h3>
              <div className="border border-gray-200 rounded-xl p-6 h-48 flex items-end justify-between shadow-sm relative pt-10">
                {/* Y-Axis lines (decorative) */}
                <div className="absolute inset-x-6 top-10 border-b border-gray-100"></div>
                <div className="absolute inset-x-6 top-20 border-b border-gray-100"></div>
                <div className="absolute inset-x-6 top-30 border-b border-gray-100"></div>
                
                {/* Bars */}
                <div className="flex flex-col items-center gap-2 z-10 w-full">
                  <div className="w-10 bg-blue-200 rounded-t-md hover:bg-blue-300 transition-colors" style={{ height: "40px" }}></div>
                  <span className="text-xs text-gray-500 font-medium">Dec</span>
                </div>
                <div className="flex flex-col items-center gap-2 z-10 w-full">
                  <div className="w-10 bg-blue-200 rounded-t-md hover:bg-blue-300 transition-colors" style={{ height: "60px" }}></div>
                  <span className="text-xs text-gray-500 font-medium">Jan</span>
                </div>
                <div className="flex flex-col items-center gap-2 z-10 w-full">
                  <div className="w-10 bg-blue-200 rounded-t-md hover:bg-blue-300 transition-colors" style={{ height: "50px" }}></div>
                  <span className="text-xs text-gray-500 font-medium">Feb</span>
                </div>
                <div className="flex flex-col items-center gap-2 z-10 w-full">
                  <div className="w-10 bg-blue-200 rounded-t-md hover:bg-blue-300 transition-colors" style={{ height: "80px" }}></div>
                  <span className="text-xs text-gray-500 font-medium">Mar</span>
                </div>
                <div className="flex flex-col items-center gap-2 z-10 w-full">
                  <div className="w-10 bg-blue-300 rounded-t-md hover:bg-blue-400 transition-colors" style={{ height: "70px" }}></div>
                  <span className="text-xs text-gray-500 font-medium">Apr</span>
                </div>
                <div className="flex flex-col items-center gap-2 z-10 w-full">
                  {/* Active Month (May) */}
                  <div className="w-12 bg-blue-700 rounded-t-md hover:bg-blue-800 transition-colors" style={{ height: "100px" }}></div>
                  <span className="text-xs text-gray-800 font-bold">May</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default Page;