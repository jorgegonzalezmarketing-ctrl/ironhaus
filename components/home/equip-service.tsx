import { Building2, Hotel, Briefcase, Landmark, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const segments = [
  { icon: Building2, label: "Gimnasios comerciales" },
  { icon: Hotel, label: "Hoteles y resorts" },
  { icon: Briefcase, label: "Empresas" },
  { icon: Landmark, label: "Municipalidades" },
  { icon: Home, label: "Condominios" },
];

const steps = [
  {
    n: "01",
    title: "Diagnóstico y layout",
    desc: "Visitamos el espacio, entendemos tu público y diseñamos la distribución óptima.",
  },
  {
    n: "02",
    title: "Cotización a medida",
    desc: "Propuesta con equipos, plazos y financiamiento, con factura para empresas.",
  },
  {
    n: "03",
    title: "Instalación y capacitación",
    desc: "Entregamos, instalamos y capacitamos a tu equipo. Listo para operar.",
  },
];

export function EquipService() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-ink-950">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-600/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <SectionHeading
          eyebrow="Servicio integral"
          title="Equipamos tu gimnasio completo"
          description="Proyectos llave en mano para todo tipo de espacios. Tú defines la visión, nosotros la construimos."
        />

        {/* Segmentos */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {segments.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-5 text-center"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/10 text-brand-400">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Pasos */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-2xl border border-border bg-surface p-6"
            >
              <span className="font-display text-4xl font-black text-brand-500/30">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-400">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/cotizar" size="lg">
            Solicitar cotización
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button href="/equipamos-tu-gimnasio" variant="outline" size="lg">
            Conocer el servicio
          </Button>
        </div>
      </div>
    </section>
  );
}
