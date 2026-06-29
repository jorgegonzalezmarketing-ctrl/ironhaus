import type { Metadata } from "next";
import { getProducts } from "@/lib/queries";
import { CatalogView } from "@/components/catalog/catalog-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Catálogo de máquinas y equipamiento de gimnasio",
  description:
    "Explora todo nuestro catálogo de maquinaria de gimnasio en Chile: cardio, musculación, peso libre, CrossFit, accesorios y equipamiento comercial. Despacho a todo el país.",
  alternates: { canonical: "/catalogo" },
};

export const dynamic = "force-dynamic";

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "/" },
          { name: "Catálogo", url: "/catalogo" },
        ]}
      />
      <Breadcrumbs
        items={[{ name: "Inicio", href: "/" }, { name: "Catálogo" }]}
      />
      <header className="mb-8 mt-4">
        <h1 className="font-display text-4xl font-extrabold tracking-tight">
          Catálogo completo
        </h1>
        <p className="mt-2 max-w-2xl text-ink-300">
          Maquinaria y equipamiento de gimnasio de grado comercial. Filtra por
          categoría, marca y precio.
        </p>
      </header>

      <CatalogView products={products} initialQuery={q ?? ""} />
    </div>
  );
}
