/**
 * Prueba end-to-end: simula una compra contra el sitio en vivo y verifica
 * en la base de datos que el pedido se creó y el stock bajó. Luego limpia.
 * Uso: npx tsx scripts/e2e.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SITE = process.env.TEST_SITE ?? "https://crea-fitness.vercel.app";

async function main() {
  const p = await prisma.product.findFirst({
    where: { active: true, stock: { gt: 0 } },
    orderBy: { createdAt: "asc" },
  });
  if (!p) throw new Error("No hay productos con stock");
  const stockAntes = p.stock;
  console.log(`Sitio probado: ${SITE}`);
  console.log(`Producto: ${p.name} | stock antes: ${stockAntes}`);

  const price = p.salePrice ?? p.price;
  const res = await fetch(`${SITE}/api/checkout/webpay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: price,
      subtotal: price,
      shippingMethod: "retiro",
      shippingCost: 0,
      customer: {
        nombre: "TEST E2E",
        email: "test@creafitness.cl",
        telefono: "+56900000000",
      },
      items: [
        { productId: p.id, sku: p.sku, name: p.name, price, quantity: 1 },
      ],
    }),
  });
  const data = await res.json();
  console.log(`API respondió: ${JSON.stringify(data)}`);

  const order = await prisma.order.findUnique({
    where: { code: data.orderCode },
    include: { items: true },
  });
  const after = await prisma.product.findUnique({ where: { id: p.id } });

  console.log("\n--- RESULTADO ---");
  console.log(`Pedido en DB: ${order ? "SÍ ✓ (" + order.code + ", estado " + order.status + ")" : "NO ✗"}`);
  console.log(`Líneas del pedido: ${order?.items.length ?? 0}`);
  console.log(`Stock después: ${after?.stock} (esperado ${stockAntes - 1})`);
  console.log(
    `Baja de stock correcta: ${after?.stock === stockAntes - 1 ? "SÍ ✓" : "NO ✗"}`,
  );

  // Limpieza: borra el pedido de prueba y restaura el stock.
  if (order) {
    await prisma.order.delete({ where: { id: order.id } });
    await prisma.product.update({
      where: { id: p.id },
      data: { stock: stockAntes },
    });
    console.log("\nLimpieza: pedido de prueba eliminado y stock restaurado ✓");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
