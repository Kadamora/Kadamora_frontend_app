import { FiMoreHorizontal } from 'react-icons/fi';
import type { TimelinePost } from '../../types';

interface HTTimelineFeedCardProps {
    post: TimelinePost;
    onClick?: () => void;
    className?: string;
}

export default function HTTimelineFeedCard({
    post,
    onClick,
    className = '',
}: HTTimelineFeedCardProps) {
    const formatViews = (count: number) => {
        if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
        if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
        return count.toString();
    };

    return (
        <div
            onClick={onClick}
            className={`group bg-white rounded-[14px] overflow-hidden hover:shadow-sm transition-all cursor-pointer flex flex-col ${
                post.isWide ? 'col-span-1 md:col-span-2' : ''
            } ${className}`}
        >
            {/* Top Cover Image with Duration Badge */}
            <div className="relative h-[330px] w-full overflow-hidden">
                <img
                    src={post.coverUrl}
                    alt={post.title}
                    className="w-full h-full  transition-transform duration-300 group-hover:scale-102"
                />
                {/* Duration Badge Bottom Right */}
                <div className="absolute bottom-2 right-2 bg-[#7B7B7B] border border-[#828282] text-white text-[11px] font-medium px-2 py-0.5 rounded-[13px]">
                    {post.durationLabel || '20:08'}
                </div>
            </div>

            {/* Bottom Details Row */}
            <div className="p-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    {/* Publisher Avatar Circle */}
                    <div className="h-11 w-11 rounded-full bg-[#EBF3FF] border border-[#D4D4D8] text-[#002E62] font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden">
                        {post.channelAvatarUrl ? (
                            <img src={post.channelAvatarUrl} alt={post.channel} className="w-full h-full object-cover" />
                        ) : (
                            post.channel.slice(0, 2).toUpperCase()
                        )}
                    </div>

                    <div className="min-w-0 flex-1 ">
                        <h4 className="font-semibold text-sm text-[#002E62] truncate group-hover:text-[#002E62] transition-colors">
                            {post.title}
                        </h4>
                       <div className='text-xs text-[#52525B] truncate'>
                         <p>
                            {post.channel}
                        </p>
                        <p>
                            {formatViews(post.views)} Views • {post.postedAgo}
                        </p>
                       </div>
                    </div>
                </div>

                {/* Options Menu Button */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="text-[#D4D4D8] hover:text-slate-500 border border-[#D4D4D8] p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="Options"
                >
                    <FiMoreHorizontal className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
