"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/lib/api';

const quotationSchema = z.object({
  rfq: z.coerce.number().min(1, "RFQ is required"),
  vendor: z.coerce.number().min(1, "Vendor is required"),
  quoted_price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  delivery_days: z.coerce.number().min(1, "Delivery days required"),
  notes: z.string().optional(),
});

type QuotationFormData = z.infer<typeof quotationSchema>;

export default function NewQuotationScreen() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [rfqs, setRfqs] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rfqsRes, vendorsRes] = await Promise.all([
          apiClient.get('/rfqs/'),
          apiClient.get('/vendors/')
        ]);
        setRfqs(rfqsRes.data);
        setVendors(vendorsRes.data);
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
  } = useForm<QuotationFormData>({
    resolver: zodResolver(quotationSchema),
  });

  const onSubmit = async (data: QuotationFormData) => {
    try {
      setApiError(null);
      await apiClient.post('/quotations/', data);
      router.push('/dashboard/quotations');
      router.refresh();
    } catch (error: any) {
      console.error("Failed to create Quotation:", error);
      setApiError(error.response?.data?.non_field_errors?.[0] || "Failed to submit quotation.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/quotations" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
           <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Submit Quotation</h2>
          <p className="text-slate-500 mt-1 text-sm">Bid on an open RFQ.</p>
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
               
               <div className="space-y-1">
                 <label className="block text-sm font-medium text-slate-700">Target RFQ</label>
                 <select {...register("rfq")} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-indigo-500/20">
                   <option value="">Select an RFQ...</option>
                   {rfqs.map((r: any) => <option key={r.id} value={r.id}>{r.title}</option>)}
                 </select>
                 {errors.rfq && <p className="text-red-500 text-xs mt-1">{errors.rfq.message}</p>}
               </div>

               <div className="space-y-1">
                 <label className="block text-sm font-medium text-slate-700">Vendor submitting bid</label>
                 <select {...register("vendor")} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-indigo-500/20">
                   <option value="">Select a Vendor...</option>
                   {vendors.map((v: any) => <option key={v.id} value={v.id}>{v.company_name}</option>)}
                 </select>
                 {errors.vendor && <p className="text-red-500 text-xs mt-1">{errors.vendor.message}</p>}
               </div>

               <div className="space-y-1">
                 <label className="block text-sm font-medium text-slate-700">Quoted Price ($)</label>
                 <input type="number" step="0.01" {...register("quoted_price")} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. 5000.00" />
                 {errors.quoted_price && <p className="text-red-500 text-xs mt-1">{errors.quoted_price.message}</p>}
               </div>

               <div className="space-y-1">
                 <label className="block text-sm font-medium text-slate-700">Delivery Timeline (Days)</label>
                 <input type="number" {...register("delivery_days")} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. 14" />
                 {errors.delivery_days && <p className="text-red-500 text-xs mt-1">{errors.delivery_days.message}</p>}
               </div>
               
               <div className="space-y-1 md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700">Additional Notes</label>
                 <textarea {...register("notes")} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/20" placeholder="Any terms or conditions..."></textarea>
               </div>

            </div>
            <div className="pt-4 flex justify-end">
              <button type="submit" disabled={isSubmitting} className="flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 shadow-md">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Submit Bid
              </button>
            </div>
         </form>
      </div>
    </div>
  );
}
