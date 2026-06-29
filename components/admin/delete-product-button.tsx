"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProductAction } from "@/lib/actions/admin";

export function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) {
          start(() => deleteProductAction(id));
        }
      }}
      aria-label={`Eliminar ${name}`}
      className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-red-500/10 hover:text-red-600 disabled:opacity-50"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </button>
  );
}
