/**
 * Resetea el usuario administrador a uno solo (Crea Fitness).
 * No toca productos ni pedidos.
 * Uso: npx tsx prisma/set-admin.ts
 *   (opcional) ADMIN_EMAIL=... ADMIN_PASSWORD=... ADMIN_NAME=...
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const email = (process.env.ADMIN_EMAIL ?? "hola@creafitness.cl").toLowerCase();
const password = process.env.ADMIN_PASSWORD ?? "creafitness2026";
const name = process.env.ADMIN_NAME ?? "Jenny";

async function main() {
  await prisma.adminUser.deleteMany(); // deja un solo admin
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.create({ data: { email, name, passwordHash } });
  console.log(`✓ Admin actualizado: ${email}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
