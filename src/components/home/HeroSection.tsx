'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isSeeking = useRef(false);

  // RAF loop — smoothly eases video toward target time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      if (!isSeeking.current && video.duration) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.01) {
          video.currentTime += diff * 0.1;
        }
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

  // Scroll listener — maps scroll progress through section to video time
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
    // Also fire on touch move for mobile
    window.addEventListener('touchmove', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  return (
    // Tall wrapper — gives scroll room; inner content is sticky
    <div ref={wrapperRef} className="relative h-[220vh] md:h-[280vh]">
      <div className="sticky top-0 h-screen flex items-center bg-[#f9fafb] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full py-10 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Text — shown second on mobile, first on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
              className="order-2 md:order-1"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#000435] mb-6"
              >
                New Arrivals 2026
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 20 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] text-zinc-900 mb-4 md:mb-6"
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
                  className="bg-[#000435] text-white rounded-xl px-8 py-4 font-medium hover:bg-[#000328] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  Shop Now
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/shop?deals=true"
                  className="text-[#000435] font-medium hover:text-[#000328] transition-colors flex items-center gap-1.5"
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
                className="flex gap-6 md:gap-8 mt-8 md:mt-14 pt-6 md:pt-8 border-t border-slate-200"
              >
                {[
                  { value: '500+', label: 'Products' },
                  { value: '10K+', label: 'Customers' },
                  { value: '4.8',  label: 'Avg Rating' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
                    <p className="text-sm text-zinc-400">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Video panel — shown first on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
              className="relative order-1 md:order-2 w-[160px] md:w-[200px] mx-auto md:mx-0 md:ml-auto"
            >
              <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 aspect-[9/20]">
                <video
                  ref={videoRef}
                  src="/hero-video.mp4"
                  preload="auto"
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Scroll hint */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Scroll to explore
                </motion.div>

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl">
                  <p className="text-xs text-zinc-400 mb-0.5">Latest Drop</p>
                  <p className="text-sm font-semibold text-zinc-900">iPhone 16 Pro Max</p>
                  <p className="text-[#000435] font-bold text-sm">From $1,199</p>
                </div>
              </div>

              {/* Decorative blobs */}
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#e8e8f5] rounded-full blur-3xl opacity-60 -z-10" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-slate-200 rounded-full blur-3xl opacity-60 -z-10" />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
