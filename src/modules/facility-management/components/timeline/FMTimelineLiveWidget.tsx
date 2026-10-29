import { mockLiveSession } from '../../data/timelineMock';

export default function FMTimelineLiveWidget() {
    return (
        <div className="rounded-2xl border border-[#E4E4E7] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#091E42] pb-2 border-b border-[#F1F5F9]">
                Live on Kadamora
            </h3>

            <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-[#091E42]">{mockLiveSession.hostName}</h4>
                <p className="text-[11px] text-[#52525B] leading-relaxed">
                    {mockLiveSession.title}
                </p>
            </div>

            <div className="flex items-center justify-between pt-1">
                {/* Avatars Stack */}
                <div className="flex items-center">
                    <div className="flex -space-x-2">
                        {mockLiveSession.avatars.map((av, idx) => (
                            <img
                                key={idx}
                                src={av}
                                alt="Attendee"
                                className="h-6 w-6 rounded-full border-2 border-white object-cover"
                            />
                        ))}
                    </div>
                    <span className="text-[11px] text-[#71717A] font-medium ml-2">
                        +{mockLiveSession.othersCount} Others
                    </span>
                </div>

                {/* Join Now Link */}
                <button
                    type="button"
                    className="text-xs font-bold text-[#002E62] underline hover:text-[#072440] transition-colors cursor-pointer"
                >
                    {mockLiveSession.linkText}
                </button>
            </div>
        </div>
    );
}
