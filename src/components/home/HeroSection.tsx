'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, ArrowsClockwise, Headset } from '@phosphor-icons/react/dist/ssr';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isSeeking = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tick = () => {
      if (!isSeeking.current && video.duration) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.001) video.currentTime += diff * 0.7;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    const onSeeking = () => { isSeeking.current = true; };
    const onSeeked  = () => { isSeeking.current = false; };
    video.addEventListener('seeking', onSeeking);
    video.addEventListener('seeked',  onSeeked);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      video.removeEventListener('seeking', onSeeking);
      video.removeEventListener('seeked',  onSeeked);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      const video   = videoRef.current;
      if (!wrapper || !video || !video.duration) return;
      const { top, height } = wrapper.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(-top / scrollable, 0), 1);
      targetTimeRef.current = progress * video.duration;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  const perks = [
    { icon: <Truck size={18} />,          label: 'Free Delivery',    sub: 'On orders over $50' },
    { icon: <ShieldCheck size={18} />,    label: '100% Authentic',   sub: 'Genuine products only' },
    { icon: <ArrowsClockwise size={18} />,label: 'Easy Returns',     sub: '7-day return policy' },
    { icon: <Headset size={18} />,        label: '24/7 Support',     sub: 'Always here for you' },
  ];

  const brands = ['Apple', 'Samsung', 'Sony', 'PlayStation', 'Beats', 'Bose', 'JBL', 'Anker'];

  return (
    <div ref={wrapperRef} className="relative h-[220vh] md:h-[280vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center bg-[#f9fafb] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full py-6 md:py-10">

          {/* Main hero row */}
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-0">

            {/* Left — text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
              className="flex-1 order-2 md:order-1"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#000435] mb-4"
              >
                New Arrivals 2026
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 20 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] text-zinc-900 mb-4"
              >
                The Future
                <br />
                of Tech,
                <br />
                <span className="text-[#000435]">Delivered.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base text-zinc-500 leading-relaxed max-w-[42ch] mb-6"
              >
                Your one-stop destination for premium gadgets. iPhones, Samsung, PlayStation,
                AirPods, iPads &amp; more — authentic products, fast delivery, unbeatable prices.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-3 mb-8"
              >
                <Link
                  href="/shop"
                  className="bg-[#000435] text-white rounded-xl px-7 py-3.5 font-medium hover:bg-[#000328] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  Shop Now <ArrowRight size={16} />
                </Link>
                <Link
                  href="/category/phones"
                  className="border border-[#000435] text-[#000435] rounded-xl px-7 py-3.5 font-medium hover:bg-[#000435] hover:text-white transition-all"
                >
                  Browse Phones
                </Link>
                <Link
                  href="/shop?deals=true"
                  className="text-[#000435] font-medium hover:underline transition-colors flex items-center gap-1"
                >
                  View Deals <ArrowRight size={14} />
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-6 pb-6 mb-6 border-b border-slate-200"
              >
                {[
                  { value: '500+',  label: 'Products' },
                  { value: '10K+',  label: 'Happy Customers' },
                  { value: '4.8★',  label: 'Avg Rating' },
                  { value: '2-Day', label: 'Delivery' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl font-bold text-zinc-900">{stat.value}</p>
                    <p className="text-xs text-zinc-400">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Brand pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="flex flex-wrap gap-2"
              >
                {brands.map((brand) => (
                  <span key={brand} className="text-xs font-medium text-zinc-500 bg-white border border-slate-200 rounded-full px-3 py-1">
                    {brand}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — video, no fixed size, natural dimensions */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
              className="order-1 md:order-2 md:pl-10 flex justify-center md:justify-end shrink-0"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-slate-100 aspect-[9/16] h-[85vh]">
                <video
                  ref={videoRef}
                  src="/hero-video.mp4"
                  preload="auto"
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Floating badge */}
                <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-[10px] text-zinc-400 mb-0.5">Latest Drop</p>
                  <p className="text-xs font-semibold text-zinc-900">iPhone 16 Pro Max</p>
                  <p className="text-[#000435] font-bold text-xs">From $1,199</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Perks row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8"
          >
            {perks.map((perk) => (
              <div key={perk.label} className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm">
                <span className="text-[#000435] shrink-0">{perk.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-zinc-800">{perk.label}</p>
                  <p className="text-[10px] text-zinc-400">{perk.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
