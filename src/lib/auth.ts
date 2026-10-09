import { cookies } from "next/headers";
import { connection } from "next/server";
import crypto from "crypto";
import { prisma } from "./prisma";

const SECRET = process.env.ADMIN_JWT_SECRET || "mula-collagen-admin-secret-key-2026";

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, combined: string): boolean {
  if (!combined) return false;
  // Fallback for plain text if any legacy records
  if (!combined.includes(":")) {
    return password === combined;
  }
  const [salt, originalHash] = combined.split(":");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(originalHash));
}

function signToken(payload: string): string {
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(payload);
  return `${payload}.${hmac.digest("hex")}`;
}

function verifyToken(token: string): string | null {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return null;
  const payload = token.substring(0, lastDot);
  const signature = token.substring(lastDot + 1);

  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(payload);
  const expectedSig = hmac.digest("hex");

  if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
    return payload;
  }
  return null;
}

export async function ensureDefaultAdmin() {
  try {
    const count = await prisma.adminUser.count();
    if (count === 0) {
      const hashedPassword = hashPassword("admin123");
      await prisma.adminUser.create({
        data: {
          email: "admin@mu-la.id",
          username: "admin",
          password: hashedPassword,
          name: "Administrator",
        },
      });
    }
  } catch (err) {
    console.error("Failed to ensure default admin:", err);
  }
}

export async function getAdminSession() {
  await connection();
  await ensureDefaultAdmin();

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");
  if (!sessionCookie?.value) return null;

  const payload = verifyToken(sessionCookie.value);
  if (!payload) return null;

  try {
    const data = JSON.parse(payload);
    if (!data.id || !data.email) return null;
    if (data.exp && Date.now() > data.exp) return null;

    const user = await prisma.adminUser.findUnique({
      where: { id: data.id },
    });
    if (!user) return null;

    return { id: user.id, email: user.email, name: user.name || "Admin" };
  } catch {
    return null;
  }
}

export async function setAdminSession(userId: string, email: string) {
  const cookieStore = await cookies();
  const payload = JSON.stringify({
    id: userId,
    email,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  const token = signToken(payload);
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}
