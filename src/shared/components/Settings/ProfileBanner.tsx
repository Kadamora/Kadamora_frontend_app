export interface ProfileBannerProps {
    initials?: string;
    name: string;
    email: string;
    onUpload?: () => void;
    uploadButtonText?: string;
    className?: string;
}

export default function ProfileBanner({
    initials = 'CM',
    name,
    email,
    onUpload,
    uploadButtonText = 'Upload Profile',
    className = '',
}: ProfileBannerProps) {
    return (
        <div
            className={`relative w-full rounded-2xl bg-[#002244] p-6 sm:p-7 overflow-hidden text-white shadow-xs ${className}`}
            style={{
                backgroundColor: '#00264d',
            }}
        >
            {/* Geometric Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(30deg, #1e4a78 12%, transparent 12.5%, transparent 87%, #1e4a78 87.5%, #1e4a78),
                        linear-gradient(150deg, #1e4a78 12%, transparent 12.5%, transparent 87%, #1e4a78 87.5%, #1e4a78),
                        linear-gradient(30deg, #1e4a78 12%, transparent 12.5%, transparent 87%, #1e4a78 87.5%, #1e4a78),
                        linear-gradient(150deg, #1e4a78 12%, transparent 12.5%, transparent 87%, #1e4a78 87.5%, #1e4a78),
                        linear-gradient(60deg, #1e4a7877 25%, transparent 25.5%, transparent 75%, #1e4a7877 75%, #1e4a7877),
                        linear-gradient(60deg, #1e4a7877 25%, transparent 25.5%, transparent 75%, #1e4a7877 75%, #1e4a7877)
                    `,
                    backgroundSize: '40px 70px',
                    backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px',
                }}
            />

            {/* Subtle Grid Accent */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                    backgroundSize: '16px 16px',
                }}
            />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* Initials Avatar Circle */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EBF3FF] border-2 border-white/40 flex items-center justify-center shrink-0 shadow-sm">
                        <span className="text-xl sm:text-2xl font-bold text-[#002E62]">
                            {initials}
                        </span>
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                            {name}
                        </h2>
                        <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                            {email}
                        </p>
                    </div>
                </div>

                {/* Upload Button */}
                <button
                    type="button"
                    onClick={onUpload}
                    className="px-5 py-2.5 bg-white hover:bg-slate-50 text-[#002E62] font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs self-start sm:self-auto hover:shadow-md"
                >
                    {uploadButtonText}
                </button>
            </div>
        </div>
    );
}
