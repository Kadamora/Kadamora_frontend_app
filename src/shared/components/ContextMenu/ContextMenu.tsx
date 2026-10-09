import React, { useState, useRef, useEffect } from 'react';

export interface ContextMenuItem {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    danger?: boolean;
}

export interface ContextMenuProps {
    /** The trigger element — typically an icon button */
    trigger: React.ReactNode;
    items: ContextMenuItem[];
    /** Alignment relative to trigger */
    align?: 'left' | 'right';
}

/**
 * Generic context menu dropdown — renders a trigger element and a floating
 * menu that opens on click.  Closes on outside click or Escape.
 */
export default function ContextMenu({
    trigger,
    items,
    align = 'right',
}: ContextMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    // Close on outside click or Escape
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
            {/* Trigger */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((o) => !o);
                }}
                className="cursor-pointer"
            >
                {trigger}
            </div>

            {/* Floating Menu */}
            {isOpen && (
                <div
                    role="menu"
                    className={`absolute z-50 mt-1.5 min-w-[150px] origin-top rounded-[8px] border border-[#E4E7EC] bg-white shadow-lg ring-1 ring-black/5 p-1.5 animate-[fadeIn_.15s_ease-out] ${
                        align === 'right' ? 'right-0' : 'left-0'
                    }`}
                >
                    {items.map((item, idx) => (
                        <button
                            key={idx}
                            type="button"
                            role="menuitem"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(false);
                                item.onClick?.();
                            }}
                            className={`w-full flex text-left items-center justify-start gap-2 rounded-[8px] px-2 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                                item.danger
                                    ? 'text-red-600 hover:bg-red-50'
                                    : 'text-[#52525B] hover:bg-slate-50 hover:text-[#101828]'
                            }`}
                        >
                            {item.icon && (
                                <span className="shrink-0">{item.icon}</span>
                            )}
                            <span className="text-start w-full">{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
