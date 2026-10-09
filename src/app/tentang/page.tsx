import Image from "next/image";
import Link from "next/link";
import { getPageContent } from "../actions";
import { Metadata } from "next";
import styles from "./tentang.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("tentang");
  return {
    title: content?.["seo_meta_title"]?.textValue || "Tentang Kami | MU-LA Collagen",
    description: content?.["seo_meta_description"]?.textValue || "Pelajari lebih lanjut tentang misi MU-LA dalam menghadirkan minuman kolagen premium yang terjangkau untuk wanita Indonesia.",
  };
}

export default async function Tentang() {
  const content = await getPageContent("tentang");
  
  return (
    <main className={styles.mainWrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.pillBadge}>
            <i className="las la-sparkles"></i>
            <span>Profil & Nilai Brand</span>
          </div>
          <h1 
            className={styles.heroTitle}
            dangerouslySetInnerHTML={{ __html: content?.["hero_title"]?.textValue || "Tentang MU-LA" }} 
          />
          <p className={styles.heroSubtitle}>
            {content?.["hero_subtitle"]?.textValue || "Lebih dari sekadar minuman kolagen. Kami hadir untuk merevolusi rutinitas perawatan diri harian wanita Indonesia menjadi lebih sehat, transparan, dan nikmat."}
          </p>
        </div>
      </section>

      {/* Quick Highlights / Stats Strip */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="las la-prescription-bottle-alt"></i>
            </div>
            <div className={styles.statValue}>5.000 mg</div>
            <div className={styles.statLabel}>Kolagen Murni / Sachet</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="las la-leaf"></i>
            </div>
            <div className={styles.statValue}>Sugar Free</div>
            <div className={styles.statLabel}>100% Pemanis Alami Stevia</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="las la-apple-alt"></i>
            </div>
            <div className={styles.statValue}>Orange Honey</div>
            <div className={styles.statLabel}>Rasa Segar Alami Bebas Amis</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="las la-certificate"></i>
            </div>
            <div className={styles.statValue}>Teruji Legal</div>
            <div className={styles.statLabel}>Resmi BPOM & Halal MUI</div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyGrid}>
          <div className={styles.storyMediaWrapper}>
            <div className={styles.storyImageCard}>
              <Image 
                src="/banner-hero.png" 
                alt="MU-LA Collagen Drink" 
                width={500} 
                height={500} 
                className={styles.storyImage}
                priority
              />
              <div className={styles.storyBadgeFloat}>
                <i className="las la-check-circle"></i>
                <span>Formula Premium Asli</span>
              </div>
            </div>
          </div>

          <div className={styles.storyContent}>
            <span className={styles.sectionTag}>Kisah di Balik MU-LA</span>
            <h2 className={styles.storyTitle}>
              {content?.["story_title"]?.textValue || "Berawal dari Kebutuhan Nyata"}
            </h2>
            <p className={styles.storyLeadText}>
              {content?.["story_para1"]?.textValue || "Banyak wanita menyadari pentingnya asupan kolagen untuk menjaga elastisitas kulit dan kesehatan tubuh seiring bertambahnya usia. Namun, menemukan minuman kolagen yang benar-benar berkualitas tidaklah mudah."}
            </p>
            <p className={styles.storyBodyText}>
              {content?.["story_para2"]?.textValue || "Sebagian besar produk di pasaran memiliki kandungan gula yang sangat tinggi, rasanya amis, atau harganya tidak terjangkau untuk konsumsi harian. Berangkat dari masalah inilah MU-LA lahir."}
            </p>
            
            <div className={styles.storyQuoteBox}>
              <p className={styles.storyQuoteText}>
                &ldquo;Kami berkomitmen memformulasikan suplemen harian yang jujur, lezat, dan aman dikonsumsi jangka panjang tanpa khawatir asupan gula berlebih.&rdquo;
              </p>
            </div>

            <p className={styles.storyBodyText} style={{ marginTop: "1rem" }}>
              {content?.["story_para3"]?.textValue || "Kami berkomitmen memformulasikan minuman kolagen yang jujur: 5000mg kolagen murni, bebas gula pasir (Sugar Free) menggunakan pemanis alami Stevia, serta rasa Orange Honey yang sangat menyegarkan."}
            </p>
          </div>
        </div>
      </section>

      {/* Filosofi / Core Values */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Prinsip Kami</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.35rem)", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>
              Filosofi & Nilai Brand
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
              Tiga pilar fundamental yang melandasi setiap formulasi, pelayanan, dan ekosistem di MU-LA.
            </p>
          </div>
          
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIconWrapper}>
                <i className="las la-search"></i>
              </div>
              <div>
                <h3 className={styles.valueTitle}>Transparansi</h3>
                <p className={styles.valueDesc}>
                  Tidak ada klaim berlebihan atau bahan pengisi yang disembunyikan. Semua takaran nutrisi, termasuk 5000mg kolagen kami, diukur secara saintifik.
                </p>
              </div>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIconWrapper}>
                <i className="las la-shield-alt"></i>
              </div>
              <div>
                <h3 className={styles.valueTitle}>Kualitas Tanpa Kompromi</h3>
                <p className={styles.valueDesc}>
                  Kesehatan Anda adalah prioritas. Kami hanya menggunakan bahan baku premium dan bersertifikasi BPOM serta Halal MUI agar aman dikonsumsi jangka panjang.
                </p>
              </div>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIconWrapper}>
                <i className="las la-hands-helping"></i>
              </div>
              <div>
                <h3 className={styles.valueTitle}>Pemberdayaan</h3>
                <p className={styles.valueDesc}>
                  Selain produk, kami membangun ekosistem Reseller untuk membantu perempuan Indonesia mandiri secara finansial dari rumah dengan bimbingan berkelanjutan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <Image 
            src="/banner.png" 
            alt="MU-LA Packaging Box" 
            width={380} 
            height={260} 
            className={styles.ctaImage}
          />
          <h2 className={styles.ctaTitle}>
            Mulai Perjalanan Anda Bersama MU-LA
          </h2>
          <p className={styles.ctaSubtitle}>
            Jadikan MU-LA sebagai bagian tak terpisahkan dari rutinitas perawatan diri harian Anda, dan rasakan perubahannya dari dalam ke luar.
          </p>
          <div className={styles.ctaButtonRow}>
            <Link href="/#beli" className={`btn btn-primary ${styles.btnPrimaryCta}`}>
              <span>Beli MU-LA Sekarang</span>
              <i className="las la-arrow-right"></i>
            </Link>
            <Link href="/reseller" className={`btn btn-outline ${styles.btnOutlineCta}`}>
              <span>Gabung Jadi Reseller</span>
              <i className="las la-users"></i>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
