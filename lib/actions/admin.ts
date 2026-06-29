"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import {
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  getSession,
} from "@/lib/auth";
import type { OrderStatus, CouponType } from "@prisma/client";

/* ----------------------------- Auth ----------------------------- */

export async function loginAction(
  _prev: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Completa email y contraseña." };

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return { error: "Credenciales incorrectas." };
  }

  const token = await createSessionToken({
    id: user.id,
    email: user.email,
    name: user.name,
  });
  await setSessionCookie(token);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin/login");
}

/** Garantiza que hay sesión; si no, redirige al login. */
async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

/* --------------------------- Productos --------------------------- */

function parseProductForm(formData: FormData) {
  const num = (k: string) => {
    const v = String(formData.get(k) ?? "").replace(/[^\d]/g, "");
    return v ? parseInt(v, 10) : 0;
  };
  const salePriceRaw = String(formData.get("salePrice") ?? "").replace(/[^\d]/g, "");

  const specs = String(formData.get("specs") ?? "")
    .split("\n")
    .map((line) => {
      const [label, ...rest] = line.split(":");
      return { label: label?.trim() ?? "", value: rest.join(":").trim() };
    })
    .filter((s) => s.label && s.value);

  const highlights = String(formData.get("highlights") ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const relatedIds = String(formData.get("relatedIds") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    sku: String(formData.get("sku") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    brand: String(formData.get("brand") ?? "").trim(),
    price: num("price"),
    salePrice: salePriceRaw ? parseInt(salePriceRaw, 10) : null,
    stock: num("stock"),
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
    badges: formData.getAll("badges").map(String),
    highlights,
    relatedIds,
    specs,
  };
}

export async function createProductAction(formData: FormData) {
  await requireAdmin();
  const data = parseProductForm(formData);
  await prisma.product.create({ data });
  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function updateProductAction(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseProductForm(formData);
  await prisma.product.update({ where: { id }, data });
  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function deleteProductAction(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/productos");
}

/* ---------------------------- Pedidos ---------------------------- */

export async function updateOrderStatusAction(id: string, formData: FormData) {
  await requireAdmin();
  const status = String(formData.get("status") ?? "") as OrderStatus;
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/pedidos");
}

/* ---------------------------- Cupones ---------------------------- */

export async function createCouponAction(formData: FormData) {
  await requireAdmin();
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  const type = String(formData.get("type") ?? "PERCENT") as CouponType;
  const value = parseInt(String(formData.get("value") ?? "0"), 10) || 0;
  if (code) {
    await prisma.coupon.upsert({
      where: { code },
      update: { type, value, active: true },
      create: { code, type, value, active: true },
    });
  }
  revalidatePath("/admin/cupones");
}

export async function toggleCouponAction(id: string, active: boolean) {
  await requireAdmin();
  await prisma.coupon.update({ where: { id }, data: { active } });
  revalidatePath("/admin/cupones");
}
