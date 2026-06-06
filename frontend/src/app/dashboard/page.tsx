import React from 'react';
import { Plus, UserPlus, FileText, PieChart } from 'lucide-react';

export default function DashboardScreen() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back, Procurement Officer - Today&apos;s Overview</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-gray-900">12</span>
          <span className="text-sm font-medium text-gray-500 mt-1">Active RFQ&apos;s</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-gray-900">5</span>
          <span className="text-sm font-medium text-gray-500 mt-1">Pending Approvals</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-gray-900">$2.3L</span>
          <span className="text-sm font-medium text-gray-500 mt-1">PO&apos;s this month</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-gray-900">3</span>
          <span className="text-sm font-medium text-gray-500 mt-1">Overdue invoices</span>
        </div>
      </div>

      {/* Main Grid: Table & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Purchase Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Purchase Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">PO#</th>
                  <th className="px-6 py-3">Vendor</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">PO1</td>
                  <td className="px-6 py-4">Infra</td>
                  <td className="px-6 py-4">87,000</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Approved</span></td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">PO2</td>
                  <td className="px-6 py-4">Tech core</td>
                  <td className="px-6 py-4">1,40,000</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span></td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 font-medium text-gray-900">PO3</td>
                  <td className="px-6 py-4">OfficeNeed Co</td>
                  <td className="px-6 py-4">34,900</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Trends</h3>
          <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
             <div className="text-center">
               <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
               <span className="text-sm text-gray-500">Chart Visualization Space</span>
             </div>
          </div>
        </div>

      </div>

      <hr className="border-gray-200" />

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <button className="flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
          <Plus className="w-4 h-4 mr-2" /> + New RFQ
        </button>
        <button className="flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
          <UserPlus className="w-4 h-4 mr-2" /> Add Vendor
        </button>
        <button className="flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
          <FileText className="w-4 h-4 mr-2" /> View Invoices
        </button>
      </div>

    </div>
  );
}