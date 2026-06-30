"use client";

import { useState, useTransition } from "react";
import { Check, Loader2 } from "lucide-react";
import { updateOrderStatusAction } from "@/lib/actions/admin";
import { ORDER_STATUSES } from "@/lib/order-status";
import { cn } from "@/lib/utils";

/**
 * Selector de estado de un pedido. Al guardar, el botón muestra
 * "✓ Guardado" y vuelve a "Actualizar" (al cambiar el estado o tras unos segundos).
 */
export function OrderStatusForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("status", status);
    startTransition(async () => {
      await updateOrderStatusAction(orderId, formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
      <select
        value={status}
        disabled={pending}
        onChange={(e) => {
          setStatus(e.target.value);
          setSaved(false); // al cambiar, el botón vuelve a "Actualizar"
        }}
        className="h-9 rounded-lg border border-border bg-ink-950 px-2 text-xs outline-none focus:border-brand-500 disabled:opacity-60"
      >
        {ORDER_STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className={cn(
          "flex h-9 items-center justify-center gap-1 rounded-lg px-3 text-xs font-semibold text-white transition-colors disabled:opacity-70",
          saved ? "bg-emerald-600" : "bg-brand-500 hover:bg-brand-600",
        )}
      >
        {pending ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Guardando…
          </>
        ) : saved ? (
          <>
            <Check className="h-3.5 w-3.5" /> Guardado
          </>
        ) : (
          "Actualizar"
        )}
      </button>
    </form>
  );
}
