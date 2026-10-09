import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { CATEGORY_DETAILS, DEFAULT_MOCK_ITEMS, type ListingCategoryDetail } from '@modules/hospitality-tours/data/categoryData';
import { FiPlus } from 'react-icons/fi';
import WelcomeBanner from '@modules/hospitality-tours/components/WelcomeBanner';
import HTItemCard from '@modules/hospitality-tours/components/HTItemCard';
import HTListingFlowStepper from '@modules/hospitality-tours/components/listing-flow/HTListingFlowStepper';
import { useBreadcrumbs } from '@shared/context/BreadcrumbContext';
import type { HTCategoryId } from '@modules/hospitality-tours/components/listing-flow/HTListingFlowContext';

// Valid category IDs for the listing flow
const VALID_CATEGORY_IDS: HTCategoryId[] = [
    'cities-destinations',
    'events-festivals',
    'parks-nature',
    'hotel-resorts',
    'arts-culture',
];

function isValidCategoryId(id: string | undefined): id is HTCategoryId {
    return VALID_CATEGORY_IDS.includes(id as HTCategoryId);
}

export default function HTCategoryDetailPage() {
    const { categoryId } = useParams<{ categoryId: string }>();

    const category: ListingCategoryDetail = useMemo(() => {
        if (categoryId && CATEGORY_DETAILS[categoryId]) {
            return CATEGORY_DETAILS[categoryId];
        }
        return (
            CATEGORY_DETAILS['events-festivals'] ?? {
                id: 'events-festivals',
                title: 'Events & Festivals',
                description: 'List cultural festivals, concerts, and special events',
                subtitle: 'List cultural festivals, concerts, and special events',
                accent: 'blue',
                iconSrc: '/assets/icons/listing2.svg',
                examples: ['Ojude Oba', 'Calabar Carnival', 'Detty December', 'Durbar Festival'],
                features: ['Event scheduling', 'Ticket sales', 'Live streaming', 'Attendee management'],
                buttonLabel: 'List Events & Festivals',
                items: [],
            }
        );
    }, [categoryId]);

    // Dynamic breadcrumbs — when in create flow, append "Create [Category]"
    const [showCreateFlow, setShowCreateFlow] = useState(false);

    useBreadcrumbs(
        useMemo(
            () => [
                { label: 'Listings', path: '/hospitality-tours/dashboard/my-listings' },
                {
                    label: category.title,
                    path: showCreateFlow
                        ? `/hospitality-tours/dashboard/my-listings/${categoryId}`
                        : undefined,
                },
                ...(showCreateFlow
                    ? [{ label: `Create ${category.title.split(' & ')[0]}` }]
                    : []),
            ],
            [category.title, categoryId, showCreateFlow],
        ),
    );

    // View state: empty → create flow → populated
    const [forceEmptyState, setForceEmptyState] = useState<boolean | null>(null);

    const hasMockItems = (category.items ?? []).length > 0;
    const showEmptyState = forceEmptyState !== null ? forceEmptyState : !hasMockItems;

    const actionButtonLabel =
        category.title === 'Events & Festivals'
            ? 'List Event & Festival'
            : `List ${category.title}`;

    const validCategoryId = isValidCategoryId(categoryId) ? categoryId : 'cities-destinations';

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleOpenCreate = () => setShowCreateFlow(true);

    const handleCreateComplete = () => {
        setShowCreateFlow(false);
        setForceEmptyState(false); // Switch to populated view
    };

    const handleCreateCancel = () => {
        setShowCreateFlow(false);
    };

    // ── Render: Create Flow ───────────────────────────────────────────────────

    if (showCreateFlow) {
        return (
            <div className="max-w-7xl mx-auto pb-12">
                <HTListingFlowStepper
                    categoryId={validCategoryId}
                    onComplete={handleCreateComplete}
                    onCancel={handleCreateCancel}
                />
            </div>
        );
    }

    // ── Render: Main (Empty or Populated) ─────────────────────────────────────

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <WelcomeBanner
                    title={category.title}
                    subtitle={category.subtitle}
                />
                <div className="flex items-center gap-3 self-start sm:self-auto">
                    {/* Dev toggle: preview empty vs populated */}
                    <button
                        type="button"
                        onClick={() => setForceEmptyState(!showEmptyState)}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                        title="Click to toggle between empty and populated views"
                    >
                        Mode: {showEmptyState ? 'Empty State' : 'Populated View'}
                    </button>

                    {!showEmptyState && (
                        <button
                            type="button"
                            onClick={handleOpenCreate}
                            className="bg-[#002E62] hover:bg-[#072440] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-xs flex items-center gap-2 whitespace-nowrap"
                        >
                            <FiPlus className="h-4 w-4" />
                            <span>{actionButtonLabel}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* MAIN CONTENT: EMPTY STATE VS POPULATED GRID */}
            {showEmptyState ? (
                <div className="text-center flex flex-col items-center justify-center max-w-[420px] mx-auto mt-8 px-4">
                    {/* Circle Icon */}
                    <div className="mb-4">
                        <img
                            src={category.iconSrc}
                            alt={category.title}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-contain shadow-xl rounded-full"
                        />
                    </div>

                    {/* Title & Subtitle */}
                    <h2 className="text-lg sm:text-xl font-semibold text-[#002E62]">
                        {category.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#52525B]">
                        {category.description}
                    </p>

                    {/* Examples */}
                    <div className="mt-6 w-full">
                        <h3 className="text-sm font-medium text-[#002E62] mb-2">Examples</h3>
                        <div className="flex flex-wrap items-center justify-center gap-2 mx-auto">
                            {category.examples.map((ex) => (
                                <span
                                    key={ex}
                                    className="px-3 py-1.5 rounded-[8px] bg-[#F7F7FD] border border-[#E0DEF7] text-[#52525B] text-xs sm:text-sm"
                                >
                                    {ex}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-6 w-full">
                        <h3 className="text-sm font-medium text-[#002E62] mb-2">Features</h3>
                        <div className="text-center flex flex-wrap justify-center gap-x-3 gap-y-4 text-xs sm:text-sm text-[#6E6D6D]">
                            {category.features.map((feat) => (
                                <div key={feat} className="flex items-center gap-2">
                                    <img src="/assets/icons/listMark.svg" alt="listmark" className="w-4 h-4 object-contain" />
                                    <span>{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Primary CTA — launches the create flow */}
                    <button
                        type="button"
                        onClick={handleOpenCreate}
                        className="mt-6 bg-[#002E62] hover:bg-[#072440] text-white font-medium text-sm rounded-[7px] px-8 py-3 transition-colors shadow-sm w-full cursor-pointer"
                    >
                        {category.buttonLabel}
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {(category.items && category.items.length > 0 ? category.items : DEFAULT_MOCK_ITEMS).map(
                        (item) => (
                            <HTItemCard key={item.id} item={item} categoryId={validCategoryId} />
                        ),
                    )}
                </div>
            )}
        </div>
    );
}
