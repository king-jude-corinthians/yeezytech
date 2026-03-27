import Link from 'next/link';

type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="text-zinc-300 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-zinc-900 mb-2">{title}</h3>
      <p className="text-zinc-500 mb-8 max-w-sm">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="bg-[#000435] text-white rounded-xl px-6 py-3 text-sm font-medium hover:bg-[#000328] active:scale-[0.98] transition-all"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
