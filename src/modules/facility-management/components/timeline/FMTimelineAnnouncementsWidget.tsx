import { mockAnnouncements } from '../../data/timelineMock';

export default function FMTimelineAnnouncementsWidget() {
    return (
        <div className="rounded-2xl border border-[#E4E4E7] bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#091E42]">Today's Announcement</h3>

            <div className="space-y-3.5 divide-y divide-[#F1F5F9]">
                {mockAnnouncements.map((ann, idx) => (
                    <div key={ann.id} className={idx > 0 ? 'pt-3.5' : ''}>
                        <h4 className="text-xs font-bold text-[#091E42] mb-1">{ann.title}</h4>
                        <p className="text-[11px] text-[#52525B] leading-relaxed">
                            {ann.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
