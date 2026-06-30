import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { CategoryIcon } from "@/components/ui/category-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

/** Foto representativa por categoría (stock Pexels, libre uso comercial). */
const categoryImage: Record<string, number> = {
  cardio: 5411023,
  musculacion: 4716814,
  "peso-libre": 7743320,
  crossfit: 7187881,
  accesorios: 3916766,
  comercial: 3757957,
  "home-gym": 3931367,
};
const img = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=850`;

export function CategoriesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        eyebrow="Explora por categoría"
        title="Todo para tu gimnasio"
        description="Desde una mancuerna hasta el equipamiento completo de un centro deportivo."
        link={{ href: "/catalogo", label: "Ver catálogo completo" }}
      />

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={i % 4}>
            <Link
              href={`/catalogo/${c.slug}`}
              className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl border border-border bg-ink-950 p-5 md:h-72"
            >
              {/* Foto de fondo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img(categoryImage[c.slug] ?? 4716814)}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Degradado para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/5" />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to top, ${c.accent}55, transparent 60%)`,
                }}
              />

              {/* Ícono arriba */}
              <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur">
                <CategoryIcon name={c.icon} className="h-5 w-5" />
              </span>
              <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-white/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />

              {/* Texto */}
              <div className="relative">
                <h3 className="font-display text-lg font-bold text-white">
                  {c.shortName}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-xs text-white/70">
                  {c.description}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
