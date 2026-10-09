"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// FETCH CONTENT
export async function getPageContent(page: string) {
  const contents = await prisma.pageContent.findMany({
    where: { page }
  });
  
  // Transform to key-value map for easier use in components
  const contentMap: Record<string, any> = {};
  contents.forEach(c => {
    contentMap[`${c.section}_${c.key}`] = {
      textValue: c.textValue,
      imageUrl: c.imageUrl
    };
  });
  return contentMap;
}

// UPDATE CONTENT
export async function updateContent(page: string, section: string, key: string, textValue?: string, imageUrl?: string) {
  await prisma.pageContent.upsert({
    where: {
      page_section_key: { page, section, key }
    },
    update: { textValue, imageUrl },
    create: { page, section, key, textValue, imageUrl }
  });
  revalidatePath("/");
  revalidatePath(`/${page}`);
}

// HELPER TO GET ADMIN WHATSAPP NUMBER
export async function getAdminWhatsAppNumber() {
  try {
    const globalContent = await getPageContent("global");
    const contactContent = await getPageContent("kontak");
    const rawWa = globalContent?.["mobile_nav_whatsapp_number"]?.textValue;
    if (rawWa && !rawWa.includes("811")) {
      let clean = rawWa.replace(/\D/g, "");
      if (clean.startsWith("0")) clean = "62" + clean.slice(1);
      if (clean) return clean;
    }
    const phone = contactContent?.["info_phone"]?.textValue;
    if (phone && !phone.includes("811")) {
      let clean = phone.replace(/\D/g, "");
      if (clean.startsWith("0")) clean = "62" + clean.slice(1);
      if (clean) return clean;
    }
    return "6289637514407";
  } catch {
    return "6289637514407";
  }
}

export type ResellerLeadInput = {
  name?: string;
  whatsapp?: string;
  domisili?: string;
  paket?: string;
  experience?: string;
};

// SAVE RESELLER LEAD & RETURN WHATSAPP REDIRECT URL
export async function submitResellerLead(input: FormData | ResellerLeadInput) {
  try {
    let name = "";
    let whatsapp = "";
    let domisili = "";
    let paket = "";
    let experience = "";

    if (input instanceof FormData) {
      name = (input.get("name") as string || "").trim();
      whatsapp = (input.get("whatsapp") as string || "").trim();
      domisili = (input.get("domisili") as string || "").trim();
      paket = (input.get("paket") as string || "").trim();
      experience = (input.get("experience") as string || "").trim();
    } else if (input && typeof input === "object") {
      name = (input.name || "").trim();
      whatsapp = (input.whatsapp || "").trim();
      domisili = (input.domisili || "").trim();
      paket = (input.paket || "").trim();
      experience = (input.experience || "").trim();
    }

    if (!name || !whatsapp || !domisili || !paket || !experience) {
      return { success: false, error: "Mohon lengkapi seluruh kolom formulir pendaftaran." };
    }

    // Try saving to database safely (if database is writable)
    try {
      await prisma.resellerLead.create({
        data: { name, whatsapp, domisili, paket, experience }
      });
      revalidatePath("/admin/reseller");
      revalidatePath("/admin");
    } catch (dbError) {
      // If filesystem is read-only (like Vercel serverless with SQLite), do not block user!
      console.warn("Notice: Database save skipped or filesystem is read-only:", dbError);
    }

    const cleanAdminWa = await getAdminWhatsAppNumber();

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

    const message = `Halo Admin MU-LA, saya telah mengisi formulir pendaftaran kemitraan reseller di website MU-LA:

📋 *Data Pendaftaran Calon Reseller:*
• *Nama Lengkap:* ${name}
• *Nomor WhatsApp:* ${whatsapp}
• *Kota Domisili:* ${domisili}
• *Pilihan Paket Awal:* ${paketLabel}
• *Pengalaman Berjualan:* ${expLabel}

Mohon verifikasi pendaftaran saya dan info langkah selanjutnya untuk bergabung. Terima kasih!`;

    const whatsappUrl = `https://wa.me/${cleanAdminWa}?text=${encodeURIComponent(message)}`;

    return { 
      success: true, 
      whatsappUrl,
      data: {
        name,
        whatsapp,
        domisili,
        paket: paketLabel,
        experience: expLabel
      }
    };
  } catch (error: any) {
    console.error("Error in submitResellerLead:", error);
    const cleanAdminWa = "6289637514407";
    const fallbackUrl = `https://wa.me/${cleanAdminWa}?text=${encodeURIComponent("Halo Admin MU-LA, saya ingin mendaftar sebagai reseller MU-LA Collagen.")}`;
    return { success: true, whatsappUrl: fallbackUrl };
  }
}

// GET RESELLER LEADS (Admin)
export async function getResellerLeads() {
  return await prisma.resellerLead.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

// UPDATE RESELLER STATUS
export async function updateResellerStatus(id: string, status: string) {
  await prisma.resellerLead.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/admin/reseller");
}

// ARTICLES CMS
export async function getArticles(publishedOnly = true) {
  return await prisma.article.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: { createdAt: 'desc' }
  });
}

export async function getArticleBySlug(slug: string) {
  return await prisma.article.findFirst({
    where: { slug }
  });
}

export async function getArticleById(id: string) {
  return await prisma.article.findUnique({
    where: { id }
  });
}

export async function saveArticle(formData: FormData) {
  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const metaTitle = formData.get("metaTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;

  if (id) {
    await prisma.article.update({
      where: { id },
      data: { title, slug, excerpt, content, imageUrl, metaTitle, metaDescription }
    });
  } else {
    await prisma.article.create({
      data: { title, slug, excerpt, content, imageUrl, metaTitle, metaDescription }
    });
  }
  
  revalidatePath("/admin/artikel");
  revalidatePath("/artikel");
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/artikel");
  revalidatePath("/artikel");
}
