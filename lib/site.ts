/**
 * Configuración central de la marca y el sitio.
 * Fuente única de verdad para SEO, datos de contacto, JSON-LD y footer.
 * Cambiar un valor aquí lo propaga a todo el sitio.
 */

export const siteConfig = {
  name: "Crea Fitness",
  legalName: "Crea Fitness SpA", // TODO: confirmar razón social real
  tagline: "Equipamiento y máquinas de gimnasio en Chile",
  description:
    "Venta de maquinaria de gimnasio en Chile: máquinas de musculación, cardio, CrossFit, peso libre y equipamiento comercial. Equipamos gimnasios completos con despacho a todo el país.",
  // URL canónica de producción (deploy actual en Vercel).
  url: "https://ironhaus-iota.vercel.app",
  locale: "es_CL",
  currency: "CLP",
  // Contacto — PLACEHOLDERS: reemplazar con los datos reales de Crea Fitness.
  phone: "+56 9 0000 0000",
  whatsapp: "56900000000", // formato internacional sin "+", para wa.me
  whatsappMessage:
    "Hola Crea Fitness 👋, quiero información sobre equipamiento de gimnasio.",
  email: "hola@creafitness.cl", // TODO: confirmar correo real
  // Persona/dueña que da la cara de la marca (atención personalizada).
  owner: {
    name: "Jenny",
    fullName: "Jenny",
    role: "Fundadora & Asesora de equipamiento",
    note: "Te ayudo a elegir el equipamiento correcto para tu gimnasio, hotel o casa. Cuéntame tu proyecto y lo armamos juntos.",
  },
  address: {
    // TODO: confirmar dirección real o marcar como tienda 100% online.
    street: "Santiago",
    district: "",
    city: "Santiago",
    region: "Región Metropolitana",
    country: "CL",
    zip: "",
    maps: "https://maps.google.com/?q=Santiago,Chile",
    lat: -33.4489,
    lng: -70.6693,
  },
  hours: "Lun a Vie 9:00–19:00 · Sáb 10:00–14:00",
  social: {
    instagram: "https://www.instagram.com/fitness.crea",
    facebook: "", // sin definir
    youtube: "", // sin definir
    tiktok: "", // sin definir
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Construye el enlace de WhatsApp con mensaje pre-cargado. */
export function whatsappLink(message?: string): string {
  const text = encodeURIComponent(message ?? siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}
