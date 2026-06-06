"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/lib/api';

const invoiceSchema = z.object({
  purchase_order: z.coerce.number().min(1, "Purchase Order is required"),
  subtotal: z.coerce.number().min(0.01, "Subtotal must be > 0"),
  tax: z.coerce.number().min(0, "Tax cannot be negative"),
  status: z.enum(['PENDING', 'PAID', 'OVERDUE']),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

export default function NewInvoiceScreen() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes] = await Promise.all([
          apiClient.get('/orders/')
        ]);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: { status: 'PENDING' }
  });

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      setApiError(null);
      await apiClient.post('/invoices/', data);
      router.push('/dashboard/invoices');
      router.refresh();
    } catch (error: any) {
      console.error("Failed to create Invoice:", error);
      const errs = error.response?.data;
      setApiError(errs?.non_field_errors?.[0] || JSON.stringify(errs) || "Failed to submit Invoice.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/invoices" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
           <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create Invoice</h2>
          <p className="text-slate-500 mt-1 text-sm">Generate an invoice for an existing Purchase Order.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-8">
         {apiError && (
           <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4 shadow-sm">
             <p className="text-sm text-red-600 font-medium">{apiError}</p>
           </div>
         )}
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
               <div className="space-y-1 md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700">Purchase Order</label>
                 <select {...register("purchase_order")} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-indigo-500/20">
                   <option value="">Select a Purchase Order...</option>
                   {orders.map((o: any) => <option key={o.id} value={o.id}>{o.po_number || `PO-${o.id}`} - Status: {o.status}</option>)}
                 </select>
                 {errors.purchase_order && <p className="text-red-500 text-xs mt-1">{errors.purchase_order.message}</p>}
               </div>

               <div className="space-y-1">
                 <label className="block text-sm font-medium text-slate-700">Subtotal ($)</label>
                 <input type="number" step="0.01" {...register("subtotal")} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. 5000.00" />
                 {errors.subtotal && <p className="text-red-500 text-xs mt-1">{errors.subtotal.message}</p>}
               </div>

               <div className="space-y-1">
                 <label className="block text-sm font-medium text-slate-700">Tax ($)</label>
                 <input type="number" step="0.01" {...register("tax")} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. 500.00" />
                 {errors.tax && <p className="text-red-500 text-xs mt-1">{errors.tax.message}</p>}
               </div>

            </div>
            <div className="pt-4 flex justify-end">
              <button type="submit" disabled={isSubmitting} className="flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 shadow-md">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Generate Invoice
              </button>
            </div>
         </form>
      </div>
    </div>
  );
}
