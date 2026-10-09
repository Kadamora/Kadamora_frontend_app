import { useState, useMemo } from 'react';
import type { ListingDetailData, ListingTabKey } from '../../types/listingDetailsTypes';
import HTListingHeroBanner from './HTListingHeroBanner';
import HTListingTabNav from './HTListingTabNav';
import HTListingAboutSection from './HTListingAboutSection';
import HTListingScheduleSection from './HTListingScheduleSection';
import HTListingGallerySection from './HTListingGallerySection';
import HTListingLiveStreamSection from './HTListingLiveStreamSection';
import HTListingReviewsSection from './HTListingReviewsSection';
import HTListingPricingSidebar from './HTListingPricingSidebar';
import HTDeleteListingModal from './HTDeleteListingModal';

interface HTListingDetailViewProps {
    data: ListingDetailData;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function HTListingDetailView({
    data,
    onEdit,
    onDelete,
}: HTListingDetailViewProps) {
    const [activeTab, setActiveTab] = useState<ListingTabKey>('about');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Dynamically build tab options based on available data features
    const availableTabs = useMemo<{ key: ListingTabKey; label: string }[]>(() => {
        const tabs: { key: ListingTabKey; label: string }[] = [{ key: 'about', label: 'About' }];

        if (data.scheduleItems && data.scheduleItems.length > 0) {
            tabs.push({ key: 'schedule', label: 'Schedule' });
        }

        tabs.push({ key: 'gallery', label: 'Gallery' });

        if (data.liveStream) {
            tabs.push({ key: 'livestream', label: 'Live Stream' });
        }

        tabs.push({ key: 'review', label: 'Review' });

        return tabs;
    }, [data.scheduleItems, data.liveStream]);

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        setIsDeleteModalOpen(false);
        if (onDelete) {
            onDelete();
        } else {
            alert(`Listing "${data.title}" deleted.`);
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* 1. Hero Banner with Actions & Optional Countdown */}
            <HTListingHeroBanner
                title={data.title}
                heroTitle={data.heroTitle}
                description={data.description}
                coverImage={data.coverImage}
                metadata={data.metadata}
                countdown={data.countdown}
                onEdit={onEdit}
                onDelete={handleDeleteClick}
            />

            {/* 2. Segmented Pill Tab Navigation with View Post link */}
            <div>
                <HTListingTabNav
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    tabs={availableTabs}
                    viewPostUrl={data.viewPostUrl}
                />
            </div>

            {/* 3. Main 2-Column Grid (Left: Tab Content | Right: Pricing Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column (8 cols on lg) */}
                <div className="lg:col-span-8">
                    {activeTab === 'about' && (
                        <HTListingAboutSection
                            title={data.aboutTitle}
                            paragraphs={data.aboutParagraphs}
                            locationMap={data.locationMap}
                        />
                    )}
                    {activeTab === 'schedule' && (
                        <HTListingScheduleSection
                            title={data.scheduleTitle}
                            items={data.scheduleItems}
                        />
                    )}
                    {activeTab === 'gallery' && (
                        <HTListingGallerySection
                            title={data.galleryTitle}
                            photos={data.galleryPhotos}
                        />
                    )}
                    {activeTab === 'livestream' && (
                        <HTListingLiveStreamSection
                            title={data.liveStreamTitle}
                            data={data.liveStream}
                        />
                    )}
                    {activeTab === 'review' && (
                        <HTListingReviewsSection
                            title={data.reviewsTitle}
                            reviews={data.reviews}
                        />
                    )}
                </div>

                {/* Right Column (4 cols on lg) */}
                <div className="lg:col-span-4">
                    <HTListingPricingSidebar
                        title={data.sidebarTitle}
                        data={data.pricingCard}
                    />
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <HTDeleteListingModal
                isOpen={isDeleteModalOpen}
                listingTitle={data.title}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}
