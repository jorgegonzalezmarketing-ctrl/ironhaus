"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function WishlistButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const mounted = useMounted();
  const ids = useWishlistStore((s) => s.ids);
  const toggle = useWishlistStore((s) => s.toggle);
  const active = mounted && ids.includes(productId);

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={active}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={cn(
        "grid place-items-center rounded-full border border-border bg-ink-950/70 backdrop-blur transition-colors hover:border-brand-500",
        className,
      )}
    >
      <Heart
        className={cn(
          "h-[18px] w-[18px] transition-all",
          active ? "fill-brand-500 text-brand-500" : "text-ink-200",
        )}
      />
    </button>
  );
}
