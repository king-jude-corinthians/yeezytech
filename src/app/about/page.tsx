'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Headset, ArrowsClockwise } from '@phosphor-icons/react/dist/ssr';

const features = [
  {
    icon: <ShieldCheck size={40} />,
    title: 'Authentic Products',
    desc: 'Every product is 100% genuine, sourced directly from authorized distributors and brand partners.',
  },
  {
    icon: <Truck size={40} />,
    title: 'Fast Delivery',
    desc: 'Free delivery on orders over ₦50,000. Most orders delivered within 1-3 business days across Nigeria.',
  },
  {
    icon: <Headset size={40} />,
    title: 'Expert Support',
    desc: 'Our tech-savvy team is available around the clock to help you choose and use your gadgets.',
  },
  {
    icon: <ArrowsClockwise size={40} />,
    title: 'Easy Returns',
    desc: '30-day hassle-free returns on all products. No questions asked.',
  },
];

const stats = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '24/7', label: 'Support' },
  { value: '30-Day', label: 'Returns' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center bg-gradient-to-br from-slate-100 to-slate-200 px-4 md:px-8 py-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-4 block">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900 mb-6 max-w-2xl">
              About Gadgety
            </h1>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-[55ch]">
              We bring the world&apos;s best technology to your doorstep. Authentic products,
              expert curation, and a genuine passion for innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-6">How We Started</h2>
              <div className="space-y-4 text-zinc-500 leading-relaxed">
                <p>
                  YeezyTech was founded with a simple mission: make premium technology accessible to everyone.
                  What started as a small online store has grown into a trusted destination for thousands
                  of customers across the country.
                </p>
                <p>
                  We partner directly with brands like Apple, Samsung, Sony, and JBL to ensure every
                  product we sell is 100% authentic. No grey market. No counterfeits. Just genuine gear
                  at fair prices.
                </p>
                <p>
                  From the latest iPhone to the newest PlayStation console, our team of tech enthusiasts
                  carefully curates every product we stock so you get only what&apos;s truly worth your money.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
              className="rounded-[2rem] overflow-hidden aspect-[4/3] bg-slate-100"
            >
              <img
                src="https://picsum.photos/seed/yeezytech-story/800/600"
                alt="YeezyTech team"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-zinc-900 mb-12 text-center"
          >
            Why Shop With Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 100, damping: 20 }}
                className="bg-[#f9fafb] rounded-2xl p-8 border border-slate-100"
              >
                <div className="text-emerald-500 mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="bg-[#000435] rounded-[2rem] p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}