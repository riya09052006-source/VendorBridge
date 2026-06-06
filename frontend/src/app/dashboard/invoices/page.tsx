"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Receipt, MoreVertical, DollarSign } from 'lucide-react';
import { apiClient } from '@/lib/api';

export default function InvoicesScreen() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await apiClient.get('/invoices/');
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching Invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Invoices</h2>
          <p className="text-slate-500 mt-1 text-sm">Manage and track your invoices and payments.</p>
        </div>
        <Link href="/dashboard/invoices/new" className="flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] transition-all active:scale-[0.98]">
          <Plus className="w-4 h-4 mr-2" /> Create Invoice
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-64">
             <input type="text" placeholder="Search Invoices..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white" />
             <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Invoice #</th>
                <th className="px-6 py-4 font-medium tracking-wider">Total Amount</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                 <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">Loading Invoices...</td></tr>
              ) : invoices.length === 0 ? (
                 <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No Invoices found.</td></tr>
              ) : (
                invoices.map((invoice: any) => (
                  <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 flex items-center">
                       <Receipt className="w-4 h-4 mr-2 text-slate-400" />
                       {invoice.invoice_number || `INV-${invoice.id}`}
                    </td>
                    <td className="px-6 py-4 text-slate-600 flex items-center">
                       <DollarSign className="w-4 h-4 mr-1 text-slate-400" /> {invoice.total}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        invoice.status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        invoice.status === 'OVERDUE' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
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
