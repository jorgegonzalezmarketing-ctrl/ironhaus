import Link from "next/link";
import { ProductImage } from "@/components/ui/product-image";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { WishlistButton } from "@/components/product/wishlist-button";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { effectivePrice, discountPercent } from "@/lib/data/products";
import { getBrandName } from "@/lib/data/brands";
import { formatCLP } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const href = `/productos/${product.slug}`;
  const price = effectivePrice(product);
  const discount = discountPercent(product);
  const lowStock = product.stock > 0 && product.stock <= 4;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-brand-300 hover:shadow-[0_24px_50px_-28px_rgba(43,39,34,0.35)]">
      {/* Imagen + overlays */}
      <div className="relative">
        <Link href={href} aria-label={product.name}>
          <ProductImage
            product={product}
            className="aspect-square w-full"
            iconClassName="h-20 w-20 transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-xs font-bold text-white">
              -{discount}%
            </span>
          )}
          {product.badges
            .filter((b) => b !== "oferta")
            .slice(0, 1)
            .map((b) => (
              <Badge key={b} badge={b} />
            ))}
        </div>

        {/* Wishlist */}
        <WishlistButton
          productId={product.id}
          className="absolute right-3 top-3 h-9 w-9"
        />
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">
            {getBrandName(product.brand)}
          </span>
          <StarRating rating={product.rating} size={12} />
        </div>

        <Link href={href} className="flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-brand-600">
            {product.name}
          </h3>
        </Link>

        {/* Precio */}
        <div className="mt-1 flex items-end gap-2">
          <span className="font-display text-xl font-bold text-foreground">
            {formatCLP(price)}
          </span>
          {product.salePrice && (
            <span className="mb-0.5 text-sm text-ink-400 line-through">
              {formatCLP(product.price)}
            </span>
          )}
        </div>

        {/* Stock */}
        {lowStock ? (
          <span className="text-xs font-medium text-amber-600">
            ¡Últimas {product.stock} unidades!
          </span>
        ) : product.stock > 0 ? (
          <span className="text-xs text-emerald-600">En stock</span>
        ) : (
          <span className="text-xs text-ink-400">Agotado</span>
        )}

        {/* Acciones */}
        <div className="mt-3 flex items-center gap-2">
          <AddToCartButton product={product} size="sm" full />
        </div>
      </div>
    </article>
  );
}
