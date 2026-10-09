import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminLoginForm from "@/components/AdminLoginForm";

export default async function AdminLoginPage() {
  try {
    const session = await getAdminSession();
    if (session) {
      redirect("/admin");
    }
  } catch (err) {
    // Safely render login form if session check encounters cold-start or DB delay
  }

  return <AdminLoginForm />;
}
