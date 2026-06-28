import type { Brand } from "@/types";

/** Marcas representadas (ficticias para la demo, evocan líderes del rubro). */
export const brands: Brand[] = [
  { slug: "titanforge", name: "TitanForge", origin: "EE.UU." },
  { slug: "kraftwerk", name: "Kraftwerk", origin: "Alemania" },
  { slug: "apex-cardio", name: "Apex Cardio", origin: "Italia" },
  { slug: "ironclad", name: "Ironclad", origin: "EE.UU." },
  { slug: "nordik", name: "Nordik Strength", origin: "Suecia" },
  { slug: "voltarc", name: "VoltArc", origin: "Japón" },
  { slug: "andes-fit", name: "Andes Fit", origin: "Chile" },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getBrandName(slug: string): string {
  return getBrand(slug)?.name ?? slug;
}
