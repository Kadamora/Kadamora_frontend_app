
import CategoryCard from './components/CategoryCard';
import { MdOutlineLocationOn } from 'react-icons/md';
import { LuShieldCheck } from 'react-icons/lu';
import Gallery from '../../../../components/cards/gallery/Gallery';
import { useNavigate, useParams } from 'react-router';
import { useGetAgentPropertyListingsByIdQuery, useGetAllPropertyListingsQuery } from '@store/api/propertyListings.api';
import ProductCard from '@components/cards/product/ProductCard';

export default function PropertyView() {
    const navigate = useNavigate();
    const {agentId} = useParams<{agentId: string}>();
    const {data: propertyListings} = useGetAgentPropertyListingsByIdQuery(agentId!, {
        skip: !agentId,
    });
    const {data: allProperties} = useGetAllPropertyListingsQuery();
    const property = propertyListings?.data;
    const formatCurrency = (amount: string | number | null | undefined) => {
        if (!amount) return 'N/A';
        return `₦ ${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const humanize = (str: string | null | undefined) => {
        if (!str) return '';
        return str
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase());
    };

    const amenities =
        property?.amenities?.map((amenity: string) => ({
            name: humanize(amenity),
            icon: '/assets/icons/check2.png',
        })) || [];

    const facilities = [
        { count: property?.bedrooms, label: 'Bedroom' },
        { count: property?.kitchens, label: 'Kitchen' },
        { count: property?.bathrooms, label: 'Toilet/Bathroom' },
        { count: property?.stores, label: 'Store' },
        { count: property?.livingRooms, label: 'Living Room' },
    ].filter((f) => f.count !== undefined && f.count !== null && f.count > 0);

    const categoryData = [
        { label: 'Property Category', value: humanize(property?.propertyCategory) },
        { label: 'Property Type', value: humanize(property?.propertySubType || property?.propertyType) },
        { label: 'Payment Type', value: humanize(property?.paymentTerm) },
        { label: 'Service Charge', value: property?.serviceCharge ? formatCurrency(property?.serviceCharge) : 'None' },
        { label: 'Category Type', value: humanize(property?.categoryType) },
        { label: 'Furnish Status', value: humanize(property?.furnishingStatus) },
        { label: 'Other Charges', value: property?.otherCharges ? formatCurrency(property?.otherCharges) : 'None' },
    ].filter((item) => item.value && item.value !== 'None' && item.value !== 'N/A');

    const safetyTips = [
        'Never send payments in advance.',
        'Carefully inspect the property or item to confirm it meets your needs.',
        'Verify all relevant documents and proceed with payment only when fully satisfied.',
    ];
    
    if (!property) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-[#002E62]" />
            </div>
        );
    }

    return (
        <>
            {/* Breadcrumb */}
            <div className="py-6">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex">
                        <span onClick={() => navigate('/dashboard/property-listing')} className="cursor-pointer text-sm">Home</span>
                        <span className="mx-2 text-sm">›</span>
                        <span onClick={() => navigate(-1)} className="cursor-pointer text-sm">Listings</span>
                        <span className="mx-2 text-sm">›</span>
                        <span className="text-primary text-sm">{property.title}</span>
                    </nav>
                </div>
            </div>

            <section className="">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Images / Video */}
                        <Gallery media={property.media} />

                        {/* Right Column - Property Details */}
                        <div className="bg-white p-4 rounded-lg shadow-border">
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-[#002E62]">{property.title}</div>
                                <button
                                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
                                    aria-label="Add to favorites"
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <p className="text-[18px] mb-4">
                                {formatCurrency(property.price)} {property.paymentTerm ? `/ ${property.paymentTerm}` : ''}
                            </p>

                            <p className="mb-2 leading-7.5 text-[#6E6D6D]">
                                {property.description || 'No description provided.'}
                            </p>
                            {/* Location */}
                            <div className="flex items-center gap-2 text-sm text-[#0A2D50] mb-3.75">
                                <MdOutlineLocationOn className="w-5 h-5 text-[#6E6D6D]" />
                                <p className="text-[#002E62] ">
                                    {property.location}
                                    {property.state?.name ? `, ${property.state.name}` : ''}
                                    {property.country?.name ? `, ${property.country.name}` : ''}
                                </p>
                            </div>

                            <div className="h-px w-full bg-[#E4E4E7] mb-6" />

                            {/* Category */}
                            <div className="w-full mt-5 mb-5">
                                <CategoryCard data={categoryData} />
                            </div>

                            <div className="h-px w-full bg-[#E4E4E7] mb-6" />

                            {/* Amenities */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-[#002E62]">Amenities</h3>
                                <div className="flex flex-wrap gap-3">
                                    {amenities.map((amenity: any, index: any) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] text-[#6E6D6D]"
                                        >
                                            <img src={amenity.icon} alt="" className="h-4 w-4" aria-hidden />
                                            {amenity.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Facilities */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-[#002E62]">Facilities</h3>
                                <div className="flex flex-wrap gap-3">
                                    {facilities.map((facility, index) => (
                                        <div
                                            key={index}
                                            className="w-30 h-20.25 mx-auto flex flex-col items-center justify-center shadow-border rounded-lg hover:border-primary transition-colors"
                                        >
                                            <img
                                                src="/assets/icons/bed.png"
                                                alt={facility.label}
                                                className="w-6 h-6 mb-2"
                                            />
                                            <div className="text-[14px] mt-1">
                                                {facility.count} {facility.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
                        <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <span className="grid h-9 w-9 place-items-center rounded-full border border-[#CCE3FD] bg-[#EEF6FF]">
                                    <LuShieldCheck />
                                </span>
                                <h3 className="text-[18px] font-semibold text-[#002E62]">Safety tips</h3>
                            </div>
                            <ul className="space-y-2 leading-relaxed text-[#3F3F46]">
                                {safetyTips.map((tip) => (
                                    <li key={tip} className="flex items-center gap-2">
                                        <span
                                            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3F3F46]"
                                            aria-hidden
                                        />
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-[18px] border border-[#E2E8F0] bg-white flex items-center">
                            <div className="flex items-center justify-between w-full p-3.75">
                                <div>
                                    <p className="text-[15px] font-semibold text-[#002E62]">
                                        Are you interested in this Property?
                                    </p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <img
                                            src={
                                                property.agent?.user?.imgUrl ||
                                                `https://api.dicebear.com/7.x/avataaars/svg?seed=${property.agent?.user?.firstName || 'User'}`
                                            }
                                            alt={`${property.agent?.user?.firstName} ${property.agent?.user?.lastName}`}
                                            className="h-12 w-12 rounded-full border border-[#CCE3FD]"
                                        />
                                        <div>
                                            <p className="text-[14px] font-semibold text-[#002E62]">
                                                {property.agent?.user?.firstName} {property.agent?.user?.lastName}
                                            </p>
                                            <p className="text-[13px] text-[#52525B]">{property.agent?.user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const agentUserId = property.agent?.user?.id;
                                        if (!agentUserId) return;
                                        navigate(`/dashboard/chat/${agentUserId}`, {
                                            state: {
                                                chat: {
                                                    userId: agentUserId,
                                                    userName: `${property.agent?.user?.firstName ?? ''} ${property.agent?.user?.lastName ?? ''}`.trim(),
                                                    userAvatar: property.agent?.user?.imgUrl,
                                                    propertyId: property.id,
                                                    propertyName: property.title,
                                                    propertyImage: property.media?.[0]?.url,
                                                    lastMessage: '',
                                                    lastMessageAt: '',
                                                    unreadCount: 0,
                                                },
                                            },
                                        });
                                    }}
                                    className="rounded-full bg-[#002E62] px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#072968] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#04194E]/50"
                                >
                                    Message Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Properties */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-[40px] font-bold text-secondary mb-8">Similar Properties</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {allProperties?.data
                            ?.filter((p: any) => p.id !== property.id)
                            .slice(0, 8)
                            .map((p: any) => {
                                // Map API structure to ProductCard props
                                const mappedProperty = {
                                    id: p.id,
                                    name: p.title,
                                    price: formatCurrency(p.price),
                                    description: p.description?.slice(0, 100) + (p.description?.length > 100 ? '...' : ''),
                                    category: humanize(p.propertyType), // e.g., "Rent", "Sell"
                                    subCategory: humanize(p.propertySubType || p.propertyType),
                                    image: p.media?.[0]?.url || '/assets/images/placeholder.png',
                                };
                                return <ProductCard key={p.id} property={mappedProperty} />;
                            })}
                    </div>
                </div>
            </section>
        </>
    );
}
