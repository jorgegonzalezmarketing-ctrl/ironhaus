import { brands } from "@/lib/data/brands";

/** Marquee infinito de marcas (CSS puro, sin JS). */
export function BrandsMarquee() {
  const row = [...brands, ...brands]; // duplicado para loop continuo

  return (
    <section className="border-b border-border py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-ink-400">
          Marcas premium que representamos
        </p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 px-6">
          {row.map((b, i) => (
            <div
              key={`${b.slug}-${i}`}
              className="flex shrink-0 items-baseline gap-2"
            >
              <span className="font-display text-2xl font-extrabold tracking-tight text-ink-300">
                {b.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-ink-600">
                {b.origin}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
