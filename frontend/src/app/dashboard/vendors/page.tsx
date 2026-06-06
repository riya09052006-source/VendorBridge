"use client";
import React from 'react';
import { Plus, Search, Eye } from 'lucide-react';

export default function VendorsScreen() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header section with Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vendors</h2>
          <p className="text-gray-600 mt-1">Manage supplier profiles and registrations</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-900 text-white shadow-sm text-sm font-medium rounded-md hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4 mr-2" /> Add Vendor
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            placeholder="Search by name, gst number, category..."
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-900 text-white border border-transparent">
            All (28)
          </button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors">
            Active (21)
          </button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors">
            Pending (4)
          </button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors">
            Blocked (3)
          </button>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Vendor Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">GST No.</th>
                <th className="px-6 py-4">Contact No.</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">Infra Supplies Pvt Ltd</td>
                <td className="px-6 py-4">Constructions</td>
                <td className="px-6 py-4 font-mono text-xs">27AABCS1429B1Z0</td>
                <td className="px-6 py-4">+91 98765 43210</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Active</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4 mr-1.5 text-gray-500" /> View
                  </button>
                </td>
              </tr>
              
              {/* Row 2 */}
              <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">Tech Core LTD</td>
                <td className="px-6 py-4">IT Services</td>
                <td className="px-6 py-4 font-mono text-xs">07AAACT2456C1Z2</td>
                <td className="px-6 py-4">+91 91234 56789</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Active</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4 mr-1.5 text-gray-500" /> View
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="bg-white hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">FastLog Transport</td>
                <td className="px-6 py-4">Logistics</td>
                <td className="px-6 py-4 font-mono text-xs">29BBBCD4321D1Z5</td>
                <td className="px-6 py-4">+91 99887 76655</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">Blocked</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4 mr-1.5 text-gray-500" /> View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}