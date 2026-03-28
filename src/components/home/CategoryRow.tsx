'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { name: 'Phones', slug: 'phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format' },
  { name: 'Gaming', slug: 'gaming', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop&auto=format' },
  { name: 'Audio', slug: 'audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format' },
  { name: 'Wearables', slug: 'wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format' },
  { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&auto=format' },
];

export default function CategoryRow() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
            Shop by Category
          </h2>
          <Link href="/shop" className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors">
            View all
          </Link>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 100, damping: 20 }}
            >
              <Link href={`/category/${cat.slug}`} className="group block">
                <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-square mb-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm font-semibold text-zinc-900 text-center group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} className="group flex-none w-32">
              <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-square mb-2">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-semibold text-zinc-900 text-center">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}