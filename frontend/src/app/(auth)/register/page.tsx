"use client";
// 1. ADDED: useState to remember the toggle state
import { useState } from 'react'; 
import Link from 'next/link';
// 2. ADDED: Eye and EyeOff icons
import { Upload, Eye, EyeOff } from 'lucide-react'; 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';

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
  
  // 3. ADDED: The memory switch for the password visibility
  const [showPassword, setShowPassword] = useState(false);

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
      alert("Account created successfully! Please sign in.");
      router.push('/login');
    } catch (error: any) {
      console.error("Registration failed:", error);
      alert("Django says: " + JSON.stringify(error.response?.data));
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
        <p className="text-sm text-gray-600 mt-2">Join the VendorBridge network</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="flex justify-center mb-6">
          <label className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
            <Upload className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-[10px] text-gray-500">Upload</span>
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" {...register("first_name")} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none" />
            {errors.first_name && <p className="text-red-600 text-xs mt-1">{errors.first_name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" {...register("last_name")} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none" />
            {errors.last_name && <p className="text-red-600 text-xs mt-1">{errors.last_name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" {...register("email")} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none" />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" {...register("phone")} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none" />
            {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select {...register("role")} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none">
              <option className="text-gray-900" value="">Select Role</option>
              <option className="text-gray-900" value="VENDOR">Vendor</option>
              <option className="text-gray-900" value="PROCUREMENT_OFFICER">Procurement Officer</option>
              <option className="text-gray-900" value="MANAGER">Manager / Approver</option>
              <option className="text-gray-900" value="ADMIN">Admin</option>
            </select>
            {errors.role && <p className="text-red-600 text-xs mt-1">{errors.role.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" {...register("country")} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none" />
            {errors.country && <p className="text-red-600 text-xs mt-1">{errors.country.message}</p>}
          </div>
        </div>

        {/* 4. UPDATED: Password field with relative container and eye button */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input 
              // The type dynamically changes based on the state!
              type={showPassword ? "text" : "password"} 
              {...register("password")} 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none" 
              placeholder="Create a strong password"
            />
            {/* The clickable Eye button positioned inside the input box */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 mt-1"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Information</label>
          <textarea rows={3} {...register("additional_info")} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none"></textarea>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition-colors">
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Sign in
        </Link>
      </p>
    </div>
  );
}