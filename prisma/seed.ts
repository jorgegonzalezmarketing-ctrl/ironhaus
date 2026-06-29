/**
 * Carga inicial de la base de datos:
 * - Crea/actualiza el usuario administrador (Jenny).
 * - Migra los productos de muestra al catálogo.
 *
 * Ejecutar con: npm run db:seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { products } from "../lib/data/products";

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "hola@creafitness.cl";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "creafitness2026";
const ADMIN_NAME = process.env.ADMIN_NAME ?? "Jenny";

async function main() {
  // 1) Admin
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.adminUser.upsert({
    where: { email: ADMIN_EMAIL },
    update: { name: ADMIN_NAME, passwordHash },
    create: { email: ADMIN_EMAIL, name: ADMIN_NAME, passwordHash },
  });
  console.log(`✓ Admin listo: ${ADMIN_EMAIL}`);

  // 2) Productos (idempotente: reemplaza el catálogo por el de muestra)
  await prisma.product.deleteMany();
  for (const p of products) {
    await prisma.product.create({
      data: {
        id: p.id,
        sku: p.sku,
        slug: p.slug,
        name: p.name,
        shortDescription: p.shortDescription,
        description: p.description,
        category: p.category,
        brand: p.brand,
        price: p.price,
        salePrice: p.salePrice ?? null,
        stock: p.stock,
        rating: p.rating,
        reviews: p.reviews,
        badges: p.badges,
        highlights: p.highlights,
        relatedIds: p.relatedIds,
        specs: p.specs,
        featured: p.featured ?? false,
        active: true,
      },
    });
  }
  console.log(`✓ ${products.length} productos cargados`);

  // 3) Cupón de ejemplo
  await prisma.coupon.upsert({
    where: { code: "BIENVENIDA10" },
    update: {},
    create: { code: "BIENVENIDA10", type: "PERCENT", value: 10, active: true },
  });
  console.log("✓ Cupón de ejemplo: BIENVENIDA10");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
