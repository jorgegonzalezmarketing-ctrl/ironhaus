import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/data/products";
import { getCategory } from "@/lib/data/categories";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/productos/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: "website",
      url: `${siteConfig.url}/productos/${product.slug}`,
    },
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "/" },
          { name: "Catálogo", url: "/catalogo" },
          {
            name: category?.name ?? "",
            url: `/catalogo/${product.category}`,
          },
          { name: product.name, url: `/productos/${product.slug}` },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Catálogo", href: "/catalogo" },
          {
            name: category?.shortName ?? "",
            href: `/catalogo/${product.category}`,
          },
          { name: product.name },
        ]}
      />

      <div className="mt-6">
        <ProductDetail product={product} />
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <SectionHeading
            eyebrow="También te puede interesar"
            title="Productos relacionados"
          />
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
