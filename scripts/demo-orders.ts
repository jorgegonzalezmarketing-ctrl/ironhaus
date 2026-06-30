/**
 * Crea unos pedidos de ejemplo para que el panel se vea poblado en la demo.
 * Idempotente: si ya existen (por correo @demo.creafitness.cl) no duplica.
 * Para limpiarlos: npx tsx scripts/demo-orders.ts --clean
 * Uso normal:     npx tsx scripts/demo-orders.ts
 */
import { PrismaClient, type OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();
const DEMO_DOMAIN = "@demo.creafitness.cl";

const code = () => `CF-${Math.floor(100000 + Math.random() * 900000)}`;

interface DemoOrder {
  nombre: string;
  email: string;
  phone: string;
  comuna: string;
  region: string;
  shippingMethod: string;
  shippingCost: number;
  status: OrderStatus;
  skus: { sku: string; qty: number }[];
}

const demos: DemoOrder[] = [
  {
    nombre: "Camila Rojas",
    email: `camila${DEMO_DOMAIN}`,
    phone: "+56 9 7654 3210",
    comuna: "Ñuñoa",
    region: "Región Metropolitana",
    shippingMethod: "Despacho Región Metropolitana",
    shippingCost: 9990,
    status: "ENTREGADO",
    skus: [
      { sku: "PLB-MNC-HEX", qty: 1 },
      { sku: "ACC-BND-SET", qty: 2 },
    ],
  },
  {
    nombre: "Studio Forte SpA",
    email: `compras${DEMO_DOMAIN}`,
    phone: "+56 2 2987 6543",
    comuna: "Providencia",
    region: "Región Metropolitana",
    shippingMethod: "Retiro en tienda (Providencia)",
    shippingCost: 0,
    status: "PREPARANDO",
    skus: [
      { sku: "CRF-RCK-PWR", qty: 1 },
      { sku: "PLB-DSC-BUM20", qty: 2 },
    ],
  },
  {
    nombre: "Rodrigo Pérez",
    email: `rodrigo${DEMO_DOMAIN}`,
    phone: "+56 9 5512 8834",
    comuna: "Maipú",
    region: "Región Metropolitana",
    shippingMethod: "Despacho a regiones",
    shippingCost: 24990,
    status: "PAGO_APROBADO",
    skus: [{ sku: "HMG-DMB-ADJ", qty: 1 }],
  },
];

async function clean() {
  const del = await prisma.order.deleteMany({
    where: { email: { endsWith: DEMO_DOMAIN } },
  });
  console.log(`✓ Eliminados ${del.count} pedidos de demo.`);
}

async function main() {
  if (process.argv.includes("--clean")) {
    await clean();
    return;
  }

  const existing = await prisma.order.count({
    where: { email: { endsWith: DEMO_DOMAIN } },
  });
  if (existing > 0) {
    console.log(`Ya existen ${existing} pedidos de demo. Nada que hacer.`);
    return;
  }

  for (const d of demos) {
    const products = await prisma.product.findMany({
      where: { sku: { in: d.skus.map((s) => s.sku) } },
    });
    const items = d.skus.map((s) => {
      const p = products.find((pr) => pr.sku === s.sku)!;
      return {
        productId: p.id,
        sku: p.sku,
        name: p.name,
        price: p.salePrice ?? p.price,
        quantity: s.qty,
      };
    });
    const subtotal = items.reduce((a, i) => a + i.price * i.quantity, 0);
    const total = subtotal + d.shippingCost;

    await prisma.order.create({
      data: {
        code: code(),
        customerName: d.nombre,
        email: d.email,
        phone: d.phone,
        comuna: d.comuna,
        region: d.region,
        shippingMethod: d.shippingMethod,
        shippingCost: d.shippingCost,
        subtotal,
        total,
        payMethod: "webpay",
        status: d.status,
        items: { create: items },
      },
    });
    console.log(`✓ Pedido de ${d.nombre} (${d.status}) — ${total}`);
  }
  console.log("\nListo. El panel ahora muestra pedidos de ejemplo.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
