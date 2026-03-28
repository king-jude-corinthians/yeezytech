'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { products } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';

export default function NewArrivalsGrid() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="py-16 px-4 md:px-8 bg-[#f9fafb]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#000435] mb-2">
              Just Dropped
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?new=true"
            className="flex items-center gap-1.5 text-sm font-medium text-[#000435] hover:underline"
          >
            Shop all new <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {newArrivals.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 100, damping: 20 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
