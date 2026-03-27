'use client';

import { useState, useMemo } from 'react';
import { use } from 'react';
import { getProductsByCategory, products } from '@/lib/data';
import ProductGrid from '@/components/product/ProductGrid';
import FilterSidebar, { Filters } from '@/components/shared/FilterSidebar';
import SortDropdown from '@/components/shared/SortDropdown';

const categoryMeta: Record<string, { title: string; description: string; image: string }> = {
  phones: {
    title: 'Phones',
    description: 'The latest smartphones from Apple, Samsung, and more.',
    image: 'https://picsum.photos/seed/cat-phones-hero/1400/400',
  },
  gaming: {
    title: 'Gaming',
    description: 'Consoles, controllers, and everything you need to game.',
    image: 'https://picsum.photos/seed/cat-gaming-hero/1400/400',
  },
  audio: {
    title: 'Audio',
    description: 'Premium sound for every moment.',
    image: 'https://picsum.photos/seed/cat-audio-hero/1400/400',
  },
  wearables: {
    title: 'Wearables',
    description: 'Smart watches and fitness trackers for your lifestyle.',
    image: 'https://picsum.photos/seed/cat-wearables-hero/1400/400',
  },
  accessories: {
    title: 'Accessories',
    description: 'Essential tech accessories and peripherals.',
    image: 'https://picsum.photos/seed/cat-accessories-hero/1400/400',
  },
};

const subcategories: Record<string, string[]> = {
  phones: ['All', 'iPhones', 'Samsung Galaxy', 'Phone Cases'],
  gaming: ['All', 'Consoles', 'Controllers', 'Gaming Headsets'],
  audio: ['All', 'Earbuds', 'Headphones', 'Speakers'],
  wearables: ['All', 'Apple Watch', 'Fitness Trackers'],
  accessories: ['All', 'Chargers', 'Cables', 'Hubs & Adapters'],
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const meta = categoryMeta[slug] ?? { title: slug, description: '', image: 'https://picsum.photos/seed/default-hero/1400/400' };
  const subs = subcategories[slug] ?? ['All'];

  const [activeSub, setActiveSub] = useState('All');
  const [sort, setSort] = useState('popular');
  const [filters, setFilters] = useState<Filters>({
    categories: [slug],
    brands: [],
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
    inStock: false,
  });

  const categoryProducts = getProductsByCategory(slug);

  const filtered = useMemo(() => {
    let list = [...categoryProducts];
    if (filters.brands.length) list = list.filter((p) => filters.brands.includes(p.brand));
    if (filters.inStock) list = list.filter((p) => p.inStock);
    list = list.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [categoryProducts, filters, sort]);

  return (
    <div>
      {/* Hero banner */}
      <div className="relative overflow-hidden h-48 md:h-64">
        <img src={meta.image} alt={meta.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1B1B72]/70 flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">{meta.title}</h1>
          <p className="text-white/70 max-w-lg">{meta.description}</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
        {/* Subcategory pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-8">
          {subs.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeSub === sub
                  ? 'bg-[#1B1B72] text-white'
                  : 'bg-white border border-slate-200 text-zinc-600 hover:border-zinc-400'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          <FilterSidebar filters={filters} onChange={setFilters} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-zinc-400 hidden md:block">{filtered.length} products</p>
              <SortDropdown value={sort} onChange={setSort} />
            </div>
            {filtered.length > 0 ? (
              <ProductGrid products={filtered} />
            ) : (
              <div className="py-24 text-center text-zinc-400">No products found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}