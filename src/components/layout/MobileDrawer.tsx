'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, CaretRight, UserCircle, SignOut } from '@phosphor-icons/react/dist/ssr';
import { categories } from './MegaMenu';
import type { User } from '@supabase/supabase-js';

export default function MobileDrawer({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 w-[320px] bg-[#000435] z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <img src="/logo.png" alt="YeezyTech Gadgets" className="h-12 w-auto object-contain brightness-0 invert" />
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              {categories.map((category) => (
                <div key={category.slug} className="px-6 py-2">
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between py-3 text-white hover:text-white/70 transition-colors"
                  >
                    <span className="text-base font-semibold">{category.name}</span>
                    <CaretRight size={16} className="text-white/50" />
                  </Link>
                  <div className="ml-2 border-l border-white/20 pl-4">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/category/${category.slug}?sub=${sub.slug}`}
                        onClick={onClose}
                        className="block py-2 text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="border-t border-white/10 mt-4 pt-4 px-6">
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="block py-3 text-white hover:text-white/70 transition-colors font-medium"
                >
                  All Products
                </Link>
                <Link
                  href="/about"
                  onClick={onClose}
                  className="block py-3 text-white hover:text-white/70 transition-colors font-medium"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="block py-3 text-white hover:text-white/70 transition-colors font-medium"
                >
                  Contact
                </Link>
              </div>

              {/* Auth */}
              <div className="border-t border-white/10 mt-4 pt-4 px-6 pb-6">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-full bg-white/20 text-white text-sm font-bold flex items-center justify-center select-none">
                        {(user.user_metadata?.name || user.email || 'U')
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{user.user_metadata?.name || 'My Account'}</p>
                        <p className="text-white/50 text-xs truncate max-w-[180px]">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={onClose}
                      className="block py-3 text-white hover:text-white/70 transition-colors font-medium"
                    >
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      href="/login"
                      onClick={onClose}
                      className="flex-1 text-center py-2.5 border border-white/30 text-white rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={onClose}
                      className="flex-1 text-center py-2.5 bg-white text-[#000435] rounded-xl text-sm font-bold hover:bg-white/90 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
