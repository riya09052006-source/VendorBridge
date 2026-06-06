"use client";

import React, { useState } from "react";
import Link from "next/link";

interface QuoteItem {
  id: string;
  item: string;
  qty: number;
  unitPrice: number;
  deliveryDays: number;
}

export default function SubmitQuotationsScreen() {
  // --- STATE MANAGEMENT ---
  const [taxPercent, setTaxPercent] = useState<number>(18);
  const [notes, setNotes] = useState<string>("Payment terms: 20 days net...");
  
  // Initialized with the exact data from your wireframe
  const [items, setItems] = useState<QuoteItem[]>([
    { id: "1", item: "Ergonomic chair", qty: 25, unitPrice: 3500, deliveryDays: 7 },
    { id: "2", item: "Tech Core LTD", qty: 10, unitPrice: 8200, deliveryDays: 14 },
  ]);

  // --- DYNAMIC CALCULATIONS ---
  // Calculates live totals as inputs change
  const subtotal = items.reduce((sum, row) => sum + row.qty * row.unitPrice, 0);
  const gstAmount = subtotal * (taxPercent / 100);
  const grandTotal = subtotal + gstAmount;

  // --- HANDLERS ---
  const handleItemChange = (id: string, field: keyof QuoteItem, value: number) => {
    setItems((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleSubmit = async (isDraft: boolean) => {
    const payload = {
      rfqId: "office furniture procurement q2",
      items,
      taxPercent,
      subtotal,
      gstAmount,
      grandTotal,
      notes,
      status: isDraft ? "Draft" : "Submitted"
    };
    console.log("Sending to Django Backend:", payload);
    alert(isDraft ? "Draft saved successfully." : "Quotation submitted to Approval Workflow!");
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-gray-200 font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-gray-700 p-6 flex flex-col gap-6">
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
      <main className="flex-1 p-10 max-w-5xl">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl text-white font-medium mb-3 tracking-wide">
            Submit Quotations
          </h1>
          <p className="text-gray-400 text-lg">
            RFQ: office furniture procurement q2 - deadline 15 june 2025
          </p>
        </div>

        {/* RFQ Summary Box */}
        <div className="border border-gray-600 rounded-xl p-5 mb-8 bg-[#141414]">
          <p className="text-sm text-gray-500 mb-1">RFQ Summary</p>
          <p className="text-gray-300">
            Ergonomic chair * 25, standing desk * 10 - category furniture
          </p>
        </div>

        {/* Interactive Data Table */}
        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-2">Your Quotation</p>
          <div className="border border-gray-600 rounded-xl overflow-hidden bg-[#141414]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="p-4 font-normal text-gray-400 border-r border-gray-600 w-1/4">Item</th>
                  <th className="p-4 font-normal text-gray-400 border-r border-gray-600 text-center w-24">Qty</th>
                  <th className="p-4 font-normal text-gray-400 border-r border-gray-600 text-center w-32">Unit price</th>
                  <th className="p-4 font-normal text-gray-400 border-r border-gray-600 text-center w-32">Total</th>
                  <th className="p-4 font-normal text-gray-400 text-center w-40">Delivery (days)</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row) => (
                  <tr key={row.id} className="border-b border-gray-700 last:border-0 hover:bg-[#1a1a1a] transition-colors">
                    <td className="p-4 border-r border-gray-600 text-gray-300">{row.item}</td>
                    <td className="p-4 border-r border-gray-600 text-center text-gray-300">{row.qty}</td>
                    {/* Editable Unit Price */}
                    <td className="p-4 border-r border-gray-600">
                      <input
                        type="number"
                        className="w-full bg-transparent outline-none text-white text-center focus:border-b focus:border-green-500 transition-colors"
                        value={row.unitPrice}
                        onChange={(e) => handleItemChange(row.id, "unitPrice", Number(e.target.value))}
                      />
                    </td>
                    {/* Dynamic Row Total */}
                    <td className="p-4 border-r border-gray-600 text-center text-gray-300">
                      {(row.qty * row.unitPrice).toLocaleString()}
                    </td>
                    {/* Editable Delivery Days */}
                    <td className="p-4 text-center">
                      <input
                        type="number"
                        className="w-full bg-transparent outline-none text-white text-center focus:border-b focus:border-green-500 transition-colors"
                        value={row.deliveryDays}
                        onChange={(e) => handleItemChange(row.id, "deliveryDays", Number(e.target.value))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Inputs & Calculation Summary */}
        <div className="grid grid-cols-2 gap-10 mb-10">
          
          {/* Left Column: Tax & Notes */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">tax / GST %</label>
              <div className="relative w-40">
                <input
                  type="number"
                  className="w-full bg-transparent border border-gray-600 rounded-lg py-2 px-3 text-white outline-none focus:border-green-500 transition-colors"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value))}
                />
                <span className="absolute right-3 top-2 text-gray-500">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Note / terms</label>
              <textarea
                className="w-full bg-transparent border border-gray-600 rounded-lg py-3 px-4 text-white outline-none focus:border-green-500 transition-colors resize-none"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Right Column: Calculations Card */}
          <div className="flex items-end justify-end">
            <div className="border border-gray-600 bg-[#141414] rounded-xl p-6 w-full max-w-[320px]">
              <div className="flex justify-between items-center mb-3 text-gray-300 text-sm">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-4 text-gray-300 text-sm">
                <span>GST ({taxPercent}%)</span>
                <span>{gstAmount.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-600 pt-4 flex justify-between items-center">
                <span className="text-gray-200">Grand total</span>
                <span className="text-lg text-white">{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={() => handleSubmit(false)}
            className="px-8 py-2.5 border border-gray-400 text-white rounded-lg hover:bg-white hover:text-black transition-colors"
          >
            Submit Quotation
          </button>
          <button 
            onClick={() => handleSubmit(true)}
            className="px-8 py-2.5 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-400 hover:text-white transition-colors"
          >
            Save Draft
          </button>
        </div>
      </main>
    </div>
  );
}