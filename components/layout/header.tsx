"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingCart,
  Truck,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore, selectCartCount } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { categories } from "@/lib/data/categories";
import { siteConfig } from "@/lib/site";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/equipamos-tu-gimnasio", label: "Equipamos tu gimnasio" },
  { href: "/cotizar", label: "Cotizar" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const mounted = useMounted();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const openCart = useCartStore((s) => s.open);
  const cartCount = useCartStore(selectCartCount);
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al navegar.
  useEffect(() => setMenuOpen(false), [pathname]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/catalogo?q=${encodeURIComponent(q)}` : "/catalogo");
  }

  return (
    <>
      {/* Barra de confianza */}
      <div className="hidden bg-ink-950 text-ink-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <span className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5 text-brand-500" />
            Despacho a todo Chile · Instalación profesional en Santiago
          </span>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 hover:text-foreground"
          >
            <Phone className="h-3.5 w-3.5 text-brand-500" />
            {siteConfig.phone}
          </a>
        </div>
      </div>

      {/* Header principal */}
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-border bg-background/85 backdrop-blur-lg"
            : "border-transparent bg-background",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 font-display text-lg font-black text-white">
              IH
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>

          {/* Buscador (desktop) */}
          <form
            onSubmit={submitSearch}
            className="relative hidden flex-1 lg:block"
            role="search"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar máquinas, discos, racks…"
              aria-label="Buscar productos"
              className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500"
            />
          </form>

          {/* Acciones */}
          <div className="ml-auto flex items-center gap-1">
            <Link
              href="/favoritos"
              aria-label="Favoritos"
              className="relative grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2"
            >
              <Heart className="h-5 w-5" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              aria-label="Abrir carrito"
              className="relative grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2"
            >
              <ShoppingCart className="h-5 w-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2 lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Navegación por categorías (desktop) */}
        <nav className="hidden border-t border-border lg:block">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/catalogo/${c.slug}`}
                className="px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:text-brand-600"
              >
                {c.shortName}
              </Link>
            ))}
            <span className="mx-2 h-4 w-px bg-border" />
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-3 py-2.5 text-sm font-semibold transition-colors hover:text-brand-600",
                  pathname === l.href ? "text-brand-600" : "text-foreground",
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-lg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24">
              <form onSubmit={submitSearch} className="relative mb-6" role="search">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar productos…"
                  className="h-12 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm outline-none focus:border-brand-500"
                />
              </form>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
                Categorías
              </p>
              <div className="mb-6 grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/catalogo/${c.slug}`}
                    className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium hover:border-brand-500"
                  >
                    {c.shortName}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-xl px-4 py-3 text-lg font-semibold hover:bg-surface-2"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
