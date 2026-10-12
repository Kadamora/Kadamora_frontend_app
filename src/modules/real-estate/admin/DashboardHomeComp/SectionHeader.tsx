import React from 'react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  seeMoreLink?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, seeMoreLink }) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-navy">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {seeMoreLink && (
        <Link 
          to={seeMoreLink} 
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          See More
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
