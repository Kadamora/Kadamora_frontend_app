import React, { useMemo, useState } from 'react';
import { Wallet, Calendar, Users } from 'lucide-react';
import PropertyCard, { type Property } from './DashboardHomeComp/PropertyCard';
import SubscriberCard, { type Subscriber } from './DashboardHomeComp/SubscriberCard';
import SectionHeader from './DashboardHomeComp/SectionHeader';
import StatCard from './DashboardHomeComp/StatCard';
import PropertyDetailedView from './DashboardHomeComp/PropertyDetailedView';

import property1 from './DashboardHomeComp/assets/property-1.jpg';
import property2 from './DashboardHomeComp/assets/property-2.jpg';
import property3 from './DashboardHomeComp/assets/property-3.jpg';
import logoSunrise from './DashboardHomeComp/assets/logo-sunrise.png';
import logoNova from './DashboardHomeComp/assets/logo-nova.png';
import { useAppSelector } from '@store/hooks';

const stats = [
  {
    title: 'Total Earning',
    value: 'NGN 98,370.80',
    icon: Wallet,
    iconBg: 'bg-[#E5F1FF]'
  },
  {
    title: 'Total Bookings',
    value: '435',
    icon: Calendar,
    iconBg: 'bg-[#E5FFF1]'
  },
  {
    title: 'Total Agents/ Realtors',
    value: '015',
    icon: Users,
    iconBg: 'bg-[#E5F1FF]'
  },
];

const recentProperties: Property[] = [
  {
    id: 1,
    name: 'Bentey Estate',
    price: '₦ 800,000,000.00',
    type: 'Sell',
    image: property1,
  },
  {
    id: 2,
    name: 'Bentey Estate',
    price: '₦ 260,500,000.00',
    type: 'Lease',
    image: property2,
  },
  {
    id: 3,
    name: 'Bentey Estate',
    price: '₦ 5,900,000.00',
    type: 'Rent',
    image: property3,
  },
];

const recentSubscribers: Subscriber[] = [
  {
    id: 1,
    name: 'Sunrise Estates',
    role: 'Estate Manager',
    date: 'BN 2023/45/11/09',
    logo: logoSunrise,
    logoText: 'SUNRISE ESTATE',
  },
  {
    id: 2,
    name: 'Nova Homes',
    role: 'Developer',
    date: 'BN 2023/45/11/09',
    logo: logoNova,
    logoText: 'NOVA HOMES',
  },
];

const AdminDashboard: React.FC = () => {
  const account = useAppSelector((s) => s.auth.user);
  const [selectedPropId, setSelectedPropId] = useState<number | null>(null);

  const fallbackName = 'User'
  const firstName = useMemo(() => {
    if(!account) return fallbackName;
     const fName = `${account.firstName ?? ''}`.trim();
     return fName || fallbackName;
  }, [account, fallbackName])

  const selectedProperty = useMemo(() => {
    return recentProperties.find(p => p.id === selectedPropId) || null;
  }, [selectedPropId]);
    
  const handleViewProperty = (id: number) => {
    setSelectedPropId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedProperty) {
    return (
      <div className="px-4 py-6 animate-fade-in">
        <PropertyDetailedView 
          property={selectedProperty} 
          onBack={() => setSelectedPropId(null)} 
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 space-y-12 animate-fade-in">
      {/* Welcome Header */}
      <div>
        <h1 className="text-[32px] font-bold text-[#091E42] mb-1">Welcome, {firstName}!</h1>
        <p className="text-[17px] font-medium text-[#505F79]">
          Here's what's happening with your business today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={stat.title} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconBgClass={stat.iconBg}
            />
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Recent Properties */}
        <div className="rounded-3xl border border-[#E9EEF2] bg-white p-6 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
          <SectionHeader
            title="Recent Properties"
            subtitle="Nibo odio egestas tortor lorem laoreet eu volutpat."
            seeMoreLink="/admin/properties"
          />
          <div className="space-y-4">
            {recentProperties.map((property, index) => (
              <div 
                key={property.id}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <PropertyCard 
                  property={property} 
                  onView={handleViewProperty}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Subscribers */}
        <div className="rounded-3xl border border-[#E9EEF2] bg-white p-6 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
          <SectionHeader
            title="Recent Subscriber"
            subtitle="Nibo odio egestas tortor lorem laoreet eu volutpat."
            seeMoreLink="/admin/subscription"
          />
          <div className="divide-y divide-[#E9EEF2]">
            {recentSubscribers.map((subscriber, index) => (
              <div 
                key={subscriber.id}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + 6) * 100}ms` }}
              >
                <SubscriberCard subscriber={subscriber} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
