import React from 'react';

export interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    activeColor?: string;
    inactiveColor?: string;
    ariaLabel?: string;
    id?: string;
    name?: string;
    className?: string;
}

export default function Toggle({
    checked,
    onChange,
    disabled = false,
    size = 'md',
    activeColor = 'bg-[#12B76A]',
    inactiveColor = 'bg-[#CBD5E1]',
    ariaLabel,
    id,
    name,
    className = '',
}: ToggleProps) {
    const sizeConfig = {
        sm: {
            track: 'h-5 w-9',
            thumb: 'h-4 w-4 top-0.5 left-0.5',
            translate: 'translate-x-4',
        },
        md: {
            track: 'h-6 w-11',
            thumb: 'h-5 w-5 top-0.5 left-0.5',
            translate: 'translate-x-5',
        },
        lg: {
            track: 'h-7 w-14',
            thumb: 'h-6 w-6 top-0.5 left-0.5',
            translate: 'translate-x-7',
        },
    }[size];

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!disabled) {
                onChange(!checked);
            }
        }
    };

    return (
        <button
            type="button"
            role="switch"
            id={id}
            name={name}
            aria-checked={checked}
            aria-label={ariaLabel}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            onKeyDown={handleKeyDown}
            className={`relative shrink-0 p-0 rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#12B76A]/50 focus-visible:ring-offset-2 ${
                sizeConfig.track
            } ${checked ? activeColor : inactiveColor} ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${className}`}
        >
            <span
                className={`pointer-events-none absolute rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                    sizeConfig.thumb
                } ${checked ? sizeConfig.translate : 'translate-x-0'}`}
            />
        </button>
    );
}
