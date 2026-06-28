import { faqs } from "@/lib/data/faqs";
import { FaqAccordion } from "@/components/faq-accordion";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="border-y border-border bg-ink-950 scroll-mt-24"
    >
      <FaqJsonLd faqs={faqs} />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resolvemos tus dudas"
          description="Pagos, garantías, despachos, instalación y facturación."
          center
          className="mb-10"
        />
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
