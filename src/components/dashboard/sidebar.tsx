"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CheckSquare, 
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const mainLinks = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { href: "/dashboard/orders", icon: CheckSquare, label: "My Tasks" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-64 flex-col border-r border-[#2C293B] bg-[#1A1625] flex py-6 overflow-y-auto">
      {/* Brand */}
      <div className="px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3 text-white font-semibold text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-600">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
              <path d="M4 12L12 4L20 12L12 20L4 12Z" fill="currentColor" />
            </svg>
          </div>
          Taskbito
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-6">
        {/* Main Nav */}
        <nav className="flex flex-col px-3 gap-1">
          {mainLinks.map((item) => {
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href);
              
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex h-10 items-center gap-3 px-3 rounded-lg transition-colors text-sm font-medium",
                  isActive 
                    ? "bg-[#2D2342] text-white" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-indigo-400" : "text-gray-400")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
