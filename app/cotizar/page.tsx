import type { Metadata } from "next";
import { Check } from "lucide-react";
import { QuoteForm } from "@/components/quote-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Cotiza tu gimnasio — Equipamiento para empresas",
  description:
    "Solicita una cotización gratuita para equipar tu gimnasio, hotel, empresa o condominio en Chile. Propuesta a medida con factura, instalación y despacho a todo el país.",
  alternates: { canonical: "/cotizar" },
};

const benefits = [
  "Asesoría especializada sin costo",
  "Diseño de layout de tu espacio",
  "Factura para empresas e instituciones",
  "Financiamiento y planes de pago",
  "Instalación y capacitación incluidas",
  "Despacho a todo Chile",
];

export default function CotizarPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <Breadcrumbs
        items={[{ name: "Inicio", href: "/" }, { name: "Cotizar" }]}
      />
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-400">
            Cotización para empresas
          </span>
          <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
            Cotiza tu proyecto de gimnasio
          </h1>
          <p className="mt-4 text-lg text-ink-300">
            Cuéntanos qué necesitas y te enviamos una propuesta a medida. Desde
            un solo equipo hasta el equipamiento completo de un centro deportivo.
          </p>
          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-ink-200">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-400">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <QuoteForm />
      </div>
    </div>
  );
}
