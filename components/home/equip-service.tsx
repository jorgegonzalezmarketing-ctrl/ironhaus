import {
  Building2,
  Hotel,
  Briefcase,
  Landmark,
  Home,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const BG =
  "https://images.pexels.com/photos/4716814/pexels-photo-4716814.jpeg?auto=compress&cs=tinysrgb&w=1800";

const segments = [
  { icon: Building2, label: "Gimnasios comerciales" },
  { icon: Hotel, label: "Hoteles y resorts" },
  { icon: Briefcase, label: "Empresas" },
  { icon: Landmark, label: "Municipalidades" },
  { icon: Home, label: "Condominios" },
];

const stats = [
  { n: "+500", l: "Gimnasios equipados" },
  { n: "7", l: "Marcas premium" },
  { n: "5 años", l: "Garantía máxima" },
  { n: "24/7", l: "Uso comercial" },
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
    <section className="bg-noise relative isolate overflow-hidden bg-ink-950 text-white">
      {/* Foto de fondo + capas */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/85 to-ink-950" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(90% 60% at 85% 10%, rgba(249,83,31,0.22) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">
            Servicio integral · Llave en mano
          </span>
          <h2 className="font-condensed mt-3 max-w-3xl text-[clamp(2rem,6vw,4.25rem)] text-white">
            Equipamos tu gimnasio
            <span className="block text-brand-500">de principio a fin.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/70">
            Proyectos completos para todo tipo de espacios. Tú defines la visión,
            nosotros la construimos.
          </p>
        </Reveal>

        {/* Cifras */}
        <Reveal delay={1}>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="bg-ink-950/60 px-5 py-6 text-center backdrop-blur">
                <p className="font-condensed text-3xl text-brand-500 md:text-4xl">
                  {s.n}
                </p>
                <p className="mt-1 text-xs text-white/60">{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Segmentos */}
        <Reveal delay={2}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {segments.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur transition-colors hover:border-brand-500/50"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/15 text-brand-400">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-medium text-white/90">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Pasos */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <span className="font-condensed text-4xl text-brand-500/50">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-white/65">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/cotizar" size="lg">
            Solicitar cotización
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button
            href="/equipamos-tu-gimnasio"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:text-white"
          >
            Conocer el servicio
          </Button>
        </div>
      </div>
    </section>
  );
}
