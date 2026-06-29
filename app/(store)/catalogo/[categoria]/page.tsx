import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/queries";
import { CatalogView } from "@/components/catalog/catalog-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { CategoryIcon } from "@/components/ui/category-icon";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategory(categoria);
  if (!category) return {};
  return {
    title: `${category.name} para gimnasio en Chile`,
    description: `${category.description} Despacho a todo Chile e instalación profesional en Santiago.`,
    alternates: { canonical: `/catalogo/${category.slug}` },
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const category = getCategory(categoria);
  if (!category) notFound();

  const items = await getProductsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "/" },
          { name: "Catálogo", url: "/catalogo" },
          { name: category.name, url: `/catalogo/${category.slug}` },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Catálogo", href: "/catalogo" },
          { name: category.shortName },
        ]}
      />

      <header className="mb-8 mt-4 flex items-start gap-4">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-border bg-surface"
          style={{ color: category.accent }}
        >
          <CategoryIcon name={category.icon} className="h-7 w-7" />
        </span>
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight">
            {category.name}
          </h1>
          <p className="mt-2 max-w-2xl text-ink-300">{category.description}</p>
        </div>
      </header>

      <CatalogView products={items} fixedCategory={category.slug} />
    </div>
  );
}
