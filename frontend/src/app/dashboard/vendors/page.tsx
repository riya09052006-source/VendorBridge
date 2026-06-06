"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Building2, MoreVertical } from 'lucide-react';
import { apiClient } from '@/lib/api';

export default function VendorsScreen() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await apiClient.get('/vendors/');
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Vendors</h2>
          <p className="text-slate-500 mt-1 text-sm">Manage your suppliers and vendor network.</p>
        </div>
        <Link href="/dashboard/vendors/new" className="flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] transition-all active:scale-[0.98]">
          <Plus className="w-4 h-4 mr-2" /> Add Vendor
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-64">
             <input type="text" placeholder="Search vendors..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white" />
             <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Company Name</th>
                <th className="px-6 py-4 font-medium tracking-wider">Contact Name</th>
                <th className="px-6 py-4 font-medium tracking-wider">Email</th>
                <th className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                 <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">Loading vendors...</td></tr>
              ) : vendors.length === 0 ? (
                 <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No vendors found.</td></tr>
              ) : (
                vendors.map((v: any) => (
                  <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 flex items-center">
                       <Building2 className="w-4 h-4 mr-2 text-slate-400" />
                       {v.company_name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{v.contact_name}</td>
                    <td className="px-6 py-4 text-slate-600">{v.email}</td>
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