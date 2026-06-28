/**
 * Configuración central de la marca y el sitio.
 * Fuente única de verdad para SEO, datos de contacto, JSON-LD y footer.
 * Cambiar el nombre de la marca aquí lo propaga a todo el sitio.
 */

export const siteConfig = {
  name: "IRONHAUS",
  legalName: "IRONHAUS Equipamiento SpA",
  tagline: "Equipamiento de gimnasio de nivel mundial",
  description:
    "Venta de maquinaria de gimnasio en Chile: máquinas de musculación, cardio, CrossFit, peso libre y equipamiento comercial. Equipamos gimnasios completos con despacho a todo el país.",
  // URL canónica de producción (ajustar al dominio real / Vercel).
  url: "https://ironhaus.vercel.app",
  locale: "es_CL",
  currency: "CLP",
  // Contacto
  phone: "+56 2 2345 6789",
  whatsapp: "56912345678", // formato internacional sin "+", para wa.me
  whatsappMessage:
    "Hola IRONHAUS 👋, quiero información sobre equipamiento de gimnasio.",
  email: "holajenny@ironhaus.cl",
  address: {
    street: "Av. Pedro de Valdivia 1234",
    district: "Providencia",
    city: "Santiago",
    region: "Región Metropolitana",
    country: "CL",
    zip: "7500000",
    maps: "https://maps.google.com/?q=-33.4263,-70.6167",
    lat: -33.4263,
    lng: -70.6167,
  },
  hours: "Lun a Vie 9:00–19:00 · Sáb 10:00–14:00",
  social: {
    instagram: "https://instagram.com/ironhaus.cl",
    facebook: "https://facebook.com/ironhaus.cl",
    youtube: "https://youtube.com/@ironhaus",
    tiktok: "https://tiktok.com/@ironhaus.cl",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Construye el enlace de WhatsApp con mensaje pre-cargado. */
export function whatsappLink(message?: string): string {
  const text = encodeURIComponent(message ?? siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}
