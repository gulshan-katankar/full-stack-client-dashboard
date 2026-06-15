"use client";

import { useState, useEffect } from "react";
import { Order, OrderStatus, recentOrders } from "@/lib/mock-data";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("dashboard_orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    } else {
      setOrders(recentOrders);
      localStorage.setItem("dashboard_orders", JSON.stringify(recentOrders));
    }
    setIsLoaded(true);
  }, []);

  const addOrder = (order: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "pending",
    };
    
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem("dashboard_orders", JSON.stringify(updated));
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    localStorage.setItem("dashboard_orders", JSON.stringify(updated));
  };

  return {
    orders,
    addOrder,
    updateOrderStatus,
    isLoaded
  };
}
