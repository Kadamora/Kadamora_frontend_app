import { useState, useMemo } from 'react';
import StatusBadge from '@shared/components/Tag/StatusBadge';
import ListingCategoryCard from '@modules/hospitality-tours/components/ListingCategoryCard';
import WelcomeBanner from '@modules/hospitality-tours/components/WelcomeBanner';
import TableToolbar from '@modules/hospitality-tours/components/TableToolbar';
import Table, { type Column } from '@shared/components/Table/Table';
import TimelineCard from '@modules/hospitality-tours/components/TimelineCard';
import ReviewCard from '@modules/hospitality-tours/components/ReviewCard';
import SignOutModal from '@shared/components/Modal/SignOutModal';
import { bookings as mockBookings, reviews as mockReviews, timelinePosts as mockTimeline } from '@modules/hospitality-tours/data/mock';
import StatCard from '@modules/hospitality-tours/components/StatCard';
import type { Booking } from '@modules/hospitality-tours/types';
import HTItemCard from '@modules/hospitality-tours/components/HTItemCard';
import HTButton from '@modules/hospitality-tours/components/HTButton';
import HTFilterTabs from '@modules/hospitality-tours/components/HTFilterTabs';
import { DEFAULT_MOCK_ITEMS } from '@modules/hospitality-tours/data/categoryData';
import { FiPlus, FiDownload, FiSettings } from 'react-icons/fi';
import HTListingFlowStepper from '@modules/hospitality-tours/components/listing-flow/HTListingFlowStepper';
import type { HTCategoryId } from '@modules/hospitality-tours/components/listing-flow/HTListingFlowContext';
import HTListingDetailView from '@modules/hospitality-tours/components/listing-details/HTListingDetailView';
import { IDANRE_HILL_MOCK, OJUDE_OBA_MOCK } from '@modules/hospitality-tours/data/mockListingDetails';
import HTTimelineFeedView from '@modules/hospitality-tours/components/timeline/HTTimelineFeedView';
import HTTimelinePostDetailView from '@modules/hospitality-tours/components/timeline/HTTimelinePostDetailView';
import HTNewPostModal from '@modules/hospitality-tours/components/timeline/HTNewPostModal';
import HTPaymentOverviewCard from '@modules/hospitality-tours/components/wallet/HTPaymentOverviewCard';
import HTTransactionHistoryTable from '@modules/hospitality-tours/components/wallet/HTTransactionHistoryTable';
import HTTopUpModal from '@modules/hospitality-tours/components/wallet/HTTopUpModal';
import { transactions as mockTransactions } from '@modules/hospitality-tours/data/mock';

export default function HTStorybookPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'badges' | 'buttons' | 'tabs' | 'stats' | 'categories' | 'table' | 'cards' | 'modals' | 'listing-flow' | 'listing-details' | 'timeline-feed' | 'timeline-post' | 'wallet'>('all');
    const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
    const [demoFilterTab, setDemoFilterTab] = useState('all');
    const [listingFlowCategory, setListingFlowCategory] = useState<HTCategoryId>('cities-destinations');
    const [detailPreset, setDetailPreset] = useState<'idanre-hill' | 'ojude-oba-festival'>('ojude-oba-festival');
    const [tableSearch, setTableSearch] = useState('');
    const [tableFilter, setTableFilter] = useState('all');
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
    const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

    const filteredBookings = useMemo(() => {
        return mockBookings.filter((b) => {
            const matchSearch =
                b.id.toLowerCase().includes(tableSearch.toLowerCase()) ||
                b.guest.toLowerCase().includes(tableSearch.toLowerCase()) ||
                b.event.toLowerCase().includes(tableSearch.toLowerCase());
            const matchFilter =
                tableFilter === 'all' || b.status.toLowerCase() === tableFilter.toLowerCase();
            return matchSearch && matchFilter;
        });
    }, [tableSearch, tableFilter]);

    const tableColumns: Column<Booking>[] = [
        {
            key: 'id',
            label: 'BOOKING ID',
            cellClassName: 'px-6 py-4 font-semibold text-slate-700 text-xs sm:text-sm',
        },
        {
            key: 'guest',
            label: 'GUEST',
            cellClassName: 'px-6 py-4 text-slate-800 text-xs sm:text-sm font-medium',
        },
        {
            key: 'event',
            label: 'EVENT/SERVICE',
            cellClassName: 'px-6 py-4 text-slate-700 text-xs sm:text-sm',
        },
        {
            key: 'date',
            label: 'DATE',
            cellClassName: 'px-6 py-4 text-slate-600 text-xs sm:text-sm',
        },
        {
            key: 'tickets',
            label: 'TICKETS',
            cellClassName: 'px-6 py-4 text-slate-600 text-xs sm:text-sm text-center sm:text-left',
            render: (val) => String(val).padStart(2, '0'),
        },
        {
            key: 'amount',
            label: 'AMOUNT',
            cellClassName: 'px-6 py-4 font-semibold text-[#093154] text-xs sm:text-sm',
            render: (val) => `₦${Number(val).toLocaleString()}`,
        },
        {
            key: 'status',
            label: 'STATUS',
            cellClassName: 'px-6 py-4',
            render: (val) => <StatusBadge status={val} />,
        },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-10 pb-16">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#093154] to-[#0A5694] rounded-3xl p-6 sm:p-8 text-white shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-emerald-400/30">
                            Design System & Components
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            Component Storybook
                        </h2>
                        <p className="mt-1 text-slate-300 text-xs sm:text-sm max-w-xl">
                            Visual showcase for all UI components. Inspect, track, and verify component designs independently.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-1.5 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md self-start md:self-auto border border-white/10">
                        {(['all', 'badges', 'buttons', 'tabs', 'stats', 'categories', 'table', 'cards', 'modals', 'listing-flow', 'listing-details', 'timeline-feed', 'timeline-post', 'wallet'] as const).map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                                    activeTab === tab
                                        ? 'bg-white text-[#093154] shadow-xs'
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 1. Status Badges & Pills */}
            {(activeTab === 'all' || activeTab === 'badges') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-4">
                    <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-[#093154]">1. Status Badges & Pills</h3>
                            <p className="text-xs text-slate-500">Component: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">StatusBadge</code></p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <StatusBadge status="Confirmed" />
                        <StatusBadge status="Pending" />
                        <StatusBadge status="Cancelled" />
                        <StatusBadge status="Completed" />
                        <StatusBadge status="Failed" />
                        <StatusBadge status="Active" />
                        <StatusBadge status="Inactive" />
                    </div>
                </section>
            )}

            {/* 1.5 Buttons */}
            {(activeTab === 'all' || activeTab === 'buttons') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-8">
                    <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-[#093154]">1.5 Buttons</h3>
                        <p className="text-xs text-slate-500">Component: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTButton</code></p>
                    </div>
                    
                    {/* Sizes */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700">Sizes</h4>
                        <div className="flex flex-wrap items-center gap-4">
                            <HTButton size="sm">Small (sm)</HTButton>
                            <HTButton size="md">Medium (md)</HTButton>
                            <HTButton size="lg">Large (lg)</HTButton>
                        </div>
                    </div>

                    {/* Variants */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700">Variants</h4>
                        <div className="flex flex-wrap items-center gap-4">
                            <HTButton variant="primary">Primary</HTButton>
                            <HTButton variant="secondary">Secondary</HTButton>
                            <HTButton variant="outline">Outline</HTButton>
                            <HTButton variant="danger">Danger</HTButton>
                        </div>
                    </div>

                    {/* With Icons */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700">With Icons</h4>
                        <div className="flex flex-wrap items-center gap-4">
                            <HTButton icon={<FiPlus className="h-4 w-4" />}>Add Item</HTButton>
                            <HTButton variant="outline" icon={<FiSettings className="h-4 w-4" />}>Settings</HTButton>
                            <HTButton variant="secondary" icon={<FiDownload className="h-4 w-4" />}>Export</HTButton>
                        </div>
                    </div>

                    {/* Full Width */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700">Full Width</h4>
                        <div className="w-full sm:w-1/2">
                            <HTButton fullWidth size="lg">Full Width Button</HTButton>
                        </div>
                    </div>
                </section>
            )}

            {/* 1.6 Filter & Navigation Tabs */}
            {(activeTab === 'all' || activeTab === 'tabs') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-[#093154]">1.6 Filter & Navigation Tabs</h3>
                        <p className="text-xs text-slate-500">Component: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTFilterTabs</code></p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-slate-700">Navy Theme (Default for Feed & Filters)</h4>
                        <HTFilterTabs
                            tabs={[
                                { key: 'all', label: 'All' },
                                { key: 'Events', label: 'Events', count: 12 },
                                { key: 'Festival', label: 'Festival', count: 5 },
                                { key: 'Season', label: 'Season' },
                                { key: 'Documentary', label: 'Documentary' },
                            ]}
                            activeTab={demoFilterTab}
                            onTabChange={setDemoFilterTab}
                            variant="navy"
                        />
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-slate-700">White Theme (Detail Views & Inner Tabs)</h4>
                        <HTFilterTabs
                            tabs={[
                                { key: 'all', label: 'All' },
                                { key: 'Events', label: 'Events' },
                                { key: 'Festival', label: 'Festival' },
                                { key: 'Season', label: 'Season' },
                            ]}
                            activeTab={demoFilterTab}
                            onTabChange={setDemoFilterTab}
                            variant="white"
                        />
                    </div>
                </section>
            )}

            {/* 2. Welcome Banner Component */}
            {(activeTab === 'all' || activeTab === 'badges') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-[#093154]">2. Welcome Banner Component</h3>
                        <p className="text-xs text-slate-500">Component: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">WelcomeBanner</code></p>
                    </div>
                    <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200">
                        <WelcomeBanner
                            title="Welcome, Charles!"
                            subtitle="Here's what's happening with your business today"
                        />
                    </div>
                </section>
            )}

            {/* 3. Stat Cards Grid */}
            {(activeTab === 'all' || activeTab === 'stats') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-[#093154]">3. Dashboard Stat Cards</h3>
                        <p className="text-xs text-slate-500">Component: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">StatCard</code></p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-5">
                            <StatCard
                                title="Total Revenue"
                                value="NGN 98,370.80"
                                accent="blue"
                                iconSrc="/assets/icons/dashboard1.svg"
                                isPrimary
                                onActionClick={() => alert('Clicked Revenue details')}
                                className="h-full"
                            />
                        </div>
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <StatCard title="Total Bookings" value="435" accent="green" iconSrc="/assets/icons/dashboard2.svg" onActionClick={() => {}} />
                            <StatCard title="Total Visitors" value="800" accent="sky" iconSrc="/assets/icons/dashboard3.svg" onActionClick={() => {}} />
                            <StatCard title="Businesses Listed" value="4" accent="pink" iconSrc="/assets/icons/dashboard4.svg" onActionClick={() => {}} />
                            <StatCard title="Average Ratings" value="4.8" accent="amber" iconSrc="/assets/icons/dashboard5.svg" onActionClick={() => {}} />
                        </div>
                    </div>
                </section>
            )}

            {/* 4. Listing Category Cards */}
            {(activeTab === 'all' || activeTab === 'categories') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-[#093154]">4. Listing Category Cards</h3>
                        <p className="text-xs text-slate-500">Component: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">ListingCategoryCard</code> (using listing1.svg to listing5.svg)</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <ListingCategoryCard
                            title="Cities & Destinations"
                            description="List cities, towns, and tourist destinations across Nigeria"
                            accent="purple"
                            iconSrc="/assets/icons/listing1.svg"
                            onClick={() => {}}
                        />
                        <ListingCategoryCard
                            title="Events & Festivals"
                            description="List cultural festivals, concerts, and special events"
                            accent="blue"
                            iconSrc="/assets/icons/listing2.svg"
                            onClick={() => {}}
                        />
                        <ListingCategoryCard
                            title="Parks & Nature"
                            description="List national parks, nature reserves, and outdoor attractions"
                            accent="sky"
                            iconSrc="/assets/icons/listing3.svg"
                            onClick={() => {}}
                        />
                        <ListingCategoryCard
                            title="Hotel & Resorts"
                            description="List hotels, resorts, lodges, and accommodation facilities"
                            accent="pink"
                            iconSrc="/assets/icons/listing4.svg"
                            onClick={() => {}}
                        />
                        <ListingCategoryCard
                            title="Arts & Culture"
                            description="List museums, galleries, cultural centers, and art spaces"
                            accent="green"
                            iconSrc="/assets/icons/listing5.svg"
                            onClick={() => {}}
                        />
                    </div>
                </section>
            )}

            {/* 5. Reusable Data Table */}
            {(activeTab === 'all' || activeTab === 'table') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-[#093154]">5. Reusable Data Table Component</h3>
                        <p className="text-xs text-slate-500">
                            Components: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Table</code> & <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">TableToolbar</code> (Head array & Body array configuration)
                        </p>
                    </div>

                    <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-2xs">
                        <TableToolbar
                            title="RECENT BOOKINGS"
                            searchValue={tableSearch}
                            onSearchChange={setTableSearch}
                            selectedFilter={tableFilter}
                            onFilterChange={setTableFilter}
                        />
                        <div className="p-4">
                            <Table
                                columns={tableColumns}
                                data={filteredBookings}
                                showPagination
                                start={1}
                                end={filteredBookings.length}
                                total={mockBookings.length}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* 6. Media & Review Cards */}
            {(activeTab === 'all' || activeTab === 'cards') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-[#093154]">6. Timeline, Review, & Item Cards</h3>
                        <p className="text-xs text-slate-500">Components: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">TimelineCard</code>, <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">ReviewCard</code>, <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTItemCard</code></p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-700">Timeline Post Card</h4>
                            <TimelineCard post={mockTimeline[0]} onClick={() => {}} />
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-700">Customer Review Card</h4>
                            <ReviewCard review={mockReviews[0]} />
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-700">HT Item Card</h4>
                            <div className="max-w-[320px]">
                                <HTItemCard item={DEFAULT_MOCK_ITEMS[0]} />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 7. Modals */}
            {(activeTab === 'all' || activeTab === 'modals') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-[#093154]">7. Modals & Dialogs</h3>
                        <p className="text-xs text-slate-500">Component: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">SignOutModal</code></p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsSignOutModalOpen(true)}
                            className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors cursor-pointer"
                        >
                            Trigger Sign Out Modal
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsNewPostModalOpen(true)}
                            className="px-4 py-2 bg-[#002E62] text-white rounded-xl text-xs font-semibold hover:bg-[#072440] transition-colors cursor-pointer"
                        >
                            Trigger New Post Modal
                        </button>

                        <SignOutModal
                            isOpen={isSignOutModalOpen}
                            onClose={() => setIsSignOutModalOpen(false)}
                            onConfirm={() => {
                                alert('Sign out confirmed!');
                                setIsSignOutModalOpen(false);
                            }}
                        />

                        <HTNewPostModal
                            isOpen={isNewPostModalOpen}
                            onClose={() => setIsNewPostModalOpen(false)}
                            onSubmitPost={(post) => alert(`Post added: ${post.title}`)}
                        />
                    </div>
                </section>
            )}

            {/* 8. Listing Flow Stepper */}
            {(activeTab === 'all' || activeTab === 'listing-flow') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-[#093154]">8. Listing Flow Stepper</h3>
                        <p className="text-xs text-slate-500">
                            Components: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTListingFlowStepper</code> —
                            full multi-step listing creation flow, category-aware
                        </p>
                    </div>

                    {/* Category picker */}
                    <div className="flex flex-wrap gap-2">
                        {([
                            { id: 'cities-destinations', label: 'Cities & Destinations' },
                            { id: 'events-festivals', label: 'Events & Festivals' },
                            { id: 'parks-nature', label: 'Parks & Nature' },
                            { id: 'hotel-resorts', label: 'Hotel & Resorts' },
                            { id: 'arts-culture', label: 'Arts & Culture' },
                        ] as { id: HTCategoryId; label: string }[]).map(({ id, label }) => (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setListingFlowCategory(id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                                    listingFlowCategory === id
                                        ? 'bg-[#002E62] text-white border-[#002E62]'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#002E62]'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <HTListingFlowStepper
                        key={listingFlowCategory}
                        categoryId={listingFlowCategory}
                        onComplete={() => alert('Form submitted! In production this would navigate to populated view.')}
                        onCancel={() => alert('Cancelled!')}
                    />
                </section>
            )}

            {/* 9. Listing Detail View */}
            {(activeTab === 'all' || activeTab === 'listing-details') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-6">
                    <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-[#093154]">9. Reusable Listing Detail View</h3>
                            <p className="text-xs text-slate-500">
                                Components: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTListingDetailView</code>, <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTListingHeroBanner</code>, <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTListingTabNav</code>, <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTListingScheduleSection</code>, <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTListingLiveStreamSection</code>, <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTListingPricingSidebar</code>
                            </p>
                        </div>

                        {/* Preset Switcher */}
                        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button
                                type="button"
                                onClick={() => setDetailPreset('ojude-oba-festival')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                    detailPreset === 'ojude-oba-festival'
                                        ? 'bg-[#002E62] text-white shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Events & Festivals (Ojude Oba)
                            </button>
                            <button
                                type="button"
                                onClick={() => setDetailPreset('idanre-hill')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                    detailPreset === 'idanre-hill'
                                        ? 'bg-[#002E62] text-white shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Cities & Destination (Idanre Hill)
                            </button>
                        </div>
                    </div>

                    <div className="border border-slate-200 rounded-2xl p-4 sm:p-6 bg-slate-50">
                        <HTListingDetailView
                            key={detailPreset}
                            data={detailPreset === 'ojude-oba-festival' ? OJUDE_OBA_MOCK : IDANRE_HILL_MOCK}
                            onEdit={() => alert('Edit listing clicked!')}
                            onDelete={() => alert('Listing deleted!')}
                        />
                    </div>
                </section>
            )}

            {/* 10. Timeline Feed View */}
            {(activeTab === 'all' || activeTab === 'timeline-feed') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-[#093154]">10. Timeline Feed View</h3>
                        <p className="text-xs text-slate-500">
                            Components: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTTimelineFeedView</code> & <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTTimelineFeedCard</code>
                        </p>
                    </div>

                    <div className="border border-slate-200 rounded-2xl p-4 sm:p-6 bg-slate-50">
                        <HTTimelineFeedView
                            posts={mockTimeline}
                            onSelectPost={(id) => alert(`Selected post: ${id}`)}
                            onMakePost={() => alert('Make post clicked!')}
                        />
                    </div>
                </section>
            )}

            {/* 11. Timeline Post Details View */}
            {(activeTab === 'all' || activeTab === 'timeline-post') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-[#093154]">11. Timeline Post Details View</h3>
                        <p className="text-xs text-slate-500">
                            Components: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTTimelinePostDetailView</code> (hero media, publisher info, likes, comments, related posts)
                        </p>
                    </div>

                    <div className="border border-slate-200 rounded-2xl p-4 sm:p-6 bg-slate-50">
                        <HTTimelinePostDetailView
                            post={mockTimeline[0]}
                            relatedPosts={mockTimeline.slice(1)}
                            onSelectPost={(id) => alert(`Selected related post: ${id}`)}
                        />
                    </div>
                </section>
            )}

            {/* 12. Wallet & Payment Overview */}
            {(activeTab === 'all' || activeTab === 'wallet') && (
                <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs space-y-6">
                    <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-[#093154]">12. Wallet & Payment Overview</h3>
                            <p className="text-xs text-slate-500">
                                Components: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTPaymentOverviewCard</code>, <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTTransactionHistoryTable</code>, <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">HTTopUpModal</code>
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsTopUpModalOpen(true)}
                            className="px-4 py-2 bg-[#002E62] text-white rounded-xl text-xs font-semibold hover:bg-[#072440] transition-colors cursor-pointer"
                        >
                            Open Top Up Modal
                        </button>
                    </div>

                    <div className="space-y-6">
                        <HTPaymentOverviewCard
                            onDepositClick={() => setIsTopUpModalOpen(true)}
                            onWithdrawClick={() => alert('Withdraw clicked')}
                        />
                        <HTTransactionHistoryTable
                            transactions={mockTransactions}
                            onViewTransaction={(tx) => alert(`Viewing ${tx.id}`)}
                        />
                    </div>

                    <HTTopUpModal
                        isOpen={isTopUpModalOpen}
                        onClose={() => setIsTopUpModalOpen(false)}
                        onSuccessDeposit={(amt) => alert(`Deposited ₦${amt.toLocaleString()}`)}
                    />
                </section>
            )}
        </div>
    );
}
