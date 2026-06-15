"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, DollarSign, ListTodo } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getClients, createOrderOnly } from "@/app/actions/orders";

const formSchema = z.object({
  clientId: z.string().min(1, "Please select a client"),
  type: z.string().min(2, "Deliverable type is required"),
  amount: z.string().min(1, "Amount is required"),
  priority: z.string().default("High"),
});

export default function NewOrderPage() {
  const router = useRouter();
  const [clients, setClients] = useState<any[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      const data = await getClients();
      setClients(data);
      setIsLoadingClients(false);
    }
    fetchClients();
  }, []);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority: "High",
      type: "Content Package",
      amount: "$1,500.00"
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await createOrderOnly({
      clientId: values.clientId,
      type: values.type,
      amount: values.amount,
      priority: values.priority,
    });
    
    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Order Created Successfully", {
      description: `The new task has been added to your board.`,
    });
    
    router.push("/dashboard/orders");
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-[#09090b] mb-4">New Order</h1>
        <div className="flex items-center text-sm text-gray-500">
          <span>My Tasks</span>
          <span className="mx-2">/</span>
          <span className="font-semibold text-[#09090b]">New Order</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#09090b] mb-2">Create a New Deliverable</h2>
          <p className="text-gray-500">
            Attach a new order or task to an existing client.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="clientId" className="text-gray-600">Select Client</Label>
            {isLoadingClients ? (
              <div className="h-11 w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <select 
                id="clientId" 
                className="flex h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                {...register("clientId")}
              >
                <option value="">-- Choose a Client --</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.company_name} ({client.first_name} {client.last_name})
                  </option>
                ))}
              </select>
            )}
            {errors.clientId && <p className="text-red-500 text-xs">{errors.clientId.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-gray-600">Deliverable Type</Label>
              <Input 
                id="type" 
                placeholder="e.g. Content Package, Web Design" 
                icon={<FileText className="h-5 w-5" />} 
                {...register("type")}
              />
              {errors.type && <p className="text-red-500 text-xs">{errors.type.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-600">Amount / Value</Label>
              <Input 
                id="amount" 
                placeholder="$1,500.00" 
                icon={<DollarSign className="h-5 w-5" />} 
                {...register("amount")}
              />
              {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority" className="text-gray-600">Priority Level</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center text-gray-400">
                <ListTodo className="h-5 w-5" />
              </div>
              <select 
                id="priority" 
                className="flex h-11 w-full rounded-md border border-gray-200 bg-white pl-10 pr-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                {...register("priority")}
              >
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700">
              {isSubmitting ? "Creating..." : "Create Order"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
