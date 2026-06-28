import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { StarRating } from "@/components/ui/star-rating";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        eyebrow="Testimonios"
        title="Confían en nosotros"
        description="Gimnasios, hoteles, box y atletas que ya entrenan con equipamiento IRONHAUS."
        center
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="flex flex-col rounded-2xl border border-border bg-surface p-6"
          >
            <Quote className="h-7 w-7 text-brand-500/60" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-200">
              “{t.quote}”
            </blockquote>
            <StarRating rating={t.rating} className="mt-5" />
            <figcaption className="mt-3 border-t border-border pt-3">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-ink-400">
                {t.role} · {t.company}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
