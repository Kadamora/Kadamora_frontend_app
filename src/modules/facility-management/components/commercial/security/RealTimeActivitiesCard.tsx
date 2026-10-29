import { FiAlertCircle, FiVideo, FiPlusCircle } from 'react-icons/fi';
import type { SecurityActivityItem } from '../../../types/commercialFacilities';

interface RealTimeActivitiesCardProps {
    activities: SecurityActivityItem[];
    onViewAll?: () => void;
}

export default function RealTimeActivitiesCard({
    activities,
    onViewAll,
}: RealTimeActivitiesCardProps) {
    const getActivityIcon = (type: SecurityActivityItem['type']) => {
        switch (type) {
            case 'motion':
                return {
                    icon: FiAlertCircle,
                    bg: 'bg-[#FEE4E2]',
                    color: 'text-[#F04438]',
                };
            case 'restored':
                return {
                    icon: FiVideo,
                    bg: 'bg-[#DCFCE7]',
                    color: 'text-[#16A34A]',
                };
            case 'added':
                return {
                    icon: FiPlusCircle,
                    bg: 'bg-[#FEF3C7]',
                    color: 'text-[#D97706]',
                };
            default:
                return {
                    icon: FiAlertCircle,
                    bg: 'bg-[#F4F4F5]',
                    color: 'text-[#71717A]',
                };
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-[#BED3EB] p-5 shadow-xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#002E62]">
                    Real Time Activities
                </h3>
                <button
                    type="button"
                    onClick={onViewAll}
                    className="text-xs font-semibold text-[#71717A] hover:text-[#002E62] transition-colors cursor-pointer"
                >
                    View All
                </button>
            </div>

            {/* List */}
            <div className="divide-y divide-[#F0F2F5]">
                {activities.map((item) => {
                    const { icon: Icon, bg, color } = getActivityIcon(item.type);
                    return (
                        <div
                            key={item.id}
                            className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3 hover:bg-[#F9FAFB] -mx-2 px-2 rounded-lg transition-colors"
                        >
                            <div
                                className={`h-8 w-8 rounded-full ${bg} ${color} flex items-center justify-center shrink-0 mt-0.5`}
                            >
                                <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-[#18181B] truncate">
                                    {item.title}
                                </h4>
                                <p className="text-[11px] text-[#71717A] mt-0.5">
                                    {item.location}
                                </p>
                                <span className="text-[10px] text-[#A1A1AA] block mt-0.5 font-medium">
                                    {item.time}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
