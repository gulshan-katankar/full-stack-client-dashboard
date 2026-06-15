export type OrderStatus = "draft" | "pending" | "in_progress" | "review" | "completed";

export interface Order {
  id: string;
  clientName: string;
  companyName: string;
  type: string;
  status: OrderStatus;
  date: string;
  amount: string;
}

export const recentOrders: Order[] = [
  {
    id: "ORD-001",
    clientName: "Shahid Miah",
    companyName: "Wavespace",
    type: "Landing Page Copy",
    status: "in_progress",
    date: "Oct 24, 2026",
    amount: "$450.00",
  },
  {
    id: "ORD-002",
    clientName: "Alice Johnson",
    companyName: "TechFlow",
    type: "Blog Post Series",
    status: "review",
    date: "Oct 22, 2026",
    amount: "$800.00",
  },
  {
    id: "ORD-003",
    clientName: "Michael Chen",
    companyName: "GrowthLabs",
    type: "Email Sequence",
    status: "completed",
    date: "Oct 20, 2026",
    amount: "$300.00",
  },
  {
    id: "ORD-004",
    clientName: "Sarah Connor",
    companyName: "CyberDyne",
    type: "Whitepaper",
    status: "pending",
    date: "Oct 18, 2026",
    amount: "$1,200.00",
  },
  {
    id: "ORD-005",
    clientName: "David Smith",
    companyName: "Acme Corp",
    type: "SEO Articles",
    status: "draft",
    date: "Oct 15, 2026",
    amount: "$500.00",
  },
];
