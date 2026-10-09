import { PrismaClient } from '../generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getDatabaseUrl() {
  const envUrl = process.env.DATABASE_URL;
  if (!envUrl || envUrl.startsWith('file:./')) {
    const filename = envUrl ? envUrl.replace('file:./', '') : 'dev.db';
    const absolutePath = path.join(/*turbopackIgnore: true*/ process.cwd(), filename);
    return `file:${absolutePath}`;
  }
  return envUrl;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: getDatabaseUrl() })
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
