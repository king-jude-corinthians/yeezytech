'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { getDealProducts } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import CountdownTimer from '@/components/ui/CountdownTimer';

export default function DealsBanner() {
  const deals = getDealProducts().slice(0, 3);
  const targetDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="bg-[#1B1B72] rounded-[2rem] p-8 md:p-12 overflow-hidden relative"
        >
          {/* Decorative blur */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3 block">
                Limited Time
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Today&apos;s Deals
              </h2>
              <p className="text-zinc-400 mb-8 max-w-[35ch] leading-relaxed">
                Exclusive discounts on premium tech. These deals won&apos;t last &mdash; grab them before time runs out.
              </p>
              <Link
                href="/shop?deals=true"
                className="inline-flex items-center gap-2 bg-white text-[#1B1B72] rounded-xl px-7 py-4 font-medium hover:bg-white/90 active:scale-[0.98] transition-all"
              >
                Shop Deals
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex items-center md:justify-end">
              <CountdownTimer targetDate={targetDate} />
            </div>
          </div>

          {/* Deal products */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {deals.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`} className="group">
                <div className="bg-white hover:bg-white/95 border border-white/20 rounded-2xl p-5 transition-colors">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-xs text-zinc-400 mb-1">{product.brand}</p>
                  <p className="text-sm font-semibold text-zinc-900 mb-2 line-clamp-1">{product.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#1B1B72] font-bold">{formatCurrency(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-zinc-400 text-sm line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="ml-auto text-xs bg-[#1B1B72]/10 text-[#1B1B72] px-2 py-0.5 rounded-full font-medium">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}