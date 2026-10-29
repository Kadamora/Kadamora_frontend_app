interface HTFilterChipProps {
    label: string;
    count?: number | string;
    active?: boolean;
    onClick: () => void;
}

export default function HTFilterChip({
    label,
    count,
    active = false,
    onClick,
}: HTFilterChipProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                'inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5',
                'text-[11px] font-medium leading-none',
                'transition-colors duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A63E]/30',
                active
                    ? 'border-[#86E8B7] bg-[#F0FDF4] text-[#016630]'
                    : 'border-[#DDDFF5] bg-[#F8F8FD] text-[#4B5563] hover:border-[#B8E8CC] hover:bg-[#F0FDF4]',
            ].join(' ')}
        >
            <span>{label}</span>

            {count !== undefined && count !== '' && (
                <span
                    className={
                        active
                            ? 'text-[#016630]'
                            : 'text-[#6B7280]'
                    }
                >
                    ({count})
                </span>
            )}
        </button>
    );
}