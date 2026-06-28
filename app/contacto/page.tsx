import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site";
import { faqs } from "@/lib/data/faqs";
import { ContactForm } from "@/components/contact-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FaqJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos: showroom en Providencia, Santiago. WhatsApp, teléfono y correo. Despacho a todo Chile.",
  alternates: { canonical: "/contacto" },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.district}, ${siteConfig.address.city}`,
)}&output=embed`;

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <Breadcrumbs
        items={[{ name: "Inicio", href: "/" }, { name: "Contacto" }]}
      />
      <header className="mb-10 mt-4">
        <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Hablemos
        </h1>
        <p className="mt-2 max-w-2xl text-ink-300">
          Visítanos en nuestro showroom o escríbenos. Estamos para ayudarte a
          equipar tu gimnasio.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* Datos + mapa */}
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoCard icon={MapPin} title="Showroom">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.district}, {siteConfig.address.city}
            </InfoCard>
            <InfoCard icon={Clock} title="Horario">
              {siteConfig.hours}
            </InfoCard>
            <InfoCard icon={Phone} title="Teléfono">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="hover:text-brand-600"
              >
                {siteConfig.phone}
              </a>
            </InfoCard>
            <InfoCard icon={Mail} title="Correo">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-brand-600"
              >
                {siteConfig.email}
              </a>
            </InfoCard>
          </div>

          <Button
            href={whatsappLink()}
            target="_blank"
            size="lg"
            className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5a]"
          >
            <MessageCircle className="h-5 w-5" />
            Escríbenos por WhatsApp
          </Button>

          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              src={mapSrc}
              title="Ubicación IRONHAUS"
              width="100%"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block grayscale-[0.3]"
            />
          </div>
        </div>

        {/* Formulario */}
        <div>
          <h2 className="font-display mb-4 text-xl font-bold">
            Envíanos un mensaje
          </h2>
          <ContactForm />
        </div>
      </div>

      {/* FAQ */}
      <section id="faq" className="mt-20 scroll-mt-24">
        <FaqJsonLd faqs={faqs} />
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Antes de escribirnos, quizás esto ayude"
          center
          className="mb-8"
        />
        <div className="mx-auto max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-ink-400">{children}</p>
    </div>
  );
}
