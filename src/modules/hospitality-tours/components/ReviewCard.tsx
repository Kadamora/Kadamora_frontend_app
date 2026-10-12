import { FaStar } from 'react-icons/fa';
import type { Review } from '../types';

export interface ReviewCardProps {
    review: Review;
    className?: string;
}

export default function ReviewCard({ review, className = '' }: ReviewCardProps) {
    return (
        <div className={`bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-2xs hover:shadow-xs transition-shadow ${className}`}>
            <div className="flex items-start justify-between">
                <div>
                    <h4 className="font-bold text-sm text-[#093154]">{review.author}</h4>
                    <span className="text-xs text-slate-500">{review.listing} • {review.category}</span>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-amber-700 text-xs font-bold">
                    <FaStar className="h-3 w-3 text-amber-500" />
                    <span>{review.rating.toFixed(1)}</span>
                </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "{review.body}"
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Posted on</span>
                <span>{review.date}</span>
            </div>
        </div>
    );
}
