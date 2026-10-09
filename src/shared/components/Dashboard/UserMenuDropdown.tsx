import React, { useState, useRef, useEffect } from 'react';

export interface UserMenuItem {
    label: string;
    icon: React.ReactNode;
    path?: string;
    action?: string;
    disabled?: boolean;
    badge?: string;
}

export interface UserMenuDropdownProps {
    name: string;
    email?: string;
    subtitle?: string;
    initials: string;
    imgUrl?: string | null;
    menuItems: UserMenuItem[];
    onItemSelect: (item: UserMenuItem) => void;
}

export default function UserMenuDropdown({
    name,
    email = '',
    subtitle,
    initials,
    imgUrl,
    menuItems,
    onItemSelect,
}: UserMenuDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const subText = subtitle !== undefined ? subtitle : email;

    // Close menu on outside click or Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="flex items-center gap-3 rounded-full px-1 md:px-2 py-1 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 transition cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={isOpen}
            >
                <span className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-[#CCD5DD] bg-white text-sm font-semibold text-[#093154] overflow-hidden shrink-0">
                    {imgUrl ? (
                        <img src={imgUrl} alt={name} className="h-full w-full object-cover" />
                    ) : (
                        initials
                    )}
                </span>

                <span className="hidden md:flex flex-col text-left leading-tight">
                    <span className="text-sm font-bold text-[#091E42] truncate max-w-[160px]">{name}</span>
                    {subText ? (
                        <span className="text-[12px] text-[#505F79] truncate max-w-[160px]">{subText}</span>
                    ) : null}
                </span>

                <svg
                    className={`hidden md:block h-4 w-4 text-[#091E42] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div
                    role="menu"
                    aria-label="User menu"
                    className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl border border-[#E4E7EC] bg-white shadow-lg ring-1 ring-black/5 p-2 z-50 animate-[fadeIn_.18s_ease-out]"
                >
                    {menuItems.map((itm) => (
                        <div
                            key={itm.label}
                            role="menuitem"
                            aria-disabled={itm.disabled ? 'true' : 'false'}
                            onClick={() => {
                                if (itm.disabled) return;
                                setIsOpen(false);
                                onItemSelect(itm);
                            }}
                            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition ${
                                itm.disabled
                                    ? 'cursor-not-allowed text-[#A0AEC0] bg-[#F8FAFC]'
                                    : 'cursor-pointer text-[#52525B] hover:bg-[#F1FCF7] hover:text-[#359F6A] focus:outline-none focus:bg-[#F1FCF7]'
                            }`}
                        >
                            <div className="mr-[5px] shrink-0">{itm.icon}</div>
                            <div className="flex-1 flex flex-col min-w-0">
                                <span className="truncate text-sm">{itm.label}</span>
                                {itm.badge ? (
                                    <span className="mt-1 inline-flex w-max rounded-full bg-[#E4F4EC] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#359F6A]">
                                        {itm.badge}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
