"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { loginAction } from "@/lib/actions/admin";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-200">
          Correo
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          placeholder="holajenny@ironhaus.cl"
          className="h-11 w-full rounded-lg border border-border bg-ink-950 px-3 text-sm outline-none focus:border-brand-500"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-200">
          Contraseña
        </span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="h-11 w-full rounded-lg border border-border bg-ink-950 px-3 text-sm outline-none focus:border-brand-500"
        />
      </label>

      {state?.error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-500 font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Ingresando…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" /> Ingresar
          </>
        )}
      </button>
    </form>
  );
}
