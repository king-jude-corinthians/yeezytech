'use client';

import { useState } from 'react';
import { X } from '@phosphor-icons/react/dist/ssr';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-emerald-500 text-white text-center text-sm py-2 px-4 relative">
      <p className="font-medium">
        Free shipping on all orders over $50 &mdash; Limited time offer
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <X size={16} weight="bold" />
      </button>
    </div>
  );
}
