"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X, Search } from "lucide-react";
import type { Product, CategorySlug } from "@/types";
import { categories } from "@/lib/data/categories";
import { brands } from "@/lib/data/brands";
import { effectivePrice } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";

type SortKey = "relevancia" | "precio-asc" | "precio-desc" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor evaluados" },
];

export function CatalogView({
  products,
  fixedCategory,
  initialQuery = "",
}: {
  products: Product[];
  fixedCategory?: CategorySlug;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<CategorySlug[]>(
    [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q),
      );
    }
    if (!fixedCategory && selectedCategories.length) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedBrands.length) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }
    if (onlyOffers) {
      list = list.filter((p) => p.salePrice !== undefined);
    }

    switch (sort) {
      case "precio-asc":
        list.sort((a, b) => effectivePrice(a) - effectivePrice(b));
        break;
      case "precio-desc":
        list.sort((a, b) => effectivePrice(b) - effectivePrice(a));
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [
    products,
    query,
    selectedCategories,
    selectedBrands,
    onlyOffers,
    sort,
    fixedCategory,
  ]);

  function toggleCategory(slug: CategorySlug) {
    setSelectedCategories((p) =>
      p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug],
    );
  }
  function toggleBrand(slug: string) {
    setSelectedBrands((p) =>
      p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug],
    );
  }
  function clearAll() {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setOnlyOffers(false);
    setQuery("");
  }

  const activeFilters =
    selectedCategories.length + selectedBrands.length + (onlyOffers ? 1 : 0);

  const FilterPanel = (
    <div className="space-y-7">
      {/* Buscar */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar en esta lista…"
          className="h-10 w-full rounded-lg border border-border bg-ink-950 pl-9 pr-3 text-sm outline-none focus:border-brand-500"
        />
      </div>

      {/* Ofertas */}
      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={onlyOffers}
          onChange={(e) => setOnlyOffers(e.target.checked)}
          className="h-4 w-4 accent-brand-500"
        />
        Solo ofertas
      </label>

      {/* Categorías */}
      {!fixedCategory && (
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
            Categoría
          </h3>
          <div className="space-y-2">
            {categories.map((c) => (
              <label
                key={c.slug}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(c.slug)}
                  onChange={() => toggleCategory(c.slug)}
                  className="h-4 w-4 accent-brand-500"
                />
                {c.shortName}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Marcas */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
          Marca
        </h3>
        <div className="space-y-2">
          {brands.map((b) => (
            <label
              key={b.slug}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(b.slug)}
                onChange={() => toggleBrand(b.slug)}
                className="h-4 w-4 accent-brand-500"
              />
              {b.name}
            </label>
          ))}
        </div>
      </div>

      {activeFilters > 0 && (
        <button
          onClick={clearAll}
          className="text-sm font-medium text-brand-600 hover:text-brand-300"
        >
          Limpiar filtros ({activeFilters})
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Sidebar desktop */}
      <aside className="hidden lg:block">
        <div className="sticky top-40 rounded-2xl border border-border bg-surface p-5">
          {FilterPanel}
        </div>
      </aside>

      <div>
        {/* Barra superior */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="text-sm text-ink-400">
            {filtered.length}{" "}
            {filtered.length === 1 ? "producto" : "productos"}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {activeFilters > 0 && (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                  {activeFilters}
                </span>
              )}
            </button>
            <label className="sr-only" htmlFor="sort">
              Ordenar por
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-brand-500"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
            <p className="text-muted">
              No encontramos productos con esos filtros.
            </p>
            <button
              onClick={clearAll}
              className="mt-3 text-sm font-medium text-brand-600"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Drawer de filtros móvil */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-border bg-surface p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Filtros</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                aria-label="Cerrar filtros"
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-6 w-full rounded-full bg-brand-500 py-3 font-semibold text-white"
            >
              Ver {filtered.length} productos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
