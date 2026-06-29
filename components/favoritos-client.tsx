"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useMounted } from "@/hooks/use-mounted";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

/** Filtra el catálogo recibido del servidor según los favoritos guardados. */
export function FavoritosClient({ products }: { products: Product[] }) {
  const mounted = useMounted();
  const ids = useWishlistStore((s) => s.ids);
  const items = mounted ? products.filter((p) => ids.includes(p.id)) : [];

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-surface p-16 text-center">
        <Heart className="h-12 w-12 text-ink-600" />
        <p className="text-muted">Todavía no tienes favoritos.</p>
        <Button href="/catalogo">Explorar catálogo</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
