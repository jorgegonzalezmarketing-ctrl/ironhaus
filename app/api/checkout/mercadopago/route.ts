import { NextResponse } from "next/server";
import { createPreference } from "@/services/mercadoPagoService";

/** Inicia un pago con Mercado Pago. POST /api/checkout/mercadopago */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body?.amount);
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Monto inválido" }, { status: 400 });
    }
    const result = await createPreference({
      amount,
      customer: body?.customer ?? {},
      items: Array.isArray(body?.items) ? body.items : [],
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "No se pudo iniciar el pago" },
      { status: 500 },
    );
  }
}
