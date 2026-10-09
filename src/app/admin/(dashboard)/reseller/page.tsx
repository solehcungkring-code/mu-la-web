import { getResellerLeads, updateResellerStatus } from "@/app/actions";
import { revalidatePath } from "next/cache";

export default async function AdminReseller() {
  const leads = await getResellerLeads();

  async function handleStatusChange(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    await updateResellerStatus(id, status);
  }

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Kelola Data Reseller</h1>
      
      <div style={{ background: "white", borderRadius: "1rem", border: "1px solid var(--border)", overflowX: "auto", width: "100%", WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", minWidth: "800px", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f1f5f9", textAlign: "left" }}>
            <tr>
              <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>Tanggal</th>
              <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>Nama / Domisili</th>
              <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>WhatsApp</th>
              <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>Paket & Exp</th>
              <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>Status</th>
              <th style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "1rem" }}>{new Date(lead.createdAt).toLocaleDateString("id-ID")}</td>
                <td style={{ padding: "1rem" }}>
                  <strong>{lead.name}</strong><br />
                  <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{lead.domisili}</span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <a href={`https://wa.me/${lead.whatsapp.replace(/^0/, '62')}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "underline" }}>
                    {lead.whatsapp}
                  </a>
                </td>
                <td style={{ padding: "1rem" }}>
                  {lead.paket.toUpperCase()}<br/>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Exp: {lead.experience}</span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <span style={{ 
                    padding: "0.25rem 0.5rem", 
                    borderRadius: "0.25rem", 
                    fontSize: "0.75rem", 
                    background: lead.status === "pending" ? "#fee2e2" : "#d1fae5",
                    color: lead.status === "pending" ? "#991b1b" : "#065f46"
                  }}>
                    {lead.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <form action={handleStatusChange} style={{ display: "flex", gap: "0.5rem" }}>
                    <input type="hidden" name="id" value={lead.id} />
                    <select name="status" defaultValue={lead.status} style={{ padding: "0.25rem", borderRadius: "0.25rem", border: "1px solid var(--border)" }}>
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="verified">Verified</option>
                    </select>
                    <button type="submit" style={{ background: "var(--primary)", color: "white", border: "none", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", cursor: "pointer" }}>Update</button>
                  </form>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                  Belum ada data pendaftar reseller.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
