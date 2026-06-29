import "server-only";
import { prisma } from "@/lib/db";
import type {
  Product,
  ProductBadge,
  CategorySlug,
} from "@/types";
import type { Product as DbProduct } from "@prisma/client";

/** Convierte una fila de Prisma al tipo de dominio usado por la UI. */
function toProduct(p: DbProduct): Product {
  return {
    id: p.id,
    sku: p.sku,
    slug: p.slug,
    name: p.name,
    shortDescription: p.shortDescription,
    description: p.description,
    category: p.category as CategorySlug,
    brand: p.brand,
    price: p.price,
    salePrice: p.salePrice ?? undefined,
    stock: p.stock,
    rating: p.rating,
    reviews: p.reviews,
    badges: (p.badges as ProductBadge[]) ?? [],
    highlights: p.highlights ?? [],
    relatedIds: p.relatedIds ?? [],
    specs: (p.specs as { label: string; value: string }[]) ?? [],
    featured: p.featured,
    imageUrl: p.imageUrl,
    active: p.active,
  };
}

/** Obtiene un producto por id (incluye inactivos) — para el panel admin. */
export async function getProductByIdAdmin(id: string): Promise<Product | null> {
  const p = await prisma.product.findUnique({ where: { id } });
  return p ? toProduct(p) : null;
}

export async function getProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const p = await prisma.product.findUnique({ where: { slug } });
  return p && p.active ? toProduct(p) : null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { active: true, featured: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(toProduct);
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { active: true, category },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(toProduct);
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  if (!product.relatedIds.length) return [];
  const rows = await prisma.product.findMany({
    where: { id: { in: product.relatedIds }, active: true },
  });
  // Mantiene el orden definido en relatedIds.
  const byId = new Map(rows.map((r) => [r.id, toProduct(r)]));
  return product.relatedIds
    .map((id) => byId.get(id))
    .filter((p): p is Product => Boolean(p));
}

export async function getAllProductSlugs(): Promise<string[]> {
  const rows = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}
