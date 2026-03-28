'use client';

import { motion } from 'framer-motion';
import { MagnifyingGlass, CreditCard, Package } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

const steps = [
  {
    step: '01',
    icon: <MagnifyingGlass size={32} weight="duotone" />,
    title: 'Browse & Discover',
    description:
      'Explore hundreds of authentic gadgets across phones, gaming, audio, wearables, and accessories. Use filters to find exactly what you need.',
  },
  {
    step: '02',
    icon: <CreditCard size={32} weight="duotone" />,
    title: 'Order Securely',
    description:
      'Add to cart and check out in minutes with our SSL-secured payment gateway. Multiple payment options available for your convenience.',
  },
  {
    step: '03',
    icon: <Package size={32} weight="duotone" />,
    title: 'Delivered to You',
    description:
      'Your order is carefully packed and dispatched within 24 hours. Track your package and receive it in 2 business days.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 md:px-8 bg-[#000435] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/50 mb-3">
            Simple Process
          </p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
            How It Works
          </h2>
          <p className="text-white/50 mt-3 max-w-[40ch] mx-auto text-sm md:text-base">
            Getting your favourite tech delivered is easy — three steps and you&apos;re done.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, type: 'spring', stiffness: 90, damping: 18 }}
              className="relative bg-white/5 hover:bg-white/8 border border-white/10 rounded-2xl p-8 transition-colors duration-300"
            >
              {/* Step number */}
              <span className="absolute top-6 right-7 text-5xl font-black text-white/5 select-none">
                {s.step}
              </span>

              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-white mb-6">
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{s.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{s.description}</p>

              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-[#000435] rounded-xl px-8 py-4 text-sm font-semibold hover:bg-white/90 active:scale-[0.98] transition-all"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
