import { StatusBadge } from "@/components/ui/status-badge";

export function OrderTable({ orders }: { orders: any[] }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">Order ID</th>
              <th scope="col" className="px-6 py-4 font-semibold">Client</th>
              <th scope="col" className="px-6 py-4 font-semibold">Deliverable</th>
              <th scope="col" className="px-6 py-4 font-semibold">Status</th>
              <th scope="col" className="px-6 py-4 font-semibold">Date</th>
              <th scope="col" className="px-6 py-4 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => {
              const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
              
              return (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <span title={order.id}>{order.id.split('-')[0].toUpperCase()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {order.clients?.first_name} {order.clients?.last_name}
                    </div>
                    <div className="text-gray-500">{order.clients?.company_name}</div>
                  </td>
                  <td className="px-6 py-4">{order.type}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">{formattedDate}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">{order.amount}</td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
