import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  reviews,
  size = 14,
  className,
}: {
  rating: number;
  reviews?: number;
  size?: number;
  className?: string;
}) {
  const full = Math.round(rating);
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div
        className="flex items-center"
        aria-label={`Calificación ${rating} de 5`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={
              i < full ? "fill-amber-400 text-amber-400" : "text-ink-600"
            }
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-xs text-muted">
        {rating.toFixed(1)}
        {reviews !== undefined && ` (${reviews})`}
      </span>
    </div>
  );
}
