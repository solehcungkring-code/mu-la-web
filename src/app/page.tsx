import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { getPageContent } from "./actions";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("home");
  return {
    title: content?.["seo_meta_title"]?.textValue || "MU-LA Collagen 5000mg - Premium Sugar Free",
    description: content?.["seo_meta_description"]?.textValue || "Dapatkan kulit cerah dan sehat dengan MU-LA Collagen 5000mg. Bebas gula dengan rasa Orange Honey yang nikmat.",
  };
}

export default async function Home() {
  const content = await getPageContent("home");
  
  const runningText = content?.["hero_running_text"]?.textValue || "Experience Premium Beauty, and Wellness Solutions with MU.LA";
  
  return (
    <>
      <main>
        {/* HERO SECTION */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroContainer}`}>
            <div className={`${styles.heroContent} animate-fade-in`}>
              <h1 dangerouslySetInnerHTML={{ __html: content?.["hero_title"]?.textValue || 'Daily Collagen, Dibuat untuk Dinikmati <span class="highlight">Setiap Hari.</span>' }} />
              <p>{content?.["hero_subtitle"]?.textValue || "MU-LA Collagen 5000 mg dengan rasa Orange Honey yang menyegarkan dan bebas gula."}</p>
              <div className={styles.heroActions}>
                <Link href="#beli" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}>
                  Beli MU-LA
                </Link>
                <Link href="#produk" className="btn btn-outline" style={{ padding: "1rem 2rem", fontSize: "1.125rem", border: "none" }}>
                  Kenali MU-LA <i className="las la-arrow-down"></i>
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <Image 
                src={content?.["hero_image"]?.textValue || "/banner-hero.png"}
                alt="MU-LA Collagen 5000 mg Orange Honey" 
                width={800}
                height={600}
                style={{ width: "100%", height: "auto", objectFit: "contain" }} 
                priority
              />
            </div>
          </div>
        </section>

        {/* RUNNING TEXT TICKER (Below Hero) */}
        <div className={styles.runningTicker} role="region" aria-label="Running text">
          <div className={styles.tickerTrack}>
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-1-${i}`} className={styles.tickerItem}>
                <span>{runningText}</span>
                <span className={styles.tickerBullet}>✦</span>
              </span>
            ))}
          </div>
          <div className={styles.tickerTrack} aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <span key={`ticker-2-${i}`} className={styles.tickerItem}>
                <span>{runningText}</span>
                <span className={styles.tickerBullet}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* PRODUCT SHOWCASE */}
        <section id="produk" className={`${styles.section} ${styles.showcase}`}>
          <div className={`container ${styles.showcaseGrid}`}>
            <div className={styles.heroImage} style={{ background: "transparent", boxShadow: "none" }}>
              <Image 
                src="/banner.png" 
                alt="MU-LA Box & Sachet Packaging" 
                width={800}
                height={600}
                style={{ width: "100%", height: "auto", objectFit: "contain" }} 
              />
            </div>
            <div className={styles.showcaseInfo}>
              <div className={styles.badges}>
                <span className={styles.badge}><i className="las la-check-circle"></i> BPOM MD 867031001531</span>
                <span className={styles.badge}><i className="las la-certificate"></i> Halal MUI</span>
              </div>
              <h3>MU-LA Collagen Drink 5000 mg</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.125rem", marginBottom: "1rem" }}>
                Minuman serbuk kolagen premium yang diformulasikan khusus untuk perawatan kulit dari dalam.
              </p>
              
              <ul className={styles.showcaseList}>
                <li><span>Kandungan Utama</span> <span>5.000 mg Collagen</span></li>
                <li><span>Rasa</span> <span>Orange Honey</span></li>
                <li><span>Gula</span> <span>0g (Sugar Free)</span></li>
                <li><span>Kemasan</span> <span>1 Box isi 7 Sachet (@15g)</span></li>
                <li><span>Aturan Pakai</span> <span>1-2 Sachet per hari</span></li>
              </ul>
              
              <Link href="#beli" className="btn btn-primary" style={{ width: "100%" }}>
                Beli Sekarang
              </Link>
            </div>
          </div>
        </section>

        {/* WHY MU-LA */}
        <section id="why" className={`${styles.section} ${styles.whySection}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Mengapa Memilih MU-LA?</h2>
            <p className={styles.sectionSubtitle}>Diformulasikan secara transparan untuk hasil yang nyata.</p>
            
            <div className={styles.whyGrid}>
              <div className={styles.whyCard}>
                <h3>5.000 mg Collagen</h3>
                <p>Kandungan kolagen optimal dalam setiap sachet (15g). Takaran yang pas untuk memenuhi kebutuhan harian kulit Anda agar tetap lembap dan elastis.</p>
              </div>
              <div className={styles.whyCard}>
                <h3>Sugar Free</h3>
                <p>Tanpa tambahan gula pasir (Zero Sugar). Menggunakan pemanis alami Stevia sehingga aman dikonsumsi rutin tanpa khawatir lonjakan kalori.</p>
              </div>
              <div className={styles.whyCard}>
                <h3>Orange Honey</h3>
                <p>Kami tahu kolagen sering berbau amis. MU-LA diformulasikan dengan ekstrak jeruk dan madu untuk memberikan rasa segar, tidak eneg, dan nikmat diseduh dingin.</p>
              </div>
              <div className={styles.whyCard}>
                <h3>Praktis & Higienis</h3>
                <p>Dikemas dalam sachet individual. Mudah dibawa ke kantor atau saat traveling. Cukup sobek, tuang ke gelas, dan seduh dengan 150ml air dingin.</p>
              </div>
            </div>
          </div>
        </section>

        {/* INGREDIENTS / WHAT'S INSIDE */}
        <section id="ingredients" className={`${styles.section} ${styles.ingredientSection}`}>
          <div className="container">
            <div className={styles.ingredientGrid}>
              <div className={styles.heroImage}>
                <Image 
                  src="/whats-inside.png" 
                  alt="Komposisi MU-LA" 
                  width={800} 
                  height={600} 
                  style={{ width: "100%", height: "auto", objectFit: "contain" }} 
                />
              </div>
              <div className={styles.ingredientList}>
                <div className={styles.ingredientItem}>
                  <h4>Hydrolyzed Collagen (5.000 mg)</h4>
                  <p>Partikel kolagen yang sudah dipecah agar lebih mudah diserap oleh tubuh untuk regenerasi sel kulit.</p>
                </div>
                <div className={styles.ingredientItem}>
                  <h4>Vitamin C</h4>
                  <p>Kofaktor penting yang membantu proses pembentukan dan penyerapan kolagen di dalam tubuh.</p>
                </div>
                <div className={styles.ingredientItem}>
                  <h4>Ekstrak Madu & Jeruk</h4>
                  <p>Memberikan aroma dan rasa alami yang menyegarkan, kaya akan antioksidan ringan.</p>
                </div>
                <div className={styles.ingredientItem}>
                  <h4>Stevia Extract</h4>
                  <p>Pemanis alami nol kalori yang menjaga kadar gula darah Anda tetap stabil.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className={`${styles.section} ${styles.compareSection}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Bandingkan Sendiri</h2>
            <p className={styles.sectionSubtitle}>Apa yang perlu Anda perhatikan saat memilih minuman kolagen.</p>
            
            <div style={{ overflowX: "auto" }}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th>Faktor</th>
                    <th>Yang Perlu Diperhatikan</th>
                    <th>Komposisi MU-LA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kandungan Kolagen</td>
                    <td>Berapa mg per serving (banyak yang di bawah 1000mg)</td>
                    <td><span className="text-accent" style={{ fontWeight: 600 }}>5.000 mg</span> per serving</td>
                  </tr>
                  <tr>
                    <td>Gula (Sugar)</td>
                    <td>Gula pasir / Dextrose yang memicu kalori tinggi</td>
                    <td><span className="text-accent" style={{ fontWeight: 600 }}>Sugar Free</span> (Stevia)</td>
                  </tr>
                  <tr>
                    <td>Rasa & Aroma</td>
                    <td>Apakah amis / terlalu manis / menggunakan perasa buatan tebal</td>
                    <td>Rasa segar <span className="text-accent" style={{ fontWeight: 600 }}>Orange Honey</span> alami</td>
                  </tr>
                  <tr>
                    <td>Berat Bersih</td>
                    <td>Sachet terlalu kecil (misal 5g) biasanya kolagennya sedikit</td>
                    <td><span className="text-accent" style={{ fontWeight: 600 }}>15 gram</span> per sachet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TRUST LAYER */}
        <section className={styles.trustSection}>
          <div className="container">
            <h2>Legalitas & Keamanan Terjamin</h2>
            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <i className="las la-check-circle"></i>
                <h4>BPOM Approved</h4>
                <p style={{ fontSize: "0.875rem", color: "#FFE08A" }}>MD 867031001531</p>
              </div>
              <div className={styles.trustItem}>
                <i className="las la-certificate"></i>
                <h4>Halal Indonesia</h4>
                <p style={{ fontSize: "0.875rem", color: "#FFE08A" }}>Tersertifikasi Halal MUI</p>
              </div>
              <div className={styles.trustItem}>
                <i className="las la-industry"></i>
                <h4>Standard GMP</h4>
                <p style={{ fontSize: "0.875rem", color: "#FFE08A" }}>Diproduksi di pabrik higienis</p>
              </div>
              <div className={styles.trustItem}>
                <i className="las la-leaf"></i>
                <h4>Allergen Info</h4>
                <p style={{ fontSize: "0.875rem", color: "#FFE08A" }}>Bebas alergen umum (cek kemasan)</p>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className={`${styles.section} ${styles.reviewSection}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Pengalaman Mereka</h2>
            <div className={styles.reviewGrid}>
              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewerName}>Sarah T.</span>
                  <span className={styles.verifiedBadge}><i className="las la-check-circle"></i> Verified</span>
                </div>
                <div className={styles.stars}>
                  <i className="las la-star"></i><i className="las la-star"></i><i className="las la-star"></i><i className="las la-star"></i><i className="las la-star"></i>
                </div>
                <p className={styles.reviewText}>
                  "Pembelian ke-3. Satu-satunya kolagen yang beneran sugar free dan rasanya nggak eneg sama sekali. Seger banget diminum dingin pagi-pagi."
                </p>
              </div>
              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewerName}>Dina M.</span>
                  <span className={styles.verifiedBadge}><i className="las la-check-circle"></i> Verified</span>
                </div>
                <div className={styles.stars}>
                  <i className="las la-star"></i><i className="las la-star"></i><i className="las la-star"></i><i className="las la-star"></i><i className="las la-star"></i>
                </div>
                <p className={styles.reviewText}>
                  "Suka banget sama rasa orange honey-nya. Nggak bau amis kolagen ikan pada umumnya. Kulit kerasa lebih lembap setelah rutin habis 2 box."
                </p>
              </div>
              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewerName}>Putri K.</span>
                  <span className={styles.verifiedBadge}><i className="las la-check-circle"></i> Verified</span>
                </div>
                <div className={styles.stars}>
                  <i className="las la-star"></i><i className="las la-star"></i><i className="las la-star"></i><i className="las la-star"></i><i className="las la-star"></i>
                </div>
                <p className={styles.reviewText}>
                  "Cari kolagen yang 5000mg dan harganya masuk akal tuh susah. MU-LA ini pas banget buat daily routine aku."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="beli" className={`${styles.section} ${styles.pricingSection}`}>
          <div className="container">
            <h2 className={styles.sectionTitle} style={{ color: "var(--text-main)" }}>Mulai Perawatan Anda Hari Ini</h2>
            <p className={styles.sectionSubtitle}>Pilih paket yang sesuai dengan kebutuhan Anda.</p>
            
            <div className={styles.pricingCards}>
              {/* Card 1 */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Starter</h3>
                <p className={styles.cardSubtitle}>1 Box (7 Sachet)</p>
                <p className={styles.cardPrice}>Rp 99.000</p>
                <ul className={styles.cardFeatures}>
                  <li><i className="las la-check"></i> Coba 1 minggu rutin</li>
                  <li><i className="las la-check"></i> 5.000 mg Kolagen / hari</li>
                  <li><i className="las la-times" style={{color: "#ccc"}}></i> Belum Termasuk Ongkir</li>
                </ul>
                <button className="btn btn-outline">Beli Starter</button>
              </div>

              {/* Card 2 - Highlighted */}
              <div className={`${styles.card} ${styles.cardHighlight}`}>
                <span className={styles.popularTag}>Best Seller</span>
                <h3 className={styles.cardTitle}>Routine</h3>
                <p className={styles.cardSubtitle}>3 Box (21 Sachet)</p>
                <p className={styles.cardPrice}>Rp 279.000</p>
                <ul className={styles.cardFeatures}>
                  <li><i className="las la-check"></i> Untuk 21 Hari</li>
                  <li><i className="las la-check"></i> Lebih Hemat Rp 18.000</li>
                  <li><i className="las la-check"></i> Free Ongkir (P. Jawa)</li>
                </ul>
                <button className="btn btn-primary">Beli Routine (Best Deal)</button>
              </div>

              {/* Card 3 */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Value Pack</h3>
                <p className={styles.cardSubtitle}>6 Box (42 Sachet)</p>
                <p className={styles.cardPrice}>Rp 529.000</p>
                <ul className={styles.cardFeatures}>
                  <li><i className="las la-check"></i> Hasil Maksimal (1 Bulan+)</li>
                  <li><i className="las la-check"></i> Hemat Rp 65.000</li>
                  <li><i className="las la-check"></i> Free Ongkir Seluruh ID</li>
                </ul>
                <button className="btn btn-outline">Beli Value Pack</button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={`${styles.section} ${styles.faqSection}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqContainer}>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>Apakah MU-LA aman dikonsumsi setiap hari? <i className="las la-angle-down"></i></h4>
                <p className={styles.faqAnswer}>Ya, MU-LA diformulasikan khusus sebagai "Daily Collagen Drink" dengan takaran 5.000 mg yang aman dan optimal untuk dikonsumsi rutin 1-2 sachet setiap hari.</p>
              </div>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>Kapan waktu terbaik minum MU-LA? <i className="las la-angle-down"></i></h4>
                <p className={styles.faqAnswer}>Dapat diminum pagi hari saat perut kosong untuk penyerapan maksimal, atau malam hari sebelum tidur untuk membantu proses regenerasi sel kulit saat istirahat.</p>
              </div>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>Apakah benar-benar bebas gula? <i className="las la-angle-down"></i></h4>
                <p className={styles.faqAnswer}>Benar. MU-LA tidak menggunakan gula pasir (sucrose) maupun fruktosa buatan. Kami menggunakan ekstrak Stevia sebagai pemanis alami nol kalori.</p>
              </div>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>Bagaimana cara menyeduhnya? <i className="las la-angle-down"></i></h4>
                <p className={styles.faqAnswer}>Tuangkan 1 sachet MU-LA ke dalam gelas, tambahkan 150ml air dingin atau air biasa (jangan gunakan air panas agar kandungan kolagen dan vitamin tidak rusak), aduk rata dan siap dinikmati.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
