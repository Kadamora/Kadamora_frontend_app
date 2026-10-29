import { useState } from 'react';
import PageHeader from '@shared/components/Dashboard/PageHeader';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';
import { showSuccessToast } from '@shared/components/Toast/Toast';

import ServicesCategoryCards from '../../components/services/ServicesCategoryCards';
import ArtisansCategoryView from '../../components/services/ArtisansCategoryView';
import ArtisanDetailsDrawer from '../../components/services/ArtisanDetailsDrawer';
import CreateServiceModal from '../../components/services/CreateServiceModal';
import InviteArtisanServiceModal from '../../components/services/InviteArtisanServiceModal';

import {
    mockServiceCategories,
    mockArtisansList,
} from '../../data/servicesMock';
import type {
    ArtisanCategory,
    ServiceArtisan,
    ServiceCategoryItem,
} from '../../types/services';

export default function FMServicesPage() {
    const [categories, setCategories] =
        useState<ServiceCategoryItem[]>(mockServiceCategories);
    const [artisans, setArtisans] = useState<ServiceArtisan[]>(mockArtisansList);
    const [activeCategory, setActiveCategory] = useState<ArtisanCategory | null>(null);

    // Drawers & Modals
    const [selectedArtisan, setSelectedArtisan] = useState<ServiceArtisan | null>(null);
    const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
    const [isCreateServiceModalOpen, setIsCreateServiceModalOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    // Handlers
    const handleToggleStatus = (artisan: ServiceArtisan) => {
        const newStatus = artisan.status === 'Active' ? 'In-Active' : 'Active';
        setArtisans((prev) =>
            prev.map((a) => (a.id === artisan.id ? { ...a, status: newStatus } : a))
        );
        showSuccessToast(
            'Status Updated',
            `${artisan.name} is now ${newStatus === 'Active' ? 'Activated' : 'Deactivated'}.`
        );
    };

    const handleMessageArtisan = (artisan: ServiceArtisan) => {
        showSuccessToast(
            'Message Channel Opened',
            `Connecting to ${artisan.name} (${artisan.businessName}).`
        );
    };

    const handleCreateService = (newService: { name: string; description: string }) => {
        const newCat: ServiceCategoryItem = {
            id: newService.name as ArtisanCategory,
            title: newService.name,
            description: newService.description,
            bubbleBg: 'bg-[#F4F6F9]',
            bubbleColor: 'text-[#002E62]',
        };
        setCategories((prev) => [...prev, newCat]);
    };

    const handleInviteArtisan = (email: string) => {
        if (!activeCategory) return;
        const newId = `art-${Date.now()}`;
        const newArtisan: ServiceArtisan = {
            id: newId,
            name: email.split('@')[0] || 'Invited Artisan',
            businessName: `${activeCategory} Services Ltd`,
            phoneNumber: '08000000000',
            requestCompleted: 0,
            activeRequest: 0,
            status: 'Active',
            category: activeCategory,
            profession: activeCategory.slice(0, -1),
            rating: 5.0,
            reviews: [],
        };
        setArtisans((prev) => [newArtisan, ...prev]);
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Header & Breadcrumb */}
            {activeCategory === null ? (
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#002E62]">
                        Services
                    </h1>
                </div>
            ) : (
                <div className="space-y-1">
                    <PageHeader
                        title="Services"
                        crumbs={[
                            {
                                label: 'Services',
                                onClick: () => setActiveCategory(null),
                            },
                            { label: activeCategory },
                        ]}
                    />
                </div>
            )}

            {/* VIEW 1: Main Services Overview (Image 1) */}
            {activeCategory === null && (
                <ServicesCategoryCards
                    categories={categories}
                    onSelectCategory={(cat) => setActiveCategory(cat)}
                    onAddArtisan={() => setIsCreateServiceModalOpen(true)}
                />
            )}

            {/* VIEW 2: Category Artisans Table (Image 3) */}
            {activeCategory !== null && (
                <ArtisansCategoryView
                    category={activeCategory}
                    artisans={artisans.filter((a) => a.category === activeCategory)}
                    onAddArtisan={() => setIsInviteModalOpen(true)}
                    onViewArtisan={(art) => {
                        setSelectedArtisan(art);
                        setIsDetailsDrawerOpen(true);
                    }}
                    onToggleStatus={handleToggleStatus}
                    onMessageArtisan={handleMessageArtisan}
                />
            )}

            {/* MODALS & DRAWERS */}
            {/* Modal: Create Service (Image 2) */}
            <CreateServiceModal
                isOpen={isCreateServiceModalOpen}
                onClose={() => setIsCreateServiceModalOpen(false)}
                onCreateService={handleCreateService}
            />

            {/* Modal: Invite New Plumber / Artisan (Image 4 Right) */}
            <InviteArtisanServiceModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                categoryTitle={activeCategory || 'Artisans'}
                onInvite={handleInviteArtisan}
            />

            {/* Drawer: Artisan Details (Slides in from the right, Image 4 Left) */}
            <ArtisanDetailsDrawer
                isOpen={isDetailsDrawerOpen}
                onClose={() => setIsDetailsDrawerOpen(false)}
                artisan={selectedArtisan}
            />

            {/* Floating Support Chat FAB */}
            <FloatingChatButton />
        </div>
    );
}
