"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";

export default function Footer({ content }: { content?: Record<string, any> }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  // Mobile Bottom Navigation Settings from CMS
  const homeLabel = content?.["mobile_nav_home_label"]?.textValue || "Home";
  const homeUrl = content?.["mobile_nav_home_url"]?.textValue || "/";
  const tentangLabel = content?.["mobile_nav_tentang_label"]?.textValue || "Tentang";
  const tentangUrl = content?.["mobile_nav_tentang_url"]?.textValue || "/tentang";
  const resellerLabel = content?.["mobile_nav_reseller_label"]?.textValue || "Reseller";
  const resellerUrl = content?.["mobile_nav_reseller_url"]?.textValue || "/reseller";
  const waLabel = content?.["mobile_nav_whatsapp_label"]?.textValue || "WhatsApp";

  const rawWaNumber = content?.["mobile_nav_whatsapp_number"]?.textValue || content?.["info_phone"]?.textValue || "628110000000";
  let cleanWaNumber = rawWaNumber.replace(/\D/g, "");
  if (cleanWaNumber.startsWith("0")) {
    cleanWaNumber = "62" + cleanWaNumber.slice(1);
  }

  // Context-Aware WhatsApp Message (Teks Informasi Relevan Sesuai Halaman Pengunjung)
  const isResellerPage = pathname?.startsWith("/reseller");
  const isTentangPage = pathname?.startsWith("/tentang");
  const isKontakPage = pathname?.startsWith("/kontak");
  const isArtikelPage = pathname?.startsWith("/artikel");

  let defaultMsg = content?.["mobile_nav_whatsapp_message"]?.textValue || 
    "Halo Admin MU-LA, saya pengunjung dari website dan ingin menanyakan informasi seputar produk MU-LA Collagen.";

  if (isResellerPage) {
    defaultMsg = content?.["mobile_nav_whatsapp_reseller_message"]?.textValue || 
      "Halo Admin MU-LA, saya sedang di halaman Reseller dan berminat untuk bergabung menjadi mitra/reseller MU-LA. Boleh minta info syarat & paketnya?";
  } else if (isTentangPage) {
    defaultMsg = "Halo Admin MU-LA, saya sedang membaca profil Tentang MU-LA di website dan ingin konsultasi seputar produk MU-LA.";
  } else if (isKontakPage) {
    defaultMsg = "Halo Admin MU-LA, saya ingin menghubungi Customer Support MU-LA via WhatsApp.";
  } else if (isArtikelPage) {
    defaultMsg = "Halo Admin MU-LA, saya pengunjung website dari artikel MU-LA dan ingin bertanya seputar produk kolagen.";
  }

  const pageContextTag = pathname === "/" 
    ? "[Sumber: Halaman Beranda]"
    : `[Sumber: Halaman ${pathname}]`;

  const waFinalText = `${defaultMsg} ${pageContextTag}`;
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waFinalText)}`;

  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerAbout}>
              <Link href="/">
                <Image 
                  src={content?.["branding_logo"]?.textValue || "/logo.jpg"} 
                  alt="MU-LA Logo" 
                  width={120} 
                  height={40} 
                  className={styles.logoImg}
                  style={{ 
                    marginBottom: "1rem",
                    filter: "grayscale(1) invert(1) brightness(1.5)",
                    mixBlendMode: "screen"
                  }}
                />
              </Link>
              <p>{content?.["footer_about"]?.textValue || "Daily Collagen Drink dengan 5000mg kolagen, bebas gula, dan rasa Orange Honey yang menyegarkan. Dirancang untuk menemani rutinitas perawatan diri Anda setiap hari."}</p>
              
              {/* SOCIAL MEDIA ICONS (Screenshot_2 style) */}
              <div className={styles.socialRow}>
                <a
                  href={content?.["social_whatsapp"]?.textValue || "https://wa.me/628110000000"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <i className="lab la-whatsapp"></i>
                </a>
                <a
                  href={content?.["social_instagram"]?.textValue || "https://instagram.com/mula.collagen"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <i className="lab la-instagram"></i>
                </a>
                <a
                  href={content?.["social_facebook"]?.textValue || "https://facebook.com/mula.collagen"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <i className="lab la-facebook-f"></i>
                </a>
                <a
                  href={content?.["social_tiktok"]?.textValue || "https://tiktok.com/@mula.collagen"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="TikTok"
                  title="TikTok"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  </svg>
                </a>
              </div>

              {/* CERTIFICATION BADGE (Screenshot_2 style) */}
              <div className={styles.certBadge}>
                <i className="las la-shield-alt"></i>
                <span>BPOM RI MD &amp; Halal MUI Certified</span>
              </div>
            </div>
            <div className={styles.footerLinks}>
              <h4>Produk</h4>
              <ul>
                <li><Link href="/#beli">Beli MU-LA</Link></li>
                <li><Link href="/#ingredients">Ingredients</Link></li>
                <li><Link href="/#faq">Cara Konsumsi</Link></li>
              </ul>
            </div>
            <div className={styles.footerLinks}>
              <h4>Edukasi</h4>
              <ul>
                <li><Link href="/artikel">Blog Artikel</Link></li>
                <li><Link href="/artikel">Manfaat Collagen</Link></li>
                <li><Link href="/#faq">FAQ Lengkap</Link></li>
              </ul>
            </div>
            <div className={styles.footerLinks}>
              <h4>Perusahaan</h4>
              <ul>
                <li><Link href="/tentang">Tentang Kami</Link></li>
                <li><Link href="/reseller">Pendaftaran Reseller</Link></li>
                <li><Link href="/kontak">Hubungi Kami</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>{content?.["footer_copyright"]?.textValue || "© 2026 MU-LA Indonesia. All rights reserved."}</p>
            <p style={{ marginTop: "0.5rem" }}>
              <small>{content?.["footer_disclaimer"]?.textValue || "Informasi di website ini bersifat edukatif dan bukan pengganti saran medis profesional. Hasil dapat bervariasi pada setiap individu."}</small>
            </p>
          </div>
        </div>
      </footer>

      {/* APP-LIKE MOBILE BOTTOM NAVIGATION (Home, Tentang, Reseller, WhatsApp) */}
      <nav className={styles.mobileBottomNav} aria-label="Navigasi Bawah Mobile">
        <Link 
          href={homeUrl} 
          className={`${styles.bottomNavItem} ${pathname === "/" ? styles.bottomNavItemActive : ""}`}
        >
          <div className={styles.bottomNavIconWrap}>
            <i className="las la-home"></i>
          </div>
          <span className={styles.bottomNavLabel}>{homeLabel}</span>
        </Link>

        <Link 
          href={tentangUrl} 
          className={`${styles.bottomNavItem} ${pathname === "/tentang" ? styles.bottomNavItemActive : ""}`}
        >
          <div className={styles.bottomNavIconWrap}>
            <i className="las la-info-circle"></i>
          </div>
          <span className={styles.bottomNavLabel}>{tentangLabel}</span>
        </Link>

        <Link 
          href={resellerUrl} 
          className={`${styles.bottomNavItem} ${pathname?.startsWith("/reseller") ? styles.bottomNavItemActive : ""}`}
        >
          <div className={styles.bottomNavIconWrap}>
            <i className="las la-store"></i>
          </div>
          <span className={styles.bottomNavLabel}>{resellerLabel}</span>
        </Link>

        <a 
          href={waUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`${styles.bottomNavItem} ${styles.bottomNavWaItem}`}
          aria-label="Hubungi via WhatsApp"
        >
          <div className={`${styles.bottomNavIconWrap} ${styles.bottomNavWaIconWrap}`}>
            <i className="lab la-whatsapp"></i>
          </div>
          <span className={`${styles.bottomNavLabel} ${styles.bottomNavWaLabel}`}>{waLabel}</span>
        </a>
      </nav>
    </>
  );
}
