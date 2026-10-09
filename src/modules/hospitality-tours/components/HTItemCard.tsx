import { useNavigate } from 'react-router';
import { FiMoreHorizontal, FiMapPin, FiCalendar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import type { ListingItem } from '@modules/hospitality-tours/data/categoryData';

interface HTItemCardProps {
    item: ListingItem;
    categoryId?: string;
    onClick?: () => void;
}

export default function HTItemCard({ item, categoryId, onClick }: HTItemCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }
        const targetCategory = categoryId || 'cities-destinations';
        const targetId = item.id || 'idanre-hill';
        navigate(`/hospitality-tours/dashboard/my-listings/${targetCategory}/${targetId}`);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white border border-[#E4E4E7] rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
        >
            {/* Top Cover Image */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                    type="button"
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-[#FFFFFF80] backdrop-blur-xs flex items-center justify-center text-white hover:bg-[#FFFFFF40] transition-colors cursor-pointer"
                    aria-label="Options"
                >
                    <FiMoreHorizontal className="h-4 w-4 text-[#52525B]" />
                </button>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-base font-semibold text-[#101828]">
                        {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs  mt-1">
                        <FiMapPin className="h-3.5 w-3.5 flex-shrink-0 text-[#6A7282]" />
                        <span className="truncate text-[#6A7282]">{item.location}</span>
                    </div>
                    <p className="text-xs text-[#666666] line-clamp-2 mt-2 leading-relaxed">
                        {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs mt-3">
                        <FiCalendar className="h-3.5 w-3.5 flex-shrink-0 text-[#4A5565]" />
                        <span className="text-[#4A5565]">{item.date}</span>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-3 mt-4">
                    <div className="flex items-center gap-1 text-xs">
                        <FaStar className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-[#101828]">{item.rating}</span>
                        <span className="text-[#6A7282]">({item.reviewCount})</span>
                    </div>
                    <span className="text-xs font-medium text-[#00A63E]">
                        {item.price}
                    </span>
                </div>
            </div>
        </div>
    );
}
