'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type CategoryData = {
  name: string;
  slug: string;
  subcategories: { name: string; slug: string }[];
  featured?: { name: string; slug: string; image: string };
};

const categories: CategoryData[] = [
  {
    name: 'Phones',
    slug: 'phones',
    subcategories: [
      { name: 'iPhones', slug: 'iphones' },
      { name: 'Samsung Galaxy', slug: 'samsung-galaxy' },
      { name: 'Phone Cases', slug: 'phone-cases' },
      { name: 'Screen Protectors', slug: 'screen-protectors' },
    ],
    featured: {
      name: 'iPhone 16 Pro Max',
      slug: 'iphone-16-pro-max',
      image: 'https://picsum.photos/seed/iphone-16-pro-max/400/300',
    },
  },
  {
    name: 'Gaming',
    slug: 'gaming',
    subcategories: [
      { name: 'Consoles', slug: 'consoles' },
      { name: 'Controllers', slug: 'controllers' },
      { name: 'Gaming Headsets', slug: 'gaming-headsets' },
      { name: 'Gaming Accessories', slug: 'gaming-accessories' },
    ],
    featured: {
      name: 'PS5 Pro Console',
      slug: 'ps5-pro',
      image: 'https://picsum.photos/seed/ps5-pro/400/300',
    },
  },
  {
    name: 'Audio',
    slug: 'audio',
    subcategories: [
      { name: 'Earbuds', slug: 'earbuds' },
      { name: 'Headphones', slug: 'headphones' },
      { name: 'Speakers', slug: 'speakers' },
      { name: 'Audio Accessories', slug: 'audio-accessories' },
    ],
    featured: {
      name: 'AirPods Pro 3',
      slug: 'airpods-pro-3',
      image: 'https://picsum.photos/seed/airpods-pro-3/400/300',
    },
  },
  {
    name: 'Wearables',
    slug: 'wearables',
    subcategories: [
      { name: 'Apple Watch', slug: 'apple-watch' },
      { name: 'Fitness Trackers', slug: 'fitness-trackers' },
      { name: 'Watch Bands', slug: 'watch-bands' },
    ],
    featured: {
      name: 'Apple Watch Ultra 2',
      slug: 'apple-watch-ultra-2',
      image: 'https://picsum.photos/seed/apple-watch-ultra-2/400/300',
    },
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    subcategories: [
      { name: 'Chargers', slug: 'chargers' },
      { name: 'Cables', slug: 'cables' },
      { name: 'Stands & Mounts', slug: 'stands-mounts' },
      { name: 'Hubs & Adapters', slug: 'hubs-adapters' },
    ],
  },
];

export { categories };

export default function MegaMenu({
  activeCategory,
  onClose,
}: {
  activeCategory: string | null;
  onClose: () => void;
}) {
  const category = categories.find((c) => c.slug === activeCategory);

  return (
    <AnimatePresence>
      {category && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-0 right-0 bg-white border-b border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] z-40"
          onMouseLeave={onClose}
        >
          <div className="max-w-[1400px] mx-auto px-8 py-8">
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">
                  {category.name}
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/category/${category.slug}?sub=${sub.slug}`}
                      className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                      onClick={onClose}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/category/${category.slug}`}
                  className="inline-block mt-6 text-sm font-medium text-zinc-900 hover:text-emerald-600 transition-colors"
                  onClick={onClose}
                >
                  View all {category.name}
                </Link>
              </div>
              {category.featured && (
                <div className="col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">
                    Featured
                  </p>
                  <Link
                    href={`/product/${category.featured.slug}`}
                    className="group block"
                    onClick={onClose}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3]">
                      <img
                        src={category.featured.image}
                        alt={category.featured.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-zinc-900 group-hover:text-emerald-600 transition-colors">
                      {category.featured.name}
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
