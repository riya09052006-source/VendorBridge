"use client";
import { useState } from 'react'; 
import Link from 'next/link';
import { Upload, Eye, EyeOff } from 'lucide-react'; 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import Cookies from 'js-cookie';

const registerSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone number is required"),
  role: z.string().min(1, "Please select a role"),
  country: z.string().min(2, "Country is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  additional_info: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const payload = {
        full_name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        phone: data.phone,
        role: data.role, 
        country: data.country,
        additional_info: data.additional_info,
        username: data.email, 
        password: data.password, 
      };
      
      await apiClient.post('/auth/register/', payload);
      
      const loginResponse = await apiClient.post('/auth/login/', {
        email: data.email, 
        password: data.password,
      });

      Cookies.set('access_token', loginResponse.data.access, { expires: 1 }); 
      if (loginResponse.data.refresh) {
         Cookies.set('refresh_token', loginResponse.data.refresh, { expires: 7 }); 
      }

      router.push('/dashboard');
    } catch (error: any) {
      console.error("Registration failed:", error);
      const data = error.response?.data;
      if (data && typeof data === 'object') {
         const firstKey = Object.keys(data)[0];
         const firstError = data[firstKey];
         setApiError(Array.isArray(firstError) ? firstError[0] : JSON.stringify(data));
      } else {
         setApiError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create an account</h2>
        <p className="text-slate-500 mt-2 text-sm">Join the VendorBridge network to get started.</p>
      </div>

      {apiError && (
        <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-red-600 font-medium">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Profile Photo Upload Placeholder */}
        <div className="flex justify-center mb-2">
          <label className="flex flex-col items-center justify-center w-20 h-20 rounded-full border border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:bg-slate-100 hover:border-indigo-300 transition-all group">
            <Upload className="w-5 h-5 text-slate-400 mb-1 group-hover:text-indigo-500 transition-colors" />
            <span className="text-[10px] text-slate-500 font-medium group-hover:text-indigo-600">Upload</span>
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">First name</label>
            <input type="text" {...register("first_name")} className={`block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.first_name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'}`} placeholder="John" />
            {errors.first_name && <p className="text-red-500 font-medium text-xs mt-1">{errors.first_name.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Last name</label>
            <input type="text" {...register("last_name")} className={`block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.last_name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'}`} placeholder="Doe" />
            {errors.last_name && <p className="text-red-500 font-medium text-xs mt-1">{errors.last_name.message}</p>}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Email address</label>
            <input type="email" {...register("email")} className={`block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'}`} placeholder="you@company.com" />
            {errors.email && <p className="text-red-500 font-medium text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Phone number</label>
            <input type="tel" {...register("phone")} className={`block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'}`} placeholder="+1 (555) 000-0000" />
            {errors.phone && <p className="text-red-500 font-medium text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Role & Country */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Role</label>
            <select defaultValue="" {...register("role")} className={`block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 appearance-none ${errors.role ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'}`}>
              <option value="" disabled>Select a role</option>
              <option value="VENDOR">Vendor</option>
              <option value="PROCUREMENT_OFFICER">Procurement Officer</option>
              <option value="MANAGER">Manager / Approver</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 font-medium text-xs mt-1">{errors.role.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Country</label>
            <input type="text" {...register("country")} className={`block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.country ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'}`} placeholder="United States" />
            {errors.country && <p className="text-red-500 font-medium text-xs mt-1">{errors.country.message}</p>}
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              {...register("password")} 
              className={`block w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 pr-10 ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'}`} 
              placeholder="Create a password (min. 6 chars)" 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 font-medium text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* Additional Info */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Additional Information</label>
          <textarea rows={2} {...register("additional_info")} className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 bg-white transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-indigo-500 focus:ring-indigo-500/20"></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}