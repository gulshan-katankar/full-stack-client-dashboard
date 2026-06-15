"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createClientAndOrder(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  type: string;
  amount: string;
}) {
  const supabase = await createClient();

  // Insert Client
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .insert({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company_name: formData.companyName,
    })
    .select()
    .single();

  if (clientError) {
    console.error("Client Error:", clientError);
    return { error: `Database Error: ${clientError.message}` };
  }

  // Insert Order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      client_id: client.id,
      type: formData.type,
      amount: formData.amount,
      status: 'To do',
      priority: 'High'
    })
    .select()
    .single();

  if (orderError) {
    console.error("Order Error:", orderError);
    return { error: `Database Error: ${orderError.message}` };
  }

  revalidatePath('/dashboard/orders');
  return { success: true, order, client };
}

export async function getOrders() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      type,
      amount,
      status,
      priority,
      created_at,
      clients (
        id,
        first_name,
        last_name,
        company_name
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Get Orders Error:", error);
    return [];
  }

  return data;
}

export async function getClients() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('clients')
    .select('id, first_name, last_name, company_name')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Get Clients Error:", error);
    return [];
  }
  return data;
}

export async function createOrderOnly(formData: {
  clientId: string;
  type: string;
  amount: string;
  priority: string;
}) {
  const supabase = await createClient();

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      client_id: formData.clientId,
      type: formData.type,
      amount: formData.amount,
      status: 'To do',
      priority: formData.priority || 'High'
    })
    .select()
    .single();

  if (orderError) {
    console.error("Order Error:", orderError);
    return { error: `Database Error: ${orderError.message}` };
  }

  revalidatePath('/dashboard/orders');
  revalidatePath('/dashboard');
  return { success: true, order };
}
