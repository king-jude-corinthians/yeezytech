'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { products } from '@/lib/data';
import ProductGrid from '@/components/product/ProductGrid';
import FilterSidebar, { Filters } from '@/components/shared/FilterSidebar';
import SortDropdown from '@/components/shared/SortDropdown';

const PAGE_SIZE = 12;

function ShopContent() {
  const searchParams = useSearchParams();
  const dealsOnly = searchParams.get('deals') === 'true';
  const sortParam = searchParams.get('sort') ?? 'popular';

  const [filters, setFilters] = useState<Filters>({
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 2500000,
    minRating: 0,
    inStock: false,
  });
  const [sort, setSort] = useState(sortParam);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = dealsOnly ? products.filter((p) => p.isDeal) : [...products];

    if (filters.categories.length) list = list.filter((p) => filters.categories.includes(p.category));
    if (filters.brands.length) list = list.filter((p) => filters.brands.includes(p.brand));
    if (filters.inStock) list = list.filter((p) => p.inStock);
    list = list.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'newest') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return list;
  }, [filters, sort, dealsOnly]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-1">
          {dealsOnly ? 'Deals & Promotions' : 'All Products'}
        </h1>
        <p className="text-zinc-400 text-sm">{filtered.length} products</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Filters */}
        <FilterSidebar filters={filters} onChange={setFilters} />

        {/* Products */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-zinc-400 hidden md:block">
              Showing {Math.min(visible.length, filtered.length)} of {filtered.length}
            </p>
            <SortDropdown value={sort} onChange={setSort} />
          </div>

          {visible.length > 0 ? (
            <>
              <ProductGrid products={visible} />
              {hasMore && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="bg-white border border-slate-200 hover:border-zinc-400 text-zinc-700 rounded-xl px-8 py-3 text-sm font-medium active:scale-[0.98] transition-all"
                  >
                    Show More Products
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-24 text-center">
              <p className="text-zinc-400 mb-4">No products match your filters.</p>
              <button
                onClick={() => setFilters({ categories: [], brands: [], minPrice: 0, maxPrice: 5000, minRating: 0, inStock: false })}
                className="text-sm font-medium text-zinc-900 underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-zinc-400">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}