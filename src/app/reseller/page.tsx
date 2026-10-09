import Link from "next/link";
import styles from "./page.module.css";

export default function ResellerLanding() {
  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1>Tumbuh Bersama MU-LA</h1>
          <p>Bergabunglah menjadi Mitra Reseller resmi MU-LA Collagen Drink. Dapatkan harga khusus, materi promosi, dan dukung lebih banyak wanita Indonesia merawat diri.</p>
          <Link href="/reseller/daftar" className={styles.heroBtn}>
            <span>Daftar Sekarang</span>
            <i className="las la-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className={styles.benefits}>
        <div className="container">
          <h2 style={{ textAlign: "center", fontSize: "2.5rem" }}>Keuntungan Reseller</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <i className="las la-tags"></i>
              <h3>Margin Kompetitif</h3>
              <p>Dapatkan harga grosir dengan potensi keuntungan margin yang menarik untuk setiap Box yang terjual.</p>
            </div>
            <div className={styles.benefitCard}>
              <i className="las la-images"></i>
              <h3>Marketing Kit</h3>
              <p>Tidak perlu repot desain. Kami sediakan foto produk HD, video, dan materi promosi setiap bulannya.</p>
            </div>
            <div className={styles.benefitCard}>
              <i className="las la-award"></i>
              <h3>Produk Berkualitas</h3>
              <p>Jual produk yang terbukti disukai (5000mg, Sugar Free). Repeat order tinggi karena dikonsumsi rutin.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Tiers */}
      <section className={styles.pricing}>
        <div className="container">
          <h2 style={{ fontSize: "2.5rem" }}>Sistem Kemitraan</h2>
          <p style={{ marginTop: "1rem" }}>Pilih paket pengambilan awal yang sesuai dengan target penjualan Anda.</p>
          
          <div className={styles.pricingTable}>
            <div className={styles.tierGrid}>
              <div className={styles.tierCard}>
                <h3>Silver</h3>
                <p>Pengambilan Awal</p>
                <div className={styles.tierPrice}>10 Box</div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Harga: Rp 75.000 / Box</p>
              </div>
              <div className={`${styles.tierCard} ${styles.highlight}`}>
                <h3>Gold</h3>
                <p>Pengambilan Awal</p>
                <div className={styles.tierPrice}>50 Box</div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Harga: Rp 65.000 / Box</p>
              </div>
              <div className={styles.tierCard}>
                <h3>Platinum</h3>
                <p>Pengambilan Awal</p>
                <div className={styles.tierPrice}>100 Box</div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Harga: Rp 55.000 / Box</p>
              </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Link href="/reseller/daftar" className="btn btn-primary" style={{ padding: "0.75rem 2rem" }}>Mulai Pendaftaran</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
