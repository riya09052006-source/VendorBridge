"use client";

import React, { useState } from "react";
import Link from "next/link";

const Page = () => 
{
  // --- STATE ---
  const [status, setStatus] = useState("Pending Payment");

  // --- HANDLERS ---
  const handleAction = (actionName) => {
    alert(`${actionName} triggered for PO-2025-0068`);
  };

  const handleMarkAsPaid = () => {
    setStatus("Paid");
    alert("Invoice marked as Paid!");
  };

  return (
    <div className="flex min-h-screen bg-[#111111] text-gray-300 font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-gray-800 p-6 flex flex-col gap-6 shrink-0">
        <div className="text-xl tracking-wide font-medium border border-gray-700 rounded-full py-2 px-4 text-center text-white mb-4">
          VendorBridge
        </div>
        <nav className="flex flex-col gap-1">
          {["Dashboard", "Vendors", "RFQ's", "Quotations", "Approvals", "Purchase orders"].map((navItem) => (
            <Link key={navItem} href="#" className="py-3 px-4 text-gray-400 hover:text-white transition-colors">
              - {navItem}
            </Link>
          ))}
          {/* Active State */}
          <Link href="#" className="py-3 px-4 text-green-500 border border-green-900 bg-green-950/20 rounded-lg font-medium">
            - Invoices
          </Link>
          {["Reports", "Activity"].map((navItem) => (
            <Link key={navItem} href="#" className="py-3 px-4 text-gray-400 hover:text-white transition-colors">
              - {navItem}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 p-10 max-w-5xl">
        
        {/* Header Section with Buttons */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl text-white font-medium mb-3 tracking-wide">
              Purchase Order & Invoice
            </h1>
            <p className="text-gray-400 text-lg">
              PO-2024-auto-generated after approval
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => handleAction("Download PDF")}
              className="px-6 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Download PDF
            </button>
            <button 
              onClick={() => handleAction("Print")}
              className="px-6 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Print
            </button>
            <button 
              onClick={() => handleAction("Email Invoice")}
              className="px-6 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Email invoice
            </button>
          </div>
        </div>

        {/* Details Card (Bill To / Vendor / Dates) */}
        <div className="border border-gray-700 rounded-xl p-8 bg-transparent mb-8">
          <div className="grid grid-cols-2 gap-12 mb-8">
            {/* Bill To */}
            <div>
              <p className="text-gray-400 mb-4">Bill to:</p>
              <div className="text-gray-200 leading-relaxed">
                <p>your Organization Name</p>
                <p>123 business park, ahmedabad</p>
                <p>GSTIN:253834384FB</p>
              </div>
            </div>
            {/* Vendor */}
            <div>
              <p className="text-gray-400 mb-4">Vendor</p>
              <div className="text-gray-200 leading-relaxed">
                <p>Infra supplies pvt ltd</p>
                <p>456, industrial estate, surat</p>
                <p>GSTIN: 343434DB4523</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 grid grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-200">
              <p><span className="text-gray-400 mr-2">PO Number:</span> PO-2025-0068</p>
              <p><span className="text-gray-400 mr-2">PO date:</span> 21 may, 2025</p>
            </div>
            <div className="space-y-4 text-gray-200">
              <p><span className="text-gray-400 mr-2">invoice date:</span> 22 may 2025</p>
              <p><span className="text-gray-400 mr-2">Due date:</span> 21 june 2025</p>
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="border border-gray-700 rounded-xl overflow-hidden bg-transparent mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-4 font-normal text-gray-400 border-r border-gray-700 w-1/3">Item</th>
                <th className="p-4 font-normal text-gray-400 border-r border-gray-700 text-center">Qty</th>
                <th className="p-4 font-normal text-gray-400 border-r border-gray-700 text-center">Unit price</th>
                <th className="p-4 font-normal text-gray-400 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="border-b border-gray-700">
                <td className="p-4 border-r border-gray-700 text-gray-300">Ergonomic chair</td>
                <td className="p-4 border-r border-gray-700 text-center text-gray-300">25</td>
                <td className="p-4 border-r border-gray-700 text-center text-gray-300">3500</td>
                <td className="p-4 text-center text-gray-300">87,500</td>
              </tr>
              {/* Row 2 */}
              <tr className="border-b border-gray-700">
                <td className="p-4 border-r border-gray-700 text-gray-300">Tech Core LTD</td>
                <td className="p-4 border-r border-gray-700 text-center text-gray-300">10</td>
                <td className="p-4 border-r border-gray-700 text-center text-gray-300">8,200</td>
                <td className="p-4 text-center text-gray-300">82000</td>
              </tr>
              
              {/* Summary Rows */}
              <tr className="border-b border-gray-800">
                <td colSpan="3" className="p-3 text-right text-gray-400 border-r border-gray-700">Subtotal</td>
                <td className="p-3 text-center text-gray-300">1,69,500</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td colSpan="3" className="p-3 text-right text-gray-400 border-r border-gray-700">CGST(9%)</td>
                <td className="p-3 text-center text-gray-300">15,255</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td colSpan="3" className="p-3 text-right text-gray-400 border-r border-gray-700">SGST(9%)</td>
                <td className="p-3 text-center text-gray-300">15,255</td>
              </tr>
              <tr>
                <td colSpan="3" className="p-4 text-right text-gray-300 font-medium border-r border-gray-700">Grand total</td>
                <td className="p-4 text-center text-white font-medium text-lg">2,00,010</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Status */}
        <div className="flex items-center gap-4 pl-2">
          <span className="text-gray-400">status:</span>
          <span className={`px-3 py-1 rounded-md text-sm font-medium ${
            status === "Paid" 
              ? "bg-green-950/40 text-green-400 border border-green-800" 
              : "bg-orange-950/40 text-orange-400 border border-orange-800"
          }`}>
            {status}
          </span>
          
          {status !== "Paid" && (
            <button 
              onClick={handleMarkAsPaid}
              className="text-blue-500 hover:text-blue-400 text-sm font-medium ml-2 transition-colors"
            >
              Mark as Paid
            </button>
          )}
        </div>

      </main>
    </div>
  );
};

export default Page;