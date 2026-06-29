import { NextResponse } from "next/server";
import { createPreference } from "@/services/mercadoPagoService";
import { createOrder } from "@/lib/orders";

/** Inicia un pago con Mercado Pago y registra el pedido. POST /api/checkout/mercadopago */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body?.amount);
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Monto inválido" }, { status: 400 });
    }

    const items = Array.isArray(body?.items) ? body.items : [];

    const result = await createPreference({
      amount,
      customer: body?.customer ?? {},
      items: items.map((i: { sku: string; quantity: number }) => ({
        sku: i.sku,
        qty: i.quantity,
      })),
    });

    let orderCode = result.orderCode;
    try {
      const order = await createOrder({
        customer: body?.customer ?? {},
        items,
        shippingMethod: String(body?.shippingMethod ?? "rm"),
        shippingCost: Number(body?.shippingCost ?? 0),
        subtotal: Number(body?.subtotal ?? amount),
        total: amount,
        payMethod: "mercadopago",
        status: result.simulated ? "PAGO_APROBADO" : "PAGO_INICIADO",
      });
      orderCode = order.code;
    } catch (e) {
      console.error("No se pudo registrar el pedido:", e);
    }

    return NextResponse.json({
      orderCode,
      simulated: result.simulated,
      redirectUrl: result.redirectUrl,
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo iniciar el pago" },
      { status: 500 },
    );
  }
}
