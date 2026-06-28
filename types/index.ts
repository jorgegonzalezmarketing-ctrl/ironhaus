/**
 * Tipos del dominio. Modelados pensando en una futura DB (Prisma):
 * los nombres y formas son compatibles con un esquema PostgreSQL real,
 * de modo que migrar de mock → DB no exige reescribir la UI.
 */

export type CategorySlug =
  | "cardio"
  | "musculacion"
  | "peso-libre"
  | "crossfit"
  | "accesorios"
  | "comercial"
  | "home-gym";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  /** Nombre del ícono lucide-react usado en la UI. */
  icon: string;
  /** Tono de acento para el placeholder/visual de la categoría. */
  accent: string;
}

export interface Brand {
  slug: string;
  name: string;
  /** País de origen, para reforzar autoridad. */
  origin: string;
}

export type ProductBadge =
  | "nuevo"
  | "oferta"
  | "mas-vendido"
  | "premium"
  | "agotado";

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: CategorySlug;
  brand: string;
  /** Precio lista en CLP (entero, sin decimales). */
  price: number;
  /** Precio oferta en CLP; si existe, es menor a `price`. */
  salePrice?: number;
  stock: number;
  rating: number;
  reviews: number;
  badges: ProductBadge[];
  /** Para cross-sell / "También te puede interesar". */
  relatedIds: string[];
  /** Atributos clave para fichas y filtros. */
  specs: { label: string; value: string }[];
  highlights: string[];
  /** Marca productos destacados en la home. */
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface Faq {
  question: string;
  answer: string;
  category: "pagos" | "garantias" | "despachos" | "instalacion" | "facturacion";
}

/** Ítem dentro del carrito persistente. */
export interface CartItem {
  productId: string;
  sku: string;
  slug: string;
  name: string;
  price: number; // precio efectivo (oferta si aplica)
  image?: string;
  quantity: number;
}
