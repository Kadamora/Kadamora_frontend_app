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
    <div className="flex items-center gap-4 rounded-xl border border-[#E4E7EC] bg-card p-3 transition-all hover:shadow-sm">
      <div className="h-16 w-20 overflow-hidden rounded-lg bg-muted">
        <img
          src={property.image}
          alt={property.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-navy truncate">{property.name}</h4>
        <p className="text-sm text-muted-foreground">
          {property.price} • <span className="text-navy-light">{property.type}</span>
        </p>
      </div>
      <button
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        onClick={() => onView?.(property.id)}
      >
        View
      </button>
    </div>
  );
};

export default PropertyCard;
