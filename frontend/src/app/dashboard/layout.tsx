"use client"; // 1. ADDED: This is required because we are adding click events and router navigation
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 2. ADDED: To redirect after logout
import Cookies from 'js-cookie'; // 3. ADDED: To delete the secure tokens
import { 
  LayoutDashboard, Users, FileText, ClipboardList, 
  CheckSquare, ShoppingCart, Receipt, BarChart, 
  Activity, UserCircle2, LogOut // 4. ADDED: LogOut icon
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // 5. ADDED: The Logout Function
  const handleLogout = () => {
    // Delete the security cookies
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    
    // Teleport back to the login screen
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">VendorBridge</h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
            <li>
            <Link href="/dashboard" className="flex items-center px-3 py-2 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300 transition-colors">
                <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
            </Link>
            </li>
            <li>
            <Link href="/dashboard/vendors" className="flex items-center px-3 py-2 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300 transition-colors">
                <Users className="w-5 h-5 mr-3" /> Vendors
            </Link>
            </li>
            <li>
            <Link href="/dashboard/rfqs" className="flex items-center px-3 py-2 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300 transition-colors">
                <FileText className="w-5 h-5 mr-3" /> RFQ&apos;s
            </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-3 py-2 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300">
                <ClipboardList className="w-5 h-5 mr-3" /> Quotations
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-3 py-2 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300">
                <CheckSquare className="w-5 h-5 mr-3" /> Approvals
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-3 py-2 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300">
                <ShoppingCart className="w-5 h-5 mr-3" /> Purchase Orders
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-3 py-2 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300">
                <Receipt className="w-5 h-5 mr-3" /> Invoices
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-3 py-2 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300">
                <BarChart className="w-5 h-5 mr-3" /> Reports
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-3 py-2 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300">
                <Activity className="w-5 h-5 mr-3" /> Activity
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 space-x-4">
          
          <div className="flex items-center cursor-pointer text-gray-600 hover:text-gray-900 transition-colors">
            <UserCircle2 className="w-8 h-8" />
          </div>
          
          {/* 6. ADDED: The physical Logout Button */}
          <button 
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
          
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}