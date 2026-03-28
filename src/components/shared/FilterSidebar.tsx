'use client';

import { useState } from 'react';
import { X, FunnelSimple } from '@phosphor-icons/react/dist/ssr';

export type Filters = {
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStock: boolean;
};

const defaultFilters: Filters = {
  categories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 2500000,
  minRating: 0,
  inStock: false,
};

const CATEGORIES = ['phones', 'gaming', 'audio', 'wearables', 'accessories'];
const BRANDS = ['Apple', 'Samsung', 'Sony', 'JBL', 'Anker'];

export default function FilterSidebar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggle<K extends keyof Filters>(
    key: 'categories' | 'brands',
    value: string
  ) {
    const arr = filters[key] as string[];
    onChange({
      ...filters,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    });
  }

  function clearAll() {
    onChange(defaultFilters);
  }

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900">Filters</h3>
        <button onClick={clearAll} className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">
          Clear all
        </button>
      </div>

      {/* Category */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Category</p>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggle('categories', cat)}
                className="w-4 h-4 rounded border-slate-300 accent-zinc-900"
              />
              <span className="text-sm text-zinc-700 capitalize">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100" />

      {/* Brand */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Brand</p>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggle('brands', brand)}
                className="w-4 h-4 rounded border-slate-300 accent-zinc-900"
              />
              <span className="text-sm text-zinc-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100" />

      {/* Price range */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Price Range</p>
        <div className="flex gap-2">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })}
            placeholder="Min"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            placeholder="Max"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
        </div>
      </div>

      <div className="border-t border-slate-100" />

      {/* In Stock */}
      <label className="flex items-center gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={filters.inStock}
          onChange={(e) => onChange({ ...filters, inStock: e.target.checked })}
          className="w-4 h-4 rounded border-slate-300 accent-zinc-900"
        />
        <span className="text-sm text-zinc-700">In Stock Only</span>
      </label>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium"
        >
          <FunnelSimple size={16} />
          Filters
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button onClick={() => setMobileOpen(false)}>
                <X size={20} className="text-zinc-500" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block w-56 flex-shrink-0">{content}</div>
    </>
  );
}