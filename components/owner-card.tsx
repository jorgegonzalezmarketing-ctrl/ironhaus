import { MessageCircle, Mail, BadgeCheck } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/button";

/**
 * Tarjeta de atención personalizada de la dueña (Jenny).
 * Da rostro humano a la marca y sube la conversión por confianza.
 */
export function OwnerCard() {
  const { owner } = siteConfig;
  const initials = owner.name.slice(0, 1).toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-500/10 via-surface to-surface p-6">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-500/15 blur-2xl" />
      <div className="relative flex items-start gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 font-display text-2xl font-black text-white shadow-brand">
            {initials}
          </span>
          <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-surface text-brand-600">
            <BadgeCheck className="h-5 w-5" />
          </span>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Atención personalizada
          </p>
          <h3 className="font-display mt-0.5 text-xl font-bold">
            Conversemos, soy {owner.name}
          </h3>
          <p className="text-sm text-ink-400">{owner.role}</p>
        </div>
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-ink-300">
        “{owner.note}”
      </p>

      <div className="relative mt-5 flex flex-col gap-2 sm:flex-row">
        <Button
          href={whatsappLink(
            `Hola ${owner.name} 👋, vi el sitio de IRONHAUS y quiero asesoría.`,
          )}
          target="_blank"
          size="sm"
          className="flex-1"
        >
          <MessageCircle className="h-4 w-4" />
          Escríbele a {owner.name}
        </Button>
        <Button
          href={`mailto:${siteConfig.email}`}
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <Mail className="h-4 w-4" />
          {siteConfig.email}
        </Button>
      </div>
    </div>
  );
}
