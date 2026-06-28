import {
  HeartPulse,
  Dumbbell,
  Weight,
  Flame,
  Cable,
  Building2,
  House,
  type LucideIcon,
} from "lucide-react";

/** Mapa nombre → componente de ícono (definido en los datos de categoría). */
const iconMap: Record<string, LucideIcon> = {
  HeartPulse,
  Dumbbell,
  Weight,
  Flame,
  Cable,
  Building2,
  House,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Dumbbell;
  return <Icon className={className} aria-hidden="true" />;
}
