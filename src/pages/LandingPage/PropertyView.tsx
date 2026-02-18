import Gallery from "@components/cards/gallery/Gallery";
import ProductCard from "@components/cards/product/ProductCard";
import LandingPageContainer from "@components/container/LandingPage/LandingPageContainer";
import { fakeDb } from "@components/fakeDB/fakeDb";
import { useParams } from 'react-router';
import { useGetAgentPropertyListingsByIdQuery } from '@store/api/propertyListings.api';
import { MdOutlineLocationOn } from "react-icons/md";
import CategoryCard from "@pages/Dashboard/PropertyListing/PropertyView/components/CategoryCard";


export default function PropertyView() {    
        const {agentId} = useParams<{agentId: string}>();
        console.log("one", agentId)
        const {data: propertyListings} = useGetAgentPropertyListingsByIdQuery(agentId!, {
            skip: !agentId,
        });
        const property = propertyListings?.data;
        console.log(propertyListings)
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


    return (
        <LandingPageContainer>
            {/* Breadcrumb */}
            <div className="py-6 bg-[#f7f8fa]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex">
                        <span>Listings</span>
                        <span className="mx-2">›</span>
                        <span className="text-primary">{property?.title}</span>
                    </nav>
                </div>
            </div>

            <section className="bg-[#f7f8fa]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Images / Video */}
                        <Gallery />

                        {/* Right Column - Property Details */}
                        <div className="bg-white p-6 rounded-lg shadow-border">
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-secondary">{property?.title}</div>
                                {/* <button
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
                                </button> */}
                            </div>

                            <p className="text-[18px] mb-4">
                                {formatCurrency(property.price)} {property.paymentTerm ? `/ ${property.paymentTerm}` : ''}
                            </p>

                            <p className="mb-6 leading-7.5 text-[#6E6D6D]">
                                {property?.description || 'No description available'}
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
                                <h3 className="font-semibold mb-3 text-secondary">Amenities</h3>
                                <div className="space-y-2">
                                    {amenities.map((amenity: any, index: any) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <img src={amenity.icon} alt={amenity.name} className="w-4 h-4" />
                                            <span className="text-[#6E6D6D]">{amenity.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Facilities */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-secondary">Facilities</h3>
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(138px,1fr))] gap-3">
                                    {facilities.map((facility, index) => (
                                        <div
                                            key={index}
                                            className="w-34.5 h-20.25 mx-auto flex flex-col items-center justify-center shadow-border rounded-lg hover:border-primary transition-colors"
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

                            {/* Interest Button */}
                            <div className="mb-6">
                                <p className="font-medium mb-2 text-secondary">Are you interested in this Property?</p>
                                <button className="w-37.5 h-11.25 bg-secondary text-white rounded-lg font-medium">
                                    Message Agent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Properties */}
            <section className="py-16 bg-[#f7f8fa]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-[40px] font-bold text-secondary mb-8">Similar Properties</h2>

                    {/* First Row */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {fakeDb.listings.slice(0, 4).map((property) => (
                            <ProductCard key={property.id} property={property} landingPage />
                        ))}
                    </div>

                    {/* Second Row */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {fakeDb.listings.slice(4, 8).map((property) => (
                            <ProductCard key={property.id} property={property} landingPage />
                        ))}
                    </div>
                </div>
            </section>

            {/* Verified Users */}
            <section className="py-16 bg-[#f7f8fa]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-[40px] font-bold text-secondary mb-8">Verified Users</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-border shadow-border-cce3fd">
                            <div className="h-64 w-full">
                                <img
                                    src="/assets/african_lady.png"
                                    alt="Benita Ayobami Gbemi"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="font-semibold text-secondary">Benita Ayobami Gbemi</h3>
                                <p className="text-sm text-[#6E6D6D]">Broker - Brick&Bettle Co Limited</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-border shadow-border-cce3fd">
                            <div className="h-64 w-full bg-[#FADBD2]"></div>
                            <div className="p-5">
                                <h3 className="font-semibold text-secondary">Michael John Felix</h3>
                                <p className="text-sm text-[#6E6D6D]">Agent - Felix Oak Limited</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-border shadow-border-cce3fd">
                            <div className="h-64 w-full bg-gray-100"></div>
                            <div className="p-5">
                                <h3 className="font-semibold text-secondary">James Tony Garuba</h3>
                                <p className="text-sm text-[#6E6D6D]">Agent - Bannylin Construction Limited</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LandingPageContainer>
    );
}
