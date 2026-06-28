import { NextResponse } from "next/server";
import { createTransaction } from "@/services/webpayService";

/** Inicia una transacción WebPay Plus. POST /api/checkout/webpay */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body?.amount);
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Monto inválido" }, { status: 400 });
    }
    const result = await createTransaction({
      amount,
      customer: body?.customer ?? {},
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "No se pudo iniciar el pago" },
      { status: 500 },
    );
  }
}
