import { notFound } from "next/navigation";
import Image from "next/image";
import { getArticleBySlug } from "../../actions";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Artikel Tidak Ditemukan" };
  
  return {
    title: article.metaTitle || `${article.title} | MU-LA Collagen`,
    description: article.metaDescription || article.excerpt,
  };
}

export default async function ArticleDetail({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  return (
    <main style={{ minHeight: "100vh", padding: "5rem 0", background: "white" }}>
      <article className="container" style={{ maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", lineHeight: "1.3" }}>
          {article.title}
        </h1>
        <div style={{ color: "var(--text-muted)", marginBottom: "3rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
          Diterbitkan pada {new Date(article.createdAt).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        {article.imageUrl && (
          <div style={{ position: "relative", width: "100%", height: "400px", borderRadius: "1rem", overflow: "hidden", marginBottom: "3rem" }}>
            <Image 
              src={article.imageUrl} 
              alt={article.title} 
              fill 
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        
        <div style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "var(--text)" }}>
          {/* In a real app, you'd use a markdown parser here if content is markdown. For simplicity we assume plain text or HTML */}
          <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br/>") }} />
        </div>
      </article>
    </main>
  );
}
