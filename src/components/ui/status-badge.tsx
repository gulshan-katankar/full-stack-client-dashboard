import { cn } from "@/lib/utils";
import { OrderStatus } from "@/lib/mock-data";

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const statusConfig: Record<string, { label: string; classes: string }> = {
    draft: { label: "Draft", classes: "bg-gray-100 text-gray-700" },
    pending: { label: "Pending", classes: "bg-yellow-100 text-yellow-800" },
    in_progress: { label: "In Progress", classes: "bg-blue-100 text-blue-800" },
    review: { label: "In Review", classes: "bg-purple-100 text-purple-800" },
    completed: { label: "Completed", classes: "bg-green-100 text-green-800" },
    'To do': { label: "To do", classes: "bg-indigo-100 text-indigo-800" },
    'In Progress': { label: "In Progress", classes: "bg-orange-100 text-orange-800" },
    'In Reviewed': { label: "In Review", classes: "bg-yellow-100 text-yellow-800" },
    'Completed': { label: "Completed", classes: "bg-emerald-100 text-emerald-800" },
  };

  // Gracefully fallback if the status string isn't precisely mapped
  const config = statusConfig[status] || statusConfig[status?.toLowerCase()] || { 
    label: status || "Unknown", 
    classes: "bg-gray-100 text-gray-700" 
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  );
}
