/**
 * Aplica las imágenes comerciales a los productos existentes en la base de
 * datos, verificando que cada URL cargue (HTTP 200) antes de guardarla.
 * Uso: npx tsx scripts/set-images.ts
 */
import { PrismaClient } from "@prisma/client";
import { productImages } from "../lib/data/product-images";

const prisma = new PrismaClient();

async function check(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

async function main() {
  let ok = 0;
  let fail = 0;
  for (const [id, url] of Object.entries(productImages)) {
    const valid = await check(url);
    if (!valid) {
      console.log(`✗ ${id}: imagen NO responde (${url})`);
      fail++;
      continue;
    }
    await prisma.product.update({ where: { id }, data: { imageUrl: url } });
    ok++;
  }
  console.log(`\nImágenes aplicadas: ${ok} ✓  |  fallidas: ${fail}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
