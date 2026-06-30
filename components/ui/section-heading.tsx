import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  className,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: { href: string; label: string };
  className?: string;
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
        center && "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", center && "mx-auto")}>
        {eyebrow && (
          <span
            className={cn(
              "flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-brand-600",
              center && "justify-center",
            )}
          >
            <span className="accent-rule" />
            {eyebrow}
          </span>
        )}
        <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-ink-300">{description}</p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-300"
        >
          {link.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
