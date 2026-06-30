"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight, ShieldCheck, Truck, Wrench, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/5319750/5319750-hd_1280_720_25fps.mp4";
const HERO_POSTER =
  "https://images.pexels.com/photos/5411023/pexels-photo-5411023.jpeg?auto=compress&cs=tinysrgb&w=1600";

const trustItems = [
  { icon: Truck, label: "Envío a todo Chile" },
  { icon: ShieldCheck, label: "Compra 100% segura" },
  { icon: Wrench, label: "Instalación profesional" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.7,
      ease: [0.21, 0.5, 0.3, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section className="bg-noise relative isolate overflow-hidden bg-night text-white">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_POSTER}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Capas de oscurecimiento (legibilidad + atmósfera) */}
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/65 to-night/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/40 to-transparent" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 80% at 12% 100%, rgba(45,208,184,0.22) 0%, transparent 55%)",
        }}
      />

      {/* Contenido */}
      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-14 pt-36 md:px-6 md:pb-20">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
          Equipamiento profesional de gimnasio · Chile
        </motion.span>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-condensed mt-6 max-w-4xl text-[clamp(2.75rem,9vw,7rem)] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.4)]"
        >
          Entrena como
          <span className="block text-brand-500">los profesionales.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-xl text-lg text-white/80"
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
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Button href="/catalogo" size="lg">
            Ver catálogo
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Franja de confianza */}
        <motion.ul
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6"
        >
          {trustItems.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm text-white/85">
              <Icon className="h-5 w-5 text-brand-500" />
              {label}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <ChevronDown className="h-6 w-6 animate-bounce text-white/50" />
      </motion.div>
    </section>
  );
}
