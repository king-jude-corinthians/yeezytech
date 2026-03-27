'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-[2rem] p-8 md:p-14"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-3">
                Stay in the Loop
              </h2>
              <p className="text-zinc-500 leading-relaxed max-w-[40ch]">
                Get notified about new arrivals, exclusive deals, and the latest
                tech news straight to your inbox.
              </p>
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 bg-white rounded-2xl px-6 py-5"
                >
                  <CheckCircle size={32} weight="fill" className="text-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-zinc-900">You&apos;re in!</p>
                    <p className="text-sm text-zinc-500">Thanks for subscribing to YeezyTech.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-white rounded-xl border border-slate-200 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 py-3.5 text-sm font-medium active:scale-[0.98] transition-all flex items-center gap-2 whitespace-nowrap disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Subscribe <ArrowRight size={14} /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}