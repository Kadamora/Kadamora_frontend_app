import React from 'react';

export interface Property {
  id: number;
  name: string;
  price: string;
  type: 'Sell' | 'Lease' | 'Rent';
  image: string;
}

interface PropertyCardProps {
  property: Property;
  onView?: (id: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onView }) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 transition-all hover:bg-slate-50">
      <div className="h-20 w-20 overflow-hidden rounded-2xl">
        <img
          src={property.image}
          alt={property.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-bold text-[#091E42] mb-0.5">{property.name}</h4>
        <p className="text-sm font-medium text-[#505F79]">
          {property.price} · <span className="text-[#505F79]">{property.type}</span>
        </p>
      </div>
      <button
        className="px-6 py-2.5 rounded-xl bg-[#E5F1FF] text-[#0061FF] font-bold text-sm transition-colors hover:bg-[#D0E5FF]"
        onClick={() => onView?.(property.id)}
      >
        View
      </button>
    </div>
  );
};

export default PropertyCard;
