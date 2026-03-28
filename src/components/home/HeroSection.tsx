'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, ArrowsClockwise, Headset } from '@phosphor-icons/react/dist/ssr';

export default function HeroSection() {

  const perks = [
    { icon: <Truck size={16} />,           label: 'Free Delivery',  sub: 'Orders over $50' },
    { icon: <ShieldCheck size={16} />,     label: '100% Authentic', sub: 'Genuine products' },
    { icon: <ArrowsClockwise size={16} />, label: 'Easy Returns',   sub: '7-day policy' },
    { icon: <Headset size={16} />,         label: '24/7 Support',   sub: 'Always available' },
  ];

  const brands = ['Apple', 'Samsung', 'Sony', 'PlayStation', 'Beats', 'Bose', 'JBL', 'Anker'];

  return (
    <div className="relative bg-[#f9fafb] md:h-screen md:overflow-hidden">

        {/*
          ── DESKTOP LAYOUT (md+) ──────────────────────────────────
          Two columns: text left (flex-1) | video right (auto width)
          Video fills viewport height minus navbar — stays perfectly contained.

          ── MOBILE LAYOUT (<md) ──────────────────────────────────
          Single column stack:
            1. Headline + CTA
            2. Video (portrait, 50 vh, centered)
            3. Stats + perks
        */}

        <div className="md:h-full flex flex-col md:flex-row md:items-stretch max-w-[1400px] mx-auto px-4 md:px-8">

          {/* ── LEFT COLUMN / TOP ON MOBILE ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
            className="flex flex-col justify-center md:flex-1 pt-24 pb-4 md:py-0 md:pr-8"
          >
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#000435] mb-4 block"
            >
              New Arrivals 2026
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 20 }}
              className="text-[2.6rem] sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.92] text-zinc-900 mb-5"
            >
              The Future<br />of Tech,<br />
              <span className="text-[#000435]">Delivered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-[40ch] mb-6"
            >
              Your one-stop destination for premium gadgets — iPhones, Samsung,
              PlayStation, AirPods, iPads &amp; more. Authentic products, fast delivery,
              unbeatable prices.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <Link
                href="/shop"
                className="bg-[#000435] text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-[#000328] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                Shop Now <ArrowRight size={15} />
              </Link>
              <Link
                href="/category/phones"
                className="border border-[#000435]/30 text-[#000435] rounded-xl px-6 py-3 text-sm font-semibold hover:bg-[#000435] hover:text-white transition-all"
              >
                Browse Phones
              </Link>
              <Link
                href="/shop?deals=true"
                className="text-[#000435] text-sm font-semibold hover:underline flex items-center gap-1"
              >
                Deals <ArrowRight size={13} />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-5 pb-5 mb-5 border-b border-slate-200"
            >
              {[
                { value: '500+',  label: 'Products' },
                { value: '10K+',  label: 'Customers' },
                { value: '4.8★',  label: 'Rating' },
                { value: '2-Day', label: 'Delivery' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-lg font-bold text-zinc-900">{s.value}</p>
                  <p className="text-[11px] text-zinc-400">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Brand pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-1.5 mb-6 md:mb-0"
            >
              {brands.map((b) => (
                <span key={b} className="text-[11px] font-medium text-zinc-500 bg-white border border-slate-200 rounded-full px-3 py-1">
                  {b}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── VIDEO — mobile: centered strip, desktop: full-height right column ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.25 }}
            className={[
              /* shared */
              'flex items-center justify-center',
              /* mobile: horizontal strip between headline and perks */
              'py-4 md:py-0',
              /* desktop: full height right column, stretches to fill */
              'md:h-full md:w-auto md:items-center md:justify-end md:pl-6',
            ].join(' ')}
          >
            <div className={[
              'relative overflow-hidden rounded-[1.75rem] shadow-2xl bg-slate-200',
              /* mobile: portrait pill, 46 vh tall */
              'h-[46vh] aspect-[9/16]',
              /* desktop: fills full column width and height */
              'md:h-[calc(100vh-80px)] md:w-auto',
            ].join(' ')}>
              <video
                src="/hero-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-[10px] text-zinc-400 mb-0.5">Latest Drop</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-zinc-900">iPhone 16 Pro Max</p>
                  <p className="text-[#000435] font-bold text-xs">From $1,199</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── PERKS BAR — desktop only, pinned to bottom ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="hidden md:grid grid-cols-4 gap-3 absolute bottom-0 left-0 right-0 px-8 pb-5 max-w-[1400px] mx-auto"
        >
          {perks.map((p) => (
            <div key={p.label} className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-2.5 border border-slate-100 shadow-sm">
              <span className="text-[#000435] shrink-0">{p.icon}</span>
              <div>
                <p className="text-[11px] font-semibold text-zinc-800">{p.label}</p>
                <p className="text-[10px] text-zinc-400">{p.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
  );
}
