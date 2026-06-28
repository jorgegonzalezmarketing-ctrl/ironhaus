import { NextResponse } from "next/server";
import { commitTransaction } from "@/services/webpayService";

/**
 * Retorno de Transbank tras el pago. Transbank envía `token_ws`.
 * Confirmamos (commit) y redirigimos al comprador según el resultado.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token_ws");
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  if (!token) {
    return NextResponse.redirect(`${base}/checkout?status=cancelado`);
  }

  const result = await commitTransaction(token);
  return NextResponse.redirect(
    `${base}/checkout?status=${result.ok ? "aprobado" : "rechazado"}`,
  );
}

// Transbank también puede usar POST en algunos flujos.
export const POST = GET;
