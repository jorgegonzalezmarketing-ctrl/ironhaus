import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllProductSlugs } from "@/lib/queries";
import { products as fallbackProducts } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/catalogo",
    "/equipamos-tu-gimnasio",
    "/cotizar",
    "/contacto",
    "/favoritos",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/catalogo/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Productos desde la base de datos; si falla, usa el catálogo de muestra.
  let slugs: string[];
  try {
    slugs = await getAllProductSlugs();
  } catch {
    slugs = fallbackProducts.map((p) => p.slug);
  }

  const productRoutes = slugs.map((slug) => ({
    url: `${base}/productos/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
