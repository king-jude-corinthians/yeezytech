import { Star } from '@phosphor-icons/react/dist/ssr';

type StarRatingProps = {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
};

const sizes = { sm: 12, md: 16, lg: 20 };

export default function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const px = sizes[size];
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span key={star} className="relative inline-block" style={{ width: px, height: px }}>
            <Star size={px} weight="regular" className="text-zinc-200" />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? '50%' : '100%' }}
              >
                <Star size={px} weight="fill" className="text-amber-400" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
