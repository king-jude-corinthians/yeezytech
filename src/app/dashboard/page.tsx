import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import SignOutButton from '@/components/auth/SignOutButton';
import {
  ShoppingBag,
  Heart,
  Package,
  Gear,
  ArrowRight,
  User,
  Star,
} from '@phosphor-icons/react/dist/ssr';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const displayName = user.user_metadata?.name || user.email?.split('@')[0] || 'there';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const quickLinks = [
    {
      icon: ShoppingBag,
      label: 'Shop Now',
      sub: 'Browse 500+ products',
      href: '/shop',
      color: 'bg-[#000435]/8 text-[#000435]',
    },
    {
      icon: Heart,
      label: 'My Wishlist',
      sub: 'Items you saved',
      href: '/wishlist',
      color: 'bg-rose-50 text-rose-500',
    },
    {
      icon: Package,
      label: 'My Orders',
      sub: 'Track your deliveries',
      href: '/shop',
      color: 'bg-amber-50 text-amber-500',
    },
    {
      icon: Star,
      label: 'Deals',
      sub: 'Exclusive offers for you',
      href: '/shop?deals=true',
      color: 'bg-emerald-50 text-emerald-500',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f9fafb] py-10 px-4 md:px-8">
      <div className="max-w-[1000px] mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#000435] text-white text-lg font-bold flex items-center justify-center flex-shrink-0 select-none">
              {initials}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-zinc-900">
                Welcome back, {displayName.split(' ')[0]}!
              </h1>
              <p className="text-zinc-500 text-sm mt-0.5">{user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>

        {/* Account info card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-900">Account Details</h2>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Active
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1">Full Name</p>
              <p className="text-sm font-medium text-zinc-800">
                {user.user_metadata?.name || '—'}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm font-medium text-zinc-800 truncate">{user.email}</p>
            </div>
            <div>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1">Member Since</p>
              <p className="text-sm font-medium text-zinc-800">{memberSince}</p>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {quickLinks.map(({ icon: Icon, label, sub, href, color }) => (
            <Link
              key={label}
              href={href}
              className="group bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 hover:border-[#000435]/20 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-900">{label}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>
              </div>
              <ArrowRight
                size={16}
                className="text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all flex-shrink-0"
              />
            </Link>
          ))}
        </div>

        {/* Settings section */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
              <Gear size={17} className="text-zinc-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-900">Account Settings</p>
              <p className="text-xs text-zinc-400 mt-0.5">Manage your profile and preferences</p>
            </div>
            <Link
              href="/shop"
              className="text-xs font-medium text-[#000435] hover:underline flex items-center gap-1"
            >
              Manage <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Sign out mobile */}
        <div className="mt-6 text-center md:hidden">
          <SignOutButton variant="link" />
        </div>

      </div>
    </div>
  );
}
