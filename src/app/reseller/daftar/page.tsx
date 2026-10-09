import Link from "next/link";
import styles from "../page.module.css";

import { submitResellerLead } from "../../actions";

export default function ResellerRegistration() {
  return (
    <main style={{ background: "#f8fafc", minHeight: "80vh", padding: "4rem 0" }}>
      <div className={styles.formContainer}>
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Pendaftaran Reseller</h1>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "2rem" }}>
          Lengkapi form di bawah ini. Tim kami akan menghubungi Anda via WhatsApp untuk proses verifikasi.
        </p>

        <form action={async (formData) => {
          "use server";
          await submitResellerLead(formData);
          // In a real app, we would redirect or show success message here.
        }}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nama Lengkap</label>
            <input type="text" id="name" name="name" placeholder="Contoh: Sarah Angelina" required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="whatsapp">Nomor WhatsApp</label>
            <input type="tel" id="whatsapp" name="whatsapp" placeholder="Contoh: 081234567890" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="domisili">Kota Domisili</label>
            <input type="text" id="domisili" name="domisili" placeholder="Contoh: Bandung" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="paket">Pilihan Paket Awal</label>
            <select id="paket" name="paket" required>
              <option value="">-- Pilih Paket --</option>
              <option value="silver">Silver (10 Box)</option>
              <option value="gold">Gold (50 Box)</option>
              <option value="platinum">Platinum (100 Box)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="experience">Pengalaman Berjualan</label>
            <select id="experience" name="experience" required>
              <option value="">-- Pilih Pengalaman --</option>
              <option value="pemula">Baru Mulai (Pemula)</option>
              <option value="menengah">Sudah pernah jualan online</option>
              <option value="ahli">Punya toko online / offline aktif</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "1rem", marginTop: "1rem" }}>
            Kirim Pendaftaran
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link href="/reseller" style={{ color: "var(--text-muted)", fontSize: "0.875rem", textDecoration: "underline" }}>
            Kembali ke Informasi Reseller
          </Link>
        </div>
      </div>
    </main>
  );
}
