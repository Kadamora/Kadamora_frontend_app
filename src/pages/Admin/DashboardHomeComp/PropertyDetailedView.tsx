import React from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import type { Property } from './PropertyCard';

interface PropertyDetailedViewProps {
  property: Property;
  onBack: () => void;
}

const PropertyDetailedView: React.FC<PropertyDetailedViewProps> = ({ property, onBack }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb / Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[#091E42]">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#505F79]">Dashboard</span>
          <ChevronRight className="h-4 w-4 text-[#505F79]" />
          <span className="text-[#359F6A] font-medium">{property.name}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        {/* Left Sidebar Stepper */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="relative space-y-12">
            {/* Vertical Line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-[#E9EEF2]" />

            {/* Step 1 */}
            <div className="relative flex gap-4">
              <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#359F6A] shadow-sm">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-[#091E42]">Property Details</h3>
                <p className="text-xs text-[#505F79] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Vulputate nec dictum quam congue massa.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex gap-4 opacity-50">
              <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#CCD5DD] shadow-sm">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-[#091E42]">Pricing</h3>
                <p className="text-xs text-[#505F79] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Tellus nunc odio enim ut sit rutrum morbi. Bibendum sed dictum egestas purus a porta sit.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex gap-4 opacity-50">
              <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#CCD5DD] shadow-sm">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-[#091E42]">Media And Documentation</h3>
                <p className="text-xs text-[#505F79] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Tellus nunc odio enim ut sit rutrum morbi. Bibendum sed dictum egestas purus a porta sit.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <div className="rounded-3xl border border-[#E9EEF2] bg-white p-8 shadow-sm">
            {/* Action Bar */}
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={onBack}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E9EEF2] bg-white text-[#505F79] hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E9EEF2] bg-white text-[#505F79] hover:bg-slate-50 transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 pb-4 mb-8 border-b border-[#E9EEF2]">
              <h2 className="text-lg font-bold text-[#091E42]">Property Details</h2>
              <Info className="h-4 w-4 text-[#CCD5DD]" />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#505F79]">Property Category</p>
                <p className="text-[17px] font-bold text-[#093154]">Luxurious</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#505F79]">Category Type</p>
                <p className="text-[17px] font-bold text-[#093154]">Residential Properties</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#505F79]">Property Name</p>
                <p className="text-[17px] font-bold text-[#093154]">{property.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#505F79]">Property Type</p>
                <p className="text-[17px] font-bold text-[#093154]">Duplex</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#505F79]">Furnished Status</p>
                <p className="text-[17px] font-bold text-[#093154]">Partly Furnished</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#505F79]">location</p>
                <p className="text-[17px] font-bold text-[#093154]">Abuja</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#505F79]">Condition Of Property</p>
                <p className="text-[17px] font-bold text-[#093154]">New</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#505F79]">size</p>
                <p className="text-[17px] font-bold text-[#093154]">1200 sqft</p>
              </div>

              {/* Lists */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#505F79]">Facilities</p>
                <div className="text-[17px] font-bold text-[#093154] space-y-0.5">
                  <p>2 Living Rooms</p>
                  <p>5 Bedrooms</p>
                  <p>6 Toilets/Bathrooms</p>
                  <p>Kitchen</p>
                  <p>Toilet</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#505F79]">Amenities</p>
                <div className="text-[17px] font-bold text-[#093154] space-y-0.5">
                  <p>Swimming Pool</p>
                  <p>Garden</p>
                  <p>Elevator</p>
                  <p>Generator</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#505F79]">Description</p>
              <div className="text-[17px] font-bold text-[#093154] leading-relaxed max-w-2xl">
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <p>Fusce bibendum mi placerat quis vitae ut velit pharetra amet.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PropertyDetailedView;
