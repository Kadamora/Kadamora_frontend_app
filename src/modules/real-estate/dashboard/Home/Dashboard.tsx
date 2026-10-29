import { useState, useMemo } from 'react';
import ServiceCard from './ServiceCard';
import { services, type ServiceItem } from './service';
import { useAppSelector } from '@store/hooks';

export default function Dashboard() {
    const user = useAppSelector((s) => s.auth.user);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'available' | 'upcoming'>('all');
    const [showWelcome, setShowWelcome] = useState(() => {
        try {
            return localStorage.getItem('kadamora_hide_services_welcome') !== 'true';
        } catch {
            return true;
        }
    });

    const handleDismissWelcome = () => {
        setShowWelcome(false);
        try {
            localStorage.setItem('kadamora_hide_services_welcome', 'true');
        } catch {
            // ignore storage failure
        }
    };

    const displayName = useMemo(() => {
        if (!user) return 'there';
        return user.firstName ? `${user.firstName}` : 'there';
    }, [user]);

    // Categories filter options
    const categories: Array<{ id: 'all' | 'available' | 'upcoming'; label: string }> = [
        { id: 'all', label: 'All Services' },
        { id: 'available', label: 'Active Services' },
        { id: 'upcoming', label: 'Coming Soon' },
    ];

    const filteredServices = useMemo(() => {
        return services.filter((s: ServiceItem) => {
            const matchesQuery =
                !searchQuery.trim() ||
                s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase()));

            if (!matchesQuery) return false;

            if (selectedCategory === 'available') return s.active;
            if (selectedCategory === 'upcoming') return !s.active;
            return true;
        });
    }, [searchQuery, selectedCategory]);

    const activeCount = useMemo(() => services.filter((s) => s.active).length, []);

    return (
        <div className="space-y-8 pb-12">
            {/* Hero Welcome Banner */}
            {showWelcome && (
                <section
                    aria-label="Welcome banner"
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#002E62] via-[#053D7A] to-[#0A569A] p-6 sm:p-8 md:p-10 text-white shadow-xl"
                >
                    {/* Background visual accents */}
                    <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
                    <div className="pointer-events-none absolute right-1/4 -bottom-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-xl" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="max-w-2xl space-y-3">
                            {/* <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md border border-white/10">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                                Kadamora Multi-Service Portal
                            </div> */}

                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                                Welcome back, {displayName} <span className="inline-block">👋</span>
                            </h1>

                            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
                                Access all your connected services from one central hub. Switch seamlessly between{' '}
                                <strong className="text-white font-semibold">Real Estate</strong>,{' '}
                                <strong className="text-white font-semibold">Facility Management</strong>, and{' '}
                                <strong className="text-white font-semibold">Hospitality &amp; Tours</strong> to manage your
                                properties, facilities, bookings, and operations.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
                            <button
                                type="button"
                                onClick={handleDismissWelcome}
                                className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold backdrop-blur-sm border border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Got It, Dismiss
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Hub Controls Header: Search & Category Chips */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#002E62]">Kadamora Services</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                        {activeCount} active platforms ready for your account
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Filter Pills */}
                    <div className="inline-flex rounded-xl bg-gray-100/80 p-1 border border-gray-200/60 self-start sm:self-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    selectedCategory === cat.id
                                        ? 'bg-white text-[#002E62] shadow-xs'
                                        : 'text-gray-500 hover:text-gray-800'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative min-w-[220px]">
                        <svg
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-1.5 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <section aria-label="Services Grid">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {filteredServices.map((item) => (
                        <ServiceCard key={item.id} item={item} />
                    ))}

                    {filteredServices.length === 0 && (
                        <div className="col-span-full rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center bg-gray-50/50">
                            <div className="mx-auto h-12 w-12 text-gray-400 mb-3 flex items-center justify-center rounded-full bg-gray-100">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-base font-semibold text-gray-800">No services found</h3>
                            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                                No service matched your filter “{searchQuery}”. Try clearing the search or choosing another category.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
