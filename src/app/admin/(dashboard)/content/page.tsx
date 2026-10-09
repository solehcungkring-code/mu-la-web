import { getPageContent, updateContent } from "@/app/actions";
import { CONTENT_SCHEMA } from "./schema";

export default async function AdminContent() {
  // Fetch content for all pages defined in schema
  const dbData: Record<string, Record<string, any>> = {};
  
  for (const page of CONTENT_SCHEMA) {
    dbData[page.pageId] = await getPageContent(page.pageId);
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    const page = formData.get("page") as string;
    const section = formData.get("section") as string;
    const key = formData.get("key") as string;
    const textValue = formData.get("textValue") as string;
    
    await updateContent(page, section, key, textValue, undefined);
  }

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>CMS: Kelola Konten & Teks</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {CONTENT_SCHEMA.map(page => (
          <div key={page.pageId} style={{ background: "white", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1.5rem", color: "var(--primary)", borderBottom: "2px solid var(--primary)", paddingBottom: "0.5rem", display: "inline-block" }}>
              Halaman: {page.pageName}
            </h2>
            
            {page.sections.map(section => (
              <div key={section.id} style={{ marginBottom: "2.5rem" }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>
                  {section.title}
                </h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
                  {section.fields.map(field => {
                    const dbValue = dbData[page.pageId]?.[`${section.id}_${field.key}`]?.textValue;
                    const displayValue = dbValue !== undefined && dbValue !== null ? dbValue : field.default;
                    
                    return (
                      <form key={field.key} action={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", background: "#f8fafc", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #e2e8f0" }}>
                        <input type="hidden" name="page" value={page.pageId} />
                        <input type="hidden" name="section" value={section.id} />
                        <input type="hidden" name="key" value={field.key} />
                        
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <label style={{ fontWeight: "600", fontSize: "1rem" }}>{field.label}</label>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", background: "#e2e8f0", padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}>
                            {section.id}.{field.key}
                          </span>
                        </div>

                        {field.type === "textarea" ? (
                          <textarea 
                            name="textValue" 
                            rows={4}
                            defaultValue={displayValue} 
                            style={{ width: "100%", padding: "0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontFamily: "inherit", resize: "vertical" }} 
                          />
                        ) : (
                          <input 
                            type="text" 
                            name="textValue" 
                            defaultValue={displayValue} 
                            style={{ width: "100%", padding: "0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontFamily: "inherit" }} 
                          />
                        )}
                        
                        <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-end", padding: "0.5rem 1.5rem", fontSize: "0.875rem" }}>
                          Simpan Perubahan
                        </button>
                      </form>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
