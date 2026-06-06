"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, UserPlus, FileText, PieChart, TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';
import { apiClient } from '@/lib/api';

export default function DashboardScreen() {
  const [stats, setStats] = useState({
    activeRfqs: 0,
    pendingApprovals: 0,
    poTotal: "$0",
    overdueInvoices: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
       try {
          const [rfqsRes, ordersRes, invoicesRes] = await Promise.all([
             apiClient.get('/rfqs/'),
             apiClient.get('/orders/'),
             apiClient.get('/invoices/')
          ]);
          
          const rfqs = rfqsRes.data || [];
          const orders = ordersRes.data || [];
          const invoices = invoicesRes.data || [];

          const activeRfqs = rfqs.filter((r: any) => r.status === 'PUBLISHED').length;
          const pendingOrders = orders.filter((o: any) => o.status === 'PENDING').length;
          const overdueInvoices = invoices.filter((i: any) => i.status === 'OVERDUE').length;
          
          const totalPoValue = orders.reduce((sum: number, o: any) => sum + (parseFloat(o.total_amount) || 0), 0);

          setStats({
             activeRfqs,
             pendingApprovals: pendingOrders,
             poTotal: `$${totalPoValue.toLocaleString()}`,
             overdueInvoices
          });

          setRecentOrders(orders.slice(0, 3));
       } catch (err) {
          console.error("Error fetching dashboard data:", err);
       }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header section */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard overview</h2>
        <p className="text-slate-500 mt-1 text-sm">Here's what's happening in your procurement network today.</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
             <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
             </div>
          </div>
          <span className="text-3xl font-bold text-slate-900">{stats.activeRfqs}</span>
          <span className="text-sm font-medium text-slate-500 mt-1">Active RFQ&apos;s</span>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
             <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
             </div>
          </div>
          <span className="text-3xl font-bold text-slate-900">{stats.pendingApprovals}</span>
          <span className="text-sm font-medium text-slate-500 mt-1">Pending Approvals</span>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-50 rounded-full blur-2xl group-hover:bg-amber-100 transition-colors"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
             <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
             </div>
          </div>
          <span className="text-3xl font-bold text-slate-900">{stats.poTotal}</span>
          <span className="text-sm font-medium text-slate-500 mt-1">PO&apos;s this month</span>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-50 rounded-full blur-2xl group-hover:bg-emerald-100 transition-colors"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
             <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <PieChart className="w-5 h-5 text-rose-600" />
             </div>
          </div>
          <span className="text-3xl font-bold text-slate-900">{stats.overdueInvoices}</span>
          <span className="text-sm font-medium text-slate-500 mt-1">Overdue invoices</span>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-rose-50 rounded-full blur-2xl group-hover:bg-rose-100 transition-colors"></div>
        </div>
      </div>

      {/* Main Grid: Table & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Purchase Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Recent Purchase Orders</h3>
            <Link href="/dashboard/orders" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all</Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 font-medium tracking-wider">PO Number</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Vendor</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Amount</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.length === 0 ? (
                   <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No recent orders found.</td></tr>
                ) : (
                  recentOrders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">{order.po_number || `PO-${order.id}`}</td>
                      <td className="px-6 py-4 text-slate-600">Vendor</td>
                      <td className="px-6 py-4 text-slate-600">${order.total_amount}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          order.status === 'REJECTED' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 tracking-tight">Spending Categories</h3>
          <div className="flex-1 rounded-xl flex items-center justify-center bg-gradient-to-b from-slate-50 to-white border border-slate-100">
             <div className="text-center">
               <PieChart className="w-12 h-12 text-indigo-200 mx-auto mb-3" />
               <span className="text-sm font-medium text-slate-500">Visualization Space</span>
             </div>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-4 tracking-tight uppercase">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/dashboard/rfqs" className="flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] transition-all active:scale-[0.98]">
            <Plus className="w-4 h-4 mr-2" /> Create RFQ
          </Link>
          <Link href="/dashboard/vendors" className="flex items-center px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]">
            <UserPlus className="w-4 h-4 mr-2 text-slate-400" /> Add Vendor
          </Link>
          <Link href="/dashboard/invoices" className="flex items-center px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]">
            <FileText className="w-4 h-4 mr-2 text-slate-400" /> View Invoices
          </Link>
        </div>
      </div>

    </div>
  );
}