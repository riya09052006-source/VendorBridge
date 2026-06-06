"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, ClipboardList, MoreVertical, DollarSign } from 'lucide-react';
import { apiClient } from '@/lib/api';

export default function QuotationsScreen() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await apiClient.get('/quotations/');
        setQuotations(response.data);
      } catch (error) {
        console.error("Error fetching Quotations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotations();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Quotations</h2>
          <p className="text-slate-500 mt-1 text-sm">Review vendor bids for your RFQs.</p>
        </div>
        <Link href="/dashboard/quotations/new" className="flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] transition-all active:scale-[0.98]">
          <Plus className="w-4 h-4 mr-2" /> Submit Quotation
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-64">
             <input type="text" placeholder="Search Quotations..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white" />
             <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">RFQ / Vendor</th>
                <th className="px-6 py-4 font-medium tracking-wider">Quoted Price</th>
                <th className="px-6 py-4 font-medium tracking-wider">Delivery (Days)</th>
                <th className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                 <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">Loading Quotations...</td></tr>
              ) : quotations.length === 0 ? (
                 <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No Quotations found.</td></tr>
              ) : (
                quotations.map((quote: any) => (
                  <tr key={quote.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 flex items-center">
                       <ClipboardList className="w-4 h-4 mr-2 text-slate-400" />
                       RFQ #{quote.rfq} - Vendor #{quote.vendor}
                    </td>
                    <td className="px-6 py-4 text-slate-600 flex items-center">
                       <DollarSign className="w-4 h-4 mr-1 text-slate-400" /> {quote.quoted_price}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{quote.delivery_days} days</td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-slate-400 hover:text-indigo-600 transition-colors"><MoreVertical className="w-4 h-4 inline" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
