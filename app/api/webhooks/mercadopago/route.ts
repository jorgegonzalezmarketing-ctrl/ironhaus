import { NextResponse } from "next/server";
import { handleWebhook } from "@/services/mercadoPagoService";

/**
 * Webhook de notificaciones de Mercado Pago.
 * Producción: validar firma (x-signature) antes de procesar.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => ({}));
    const result = await handleWebhook(payload);
    return NextResponse.json(result);
  } catch {
    // Responder 200 para evitar reintentos infinitos ante errores no críticos.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
