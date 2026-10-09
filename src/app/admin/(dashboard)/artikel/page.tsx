import Link from "next/link";
import { getArticles, getArticleById, saveArticle, deleteArticle } from "@/app/actions";

export default async function AdminArtikel(props: { searchParams: Promise<{ edit?: string }> }) {
  const searchParams = await props.searchParams;
  const articles = await getArticles(false);
  let editArticle = null;
  if (searchParams?.edit) {
    editArticle = await getArticleById(searchParams.edit);
  }

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>CMS: Kelola Artikel & Blog</h1>
      
      {/* Add / Edit Article Form */}
      <div style={{ background: "white", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", margin: 0 }}>{editArticle ? "Edit Artikel" : "Tulis Artikel Baru"}</h2>
          {editArticle && (
            <Link href="/admin/artikel" className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>Batal Edit</Link>
          )}
        </div>
        
        <form action={saveArticle} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {editArticle && <input type="hidden" name="id" value={editArticle.id} />}
          
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Judul Artikel</label>
            <input type="text" name="title" defaultValue={editArticle?.title || ""} required style={{ width: "100%", padding: "0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>URL Gambar Sampul (Opsional)</label>
            <input type="text" name="imageUrl" defaultValue={editArticle?.imageUrl || ""} placeholder="/banner-artikel.jpg atau https://..." style={{ width: "100%", padding: "0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Ringkasan (Excerpt)</label>
            <textarea name="excerpt" rows={2} defaultValue={editArticle?.excerpt || ""} required style={{ width: "100%", padding: "0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Konten Lengkap</label>
            <textarea name="content" rows={8} defaultValue={editArticle?.content || ""} required style={{ width: "100%", padding: "0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }} />
          </div>
          
          <h3 style={{ fontSize: "1.25rem", marginTop: "1rem", color: "var(--primary)" }}>SEO Pengaturan</h3>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Meta Title</label>
            <input type="text" name="metaTitle" defaultValue={editArticle?.metaTitle || ""} style={{ width: "100%", padding: "0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Meta Description</label>
            <textarea name="metaDescription" rows={2} defaultValue={editArticle?.metaDescription || ""} style={{ width: "100%", padding: "0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start", marginTop: "1rem" }}>
            {editArticle ? "Simpan Perubahan" : "Terbitkan Artikel"}
          </button>
        </form>
      </div>

      {/* List Existing Articles */}
      <div style={{ background: "white", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Daftar Artikel</h2>
        {articles.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>Belum ada artikel yang diterbitkan.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {articles.map(article => (
              <div key={article.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", border: "1px solid #e2e8f0", borderRadius: "0.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.125rem", marginBottom: "0.25rem" }}>{article.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>/{article.slug}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <Link href={`/admin/artikel?edit=${article.id}`} style={{ color: "var(--primary)", textDecoration: "underline", fontSize: "0.875rem" }}>
                    Edit
                  </Link>
                  <form action={async () => { "use server"; await deleteArticle(article.id); }}>
                    <button type="submit" style={{ color: "red", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontSize: "0.875rem" }}>
                      Hapus
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
