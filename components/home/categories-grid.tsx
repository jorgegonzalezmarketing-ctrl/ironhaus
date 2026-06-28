import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { CategoryIcon } from "@/components/ui/category-icon";
import { SectionHeading } from "@/components/ui/section-heading";

export function CategoriesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        eyebrow="Explora por categoría"
        title="Todo para tu gimnasio"
        description="Desde una mancuerna hasta el equipamiento completo de un centro deportivo."
        link={{ href: "/catalogo", label: "Ver catálogo completo" }}
      />

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/catalogo/${c.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:border-brand-500/50 hover:bg-surface-2"
          >
            <div
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `${c.accent}33` }}
            />
            <div className="relative flex items-center justify-between">
              <span
                className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-ink-950"
                style={{ color: c.accent }}
              >
                <CategoryIcon name={c.icon} className="h-6 w-6" />
              </span>
              <ArrowUpRight className="h-5 w-5 text-ink-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
            </div>
            <div className="relative mt-8">
              <h3 className="font-display text-lg font-bold">{c.shortName}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-ink-400">
                {c.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
