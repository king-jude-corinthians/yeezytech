'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeSlash, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { createClient } from '@/lib/supabase/client';

export default function SignUpPage() {
  const [name, setName]                 = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const [success, setSuccess]           = useState(false);

  function getPasswordStrength(pw: string) {
    if (pw.length === 0) return null;
    if (pw.length < 6) return 'weak';
    if (pw.length < 10 || !/[A-Z]/.test(pw) || !/[0-9]/.test(pw)) return 'fair';
    return 'strong';
  }

  const strength = getPasswordStrength(password);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (authError) {
        setError(
          authError.message.includes('already registered')
            ? 'An account with this email already exists. Try signing in.'
            : authError.message
        );
        return;
      }

      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f9fafb] p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="w-full max-w-[420px] bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center"
        >
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} weight="fill" className="text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Check your email</h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-8">
            We&apos;ve sent a confirmation link to{' '}
            <span className="font-semibold text-zinc-700">{email}</span>.
            Click it to activate your account.
          </p>
          <Link
            href="/login"
            className="inline-block bg-[#000435] text-white rounded-xl px-8 py-3 text-sm font-semibold hover:bg-[#000328] transition-all"
          >
            Go to Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex">

      {/* ── LEFT PANEL — brand (desktop only) ── */}
      <div className="hidden lg:flex lg:w-[44%] bg-[#000435] flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/40 mb-6">
            YeezyTech Gadgets
          </p>
          <h1 className="text-4xl font-bold text-white tracking-tight leading-[1.1] mb-5">
            Join 10,000+<br />Happy Customers
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-[34ch]">
            Create a free account and unlock exclusive member deals, order tracking, and a personal wishlist.
          </p>
        </div>

        <div className="space-y-5 relative">
          {[
            { title: 'Member-only prices', sub: 'Exclusive discounts on new arrivals' },
            { title: 'Order tracking',     sub: 'Know exactly where your package is' },
            { title: 'Saved wishlist',     sub: 'Never lose track of items you love' },
            { title: 'Priority support',   sub: 'Get help faster as a member' },
          ].map((f) => (
            <div key={f.title}>
              <p className="text-white/80 text-sm font-medium">{f.title}</p>
              <p className="text-white/40 text-xs mt-0.5">{f.sub}</p>
            </div>
          ))}
        </div>

        <p className="text-white/20 text-xs relative">
          © 2026 YeezyTech Gadgets. All rights reserved.
        </p>
      </div>

      {/* ── RIGHT PANEL — form ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#f9fafb]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="w-full max-w-[420px]"
        >
          <h2 className="text-2xl font-bold text-zinc-900 mb-1">Create your account</h2>
          <p className="text-zinc-500 text-sm mb-8">
            Free forever. No credit card required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                autoComplete="name"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#000435]/20 focus:border-[#000435] transition-all"
              />
            </div>

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
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  autoComplete="new-password"
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

              {/* Password strength */}
              {strength && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2"
                >
                  <div className="flex gap-1 flex-1">
                    {(['weak', 'fair', 'strong'] as const).map((level, i) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          strength === 'weak'   && i === 0 ? 'bg-red-400'    :
                          strength === 'fair'   && i <= 1 ? 'bg-amber-400'   :
                          strength === 'strong' && i <= 2 ? 'bg-emerald-400' :
                          'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${
                    strength === 'weak'   ? 'text-red-500'    :
                    strength === 'fair'   ? 'text-amber-500'  :
                    'text-emerald-600'
                  }`}>
                    {strength.charAt(0).toUpperCase() + strength.slice(1)}
                  </span>
                </motion.div>
              )}
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
                'Create Account'
              )}
            </button>

            <p className="text-[11px] text-zinc-400 text-center">
              By signing up, you agree to our{' '}
              <span className="underline cursor-pointer hover:text-zinc-600">Terms</span> and{' '}
              <span className="underline cursor-pointer hover:text-zinc-600">Privacy Policy</span>.
            </p>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#000435] font-semibold hover:underline"
            >
              Sign in
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
