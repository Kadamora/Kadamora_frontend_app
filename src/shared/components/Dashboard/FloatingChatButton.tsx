import { FiMessageSquare } from 'react-icons/fi';

export interface FloatingChatButtonProps {
    onClick?: () => void;
    ariaLabel?: string;
    className?: string;
}

export default function FloatingChatButton({
    onClick,
    ariaLabel = 'Open Support Chat',
    className = '',
}: FloatingChatButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            className={`fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#12B76A] text-white shadow-lg hover:bg-[#0E9355] hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300 ${className}`}
        >
            <FiMessageSquare className="h-5 w-5 fill-current" />
        </button>
    );
}
