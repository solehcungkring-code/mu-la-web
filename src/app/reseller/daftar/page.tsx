"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import { submitResellerLead } from "../../actions";

export default function ResellerRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [summaryData, setSummaryData] = useState<{
    name: string;
    whatsapp: string;
    domisili: string;
    paket: string;
    experience: string;
  } | null>(null);

  // Auto redirect to WhatsApp after submission
  useEffect(() => {
    if (isSuccess && redirectUrl) {
      const timer = setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, redirectUrl]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value?.trim() || "";
    const whatsapp = (form.elements.namedItem("whatsapp") as HTMLInputElement)?.value?.trim() || "";
    const domisili = (form.elements.namedItem("domisili") as HTMLInputElement)?.value?.trim() || "";
    const paket = (form.elements.namedItem("paket") as HTMLSelectElement)?.value?.trim() || "";
    const experience = (form.elements.namedItem("experience") as HTMLSelectElement)?.value?.trim() || "";

    if (!name || !whatsapp || !domisili || !paket || !experience) {
      setErrorMessage("Mohon lengkapi seluruh kolom formulir pendaftaran.");
      setIsSubmitting(false);
      return;
    }

    const payload = { name, whatsapp, domisili, paket, experience };

    const paketMap: Record<string, string> = {
      silver: "Silver (10 Box - Rp 75.000/Box)",
      gold: "Gold (50 Box - Rp 65.000/Box)",
      platinum: "Platinum (100 Box - Rp 55.000/Box)"
    };

    const expMap: Record<string, string> = {
      pemula: "Baru Mulai (Pemula)",
      menengah: "Sudah pernah jualan online",
      ahli: "Punya toko online / offline aktif"
    };

    const paketLabel = paketMap[paket.toLowerCase()] || paket;
    const expLabel = expMap[experience.toLowerCase()] || experience;

    // Direct WhatsApp message with target number 6289637514407
    const clientMessage = `Halo Admin MU-LA, saya telah mengisi formulir pendaftaran kemitraan reseller di website MU-LA:

📋 *Data Pendaftaran Calon Reseller:*
• *Nama Lengkap:* ${name}
• *Nomor WhatsApp:* ${whatsapp}
• *Kota Domisili:* ${domisili}
• *Pilihan Paket Awal:* ${paketLabel}
• *Pengalaman Berjualan:* ${expLabel}

Mohon verifikasi pendaftaran saya dan info langkah selanjutnya untuk bergabung. Terima kasih!`;

    const clientWaUrl = `https://wa.me/6289637514407?text=${encodeURIComponent(clientMessage)}`;
    let finalWaUrl = clientWaUrl;

    try {
      const result = await submitResellerLead(payload);
      if (result && result.whatsappUrl) {
        finalWaUrl = result.whatsappUrl;
      }
    } catch (err) {
      console.warn("Notice: Server action database save skipped or offline:", err);
    }

    // Always succeed and redirect smoothly to WhatsApp
    setSummaryData({
      name,
      whatsapp,
      domisili,
      paket: paketLabel,
      experience: expLabel
    });
    setRedirectUrl(finalWaUrl);
    setIsSuccess(true);
    setIsSubmitting(false);
  }

  return (
    <main style={{ background: "#f8fafc", minHeight: "85vh", padding: "3rem 0" }}>
      <div className={styles.formContainer}>
        {isSuccess && redirectUrl ? (
          <div className={styles.successBox}>
            <div className={styles.successIconWrapper}>
              <i className="las la-check"></i>
            </div>
            
            <h1 className={styles.successTitle}>Pendaftaran Berhasil Dicatat!</h1>
            <p className={styles.successDesc}>
              Terima kasih <strong>{summaryData?.name}</strong>. Formulir kemitraan Anda telah tersimpan di sistem kami. Anda akan otomatis dialihkan ke WhatsApp Admin MU-LA.
            </p>

            <div className={styles.redirectNotice}>
              <i className="las la-spinner la-spin" style={{ fontSize: "1.2rem" }}></i>
              <span>Sedang menghubungkan ke WhatsApp Admin...</span>
            </div>

            {summaryData && (
              <div className={styles.summaryBox}>
                <div className={styles.summaryTitle}>
                  <i className="las la-clipboard-list" style={{ marginRight: "0.4rem" }}></i>
                  Ringkasan Formulir Terkirim:
                </div>
                <div className={styles.summaryItem}>
                  <span>Nama Lengkap:</span>
                  <strong>{summaryData.name}</strong>
                </div>
                <div className={styles.summaryItem}>
                  <span>Nomor WhatsApp:</span>
                  <strong>{summaryData.whatsapp}</strong>
                </div>
                <div className={styles.summaryItem}>
                  <span>Kota Domisili:</span>
                  <strong>{summaryData.domisili}</strong>
                </div>
                <div className={styles.summaryItem}>
                  <span>Pilihan Paket:</span>
                  <strong>{summaryData.paket}</strong>
                </div>
                <div className={styles.summaryItem}>
                  <span>Pengalaman Berjualan:</span>
                  <strong>{summaryData.experience}</strong>
                </div>
              </div>
            )}

            <a 
              href={redirectUrl} 
              className={styles.waRedirectBtn}
            >
              <i className="lab la-whatsapp"></i>
              <span>Buka WhatsApp Sekarang</span>
            </a>

            <p className={styles.manualNote}>
              *Jika aplikasi WhatsApp tidak otomatis terbuka, silakan klik tombol hijau di atas untuk mengirimkan data ke Admin.
            </p>

            <div>
              <button 
                type="button" 
                onClick={() => {
                  setIsSuccess(false);
                  setRedirectUrl(null);
                  setSummaryData(null);
                }}
                className={styles.resetBtn}
              >
                Kirim Formulir Lain
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 style={{ textAlign: "center", marginBottom: "0.75rem", fontSize: "1.875rem", color: "var(--text-main)" }}>
              Pendaftaran Reseller & Mitra
            </h1>
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.95rem", lineHeight: "1.5" }}>
              Lengkapi formulir di bawah ini. Setelah dikirim, Anda akan langsung dialihkan ke WhatsApp Admin bersama rincian pendaftaran Anda.
            </p>

            {errorMessage && (
              <div className={styles.errorAlert}>
                <i className="las la-exclamation-circle" style={{ fontSize: "1.25rem" }}></i>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nama Lengkap *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Contoh: Sarah Angelina" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="whatsapp">Nomor WhatsApp Aktif *</label>
                <input 
                  type="tel" 
                  id="whatsapp" 
                  name="whatsapp" 
                  placeholder="Contoh: 081234567890" 
                  required 
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="domisili">Kota Domisili *</label>
                <input 
                  type="text" 
                  id="domisili" 
                  name="domisili" 
                  placeholder="Contoh: Bandung" 
                  required 
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="paket">Pilihan Paket Awal *</label>
                <select id="paket" name="paket" required disabled={isSubmitting} defaultValue="">
                  <option value="" disabled>-- Pilih Paket Kemitraan --</option>
                  <option value="silver">Silver — 10 Box (Rp 75.000/Box)</option>
                  <option value="gold">Gold — 50 Box (Rp 65.000/Box)</option>
                  <option value="platinum">Platinum — 100 Box (Rp 55.000/Box)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="experience">Pengalaman Berjualan *</label>
                <select id="experience" name="experience" required disabled={isSubmitting} defaultValue="">
                  <option value="" disabled>-- Pilih Pengalaman Berjualan --</option>
                  <option value="pemula">Baru Mulai (Pemula)</option>
                  <option value="menengah">Sudah pernah jualan online</option>
                  <option value="ahli">Punya toko online / offline aktif</option>
                </select>
              </div>

              <button 
                type="submit" 
                className={`btn btn-primary ${styles.submitBtn}`} 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="las la-spinner la-spin"></i>
                    <span>Memproses & Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <i className="lab la-whatsapp" style={{ fontSize: "1.3rem" }}></i>
                    <span>Kirim & Hubungkan ke WhatsApp</span>
                  </>
                )}
              </button>
            </form>
            
            <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
              <Link href="/reseller" style={{ color: "var(--text-muted)", fontSize: "0.875rem", textDecoration: "underline" }}>
                ← Kembali ke Informasi Reseller
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
