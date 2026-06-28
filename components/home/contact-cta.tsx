import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-600/20 via-surface to-surface p-8 md:p-14">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-brand-500/20 blur-[100px]" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
            ¿Listo para equipar tu gimnasio?
          </h2>
          <p className="mt-4 text-lg text-ink-200">
            Cuéntanos tu proyecto y te enviamos una propuesta a medida. Atención
            por WhatsApp, correo o teléfono — respondemos rápido.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/cotizar" size="lg">
              Cotizar ahora
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              href={whatsappLink()}
              variant="outline"
              size="lg"
              target="_blank"
            >
              <MessageCircle className="h-5 w-5" />
              Escribir por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
