'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star } from '@phosphor-icons/react/dist/ssr';
import { getFeaturedProducts } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

export default function FeaturedSpotlight() {
  const product = getFeaturedProducts()[0];
  if (!product) return null;

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200"
        >
          {/* Info */}
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#000435] mb-4">
              Featured Product
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-3">
              {product.name}
            </h2>
            <p className="text-zinc-500 mb-6 leading-relaxed max-w-[40ch]">
              {product.shortDescription}
            </p>
            <div className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    weight={product.rating >= s ? 'fill' : 'regular'}
                    className={product.rating >= s ? 'text-amber-400' : 'text-zinc-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-400">({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-zinc-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-zinc-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex items-center gap-2 bg-[#000435] text-white rounded-xl px-7 py-4 font-medium hover:bg-[#000328] active:scale-[0.98] transition-all w-fit"
            >
              View Details
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Image */}
          <div className="relative min-h-[320px] md:min-h-0 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}