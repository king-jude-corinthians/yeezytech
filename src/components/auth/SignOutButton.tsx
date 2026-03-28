'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignOut } from '@phosphor-icons/react/dist/ssr';
import { createClient } from '@/lib/supabase/client';

interface Props {
  variant?: 'button' | 'link';
}

export default function SignOutButton({ variant = 'button' }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  if (variant === 'link') {
    return (
      <button
        onClick={handleSignOut}
        disabled={loading}
        className="text-sm text-zinc-400 hover:text-red-500 transition-colors disabled:opacity-50"
      >
        {loading ? 'Signing out…' : 'Sign out'}
      </button>
    );
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl px-4 py-2 transition-all disabled:opacity-50 bg-white"
    >
      {loading ? (
        <span className="w-3.5 h-3.5 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
      ) : (
        <SignOut size={15} />
      )}
      Sign out
    </button>
  );
}
