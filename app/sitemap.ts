import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const productRoutes = products.map((p) => ({
    url: `${base}/productos/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
