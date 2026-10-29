import type { ServiceScheduleItem } from '../../types/commercialFacilities';

interface ServiceScheduleCardProps {
    item: ServiceScheduleItem;
}

export default function ServiceScheduleCard({ item }: ServiceScheduleCardProps) {
    const isPending = item.badgeType === 'pending';

    return (
        <div className="rounded-2xl border border-[#BED3EB] bg-white p-5 sm:p-6 shadow-xs space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
                {/* Header with Title & Badge */}
                <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-[#002E62]">
                        {item.title}
                    </h4>

                    <span
                        className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                            isPending
                                ? 'bg-[#FFECF2] text-[#F31260] border border-[#FDD0DF]'
                                : 'bg-[#F8FAFC] text-[#475467] border border-[#E2E8F0]'
                        }`}
                    >
                        {item.badgeText}
                    </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#71717A] leading-relaxed line-clamp-3">
                    {item.description}
                </p>
            </div>

            {/* Date & Time Info */}
            <div className="pt-3 border-t border-[#F1F5F9] space-y-1 text-xs text-[#52525B]">
                <p>
                    <span className="font-semibold text-[#091E42]">Date:</span> {item.date}
                </p>
                <p>
                    <span className="font-semibold text-[#091E42]">Time:</span> {item.time}
                </p>
            </div>
        </div>
    );
}
