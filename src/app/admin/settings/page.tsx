import { getAdminSession } from "@/lib/auth";
import AdminSettingsForm from "@/components/AdminSettingsForm";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
          Pengaturan Akun &amp; Keamanan
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
          Kelola kredensial akses login administrator website MU-LA.
        </p>
      </div>

      <AdminSettingsForm currentEmail={session?.email || "admin@mu-la.id"} />
    </div>
  );
}
