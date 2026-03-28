'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MagnifyingGlass,
  Heart,
  ShoppingBag,
  List,
  UserCircle,
} from '@phosphor-icons/react/dist/ssr';
import MegaMenu, { categories } from './MegaMenu';
import MobileDrawer from './MobileDrawer';
import { useCartStore } from '@/lib/cart-store';
import { useWishlistStore } from '@/lib/wishlist-store';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const cartCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0));
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auth state
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-30 bg-white/80 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_1px_3px_rgba(0,0,0,0.05)]' : ''
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-zinc-900 hover:text-zinc-600 transition-colors"
              aria-label="Open menu"
            >
              <List size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0">
              <img src="/logo.png" alt="YeezyTech Gadgets" className="h-16 w-auto object-contain" />
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onMouseEnter={() => setActiveCategory(cat.slug)}
                  className={`text-sm font-medium transition-colors ${
                    activeCategory === cat.slug
                      ? 'text-zinc-900'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
              <Link
                href="/shop?deals=true"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                onMouseEnter={() => setActiveCategory(null)}
              >
                Deals
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              {/* Auth: Sign In button or user avatar */}
              {user ? (
                <Link
                  href="/dashboard"
                  className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                  aria-label="My account"
                >
                  <div className="w-7 h-7 rounded-full bg-[#000435] text-white text-[11px] font-bold flex items-center justify-center select-none">
                    {(user.user_metadata?.name || user.email || 'U')
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:flex items-center gap-1.5 text-sm font-medium border border-[#000435]/25 text-[#000435] rounded-xl px-4 py-1.5 hover:bg-[#000435] hover:text-white transition-all"
                >
                  <UserCircle size={16} />
                  Sign In
                </Link>
              )}

              <Link
                href="/shop"
                className="text-zinc-500 hover:text-zinc-900 transition-colors"
                aria-label="Search"
              >
                <MagnifyingGlass size={20} />
              </Link>
              <Link
                href="/wishlist"
                className="relative text-zinc-500 hover:text-zinc-900 transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                <AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute -top-1.5 -right-1.5 bg-[#000435] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              <Link
                href="/cart"
                className="relative text-zinc-500 hover:text-zinc-900 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute -top-1.5 -right-1.5 bg-[#000435] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <MegaMenu
          activeCategory={activeCategory}
          onClose={() => setActiveCategory(null)}
        />
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
