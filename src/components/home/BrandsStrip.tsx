'use client';

import { motion } from 'framer-motion';

const brands = [
  { name: 'Apple',       color: '#1d1d1f' },
  { name: 'Samsung',     color: '#1428a0' },
  { name: 'Sony',        color: '#000' },
  { name: 'PlayStation', color: '#003087' },
  { name: 'Beats',       color: '#e71d29' },
  { name: 'Bose',        color: '#000' },
  { name: 'JBL',         color: '#f96300' },
  { name: 'Anker',       color: '#0066cc' },
  { name: 'Google',      color: '#4285f4' },
  { name: 'OnePlus',     color: '#f5010c' },
];

const doubled = [...brands, ...brands];

export default function BrandsStrip() {
  return (
    <section className="py-14 bg-[#f9fafb] border-y border-slate-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold text-zinc-400 uppercase tracking-[0.2em]"
        >
          Authorised Retailer For
        </motion.p>
      </div>

      {/* Infinite scroll strip */}
      <div className="relative">
        <div className="flex gap-0 w-max">
          <motion.div
            className="flex gap-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
            style={{ willChange: 'transform' }}
          >
            {doubled.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex items-center justify-center px-10 md:px-14 py-3 border-r border-slate-200"
              >
                <span
                  className="text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap opacity-30 hover:opacity-70 transition-opacity duration-300 cursor-default"
                  style={{ color: brand.color }}
                >
                  {brand.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f9fafb] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f9fafb] to-transparent" />
      </div>
    </section>
  );
}
