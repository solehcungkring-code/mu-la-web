import Link from "next/link";
import Image from "next/image";
import { getArticles } from "../actions";

export const metadata = {
  title: "Artikel & Edukasi | MU-LA Collagen",
  description: "Baca artikel terbaru seputar kesehatan kulit, gaya hidup sehat, dan manfaat kolagen untuk keseharian Anda.",
};

export default async function ArtikelList() {
  const articles = await getArticles(true);

  return (
    <main style={{ minHeight: "100vh", padding: "5rem 0", background: "#f8fafc" }}>
      <div className="container">
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", textAlign: "center" }}>Artikel & Edukasi</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", textAlign: "center", marginBottom: "3rem", maxWidth: "600px", margin: "0 auto 3rem" }}>
          Kumpulan informasi seputar kesehatan kulit, manfaat kolagen, dan tips hidup sehat ala MU-LA.
        </p>

        {articles.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", background: "white", borderRadius: "1rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}>Artikel sedang disiapkan...</h2>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
            {articles.map(article => (
              <Link href={`/artikel/${article.slug}`} key={article.id} style={{ textDecoration: "none", color: "inherit", background: "white", borderRadius: "1rem", overflow: "hidden", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
                {article.imageUrl && (
                  <div style={{ position: "relative", width: "100%", height: "200px" }}>
                    <Image 
                      src={article.imageUrl} 
                      alt={article.title} 
                      fill 
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <span style={{ fontSize: "0.875rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
                    {new Date(article.createdAt).toLocaleDateString("id-ID")}
                  </span>
                  <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem", lineHeight: "1.4" }}>{article.title}</h2>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1 }}>
                    {article.excerpt}
                  </p>
                  <span style={{ color: "var(--primary)", fontWeight: "600", fontSize: "0.875rem" }}>Baca Selengkapnya &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
