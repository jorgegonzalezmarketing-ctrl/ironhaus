import { NextResponse } from "next/server";
import { createTransaction } from "@/services/webpayService";
import { createOrder } from "@/lib/orders";

/** Inicia una transacción WebPay Plus y registra el pedido. POST /api/checkout/webpay */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body?.amount);
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Monto inválido" }, { status: 400 });
    }

    const items = Array.isArray(body?.items) ? body.items : [];

    const result = await createTransaction({
      amount,
      customer: body?.customer ?? {},
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
        payMethod: "webpay",
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
      token: result.token,
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo iniciar el pago" },
      { status: 500 },
    );
  }
}
