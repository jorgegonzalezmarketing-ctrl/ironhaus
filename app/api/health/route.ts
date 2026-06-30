import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * Endpoint de diagnóstico: verifica la conexión a la base de datos en runtime.
 * Devuelve siempre 200 con el detalle, para poder leer el error real en
 * producción sin que se rompa la página. (Temporal — se puede quitar luego.)
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const dbPrefix = (process.env.DATABASE_URL ?? "MISSING").slice(0, 18);
  try {
    const products = await prisma.product.count();
    return NextResponse.json({ ok: true, products, dbPrefix });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      error: e instanceof Error ? e.message : String(e),
      dbPrefix,
    });
  }
}
