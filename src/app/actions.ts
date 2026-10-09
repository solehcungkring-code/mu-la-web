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

// SAVE RESELLER LEAD
export async function submitResellerLead(formData: FormData) {
  const name = formData.get("name") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const domisili = formData.get("domisili") as string;
  const paket = formData.get("paket") as string;
  const experience = formData.get("experience") as string;

  await prisma.resellerLead.create({
    data: { name, whatsapp, domisili, paket, experience }
  });
  
  // In a real app, you might send a WhatsApp notification here
  return { success: true };
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
