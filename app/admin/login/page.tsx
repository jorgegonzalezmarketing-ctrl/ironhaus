import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acceso al panel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  // Si ya hay sesión, va directo al panel.
  if (await getSession()) redirect("/admin");

  return (
    <div className="grid min-h-dvh place-items-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-500 font-display text-xl font-black text-white">
            IH
          </span>
          <h1 className="font-display mt-4 text-2xl font-extrabold">
            {siteConfig.name} · Panel
          </h1>
          <p className="mt-1 text-sm text-ink-400">
            Acceso exclusivo para administradores
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
