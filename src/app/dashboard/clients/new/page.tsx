"use client";

import { useRouter } from "next/navigation";
import { User, Mail, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClientAndOrder } from "@/app/actions/orders";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number is required"),
  address: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(2, "Zip code is required"),
});

export default function NewClientPage() {
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await createClientAndOrder({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.mobile,
      companyName: values.companyName,
      type: "Content Package", 
      amount: "$1,500.00",     
    });
    
    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Client & Order Created Successfully", {
      description: `${values.companyName} has been added to your clients.`,
    });
    
    router.push("/dashboard/orders");
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-[#09090b] mb-4">Clients</h1>
        <div className="flex items-center text-sm text-gray-500">
          <span>Clients</span>
          <span className="mx-2">/</span>
          <span className="font-semibold text-[#09090b]">New Client</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#09090b] mb-2">Welcome To The New Client Page</h2>
          <p className="text-gray-500">
            Enter First and Last Name or Company Name is Required To Save This Client.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-600">First Name</Label>
              <Input 
                id="firstName" 
                placeholder="Shahid" 
                icon={<User className="h-5 w-5" />} 
                {...register("firstName")}
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-600">Last Name</Label>
              <Input 
                id="lastName" 
                placeholder="Miah" 
                icon={<User className="h-5 w-5" />} 
                {...register("lastName")}
              />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-gray-600">Add a Company Name</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs">
                W
              </div>
              <Input 
                id="companyName" 
                placeholder="Wavespace" 
                className="pl-12"
                {...register("companyName")}
              />
            </div>
            {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-600">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="hello@wavespace.agency" 
                icon={<Mail className="h-5 w-5" />} 
                {...register("email")}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-gray-600">Mobile Number</Label>
              <div className="flex rounded-md border border-gray-200 focus-within:ring-1 focus-within:ring-gray-400">
                <div className="flex items-center px-3 border-r border-gray-200 bg-gray-50 text-sm gap-2 rounded-l-md text-gray-500">
                  <span className="text-lg leading-none">🇺🇸</span>
                </div>
                <input
                  id="mobile"
                  type="tel"
                  placeholder="0-000-0000-0000"
                  className="flex h-11 w-full rounded-r-md bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none"
                  {...register("mobile")}
                />
              </div>
              {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-gray-600">Address (Optional)</Label>
            <Input 
              id="address" 
              placeholder="Add a Address" 
              icon={<MapPin className="h-5 w-5" />} 
              {...register("address")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-gray-600">Country</Label>
              <Input id="country" {...register("country")} />
              {errors.country && <p className="text-red-500 text-xs">{errors.country.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-gray-600">State / Province</Label>
              <Input id="state" {...register("state")} />
              {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip" className="text-gray-600">Postal Code</Label>
              <Input id="zip" {...register("zip")} />
              {errors.zip && <p className="text-red-500 text-xs">{errors.zip.message}</p>}
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Client & Order"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
