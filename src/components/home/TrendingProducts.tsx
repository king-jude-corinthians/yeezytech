'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { products } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';

export default function TrendingProducts() {
  const trending = products.slice(0, 8);

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
            Trending Now
          </h2>
          <Link
            href="/shop"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1"
          >
            See all <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Horizontal scroll */}
        <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-2">
          {trending.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 100, damping: 20 }}
              className="flex-none w-[240px] md:w-[260px]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}