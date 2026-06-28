"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-8 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
          <Check className="h-7 w-7" />
        </div>
        <p className="font-semibold">¡Mensaje enviado!</p>
        <p className="text-sm text-ink-400">Te responderemos a la brevedad.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-surface p-6"
    >
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-200">
          Nombre <span className="text-brand-400">*</span>
        </span>
        <input
          required
          value={form.nombre}
          onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
          className="h-11 w-full rounded-lg border border-border bg-ink-950 px-3 text-sm outline-none focus:border-brand-500"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-200">
          Correo <span className="text-brand-400">*</span>
        </span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="h-11 w-full rounded-lg border border-border bg-ink-950 px-3 text-sm outline-none focus:border-brand-500"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-200">
          Mensaje <span className="text-brand-400">*</span>
        </span>
        <textarea
          required
          rows={4}
          value={form.mensaje}
          onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
          className="w-full rounded-lg border border-border bg-ink-950 px-3 py-2.5 text-sm outline-none focus:border-brand-500"
        />
      </label>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Enviando…
          </>
        ) : (
          "Enviar mensaje"
        )}
      </Button>
    </form>
  );
}
