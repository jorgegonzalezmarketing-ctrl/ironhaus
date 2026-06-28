import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/ui/social-icons";
import { siteConfig } from "@/lib/site";
import { categories } from "@/lib/data/categories";

const trust = [
  "Compra 100% segura",
  "Despacho a todo Chile",
  "Factura para empresas",
  "Garantía y servicio técnico",
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink-950">
      {/* Franja de confianza */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-6 md:grid-cols-4">
          {trust.map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 text-sm text-ink-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        {/* Marca */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 font-display text-lg font-black text-white">
              IH
            </span>
            <span className="font-display text-xl font-extrabold">
              {siteConfig.name}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-ink-400">
            {siteConfig.tagline}. Equipamos gimnasios comerciales y domiciliarios
            en todo Chile.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={siteConfig.social.instagram}
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-brand-500 hover:text-brand-400"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-brand-500 hover:text-brand-400"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.youtube}
              aria-label="YouTube"
              className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-brand-500 hover:text-brand-400"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Categorías */}
        <div>
          <h3 className="mb-4 font-semibold">Categorías</h3>
          <ul className="space-y-2.5 text-sm text-ink-400">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/catalogo/${c.slug}`}
                  className="hover:text-brand-400"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Empresa */}
        <div>
          <h3 className="mb-4 font-semibold">Empresa</h3>
          <ul className="space-y-2.5 text-sm text-ink-400">
            <li>
              <Link href="/equipamos-tu-gimnasio" className="hover:text-brand-400">
                Equipamos tu gimnasio
              </Link>
            </li>
            <li>
              <Link href="/cotizar" className="hover:text-brand-400">
                Cotización para empresas
              </Link>
            </li>
            <li>
              <Link href="/catalogo" className="hover:text-brand-400">
                Catálogo completo
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-brand-400">
                Contacto
              </Link>
            </li>
            <li>
              <Link href="/contacto#faq" className="hover:text-brand-400">
                Preguntas frecuentes
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="mb-4 font-semibold">Contacto</h3>
          <ul className="space-y-3 text-sm text-ink-400">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              <span>
                {siteConfig.address.street}, {siteConfig.address.district},{" "}
                {siteConfig.address.city}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-brand-500" />
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="hover:text-brand-400"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-brand-500" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-400">
                {siteConfig.email}
              </a>
            </li>
            <li className="text-xs text-ink-500">{siteConfig.hours}</li>
          </ul>
        </div>
      </div>

      {/* Pie legal */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-ink-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos los
            derechos reservados.
          </p>
          <p className="flex items-center gap-3">
            <span>WebPay Plus</span>
            <span className="h-3 w-px bg-border" />
            <span>Mercado Pago</span>
            <span className="h-3 w-px bg-border" />
            <span>Compra protegida</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
