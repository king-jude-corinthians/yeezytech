'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default function HeroSection() {
  return (
    <section className="min-h-[100dvh] flex items-center bg-[#f9fafb]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 mb-6"
            >
              New Arrivals 2026
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 20 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] text-zinc-900 mb-6"
            >
              The Future
              <br />
              of Tech,
              <br />
              <span className="text-zinc-400">Delivered.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-[45ch] mb-10"
            >
              Premium gadgets from the world&apos;s leading brands. iPhones,
              Samsung, PlayStation, AirPods, and more &mdash; all in one place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/shop"
                className="bg-zinc-900 text-white rounded-xl px-8 py-4 font-medium hover:bg-zinc-800 active:scale-[0.98] transition-all flex items-center gap-2"
              >
                Shop Now
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/shop?deals=true"
                className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors flex items-center gap-1.5"
              >
                View Deals
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-8 mt-14 pt-8 border-t border-slate-200"
            >
              {[
                { value: '500+', label: 'Products' },
                { value: '10K+', label: 'Customers' },
                { value: '4.8', label: 'Avg Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 aspect-square">
              <img
                src="https://picsum.photos/seed/hero-gadget/800/800"
                alt="Premium gadgets"
                className="w-full h-full object-cover"
              />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl">
                <p className="text-xs text-zinc-400 mb-0.5">Latest Drop</p>
                <p className="text-sm font-semibold text-zinc-900">iPhone 16 Pro Max</p>
                <p className="text-emerald-600 font-bold text-sm">From $1,199</p>
              </div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-emerald-100 rounded-full blur-3xl opacity-60 -z-10" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-slate-200 rounded-full blur-3xl opacity-60 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}