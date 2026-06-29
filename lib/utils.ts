import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases Tailwind resolviendo conflictos. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Formatea un entero en pesos chilenos: 2890000 → "$2.890.000". */
export function formatCLP(amount: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Genera un código de pedido legible. */
export function generateOrderCode(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `CF-${n}`;
}
