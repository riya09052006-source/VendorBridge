"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/lib/api';

const rfqSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be detailed"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  deadline: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  assigned_vendors: z.array(z.number()).optional(),
});

type RFQFormData = z.infer<typeof rfqSchema>;

export default function NewRFQScreen() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [vendors, setVendors] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RFQFormData>({
    resolver: zodResolver(rfqSchema),
    defaultValues: { assigned_vendors: [] }
  });

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await apiClient.get('/vendors/');
        setVendors(response.data);
      } catch (error) {
        console.error("Failed to load vendors:", error);
      } finally {
        setLoadingVendors(false);
      }
    };
    fetchVendors();
  }, []);

  const onSubmit = async (data: RFQFormData) => {
    try {
      setApiError(null);
      // We assume created_by is assigned automatically in backend based on token
      await apiClient.post('/rfqs/', data);
      router.push('/dashboard/rfqs');
      router.refresh();
    } catch (error: any) {
      console.error("Failed to create RFQ:", error);
      const resData = error.response?.data;
      if (resData && typeof resData === 'object') {
         const firstError = Object.values(resData)[0];
         setApiError(Array.isArray(firstError) ? firstError[0] : JSON.stringify(resData));
      } else {
         setApiError("Failed to create RFQ. Please check your inputs.");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/rfqs" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
           <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create Request for Quotation</h2>
          <p className="text-slate-500 mt-1 text-sm">Publish a new RFQ and assign it to vendors.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8">
           {apiError && (
             <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4 shadow-sm">
               <p className="text-sm text-red-600 font-medium">{apiError}</p>
             </div>
           )}

           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Title */}
                 <div className="space-y-1 md:col-span-2">
                   <label className="block text-sm font-medium text-slate-700">RFQ Title</label>
                   <div className="relative">
                      <input 
                        type="text" 
                        {...register("title")}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                        placeholder="e.g. Bulk Procurement of Office Laptops"
                      />
                      <FileText className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                   </div>
                   {errors.title && <p className="text-red-500 font-medium text-xs mt-1">{errors.title.message}</p>}
                 </div>

                 {/* Quantity */}
                 <div className="space-y-1">
                   <label className="block text-sm font-medium text-slate-700">Required Quantity</label>
                   <input 
                     type="number" 
                     {...register("quantity")}
                     className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${errors.quantity ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                     placeholder="e.g. 50"
                   />
                   {errors.quantity && <p className="text-red-500 font-medium text-xs mt-1">{errors.quantity.message}</p>}
                 </div>

                 {/* Deadline */}
                 <div className="space-y-1">
                   <label className="block text-sm font-medium text-slate-700">Submission Deadline</label>
                   <input 
                     type="datetime-local" 
                     {...register("deadline")}
                     className={`w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 transition-all ${errors.deadline ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                   />
                   {errors.deadline && <p className="text-red-500 font-medium text-xs mt-1">{errors.deadline.message}</p>}
                 </div>

                 {/* Description */}
                 <div className="space-y-1 md:col-span-2">
                   <label className="block text-sm font-medium text-slate-700">Detailed Requirements</label>
                   <textarea 
                     {...register("description")}
                     rows={5}
                     className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all resize-y ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                     placeholder="Specify the exact models, technical specifications, and delivery terms..."
                   />
                   {errors.description && <p className="text-red-500 font-medium text-xs mt-1">{errors.description.message}</p>}
                 </div>

                 {/* Assign Vendors */}
                 <div className="space-y-1 md:col-span-2">
                   <label className="block text-sm font-medium text-slate-700">Assign to Specific Vendors (Optional)</label>
                   <select 
                     multiple 
                     {...register("assigned_vendors")}
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white min-h-[100px]"
                   >
                     {loadingVendors ? (
                        <option disabled>Loading vendors...</option>
                     ) : vendors.length === 0 ? (
                        <option disabled>No vendors available. Please add vendors first.</option>
                     ) : (
                        vendors.map((v: any) => (
                           <option key={v.id} value={v.id}>{v.company_name} ({v.category})</option>
                        ))
                     )}
                   </select>
                   <p className="text-xs text-slate-500 mt-1">Hold Ctrl (or Cmd) to select multiple vendors.</p>
                   {errors.assigned_vendors && <p className="text-red-500 font-medium text-xs mt-1">{errors.assigned_vendors.message}</p>}
                 </div>

              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Publishing RFQ...
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Publish RFQ
                    </>
                  )}
                </button>
              </div>

           </form>
        </div>
      </div>
    </div>
  );
}
