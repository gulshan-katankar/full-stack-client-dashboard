import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";

export default function BillingPage() {
  const invoices = [
    { id: "INV-2026-001", client: "Wavespace", amount: "$1,500.00", status: "completed", date: "Oct 24, 2026" },
    { id: "INV-2026-002", client: "TechFlow", amount: "$800.00", status: "pending", date: "Oct 22, 2026" },
    { id: "INV-2026-003", client: "GrowthLabs", amount: "$3,200.00", status: "completed", date: "Oct 15, 2026" },
    { id: "INV-2026-004", client: "CyberDyne", amount: "$450.00", status: "draft", date: "Oct 10, 2026" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#09090b] mb-4">Billing</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-semibold text-[#09090b]">Invoices</span>
          </div>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Outstanding</h3>
          <p className="text-3xl font-bold text-gray-900">$800.00</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Collected This Month</h3>
          <p className="text-3xl font-bold text-gray-900">$4,700.00</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Overdue</h3>
          <p className="text-3xl font-bold text-red-600">$0.00</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Invoice ID</th>
                <th className="px-6 py-4 font-semibold">Client</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4">{invoice.client}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={invoice.status as any} />
                  </td>
                  <td className="px-6 py-4">{invoice.date}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">{invoice.amount}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-indigo-600 shadow-none bg-transparent hover:bg-indigo-50">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
