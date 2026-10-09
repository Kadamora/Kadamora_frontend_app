import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useBreadcrumbs } from '@shared/context/BreadcrumbContext';
import { CATEGORY_DETAILS } from '@modules/hospitality-tours/data/categoryData';
import { getListingDetailData } from '@modules/hospitality-tours/data/mockListingDetails';
import HTListingDetailView from '@modules/hospitality-tours/components/listing-details/HTListingDetailView';

export default function HTListingDetailPage() {
    const { categoryId, listingId } = useParams<{ categoryId: string; listingId: string }>();
    const navigate = useNavigate();

    const categoryTitle = useMemo(() => {
        if (categoryId && CATEGORY_DETAILS[categoryId]) {
            return CATEGORY_DETAILS[categoryId].title;
        }
        return 'Cities & Destination';
    }, [categoryId]);

    const listingData = useMemo(() => {
        return getListingDetailData(listingId, categoryId);
    }, [listingId, categoryId]);

    // Dynamic breadcrumbs — e.g. Listings > Cities & Destination > Idanre Hill
    useBreadcrumbs(
        useMemo(
            () => [
                { label: 'Listings', path: '/hospitality-tours/dashboard/my-listings' },
                {
                    label: categoryTitle,
                    path: categoryId ? `/hospitality-tours/dashboard/my-listings/${categoryId}` : undefined,
                },
                { label: listingData.title },
            ],
            [categoryTitle, categoryId, listingData.title],
        ),
    );

    const handleEdit = () => {
        alert(`Edit flow for "${listingData.title}" triggered.`);
    };

    const handleDelete = () => {
        alert(`"${listingData.title}" deleted successfully.`);
        if (categoryId) {
            navigate(`/hospitality-tours/dashboard/my-listings/${categoryId}`);
        } else {
            navigate('/hospitality-tours/dashboard/my-listings');
        }
    };

    return (
        <HTListingDetailView
            data={listingData}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
}
