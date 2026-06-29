import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { EquipService } from "@/components/home/equip-service";
import { ContactCta } from "@/components/home/contact-cta";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Equipamos tu gimnasio completo en Chile",
  description:
    "Proyectos llave en mano para gimnasios comerciales, hoteles, empresas, municipalidades y condominios. Diseño de layout, instalación y capacitación. Cotiza hoy.",
  alternates: { canonical: "/equipamos-tu-gimnasio" },
};

const includes = [
  "Diagnóstico del espacio y objetivos comerciales",
  "Diseño de layout optimizado por zonas",
  "Selección de equipos por presupuesto y público",
  "Despacho coordinado a todo Chile",
  "Instalación profesional y puesta en marcha",
  "Capacitación de tu equipo de trabajo",
  "Plan de mantención preventiva opcional",
  "Factura y financiamiento para empresas",
];

export default function EquipamosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-brand-600/20 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
          <Breadcrumbs
            items={[
              { name: "Inicio", href: "/" },
              { name: "Equipamos tu gimnasio" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              Servicio integral · Llave en mano
            </span>
            <h1 className="font-display mt-3 text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Equipamos tu gimnasio,
              <span className="block text-gradient-brand">tú lo haces crecer.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-300">
              Más de 500 espacios equipados en Chile. Nos encargamos de todo:
              desde el diseño del layout hasta la instalación y capacitación,
              para que tú solo te preocupes de operar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/cotizar" size="lg">
                Cotizar mi proyecto
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/catalogo/comercial" variant="outline" size="lg">
                Ver línea comercial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              Un solo socio, de principio a fin
            </h2>
            <p className="mt-4 text-ink-300">
              Coordinar múltiples proveedores cuesta tiempo y dinero. Con
              Crea Fitness tienes un único responsable para todo el proyecto.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-600">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EquipService />
      <ContactCta />
    </div>
  );
}
