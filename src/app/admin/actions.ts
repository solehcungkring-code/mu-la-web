"use server";

import { prisma } from "@/lib/prisma";
import { 
  verifyPassword, 
  hashPassword, 
  setAdminSession, 
  clearAdminSession, 
  getAdminSession,
  ensureDefaultAdmin 
} from "@/lib/auth";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";

export async function loginAdminAction(prevState: any, formData: FormData) {
  await ensureDefaultAdmin();

  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  // Find admin user by email (or username fallback)
  const user = await prisma.adminUser.findFirst({
    where: {
      OR: [
        { email: email },
        { username: email }
      ]
    }
  });

  if (!user) {
    return { error: "Email atau password tidak ditemukan." };
  }

  const isValid = verifyPassword(password, user.password);
  if (!isValid) {
    return { error: "Email atau password yang Anda masukkan salah." };
  }

  await setAdminSession(user.id, user.email);
  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function updateAdminEmailAction(prevState: any, formData: FormData) {
  const session = await getAdminSession();
  if (!session) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

  const newEmail = (formData.get("newEmail") as string)?.trim().toLowerCase();
  const currentPassword = formData.get("currentPassword") as string;

  if (!newEmail || !newEmail.includes("@")) {
    return { error: "Format email baru tidak valid." };
  }

  if (!currentPassword) {
    return { error: "Masukkan password saat ini untuk konfirmasi." };
  }

  const user = await prisma.adminUser.findUnique({
    where: { id: session.id }
  });

  if (!user || !verifyPassword(currentPassword, user.password)) {
    return { error: "Password konfirmasi salah." };
  }

  // Check if new email is already taken by another account
  const existing = await prisma.adminUser.findFirst({
    where: {
      email: newEmail,
      NOT: { id: user.id }
    }
  });

  if (existing) {
    return { error: "Email baru sudah digunakan oleh akun lain." };
  }

  await prisma.adminUser.update({
    where: { id: user.id },
    data: { email: newEmail }
  });

  // Refresh session with new email
  await setAdminSession(user.id, newEmail);
  revalidatePath("/admin");
  revalidatePath("/admin/settings");

  return { success: true, message: `Email berhasil diubah menjadi ${newEmail}` };
}

export async function updateAdminPasswordAction(prevState: any, formData: FormData) {
  const session = await getAdminSession();
  if (!session) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "Semua kolom password wajib diisi." };
  }

  if (newPassword.length < 6) {
    return { error: "Password baru minimal 6 karakter." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Konfirmasi password baru tidak cocok." };
  }

  const user = await prisma.adminUser.findUnique({
    where: { id: session.id }
  });

  if (!user || !verifyPassword(currentPassword, user.password)) {
    return { error: "Password saat ini salah." };
  }

  const newHashed = hashPassword(newPassword);

  await prisma.adminUser.update({
    where: { id: user.id },
    data: { password: newHashed }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/settings");

  return { success: true, message: "Password berhasil diperbarui dengan sukses." };
}
