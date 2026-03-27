'use client';

import { motion } from 'framer-motion';

type Tab = { label: string; value: string };

export default function Tabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex gap-0 border-b border-slate-200 overflow-x-auto hide-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`relative px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
            activeTab === tab.value ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-700'
          }`}
        >
          {tab.label}
          {activeTab === tab.value && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 rounded-full"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
