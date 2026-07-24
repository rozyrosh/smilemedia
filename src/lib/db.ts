import { PrismaClient } from "@prisma/client";

/**
 * Hostinger's env UI sometimes stores Value as:
 *   DATABASE_URL=mysql://...
 * or
 *   DATABASE_URL mysql://...
 * Prisma requires the value to start with mysql://
 */
function normalizeDatabaseUrl() {
  const raw = process.env.DATABASE_URL;
  if (!raw) return;
  const cleaned = raw
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/^DATABASE_URL\s*[=:]?\s*/i, "")
    .trim();
  if (cleaned && cleaned !== raw) {
    process.env.DATABASE_URL = cleaned;
  }
}

normalizeDatabaseUrl();

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
