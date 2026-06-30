import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "productos";

export function isStorageConfigured(): boolean {
  return Boolean(url && serviceKey);
}

function client() {
  if (!url || !serviceKey) throw new Error("Almacenamiento no configurado");
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

let bucketReady = false;
async function ensureBucket(sb: ReturnType<typeof client>) {
  if (bucketReady) return;
  const { data } = await sb.storage.getBucket(BUCKET);
  if (!data) {
    await sb.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: "8MB",
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    });
  }
  bucketReady = true;
}

/** Sube una imagen al bucket público y devuelve su URL. */
export async function uploadProductImage(
  bytes: ArrayBuffer,
  contentType = "image/jpeg",
): Promise<string> {
  const sb = client();
  await ensureBucket(sb);
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const { error } = await sb.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType, upsert: false });
  if (error) throw error;
  return sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}
