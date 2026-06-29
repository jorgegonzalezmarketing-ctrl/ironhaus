import { PrismaClient } from "@prisma/client";

/**
 * Cliente Prisma como singleton. En desarrollo Next.js recarga módulos,
 * así que se cachea en globalThis para no abrir conexiones de más.
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
