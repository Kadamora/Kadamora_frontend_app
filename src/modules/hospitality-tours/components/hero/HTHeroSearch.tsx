import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface HTHeroSearchProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
    className?: string;
}

export default function HTHeroSearch({
    onSearch,
    placeholder = 'Search destinations, events, festivals...',
    className = '',
}: HTHeroSearchProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) onSearch(searchTerm);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`bg-white rounded-lg p-1 pl-3 sm:pl-4 shadow-md border border-slate-100 flex items-center justify-between gap-3 max-w-lg w-full ${className}`}
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <FiSearch className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-[36px] bg-transparent text-xs sm:text-sm text-[#091E42] placeholder-slate-400 focus:outline-none"
                />
            </div>
            <button
                type="submit"
                className="bg-[#00D26A] hover:bg-[#00B85C] text-white px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
            >
                <span>Search</span>
            </button>
        </form>
    );
}
