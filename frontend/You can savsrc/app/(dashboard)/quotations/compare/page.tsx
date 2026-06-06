"use client";

import React, { useState } from "react";
import Link from "next/link";

// Define the shape of your Django payload
interface VendorQuote {
  id: string;
  vendorName: string;
  grandTotal: number;
  gstPercent: number;
  deliveryDays: number;
  rating: number;
  paymentTerms: string;
}

export default function QuotationComparisonScreen() {
  // Mock data initialized with the exact text from the wireframe
  const [quotations] = useState<VendorQuote[]>([
    {
      id: "v1",
      vendorName: "Infra Supplies",
      grandTotal: 185000,
      gstPercent: 18,
      deliveryDays: 10,
      rating: 4.5,
      paymentTerms: "30 days",
    },
    {
      id: "v2",
      vendorName: "TechCore LTD",
      grandTotal: 200010,
      gstPercent: 18,
      deliveryDays: 14,
      rating: 4.2,
      paymentTerms: "30 days",
    },
    {
      id: "v3",
      vendorName: "Office Need Co.",
      grandTotal: 214800,
      gstPercent: 18,
      deliveryDays: 7,
      rating: 3.8,
      paymentTerms: "15 days",
    },
  ]);

  // Logic to dynamically find the lowest price
  const lowestPrice = Math.min(...quotations.map((q) => q.grandTotal));

  // Handler for selection
  const handleSelect = (vendorId: string, isLowest: boolean) => {
    console.log(`Initiating Approval Workflow for Vendor ID: ${vendorId}`);
    if (isLowest) {
      alert(`Vendor ${vendorId} selected & approved! Proceeding to Approval page.`);
    } else {
      alert(`Vendor ${vendorId} selected! (Note: Not the lowest price)`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-gray-200 font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-gray-700 p-6 flex flex-col gap-6 shrink-0">
        <div className="text-xl tracking-wide font-medium border border-gray-600 rounded-full py-2 px-4 text-center text-white mb-4">
          VendorBridge
        </div>
        <nav className="flex flex-col gap-1">
          {["Dashboard", "Vendors", "RFQ's"].map((navItem) => (
            <Link key={navItem} href="#" className="py-3 px-4 text-gray-400 hover:text-white transition-colors">
              - {navItem}
            </Link>
          ))}
          {/* Active Navigation Item */}
          <Link href="#" className="py-3 px-4 text-green-500 border border-green-800 bg-green-950/20 rounded-lg font-medium">
            - Quotations
          </Link>
          {["Approvals", "Purchase orders", "Invoices", "Reports", "Activity"].map((navItem) => (
            <Link key={navItem} href="#" className="py-3 px-4 text-gray-400 hover:text-white transition-colors">
              - {navItem}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 p-10 max-w-6xl overflow-x-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl text-white font-medium mb-3 tracking-wide">
            Quotation Comparison
          </h1>
          <p className="text-gray-400 text-lg">
            RFQ: office furniture procurement q2 - 3 quotations received
          </p>
        </div>

        {/* Comparison Grid Container */}
        <div className="border border-gray-600 rounded-xl overflow-hidden bg-[#141414] mb-4">
          <table className="w-full text-center border-collapse table-fixed">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="p-5 font-medium text-gray-400 border-r border-gray-600 w-1/4 text-left pl-6">
                  Criteria
                </th>
                {quotations.map((quote) => {
                  const isLowest = quote.grandTotal === lowestPrice;
                  return (
                    <th 
                      key={quote.id} 
                      className={`p-5 font-medium border-r border-gray-600 last:border-r-0 w-1/4 ${
                        isLowest ? "text-green-500 bg-green-950/20 border-green-800 border-t-2 border-t-green-500" : "text-gray-300"
                      }`}
                    >
                      {quote.vendorName} {isLowest && "(Lowest)"}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {/* Row: Grand Total */}
              <tr className="border-b border-gray-600">
                <td className="p-5 border-r border-gray-600 text-left pl-6 text-gray-400">Grand Total</td>
                {quotations.map((quote) => {
                  const isLowest = quote.grandTotal === lowestPrice;
                  return (
                    <td key={quote.id} className={`p-5 border-r border-gray-600 last:border-r-0 ${isLowest ? "bg-green-950/20 border-x-green-800 text-green-500" : "text-gray-300"}`}>
                      {quote.grandTotal}
                    </td>
                  );
                })}
              </tr>
              
              {/* Row: GST % */}
              <tr className="border-b border-gray-600">
                <td className="p-5 border-r border-gray-600 text-left pl-6 text-gray-400">GST %</td>
                {quotations.map((quote) => {
                  const isLowest = quote.grandTotal === lowestPrice;
                  return (
                    <td key={quote.id} className={`p-5 border-r border-gray-600 last:border-r-0 ${isLowest ? "bg-green-950/20 border-x-green-800 text-green-500" : "text-gray-300"}`}>
                      {quote.gstPercent}
                    </td>
                  );
                })}
              </tr>

              {/* Row: Delivery (days) */}
              <tr className="border-b border-gray-600">
                <td className="p-5 border-r border-gray-600 text-left pl-6 text-gray-400">Delivery (days)</td>
                {quotations.map((quote) => {
                  const isLowest = quote.grandTotal === lowestPrice;
                  return (
                    <td key={quote.id} className={`p-5 border-r border-gray-600 last:border-r-0 ${isLowest ? "bg-green-950/20 border-x-green-800 text-green-500" : "text-gray-300"}`}>
                      {quote.deliveryDays}
                    </td>
                  );
                })}
              </tr>

              {/* Row: Vendor Rating */}
              <tr className="border-b border-gray-600">
                <td className="p-5 border-r border-gray-600 text-left pl-6 text-gray-400">Vendor rating</td>
                {quotations.map((quote) => {
                  const isLowest = quote.grandTotal === lowestPrice;
                  return (
                    <td key={quote.id} className={`p-5 border-r border-gray-600 last:border-r-0 ${isLowest ? "bg-green-950/20 border-x-green-800 text-green-500" : "text-gray-300"}`}>
                      {quote.rating}/5
                    </td>
                  );
                })}
              </tr>

              {/* Row: Payment Terms */}
              <tr className="border-b border-gray-600">
                <td className="p-5 border-r border-gray-600 text-left pl-6 text-gray-400">Payment terms</td>
                {quotations.map((quote) => {
                  const isLowest = quote.grandTotal === lowestPrice;
                  return (
                    <td key={quote.id} className={`p-5 border-r border-gray-600 last:border-r-0 ${isLowest ? "bg-green-950/20 border-x-green-800 text-green-500" : "text-gray-300"}`}>
                      {quote.paymentTerms}
                    </td>
                  );
                })}
              </tr>

              {/* Row: Action Buttons */}
              <tr>
                <td className="p-5 border-r border-gray-600 text-left pl-6"></td>
                {quotations.map((quote) => {
                  const isLowest = quote.grandTotal === lowestPrice;
                  return (
                    <td 
                      key={quote.id} 
                      className={`p-5 border-r border-gray-600 last:border-r-0 ${
                        isLowest ? "bg-green-950/20 border-x-green-800 border-b border-b-green-800 rounded-b-xl" : ""
                      }`}
                    >
                      <button
                        onClick={() => handleSelect(quote.id, isLowest)}
                        className={`w-4/5 py-2.5 px-4 rounded-lg font-medium transition-colors border ${
                          isLowest 
                            ? "bg-transparent border-green-500 text-green-500 hover:bg-green-500 hover:text-[#0f0f0f]" 
                            : "bg-transparent border-gray-400 text-gray-300 hover:border-white hover:text-white"
                        }`}
                      >
                        {isLowest ? "Select & Approve" : "Select"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Informational Footer */}
        <div className="mt-4">
          <p className="text-red-400 text-sm tracking-wide">
            Green = lowest price, selecting vendor initiates the approval workflow.
          </p>
        </div>
        
        {/* Decorative divider line at the very bottom */}
        <div className="mt-16 border-t border-gray-600 w-full"></div>
      </main>
    </div>
  );
}