import React, { useMemo } from 'react';
import { Wallet, Calendar, Users } from 'lucide-react';
import PropertyCard, { type Property } from './DashboardHomeComp/PropertyCard';
import SubscriberCard, { type Subscriber } from './DashboardHomeComp/SubscriberCard';
import SectionHeader from './DashboardHomeComp/SectionHeader';
import StatCard from './DashboardHomeComp/StatCard';

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
  },
  {
    title: 'Total Bookings',
    value: '435',
    icon: Calendar,
  },
  {
    title: 'Total Agents/ Realtors',
    value: '015',
    icon: Users,
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
  const fallbackName = 'Charles'
  const firstName = useMemo(() => {
    if(!account) return fallbackName;
     const fName = `${account.firstName ?? ''}`.trim();
     return fName || fallbackName;
  }, [account, fallbackName])
    
  const handleViewProperty = (id: number) => {
    console.log('View property:', id);
  };

  return (
    <div className="px-4 py-6 space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Welcome, {firstName}!</h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your business today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            />
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Properties */}
        <div className="rounded-xl border border-[#E4E7EC] bg-card p-5 shadow-sm">
          <SectionHeader
            title="Recent Properties"
            subtitle="Nibo odio egestas tortor lorem laoreet eu volutpat."
            seeMoreLink="/admin/properties"
          />
          <div className="space-y-3">
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
        <div className="rounded-xl border border-[#E4E7EC] bg-card p-5 shadow-sm">
          <SectionHeader
            title="Recent Subscriber"
            subtitle="Nibo odio egestas tortor lorem laoreet eu volutpat."
            seeMoreLink="/admin/subscription"
          />
          <div className="divide-y divide-[#E4E7EC]">
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
