import "server-only";
import { prisma } from "@/lib/db";
import { generateOrderCode } from "@/lib/utils";
import type { OrderStatus } from "@prisma/client";

export interface CreateOrderInput {
  customer: {
    nombre?: string;
    email?: string;
    telefono?: string;
    rut?: string;
    direccion?: string;
    comuna?: string;
    region?: string;
  };
  items: {
    productId?: string;
    sku: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  shippingMethod: string;
  shippingCost: number;
  subtotal: number;
  total: number;
  payMethod: string;
  status: OrderStatus;
}

/**
 * Crea un pedido con sus líneas y descuenta el stock de cada producto.
 * Todo en una transacción para mantener la integridad.
 */
export async function createOrder(input: CreateOrderInput) {
  const code = generateOrderCode();

  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        code,
        customerName: input.customer.nombre ?? "Cliente",
        email: input.customer.email ?? "",
        phone: input.customer.telefono ?? "",
        rut: input.customer.rut || null,
        address: input.customer.direccion || null,
        comuna: input.customer.comuna || null,
        region: input.customer.region || null,
        shippingMethod: input.shippingMethod,
        shippingCost: input.shippingCost,
        subtotal: input.subtotal,
        total: input.total,
        payMethod: input.payMethod,
        status: input.status,
        items: {
          create: input.items.map((i) => ({
            productId: i.productId ?? null,
            sku: i.sku,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        },
      },
    });

    // Descuenta stock (sin bajar de 0) para los ítems con productId.
    for (const i of input.items) {
      if (!i.productId) continue;
      await tx.product.updateMany({
        where: { id: i.productId, stock: { gte: i.quantity } },
        data: { stock: { decrement: i.quantity } },
      });
    }

    return order;
  });
}
