'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Truck,
  ArrowsClockwise,
  Headset,
  SealCheck,
  CreditCard,
  Package,
  Star,
} from '@phosphor-icons/react/dist/ssr';

const reasons = [
  {
    icon: <SealCheck size={28} weight="duotone" />,
    title: '100% Authentic Products',
    description:
      'Every product we sell is sourced directly from authorized distributors. No fakes, no replicas — guaranteed.',
  },
  {
    icon: <Truck size={28} weight="duotone" />,
    title: 'Fast & Reliable Shipping',
    description:
      'Orders over $50 ship free. Most orders arrive within 2 business days across all major cities.',
  },
  {
    icon: <CreditCard size={28} weight="duotone" />,
    title: 'Secure Payments',
    description:
      'Shop with confidence using SSL-encrypted checkout. We accept cards, mobile money, and more.',
  },
  {
    icon: <ArrowsClockwise size={28} weight="duotone" />,
    title: 'Hassle-Free Returns',
    description:
      'Not satisfied? Return any item within 7 days for a full refund or exchange — no questions asked.',
  },
  {
    icon: <Headset size={28} weight="duotone" />,
    title: '24/7 Customer Support',
    description:
      'Our support team is always on standby to help you with orders, returns, or product advice.',
  },
  {
    icon: <Star size={28} weight="duotone" />,
    title: 'Top-Rated Experience',
    description:
      'Rated 4.8★ by over 10,000 customers. We&apos;re proud to be the most trusted gadget store.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#000435] mb-3">
            Our Promise
          </p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Why Shop With YeezyTech?
          </h2>
          <p className="text-zinc-500 mt-3 max-w-[50ch] mx-auto text-sm md:text-base">
            We&apos;re not just a gadget store — we&apos;re your trusted tech partner.
            Here&apos;s what sets us apart.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 100, damping: 20 }}
              className="group p-7 rounded-2xl border border-slate-100 bg-[#f9fafb] hover:border-[#000435]/20 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#000435]/8 flex items-center justify-center text-[#000435] mb-5 group-hover:bg-[#000435] group-hover:text-white transition-all duration-300">
                {r.icon}
              </div>
              <h3 className="text-base font-semibold text-zinc-900 mb-2">{r.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{r.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
