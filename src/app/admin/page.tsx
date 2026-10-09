import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const leads = await prisma.resellerLead.findMany({
    orderBy: { createdAt: "desc" }
  });
  
  const pendingLeads = leads.filter(l => l.status === "pending").length;
  const verifiedLeads = leads.filter(l => l.status === "verified").length;
  const articleCount = await prisma.article.count();

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
          Dashboard Overview
        </h1>
        <p style={{ color: "#64748b", fontSize: "1rem" }}>
          Selamat datang di panel kontrol resmi MU-LA Collagen. Pantau performa dan pendaftar terbaru di sini.
        </p>
      </div>
      
      {/* 4 Metric Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2.5rem"
      }}>
        {/* Total Leads */}
        <div style={{
          background: "white",
          padding: "1.75rem",
          borderRadius: "1rem",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>
          <div>
            <h3 style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Total Pendaftar Reseller
            </h3>
            <p style={{ fontSize: "2.25rem", fontWeight: "700", color: "#0f172a", lineHeight: 1 }}>
              {leads.length}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.5rem" }}>
              Peminat kemitraan masuk
            </p>
          </div>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "0.75rem",
            background: "#fffbeb",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem"
          }}>
            <i className="las la-users"></i>
          </div>
        </div>
        
        {/* Pending Follow-up */}
        <div style={{
          background: "white",
          padding: "1.75rem",
          borderRadius: "1rem",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>
          <div>
            <h3 style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Menunggu Follow-up
            </h3>
            <p style={{ fontSize: "2.25rem", fontWeight: "700", color: "#ef4444", lineHeight: 1 }}>
              {pendingLeads}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.5rem", fontWeight: "500" }}>
              Perlu segera dihubungi
            </p>
          </div>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "0.75rem",
            background: "#fef2f2",
            color: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem"
          }}>
            <i className="las la-bell"></i>
          </div>
        </div>

        {/* Verified Reseller */}
        <div style={{
          background: "white",
          padding: "1.75rem",
          borderRadius: "1rem",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>
          <div>
            <h3 style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Reseller Terverifikasi
            </h3>
            <p style={{ fontSize: "2.25rem", fontWeight: "700", color: "#10b981", lineHeight: 1 }}>
              {verifiedLeads}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#10b981", marginTop: "0.5rem", fontWeight: "500" }}>
              Mitra resmi aktif
            </p>
          </div>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "0.75rem",
            background: "#f0fdf4",
            color: "#10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem"
          }}>
            <i className="las la-check-circle"></i>
          </div>
        </div>

        {/* Total Articles */}
        <div style={{
          background: "white",
          padding: "1.75rem",
          borderRadius: "1rem",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>
          <div>
            <h3 style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Artikel Edukasi
            </h3>
            <p style={{ fontSize: "2.25rem", fontWeight: "700", color: "#3b82f6", lineHeight: 1 }}>
              {articleCount}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem" }}>
              Konten blog terbit
            </p>
          </div>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "0.75rem",
            background: "#eff6ff",
            color: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem"
          }}>
            <i className="las la-newspaper"></i>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div style={{
        background: "white",
        borderRadius: "1rem",
        border: "1px solid var(--border)",
        padding: "1.5rem 1.75rem",
        marginBottom: "2.5rem"
      }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
          Akses Cepat Pengelolaan
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem"
        }}>
          <Link href="/admin/content" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem",
            borderRadius: "0.75rem",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            textDecoration: "none",
            color: "#1e293b",
            fontWeight: "600",
            fontSize: "0.9rem",
            transition: "all 0.2s"
          }}>
            <i className="las la-edit" style={{ fontSize: "1.5rem", color: "var(--primary)" }}></i>
            <span>Kelola Konten &amp; Teks</span>
          </Link>

          <Link href="/admin/reseller" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem",
            borderRadius: "0.75rem",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            textDecoration: "none",
            color: "#1e293b",
            fontWeight: "600",
            fontSize: "0.9rem",
            transition: "all 0.2s"
          }}>
            <i className="las la-users" style={{ fontSize: "1.5rem", color: "#10b981" }}></i>
            <span>Kelola Leads Reseller</span>
          </Link>

          <Link href="/admin/artikel" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem",
            borderRadius: "0.75rem",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            textDecoration: "none",
            color: "#1e293b",
            fontWeight: "600",
            fontSize: "0.9rem",
            transition: "all 0.2s"
          }}>
            <i className="las la-newspaper" style={{ fontSize: "1.5rem", color: "#3b82f6" }}></i>
            <span>Kelola Artikel Blog</span>
          </Link>

          <Link href="/admin/settings" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem",
            borderRadius: "0.75rem",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            textDecoration: "none",
            color: "#1e293b",
            fontWeight: "600",
            fontSize: "0.9rem",
            transition: "all 0.2s"
          }}>
            <i className="las la-user-cog" style={{ fontSize: "1.5rem", color: "#8b5cf6" }}></i>
            <span>Pengaturan Akun &amp; Password</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div style={{
        background: "white",
        borderRadius: "1rem",
        border: "1px solid var(--border)",
        padding: "1.75rem",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a" }}>Pendaftar Reseller Terbaru</h2>
            <p style={{ color: "#64748b", fontSize: "0.85rem" }}>5 calon mitra yang baru saja mendaftar melalui formulir</p>
          </div>
          <Link href="/admin/reseller" style={{
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "var(--primary)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem"
          }}>
            Lihat Semua <i className="las la-arrow-right"></i>
          </Link>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                <th style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Nama</th>
                <th style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>WhatsApp</th>
                <th style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Domisili</th>
                <th style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Paket</th>
                <th style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "1rem", fontWeight: "600", color: "#1e293b" }}>{lead.name}</td>
                  <td style={{ padding: "1rem" }}>
                    <a 
                      href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: "#10b981", textDecoration: "none", fontWeight: "500", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                    >
                      <i className="lab la-whatsapp"></i> {lead.whatsapp}
                    </a>
                  </td>
                  <td style={{ padding: "1rem", color: "#64748b" }}>{lead.domisili}</td>
                  <td style={{ padding: "1rem", color: "#1e293b", fontWeight: "500" }}>{lead.paket}</td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{ 
                      padding: "0.35rem 0.75rem", 
                      borderRadius: "999px", 
                      fontSize: "0.75rem", 
                      fontWeight: "600",
                      background: lead.status === "pending" ? "#fee2e2" : lead.status === "verified" ? "#d1fae5" : "#fef3c7",
                      color: lead.status === "pending" ? "#991b1b" : lead.status === "verified" ? "#065f46" : "#92400e"
                    }}>
                      {lead.status === "pending" ? "Menunggu" : lead.status === "verified" ? "Terverifikasi" : "Dihubungi"}
                    </span>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>
                    Belum ada data pendaftar reseller yang masuk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
