import type { Metadata } from "next";
import { getProducts } from "@/lib/queries";
import { FavoritosClient } from "@/components/favoritos-client";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Tus favoritos",
  description: "Los equipos de gimnasio que guardaste para decidir con calma.",
  robots: { index: false, follow: true },
};

export const dynamic = "force-dynamic";

export default async function FavoritosPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <Breadcrumbs
        items={[{ name: "Inicio", href: "/" }, { name: "Favoritos" }]}
      />
      <header className="mb-8 mt-4">
        <h1 className="font-display text-4xl font-extrabold tracking-tight">
          Tus favoritos
        </h1>
        <p className="mt-2 text-ink-300">
          Guarda los equipos que te interesan para decidir con calma.
        </p>
      </header>

      <FavoritosClient products={products} />
    </div>
  );
}
