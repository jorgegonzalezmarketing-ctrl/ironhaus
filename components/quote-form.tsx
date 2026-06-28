"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";

const projectTypes = [
  "Gimnasio comercial",
  "Hotel / resort",
  "Empresa / oficina",
  "Municipalidad",
  "Condominio",
  "Home gym",
  "Otro",
];

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipo: projectTypes[0],
    superficie: "",
    mensaje: "",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Demo: simula envío. En producción → POST a /api/cotizar (email/CRM).
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-surface p-8 text-center"
      >
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="font-display mt-5 text-2xl font-bold">
          ¡Solicitud enviada!
        </h3>
        <p className="mx-auto mt-3 max-w-md text-ink-300">
          Gracias {form.nombre.split(" ")[0]}. Un asesor revisará tu proyecto y
          te contactará dentro de las próximas 24 horas hábiles.
        </p>
        <div className="mt-6 flex justify-center">
          <Button
            href={whatsappLink(
              `Hola IRONHAUS 👋, acabo de enviar una cotización para un proyecto de tipo "${form.tipo}".`,
            )}
            variant="outline"
            target="_blank"
          >
            <MessageCircle className="h-5 w-5" />
            Acelerar por WhatsApp
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-surface p-6 md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre completo" value={form.nombre} onChange={(v) => update("nombre", v)} required />
        <Field label="Empresa / institución" value={form.empresa} onChange={(v) => update("empresa", v)} />
        <Field label="Correo electrónico" type="email" value={form.email} onChange={(v) => update("email", v)} required />
        <Field label="Teléfono" type="tel" value={form.telefono} onChange={(v) => update("telefono", v)} required />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-200">
            Tipo de proyecto
          </span>
          <select
            value={form.tipo}
            onChange={(e) => update("tipo", e.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-ink-950 px-3 text-sm outline-none focus:border-brand-500"
          >
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <Field label="Superficie aprox. (m²)" value={form.superficie} onChange={(v) => update("superficie", v)} placeholder="Ej: 250" />
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-200">
          Cuéntanos sobre tu proyecto
        </span>
        <textarea
          value={form.mensaje}
          onChange={(e) => update("mensaje", e.target.value)}
          rows={4}
          placeholder="Equipos que necesitas, plazos, presupuesto estimado…"
          className="w-full rounded-lg border border-border bg-ink-950 px-3 py-2.5 text-sm outline-none focus:border-brand-500"
        />
      </label>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Enviando…
          </>
        ) : (
          "Solicitar cotización gratuita"
        )}
      </Button>
      <p className="text-center text-xs text-ink-500">
        Respuesta en menos de 24 h hábiles · Sin compromiso
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-200">
        {label} {required && <span className="text-brand-600">*</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-border bg-ink-950 px-3 text-sm outline-none focus:border-brand-500"
      />
    </label>
  );
}
