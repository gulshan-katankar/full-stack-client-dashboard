import { FileText, Users, CheckCircle, DollarSign } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { OrderTable } from "@/components/dashboard/order-table";
import { getOrders } from "@/app/actions/orders";

export default async function DashboardHome() {
  const orders = await getOrders();

  const completedCount = orders.filter((o: any) => o.status === 'completed' || o.status === 'Completed').length;
  
  // Calculate active clients by unique client ID
  const activeClientsSet = new Set(orders.map((o: any) => o.clients?.id).filter(Boolean));
  const activeClientsCount = activeClientsSet.size;

  // Calculate total revenue from orders (assuming format like "$1,500.00")
  let totalRevenue = 0;
  orders.forEach((o: any) => {
    if (o.amount) {
      const num = parseInt(o.amount.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num)) totalRevenue += (num / 100);
    }
  });

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-[#09090b] mb-4">Dashboard</h1>
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-semibold text-[#09090b]">Overview</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Orders" 
          value={orders.length} 
          icon={FileText} 
          trend={{ value: "12%", isPositive: true }} 
        />
        <StatsCard 
          title="Active Clients" 
          value={activeClientsCount} 
          icon={Users} 
          trend={{ value: "4%", isPositive: true }} 
        />
        <StatsCard 
          title="Completed" 
          value={completedCount} 
          icon={CheckCircle} 
        />
        <StatsCard 
          title="Revenue" 
          value={`$${totalRevenue.toLocaleString()}`} 
          icon={DollarSign} 
          trend={{ value: "8%", isPositive: true }} 
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#09090b]">Recent Orders</h2>
        </div>
        <OrderTable orders={orders.slice(0, 5)} />
      </div>
    </div>
  );
}
