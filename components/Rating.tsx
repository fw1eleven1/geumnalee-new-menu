import type { WineRating } from '@/types';

interface RatingProps {
  rating: WineRating[];
  maxRating: number;
}

export default function Rating({ rating, maxRating }: RatingProps) {
  return (
    <div className="mt-1">
      {rating.map((v, i) => (
        <div key={i} className="flex items-center">
          <span className="text-xs mr-2">{v.type}</span>
          {Array(maxRating)
            .fill(0)
            .map((_, ii) => (
              <div key={ii} className="text-xs xs:text-sm">
                {ii < v.rating ? '●' : '○'}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
