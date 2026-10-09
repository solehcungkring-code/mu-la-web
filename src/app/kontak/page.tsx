import styles from "../page.module.css"; 
import { getPageContent } from "../actions";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("kontak");
  return {
    title: content?.["seo_meta_title"]?.textValue || "Hubungi Kami | MU-LA Collagen",
    description: content?.["seo_meta_description"]?.textValue || "Punya pertanyaan seputar produk atau kemitraan MU-LA? Hubungi tim kami sekarang.",
  };
}

export default async function Kontak() {
  const content = await getPageContent("kontak");

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "white" }}>
      {/* Hero Section */}
      <section style={{ padding: "5rem 0 3rem", background: "var(--secondary)", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }} dangerouslySetInnerHTML={{ __html: content?.["hero_title"]?.textValue || "Hubungi Kami" }} />
          <p style={{ color: "var(--text-muted)", fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto" }}>
            {content?.["hero_subtitle"]?.textValue || "Punya pertanyaan seputar produk, kemitraan, atau ingin memberikan kritik dan saran? Tim MU-LA siap membantu Anda."}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          
          {/* Left Column: Info & Maps */}
          <div>
            <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Informasi Kontak</h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <i className="las la-map-marker" style={{ fontSize: "2rem", color: "var(--primary)" }}></i>
                <div>
                  <h3 style={{ fontSize: "1.125rem", marginBottom: "0.25rem" }}>Alamat Kantor</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: "1.6", whiteSpace: "pre-line" }}>
                    {content?.["info_address"]?.textValue || "Gedung Perkantoran Sudirman, Lt. 8\nJl. Jend. Sudirman No.Kav 10-11, Jakarta Pusat\nDKI Jakarta 10220"}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <i className="las la-envelope" style={{ fontSize: "2rem", color: "var(--primary)" }}></i>
                <div>
                  <h3 style={{ fontSize: "1.125rem", marginBottom: "0.25rem" }}>Email Resmi</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>{content?.["info_email"]?.textValue || "hello@mu-la.id"}</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <i className="las la-phone" style={{ fontSize: "2rem", color: "var(--primary)" }}></i>
                <div>
                  <h3 style={{ fontSize: "1.125rem", marginBottom: "0.25rem" }}>Nomor Kontak / WhatsApp</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>{content?.["info_phone"]?.textValue || "+62 811-0000-0000"}</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <i className="las la-clock" style={{ fontSize: "2rem", color: "var(--primary)" }}></i>
                <div>
                  <h3 style={{ fontSize: "1.125rem", marginBottom: "0.25rem" }}>Jam Operasional</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: "1.6", whiteSpace: "pre-line" }}>
                    {content?.["info_hours"]?.textValue || "Senin - Jumat: 09.00 - 17.00 WIB\nSabtu: 09.00 - 13.00 WIB\nMinggu & Hari Libur Nasional: Tutup"}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "1rem" }}>Lokasi Kami</h3>
              <div style={{ width: "100%", height: "250px", borderRadius: "1rem", overflow: "hidden", border: "1px solid var(--border)" }}>
                <iframe 
                  src={content?.["info_maps_url"]?.textValue || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24072847065!2d106.74100695026919!3d-6.229746535564024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>

          {/* Right Column: Feedback Form */}
          <div>
            <div style={{ background: "#f8fafc", padding: "2.5rem", borderRadius: "1.5rem", border: "1px solid var(--border)" }}>
              <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Tinggalkan Pesan</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Silakan isi formulir di bawah ini untuk mengirimkan kritik, saran, atau pertanyaan.</p>
              
              <form action="#" method="POST" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <label htmlFor="nama" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Nama Lengkap *</label>
                  <input type="text" id="nama" name="nama" placeholder="Masukkan nama Anda" required style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontFamily: "inherit" }} />
                </div>

                <div>
                  <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Alamat Email *</label>
                  <input type="email" id="email" name="email" placeholder="Contoh: sarah@email.com" required style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontFamily: "inherit" }} />
                </div>

                <div>
                  <label htmlFor="kategori" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Kategori *</label>
                  <select id="kategori" name="kategori" required style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontFamily: "inherit" }}>
                    <option value="">-- Pilih Kategori --</option>
                    <option value="pertanyaan">Pertanyaan Seputar Produk</option>
                    <option value="kemitraan">Informasi Kemitraan/Reseller</option>
                    <option value="kritik">Kritik & Keluhan</option>
                    <option value="saran">Saran & Masukan</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pesan" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Pesan Anda *</label>
                  <textarea id="pesan" name="pesan" rows={5} placeholder="Tuliskan pesan Anda di sini..." required style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", fontFamily: "inherit", resize: "vertical" }}></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: "1rem", marginTop: "0.5rem", fontSize: "1.125rem", width: "100%" }}>
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Style for responsive layout specifically for this page */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .container { padding: 0 1.5rem; }
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}} />
    </main>
  );
}
