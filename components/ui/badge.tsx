import { cn } from "@/lib/utils";
import type { ProductBadge } from "@/types";

const labels: Record<ProductBadge, string> = {
  nuevo: "Nuevo",
  oferta: "Oferta",
  "mas-vendido": "Más vendido",
  premium: "Premium",
  agotado: "Agotado",
};

const styles: Record<ProductBadge, string> = {
  nuevo: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  oferta: "bg-brand-500/15 text-brand-400 ring-brand-500/30",
  "mas-vendido": "bg-amber-500/15 text-amber-400 ring-amber-500/30",
  premium: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
  agotado: "bg-ink-700/60 text-ink-300 ring-ink-600",
};

export function Badge({
  badge,
  className,
}: {
  badge: ProductBadge;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset",
        styles[badge],
        className,
      )}
    >
      {labels[badge]}
    </span>
  );
}
