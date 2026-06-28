"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useMounted } from "@/hooks/use-mounted";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function FavoritosPage() {
  const mounted = useMounted();
  const ids = useWishlistStore((s) => s.ids);
  const items = mounted ? products.filter((p) => ids.includes(p.id)) : [];

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

      {!mounted ? null : items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-surface p-16 text-center">
          <Heart className="h-12 w-12 text-ink-600" />
          <p className="text-muted">Todavía no tienes favoritos.</p>
          <Button href="/catalogo">Explorar catálogo</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
