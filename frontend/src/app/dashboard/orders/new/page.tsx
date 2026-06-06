"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/lib/api';

const orderSchema = z.object({
  quotation: z.coerce.number().min(1, "Approved Quotation is required"),
  status: z.enum(['ISSUED', 'ACCEPTED', 'FULFILLED', 'CANCELLED']),
});

type OrderFormData = z.infer<typeof orderSchema>;

export default function NewOrderScreen() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quotationsRes] = await Promise.all([
          apiClient.get('/quotations/')
        ]);
        setQuotations(quotationsRes.data);
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
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { status: 'ISSUED' }
  });

  const onSubmit = async (data: OrderFormData) => {
    try {
      setApiError(null);
      await apiClient.post('/orders/', data);
      router.push('/dashboard/orders');
      router.refresh();
    } catch (error: any) {
      console.error("Failed to create Order:", error);
      const errs = error.response?.data;
      setApiError(errs?.non_field_errors?.[0] || JSON.stringify(errs) || "Failed to submit Purchase Order.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/orders" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
           <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create Purchase Order</h2>
          <p className="text-slate-500 mt-1 text-sm">Generate a PO from an approved quotation.</p>
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
                 <label className="block text-sm font-medium text-slate-700">Source Quotation</label>
                 <select {...register("quotation")} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-indigo-500/20">
                   <option value="">Select an Approved Quotation...</option>
                   {quotations.map((q: any) => <option key={q.id} value={q.id}>Quote #{q.id} - ${q.quoted_price}</option>)}
                 </select>
                 {errors.quotation && <p className="text-red-500 text-xs mt-1">{errors.quotation.message}</p>}
               </div>

               <div className="space-y-1 md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700">Initial Status</label>
                 <select {...register("status")} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-indigo-500/20">
                   <option value="ISSUED">Issued</option>
                   <option value="ACCEPTED">Accepted</option>
                 </select>
                 {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
               </div>

            </div>
            <div className="pt-4 flex justify-end">
              <button type="submit" disabled={isSubmitting} className="flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 shadow-md">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Generate PO
              </button>
            </div>
         </form>
      </div>
    </div>
  );
}
