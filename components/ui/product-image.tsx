import { cn } from "@/lib/utils";
import { getCategory } from "@/lib/data/categories";
import { CategoryIcon } from "@/components/ui/category-icon";
import type { Product } from "@/types";

/**
 * Visual de producto generado por código (sin dependencias externas):
 * fondo carbón con glow del acento de la categoría + ícono + SKU watermark.
 * Para usar fotos reales basta cambiar este componente por <Image src=... />.
 */
export function ProductImage({
  product,
  className,
  iconClassName,
  priority = false,
}: {
  product: Product;
  className?: string;
  iconClassName?: string;
  priority?: boolean;
}) {
  const category = getCategory(product.category);
  const accent = category?.accent ?? "#f9531f";

  // Si hay una foto real cargada desde el panel, se muestra directamente.
  if (product.imageUrl) {
    return (
      <div className={cn("relative overflow-hidden bg-ink-950", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-ink-950",
        className,
      )}
      role="img"
      aria-label={product.name}
      data-priority={priority || undefined}
    >
      {/* Glow radial del acento */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, ${accent}22 0%, transparent 55%)`,
        }}
      />
      {/* Rejilla técnica */}
      <div className="bg-grid absolute inset-0 opacity-40" />
      {/* Halo difuso */}
      <div
        className="absolute -bottom-1/3 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `${accent}22` }}
      />
      {/* Ícono central */}
      <CategoryIcon
        name={category?.icon ?? "Dumbbell"}
        className={cn(
          "relative z-10 text-ink-200 drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]",
          iconClassName,
        )}
      />
      {/* SKU watermark */}
      <span className="absolute bottom-2 right-3 z-10 font-mono text-[10px] uppercase tracking-widest text-ink-500">
        {product.sku}
      </span>
    </div>
  );
}
