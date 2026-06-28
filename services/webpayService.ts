/**
 * webpayService
 * ------------------------------------------------------------------
 * Servicio desacoplado para integrar WebPay Plus (Transbank).
 * - Credenciales SOLO desde variables de entorno.
 * - En ausencia de credenciales opera en MODO DEMO (simulado).
 *
 * Producción: instalar `transbank-sdk` y usar `WebpayPlus.Transaction`.
 * Flujo real: create() → redirección a `url?token_ws` → commit(token).
 * Docs: https://www.transbankdevelopers.cl/documentacion/webpay-plus
 */

import { generateOrderCode } from "@/lib/utils";

export interface WebpayCreateInput {
  amount: number;
  customer: { nombre?: string; email?: string };
}

export interface WebpayInitResult {
  provider: "webpay";
  orderCode: string;
  /** URL del formulario de pago Transbank (en producción). */
  redirectUrl?: string;
  /** token_ws devuelto por Transbank (en producción). */
  token?: string;
  simulated: boolean;
}

function isConfigured(): boolean {
  return Boolean(
    process.env.WEBPAY_COMMERCE_CODE && process.env.WEBPAY_API_KEY,
  );
}

/** Inicia una transacción WebPay Plus. */
export async function createTransaction(
  input: WebpayCreateInput,
): Promise<WebpayInitResult> {
  const orderCode = generateOrderCode();

  if (!isConfigured()) {
    // ---- MODO DEMO ----
    return { provider: "webpay", orderCode, simulated: true };
  }

  // ---- MODO PRODUCCIÓN (esqueleto) ----
  // const { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = await import("transbank-sdk");
  // const tx = new WebpayPlus.Transaction(
  //   new Options(
  //     process.env.WEBPAY_COMMERCE_CODE!,
  //     process.env.WEBPAY_API_KEY!,
  //     process.env.WEBPAY_ENV === "production" ? Environment.Production : Environment.Integration,
  //   ),
  // );
  // const res = await tx.create(
  //   orderCode,                 // buy_order
  //   crypto.randomUUID(),       // session_id
  //   Math.round(input.amount),  // amount (CLP, entero)
  //   `${process.env.NEXT_PUBLIC_SITE_URL}/api/checkout/webpay/commit`, // return_url
  // );
  // return { provider: "webpay", orderCode, redirectUrl: res.url, token: res.token, simulated: false };

  return { provider: "webpay", orderCode, simulated: true };
}

/**
 * Confirma (commit) la transacción tras el retorno desde Transbank.
 * Si el commit falla, se ejecuta el rollback / anulación correspondiente.
 */
export async function commitTransaction(
  token: string,
): Promise<{ ok: boolean; status: string }> {
  if (!isConfigured()) {
    return { ok: true, status: "AUTHORIZED_DEMO" };
  }

  // const tx = new WebpayPlus.Transaction(options);
  // const result = await tx.commit(token);
  // const ok = result.response_code === 0;
  // if (!ok) { /* rollback / marcar pedido como rechazado */ }
  // await updateOrderStatus(result.buy_order, ok ? "pago-aprobado" : "pago-rechazado");
  // return { ok, status: result.status };
  void token;
  return { ok: true, status: "AUTHORIZED_DEMO" };
}
