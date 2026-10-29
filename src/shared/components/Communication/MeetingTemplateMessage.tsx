import type { MeetingDetails } from './types';

export interface MeetingTemplateMessageProps {
    meeting: MeetingDetails;
    time: string;
    onJoin?: () => void;
    className?: string;
}

export default function MeetingTemplateMessage({
    meeting,
    time,
    onJoin,
    className = '',
}: MeetingTemplateMessageProps) {
    return (
        <div className={`space-y-1.5 max-w-xl ${className}`}>
            <div className="bg-[#EEF2F6] border border-[#DCE4EC] rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
                {/* Meeting Header */}
                <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#002E62]">
                        {meeting.hostName} is Hosting
                    </h4>
                    <p className="text-xs sm:text-sm text-[#475467] mt-0.5 leading-snug">
                        {meeting.title}
                    </p>
                </div>

                {/* Attendees Row & Join Action */}
                <div className="flex items-center justify-between gap-4 pt-1">
                    <div className="flex items-center gap-2">
                        {/* Overlapping Avatars */}
                        <div className="flex -space-x-2 overflow-hidden">
                            {meeting.attendeeAvatars.map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    alt={`Attendee ${idx + 1}`}
                                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                                />
                            ))}
                        </div>

                        {/* Attendees Count */}
                        <span className="text-xs font-semibold text-[#475467] ml-1">
                            {meeting.attendeeCountText}
                        </span>
                    </div>

                    {/* Join Link */}
                    <button
                        type="button"
                        onClick={onJoin || meeting.onJoin}
                        className="text-xs sm:text-sm font-semibold text-[#0070F3] hover:text-[#0051B3] transition-colors cursor-pointer hover:underline"
                    >
                        {meeting.linkText || 'Join Now'}
                    </button>
                </div>
            </div>

            {/* Timestamp */}
            <span className="text-[11px] text-[#94A3B8] font-medium block pl-1">
                {time}
            </span>
        </div>
    );
}
