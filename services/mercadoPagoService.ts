/**
 * mercadoPagoService
 * ------------------------------------------------------------------
 * Servicio desacoplado para integrar Mercado Pago (Checkout Pro / API).
 * - Lee credenciales SOLO desde variables de entorno (nunca hardcodear).
 * - En ausencia de credenciales opera en MODO DEMO (respuesta simulada),
 *   lo que permite mostrar el flujo completo sin claves reales.
 *
 * Producción: instalar el SDK oficial `mercadopago` y reemplazar
 * `createPreferenceReal` por la llamada a `preferences.create(...)`.
 * Docs: https://www.mercadopago.cl/developers
 */

import { generateOrderCode } from "@/lib/utils";

export interface CheckoutItemInput {
  sku: string;
  qty: number;
}

export interface CreatePreferenceInput {
  amount: number;
  customer: { nombre?: string; email?: string };
  items: CheckoutItemInput[];
}

export interface PaymentInitResult {
  provider: "mercadopago";
  orderCode: string;
  /** URL a la que redirigir al comprador (init_point en producción). */
  redirectUrl?: string;
  /** true cuando la respuesta es simulada (sin credenciales). */
  simulated: boolean;
}

function isConfigured(): boolean {
  return Boolean(process.env.MP_ACCESS_TOKEN);
}

/**
 * Crea una preferencia de pago. En producción devuelve el `init_point`
 * de Mercado Pago; en demo devuelve una respuesta simulada.
 */
export async function createPreference(
  input: CreatePreferenceInput,
): Promise<PaymentInitResult> {
  const orderCode = generateOrderCode();

  if (!isConfigured()) {
    // ---- MODO DEMO ----
    return { provider: "mercadopago", orderCode, simulated: true };
  }

  // ---- MODO PRODUCCIÓN (esqueleto) ----
  // const { MercadoPagoConfig, Preference } = await import("mercadopago");
  // const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
  // const pref = await new Preference(client).create({
  //   body: {
  //     items: input.items.map((i) => ({
  //       id: i.sku, title: i.sku, quantity: i.qty, unit_price: input.amount / Math.max(1, totalQty(input.items)), currency_id: "CLP",
  //     })),
  //     payer: { email: input.customer.email },
  //     external_reference: orderCode,
  //     back_urls: {
  //       success: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
  //       failure: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure`,
  //       pending: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/pending`,
  //     },
  //     notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercadopago`,
  //     auto_return: "approved",
  //   },
  // });
  // return { provider: "mercadopago", orderCode, redirectUrl: pref.init_point, simulated: false };

  return { provider: "mercadopago", orderCode, simulated: true };
}

/**
 * Procesa la notificación (webhook) de Mercado Pago.
 * Producción: validar firma, consultar el pago por ID y actualizar el pedido.
 */
export async function handleWebhook(
  payload: unknown,
): Promise<{ ok: boolean }> {
  // const paymentId = (payload as any)?.data?.id;
  // const payment = await new Payment(client).get({ id: paymentId });
  // await updateOrderStatus(payment.external_reference, mapStatus(payment.status));
  void payload;
  return { ok: true };
}
