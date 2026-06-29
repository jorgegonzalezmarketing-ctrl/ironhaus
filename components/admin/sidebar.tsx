"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Ticket,
  LogOut,
  Store,
} from "lucide-react";
import { logoutAction } from "@/lib/actions/admin";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/admin/cupones", label: "Cupones", icon: Ticket },
];

export function AdminSidebar({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex shrink-0 flex-col gap-1 border-b border-border bg-surface p-4 md:h-dvh md:w-60 md:border-b-0 md:border-r">
      <div className="mb-4 flex items-center gap-2 px-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 font-display text-sm font-black text-white">
          CF
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-bold">{siteConfig.name}</p>
          <p className="text-xs text-ink-400">Panel</p>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
        {links.map((l) => {
          const active =
            l.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-500/10 text-brand-700"
                  : "text-ink-300 hover:bg-surface-2 hover:text-foreground",
              )}
            >
              <l.icon className="h-[18px] w-[18px]" />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden flex-col gap-1 border-t border-border pt-3 md:flex">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-300 hover:bg-surface-2 hover:text-foreground"
        >
          <Store className="h-[18px] w-[18px]" />
          Ver tienda
        </Link>
        <p className="px-3 pt-1 text-xs text-ink-400">{name}</p>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-300 hover:bg-surface-2 hover:text-foreground"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
