import type { Category } from "@/types";

/**
 * Catálogo de categorías. El `icon` referencia un componente lucide-react
 * resuelto en la UI (ver components/ui/category-icon.tsx).
 */
export const categories: Category[] = [
  {
    slug: "cardio",
    name: "Cardio",
    shortName: "Cardio",
    description:
      "Trotadoras, elípticas, bicicletas y remos de grado comercial para resistencia y quema calórica.",
    icon: "HeartPulse",
    accent: "#ea580c",
  },
  {
    slug: "musculacion",
    name: "Máquinas de Musculación",
    shortName: "Musculación",
    description:
      "Estaciones selectorizadas y de placas para hipertrofia y fuerza guiada con máxima seguridad.",
    icon: "Dumbbell",
    accent: "#c2410c",
  },
  {
    slug: "peso-libre",
    name: "Peso Libre",
    shortName: "Peso Libre",
    description:
      "Discos, barras olímpicas, mancuernas y bancos para entrenamiento de fuerza sin restricciones.",
    icon: "Weight",
    accent: "#b45309",
  },
  {
    slug: "crossfit",
    name: "CrossFit & Funcional",
    shortName: "CrossFit",
    description:
      "Racks, jaulas, kettlebells, cajones y todo el equipamiento para box de alto rendimiento.",
    icon: "Flame",
    accent: "#9a3412",
  },
  {
    slug: "accesorios",
    name: "Accesorios Fitness",
    shortName: "Accesorios",
    description:
      "Bandas, cuerdas, agarres, colchonetas y complementos para potenciar cada rutina.",
    icon: "Cable",
    accent: "#a16207",
  },
  {
    slug: "comercial",
    name: "Equipamiento Comercial",
    shortName: "Comercial",
    description:
      "Líneas premium de uso intensivo 24/7 para gimnasios, hoteles y centros deportivos.",
    icon: "Building2",
    accent: "#7c2d12",
  },
  {
    slug: "home-gym",
    name: "Home Gym",
    shortName: "Home Gym",
    description:
      "Soluciones compactas y multifuncionales para armar tu gimnasio en casa sin sacrificar calidad.",
    icon: "House",
    accent: "#d97706",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
