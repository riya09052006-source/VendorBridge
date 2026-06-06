"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Building2, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/lib/api';

const vendorSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  gst_number: z.string().length(15, "GST number must be exactly 15 characters"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Address is required"),
  category: z.enum(['IT', 'LOGISTICS', 'RAW_MATERIALS', 'OFFICE_SUPPLIES', 'SERVICES', 'OTHER']),
});

type VendorFormData = z.infer<typeof vendorSchema>;

export default function NewVendorScreen() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: { category: 'OTHER' }
  });

  const onSubmit = async (data: VendorFormData) => {
    try {
      setApiError(null);
      await apiClient.post('/vendors/', data);
      router.push('/dashboard/vendors');
      router.refresh(); // Force nextjs to re-fetch the list
    } catch (error: any) {
      console.error("Failed to create vendor:", error);
      const resData = error.response?.data;
      if (resData && typeof resData === 'object') {
         const firstError = Object.values(resData)[0];
         setApiError(Array.isArray(firstError) ? firstError[0] : JSON.stringify(resData));
      } else {
         setApiError("Failed to create vendor. Please check your inputs.");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/vendors" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
           <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Vendor</h2>
          <p className="text-slate-500 mt-1 text-sm">Register a new supplier in your network.</p>
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
                 {/* Company Name */}
                 <div className="space-y-1 md:col-span-2">
                   <label className="block text-sm font-medium text-slate-700">Company Name</label>
                   <div className="relative">
                      <input 
                        type="text" 
                        {...register("company_name")}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${errors.company_name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                        placeholder="e.g. Infrastructure Corp Ltd."
                      />
                      <Building2 className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                   </div>
                   {errors.company_name && <p className="text-red-500 font-medium text-xs mt-1">{errors.company_name.message}</p>}
                 </div>

                 {/* GST Number */}
                 <div className="space-y-1">
                   <label className="block text-sm font-medium text-slate-700">GST Number</label>
                   <input 
                     type="text" 
                     {...register("gst_number")}
                     className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all uppercase ${errors.gst_number ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                     placeholder="15-character GSTIN"
                   />
                   {errors.gst_number && <p className="text-red-500 font-medium text-xs mt-1">{errors.gst_number.message}</p>}
                 </div>

                 {/* Category */}
                 <div className="space-y-1">
                   <label className="block text-sm font-medium text-slate-700">Category</label>
                   <select 
                     {...register("category")}
                     className={`w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 transition-all appearance-none ${errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                   >
                     <option value="IT">IT Services & Equipment</option>
                     <option value="LOGISTICS">Logistics & Transport</option>
                     <option value="RAW_MATERIALS">Raw Materials</option>
                     <option value="OFFICE_SUPPLIES">Office Supplies</option>
                     <option value="SERVICES">Professional Services</option>
                     <option value="OTHER">Other</option>
                   </select>
                   {errors.category && <p className="text-red-500 font-medium text-xs mt-1">{errors.category.message}</p>}
                 </div>

                 {/* Email */}
                 <div className="space-y-1">
                   <label className="block text-sm font-medium text-slate-700">Contact Email</label>
                   <input 
                     type="email" 
                     {...register("email")}
                     className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                     placeholder="contact@company.com"
                   />
                   {errors.email && <p className="text-red-500 font-medium text-xs mt-1">{errors.email.message}</p>}
                 </div>

                 {/* Phone */}
                 <div className="space-y-1">
                   <label className="block text-sm font-medium text-slate-700">Contact Phone</label>
                   <input 
                     type="tel" 
                     {...register("phone")}
                     className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                     placeholder="+1 234 567 8900"
                   />
                   {errors.phone && <p className="text-red-500 font-medium text-xs mt-1">{errors.phone.message}</p>}
                 </div>

                 {/* Address */}
                 <div className="space-y-1 md:col-span-2">
                   <label className="block text-sm font-medium text-slate-700">Registered Address</label>
                   <textarea 
                     {...register("address")}
                     rows={3}
                     className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all resize-none ${errors.address ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                     placeholder="Full corporate address..."
                   />
                   {errors.address && <p className="text-red-500 font-medium text-xs mt-1">{errors.address.message}</p>}
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
                      Registering...
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Register Vendor
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
