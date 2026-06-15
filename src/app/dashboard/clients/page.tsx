import { redirect } from "next/navigation";

export default function ClientsPage() {
  // For now, redirect to the new client form since it's our primary page.
  redirect("/dashboard/clients/new");
}
