import { mockTimelineAds } from '../../data/timelineMock';

export default function FMTimelineAdsWidget() {
    return (
        <div className="space-y-4">
            {mockTimelineAds.map((ad) => (
                <div
                    key={ad.id}
                    className="rounded-2xl border border-[#E4E4E7] bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                >
                    {/* Media Container with Ads Badge */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        <img
                            src={ad.imageUrl}
                            alt={ad.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#B20000] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                            {ad.badge || 'Ads'}
                        </span>
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm font-bold text-[#091E42] truncate">{ad.title}</h4>
                            {ad.tag && (
                                <span className="text-[11px] font-semibold text-[#008A45] bg-[#E3FCEF] border border-[#008A45]/20 px-2.5 py-0.5 rounded-full">
                                    {ad.tag}
                                </span>
                            )}
                        </div>

                        <div className="text-xs font-bold text-[#091E42]">{ad.price}</div>

                        <p className="text-[11px] text-[#52525B] leading-relaxed line-clamp-2">
                            {ad.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
