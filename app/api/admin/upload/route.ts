import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { uploadProductImage, isStorageConfigured } from "@/lib/storage";

export const runtime = "nodejs";

/** Sube una foto de producto (solo admin). La imagen llega ya recortada a 1000×1000. */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!isStorageConfigured()) {
    return NextResponse.json(
      {
        error:
          "El almacenamiento de fotos aún no está configurado (falta la clave de Supabase).",
      },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió archivo." }, { status: 400 });
  }
  if (file.size > 8_000_000) {
    return NextResponse.json(
      { error: "La imagen es muy grande (máx 8 MB)." },
      { status: 400 },
    );
  }

  try {
    const url = await uploadProductImage(
      await file.arrayBuffer(),
      file.type || "image/jpeg",
    );
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "No se pudo subir la imagen." },
      { status: 500 },
    );
  }
}
