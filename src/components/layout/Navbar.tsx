'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MagnifyingGlass,
  Heart,
  ShoppingBag,
  List,
} from '@phosphor-icons/react/dist/ssr';
import MegaMenu, { categories } from './MegaMenu';
import MobileDrawer from './MobileDrawer';
import { useCartStore } from '@/lib/cart-store';
import { useWishlistStore } from '@/lib/wishlist-store';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0));
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-30 bg-white/80 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_1px_3px_rgba(0,0,0,0.05)]' : ''
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-zinc-900 hover:text-zinc-600 transition-colors"
              aria-label="Open menu"
            >
              <List size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Smartphone outline */}
                <rect x="6" y="2" width="14" height="22" rx="2.5" stroke="#1B1B72" strokeWidth="2" fill="none"/>
                <circle cx="13" cy="21" r="1" fill="#1B1B72"/>
                {/* Pixel dots */}
                <rect x="21" y="7" width="2.5" height="2.5" rx="0.5" fill="#1B1B72"/>
                <rect x="24.5" y="4.5" width="2" height="2" rx="0.5" fill="#1B1B72" opacity="0.6"/>
                {/* Swoosh */}
                <path d="M4 20 Q13 15 26 19" stroke="#1B1B72" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
              <div className="leading-tight">
                <span className="block font-bold text-base tracking-tight text-[#1B1B72]">YeezyTech</span>
                <span className="block text-[10px] font-semibold tracking-wider text-[#1B1B72] opacity-70 -mt-0.5">GADGETS</span>
              </div>
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
                      className="absolute -top-1.5 -right-1.5 bg-[#1B1B72] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
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
                      className="absolute -top-1.5 -right-1.5 bg-[#1B1B72] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
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
