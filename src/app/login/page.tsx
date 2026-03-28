'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeSlash, ShieldCheck, Truck, ArrowsClockwise, Headset } from '@phosphor-icons/react/dist/ssr';
import { createClient } from '@/lib/supabase/client';

const perks = [
  { icon: ShieldCheck, label: '100% Authentic Products' },
  { icon: Truck,        label: 'Fast 2-Day Delivery' },
  { icon: ArrowsClockwise, label: 'Easy 7-Day Returns' },
  { icon: Headset,      label: '24/7 Customer Support' },
];

export default function LoginPage() {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(
          authError.message === 'Invalid login credentials'
            ? 'Incorrect email or password. Please try again.'
            : authError.message
        );
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex">

      {/* ── LEFT PANEL — brand (desktop only) ── */}
      <div className="hidden lg:flex lg:w-[44%] bg-[#000435] flex-col justify-between p-14 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top: tagline */}
        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/40 mb-6">
            YeezyTech Gadgets
          </p>
          <h1 className="text-4xl font-bold text-white tracking-tight leading-[1.1] mb-5">
            Your Premium<br />Tech Partner
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-[34ch]">
            Sign in to access your orders, saved wishlist, and exclusive member-only deals.
          </p>
        </div>

        {/* Middle: perks */}
        <div className="space-y-4 relative">
          {perks.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-white/70" />
              </div>
              <span className="text-white/60 text-sm">{label}</span>
            </div>
          ))}
        </div>

        {/* Bottom: stats */}
        <div className="flex gap-8 relative">
          {[
            { value: '500+', label: 'Products' },
            { value: '10K+', label: 'Customers' },
            { value: '4.8★', label: 'Rating' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-white font-bold text-lg">{s.value}</p>
              <p className="text-white/40 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL — form ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#f9fafb]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="w-full max-w-[420px]"
        >
          <h2 className="text-2xl font-bold text-zinc-900 mb-1">Welcome back</h2>
          <p className="text-zinc-500 text-sm mb-8">
            Sign in to your YeezyTech account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#000435]/20 focus:border-[#000435] transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-zinc-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#000435]/20 focus:border-[#000435] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#000435] text-white rounded-xl py-3.5 text-sm font-semibold hover:bg-[#000328] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="text-[#000435] font-semibold hover:underline"
            >
              Create one free
            </Link>
          </p>

          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              ← Back to YeezyTech
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
