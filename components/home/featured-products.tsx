import { getFeaturedProducts } from "@/lib/queries";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/ui/section-heading";

export async function FeaturedProducts() {
  const featured = await getFeaturedProducts();

  return (
    <section className="border-y border-border bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <SectionHeading
          eyebrow="Lo más pedido"
          title="Productos destacados"
          description="Los equipos favoritos de gimnasios y atletas en todo Chile."
          link={{ href: "/catalogo", label: "Ver todos" }}
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
