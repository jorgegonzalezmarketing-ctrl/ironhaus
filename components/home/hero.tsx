"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight, ShieldCheck, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustItems = [
  { icon: Truck, label: "Envío a todo Chile" },
  { icon: ShieldCheck, label: "Compra 100% segura" },
  { icon: Wrench, label: "Instalación profesional" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.21, 0.5, 0.3, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Fondos */}
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
            Equipamiento profesional de gimnasio · Chile
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl"
          >
            Construye un gimnasio
            <span className="block text-gradient-brand">de nivel mundial.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-lg text-ink-300"
          >
            Máquinas de musculación, cardio, peso libre y CrossFit de grado
            comercial. Equipamos gimnasios completos, hoteles y home gyms con
            despacho a todo el país.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="/catalogo" size="lg">
              Comprar ahora
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/cotizar" variant="outline" size="lg">
              Cotizar mi gimnasio
            </Button>
          </motion.div>

          {/* Indicadores de confianza */}
          <motion.ul
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-12 flex flex-wrap gap-x-8 gap-y-4"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-ink-300">
                <Icon className="h-5 w-5 text-brand-500" />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Métricas */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:max-w-2xl md:grid-cols-4"
        >
          {[
            { n: "+500", l: "Gimnasios equipados" },
            { n: "7", l: "Marcas premium" },
            { n: "5 años", l: "Garantía máxima" },
            { n: "24/7", l: "Uso comercial" },
          ].map((m) => (
            <div key={m.l} className="bg-surface px-5 py-6 text-center">
              <p className="font-display text-2xl font-extrabold text-brand-600 md:text-3xl">
                {m.n}
              </p>
              <p className="mt-1 text-xs text-ink-400">{m.l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
