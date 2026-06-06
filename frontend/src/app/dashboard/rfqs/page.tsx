"use client";
import React from 'react';
import { Plus, X, UploadCloud } from 'lucide-react';

export default function CreateRFQScreen() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Header & Stepper */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900">Create RFQ&apos;s</h2>
        <p className="text-gray-600 mt-1">new request for quotation</p>
        
        {/* Progress Stepper */}
        <div className="flex items-center mt-6 max-w-2xl">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900 text-white font-bold text-sm border-2 border-blue-900">1</div>
          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-500 font-bold text-sm border-2 border-gray-300">2</div>
          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-500 font-bold text-sm border-2 border-gray-300">3</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Core RFQ Details */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">RFQ&apos;s title*</label>
            <input 
              type="text" 
              defaultValue="Office Furniture procurement Q2"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Category</label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500">
              <option className="text-gray-900">Furniture</option>
              <option className="text-gray-900">IT Equipment</option>
              <option className="text-gray-900">Stationery</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Deadline*</label>
            <input 
              type="date" 
              defaultValue="2025-06-15"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea 
              rows={3} 
              defaultValue="Ergonomic chairs and standing desks for 3rd floor"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 space-y-3">
            <button className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none transition-colors">
              Save & Send to Vendors
            </button>
            <button className="w-full flex justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors">
              Save as Draft
            </button>
          </div>
        </div>

        {/* Right Column: Line Items & Assignments */}
        <div className="space-y-8">
          
          {/* Line Items Table */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 uppercase mb-2">Line items</label>
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
              <table className="w-full text-sm text-left text-gray-900">
                <thead className="text-xs uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Item</th>
                    <th className="px-4 py-2 font-semibold w-20">Qty</th>
                    <th className="px-4 py-2 font-semibold w-24">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2">Ergonomic chair</td>
                    <td className="px-4 py-2">25</td>
                    <td className="px-4 py-2">NOS</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Standing desks</td>
                    <td className="px-4 py-2">10</td>
                    <td className="px-4 py-2">NOS</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="mt-3 flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <Plus className="w-3.5 h-3.5 mr-1" /> add line item
            </button>
          </div>

          {/* Assign Vendors */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 uppercase mb-2">Assign Vendors</label>
            <div className="border border-gray-300 rounded-lg bg-white p-2 space-y-2">
              <div className="flex justify-between items-center bg-gray-50 border border-gray-200 px-3 py-2 rounded-md">
                <span className="text-sm text-gray-900 font-medium">Infra Supplies Pvt Ltd</span>
                <X className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500" />
              </div>
              <div className="flex justify-between items-center bg-gray-50 border border-gray-200 px-3 py-2 rounded-md">
                <span className="text-sm text-gray-900 font-medium">Techcore LTD</span>
                <X className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500" />
              </div>
            </div>
            <button className="mt-3 flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <Plus className="w-3.5 h-3.5 mr-1" /> add vendor
            </button>
          </div>

          {/* Attachments */}
          <div className="pt-4 border-t border-gray-200">
             <label className="block text-sm font-semibold text-gray-700 mb-2">Attachments</label>
             <div className="border-2 border-dashed border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors p-8 flex flex-col items-center justify-center cursor-pointer text-center">
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 font-medium">Drag & drop files or click to upload</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}