import { useState } from 'react';
import { useSearchParams } from 'react-router';
import PageHeader from '@shared/components/Dashboard/PageHeader';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';
import Tabs from '@shared/components/Tabs';
import { AreaTrendChart, DailyUsageBarChart } from '@shared/components/Charts';
import { FiZap, FiArrowUpRight } from 'react-icons/fi';

import EnergyStatCardsRow from '../../components/energy/EnergyStatCardsRow';
import RecentEnergyEntriesCard from '../../components/energy/RecentEnergyEntriesCard';
import EnergyEntryDetailsDrawer from '../../components/energy/EnergyEntryDetailsDrawer';
import EnergyAllEntriesView from '../../components/energy/EnergyAllEntriesView';
import EnergyReportsView from '../../components/energy/EnergyReportsView';
import AddEnergyEntryView from '../../components/energy/AddEnergyEntryView';
import ParkingManagementView from '../../components/energy/ParkingManagementView';

import {
    mockEnergyMetrics,
    mockEnergyOverviewData,
    mockDailyUsageData,
    mockEnergyEntries,
    mockEnergyDataEntries,
} from '../../data/energyParkingMock';
import type { EnergyEntry } from '../../types/energyParking';

type MainSection = 'selection' | 'energy' | 'parking';
type EnergyTab = 'Smart Energy Analytics' | 'Reports' | 'All Entries';

export default function FMEnergyParkingPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sectionParam = searchParams.get('section') as MainSection | null;

    const [currentSection, setCurrentSection] = useState<MainSection>(
        sectionParam || 'selection'
    );
    const [activeEnergyTab, setActiveEnergyTab] = useState<EnergyTab>(
        'Smart Energy Analytics'
    );
    const [isAddingEntry, setIsAddingEntry] = useState(false);
    const [allEntriesList, setAllEntriesList] = useState<EnergyEntry[]>(mockEnergyDataEntries);
    const [selectedEntryForDetails, setSelectedEntryForDetails] =
        useState<EnergyEntry | null>(null);
    const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);

    const handleSelectSection = (section: MainSection) => {
        setCurrentSection(section);
        setIsAddingEntry(false);
        if (section === 'selection') {
            searchParams.delete('section');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ section });
        }
    };

    const handleOpenDetails = (entry: EnergyEntry) => {
        setSelectedEntryForDetails(entry);
        setIsDetailsDrawerOpen(true);
    };

    const handleCloseDetails = () => {
        setIsDetailsDrawerOpen(false);
    };

    const handleAddNewEntry = (newEntry: Partial<EnergyEntry>) => {
        const entryToAdd: EnergyEntry = {
            id: newEntry.id || `ene-${Date.now()}`,
            energyId: newEntry.energyId || `ENE0${allEntriesList.length + 3}`,
            code: newEntry.facilityId || 'FAC133',
            facilityId: newEntry.facilityId || 'FAC133',
            date: newEntry.date || 'Sept 02, 2025',
            timestamp: newEntry.date || 'Sept 02, 2025',
            gridKwhText: newEntry.gridKwhText || '18000.00 KWh (90%)',
            generatorKwhText: newEntry.generatorKwhText || '2000.00 KWh (10%)',
            gridPercentage: newEntry.gridPercentage || 90,
            generatorPercentage: newEntry.generatorPercentage || 10,
            totalKwh: newEntry.totalKwh || 20000,
            generatorHours: newEntry.generatorHours || 12,
            fuelLitres: newEntry.fuelLitres || 80,
            fuelCostPerLitre: newEntry.fuelCostPerLitre || 950,
            totalCost: newEntry.totalCost || 76000,
            totalCostText: newEntry.totalCostText || '76,000.00',
            status: newEntry.status || 'Optimal',
        };

        setAllEntriesList((prev) => [entryToAdd, ...prev]);
        setIsAddingEntry(false);
        setActiveEnergyTab('All Entries');
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Header / Breadcrumbs */}
            {currentSection === 'selection' ? (
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#002E62]">
                        Energy & Parking Management
                    </h1>
                </div>
            ) : currentSection === 'energy' ? (
                <div className="space-y-1">
                    <PageHeader
                        title="Energy & Parking Management"
                        crumbs={
                            isAddingEntry
                                ? [
                                      {
                                          label: 'Energy & Parking Mgt',
                                          onClick: () => handleSelectSection('selection'),
                                      },
                                      {
                                          label: 'Energy Management',
                                          onClick: () => setIsAddingEntry(false),
                                      },
                                      { label: 'Add Entry' },
                                  ]
                                : [
                                      {
                                          label: 'Energy & Parking Mgt',
                                          onClick: () => handleSelectSection('selection'),
                                      },
                                      { label: 'Energy Management' },
                                  ]
                        }
                    />
                </div>
            ) : (
                <div className="space-y-1">
                    <PageHeader
                        title="Parking Management"
                        crumbs={[
                            {
                                label: 'Home',
                                onClick: () => handleSelectSection('selection'),
                            },
                            { label: 'Energy & Parking Management' },
                        ]}
                    />
                </div>
            )}

            {/* VIEW 1: Selection Cards (Image 3) */}
            {currentSection === 'selection' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* 1. Energy Management Card */}
                    <div
                        onClick={() => handleSelectSection('energy')}
                        className="group relative bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-8 hover:shadow-md hover:border-[#96BEEB] transition-all cursor-pointer space-y-4"
                    >
                        <div className="flex items-start justify-between">
                            <div className="h-12 w-12 rounded-full bg-[#E0F7FA] text-[#00BCD4] flex items-center justify-center shrink-0">
                                <FiZap className="h-6 w-6 text-[#00BCD4]" />
                            </div>
                            <FiArrowUpRight className="h-5 w-5 text-[#71717A] group-hover:text-[#002E62] transition-colors" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">
                                Energy Management
                            </h3>
                            <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Nibh odio egestas
                                tortor lorem laoreet eu volutpat. Adipiscing odio erat ac
                                ridiculus imperdiet.
                            </p>
                        </div>
                    </div>

                    {/* 2. Parking Management Card */}
                    <div
                        onClick={() => handleSelectSection('parking')}
                        className="group relative bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-8 hover:shadow-md hover:border-[#96BEEB] transition-all cursor-pointer space-y-4"
                    >
                        <div className="flex items-start justify-between">
                            <div className="h-12 w-12 rounded-full bg-[#EDFCF4] text-[#12B76A] flex items-center justify-center shrink-0 font-bold">
                                <span className="h-6 w-6 rounded-full border-2 border-[#12B76A] flex items-center justify-center text-xs font-bold text-[#12B76A]">
                                    P
                                </span>
                            </div>
                            <FiArrowUpRight className="h-5 w-5 text-[#71717A] group-hover:text-[#002E62] transition-colors" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">
                                Parking Management
                            </h3>
                            <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                                Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor
                                non fringilla nec urna. Purus eu erat nunc nisl. Massa
                                commodo in sed mattis.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW 2: Energy Management Views */}
            {currentSection === 'energy' && (
                <>
                    {isAddingEntry ? (
                        /* Add Energy Data Entry Form (Image 3) */
                        <AddEnergyEntryView
                            onSubmit={handleAddNewEntry}
                            onCancel={() => setIsAddingEntry(false)}
                        />
                    ) : (
                        <div className="space-y-6">
                            {/* Tabs Row with + Add Entry action (Images 1 & 2) */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <Tabs
                                    tabs={
                                        [
                                            'Smart Energy Analytics',
                                            'Reports',
                                            'All Entries',
                                        ] as const
                                    }
                                    activeTab={activeEnergyTab}
                                    onChange={(tab) =>
                                        setActiveEnergyTab(tab as EnergyTab)
                                    }
                                />

                                {activeEnergyTab === 'All Entries' && (
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingEntry(true)}
                                        className="bg-[#002E62] hover:bg-[#002047] text-white rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer transition-colors shadow-xs self-start sm:self-auto shrink-0"
                                    >
                                        + Add Entry
                                    </button>
                                )}
                            </div>

                            {/* TAB 1: Smart Energy Analytics (Image 4 from previous message) */}
                            {activeEnergyTab === 'Smart Energy Analytics' && (
                                <div className="space-y-6">
                                    {/* 4 Stat Metric Cards */}
                                    <EnergyStatCardsRow metrics={mockEnergyMetrics} />

                                    {/* Main Area Chart Card */}
                                    <AreaTrendChart
                                        title="Energy Consumption Overview"
                                        subtitle="Estate energy consumption breakdown"
                                        data={mockEnergyOverviewData}
                                        trendText="Trending up by 5.2% this month"
                                        dateRangeText="January - October"
                                        generatorLabel="Generator Energy (Kwh)"
                                        gridLabel="Grid Energy (Kwh)"
                                        className="rounded-2xl border-[#BED3EB] shadow-xs"
                                    />

                                    {/* Bottom 2 Columns: Daily Usage Pattern & Recent Entries */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                                        {/* Left: Daily Usage Pattern (Bar Chart) */}
                                        <div className="lg:col-span-6 flex">
                                            <DailyUsageBarChart
                                                title="Daily Usage Pattern"
                                                subtitle="Today's energy consumption weekly"
                                                data={mockDailyUsageData}
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Right: Recent Entries */}
                                        <div className="lg:col-span-6 flex">
                                            <RecentEnergyEntriesCard
                                                entries={mockEnergyEntries}
                                                onViewDetails={handleOpenDetails}
                                                onSeeAll={() =>
                                                    setActiveEnergyTab('All Entries')
                                                }
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: Reports View (Image 1) */}
                            {activeEnergyTab === 'Reports' && <EnergyReportsView />}

                            {/* TAB 3: All Entries View (Image 2) */}
                            {activeEnergyTab === 'All Entries' && (
                                <EnergyAllEntriesView
                                    entries={allEntriesList}
                                    onViewDetails={handleOpenDetails}
                                    onAddEntry={() => setIsAddingEntry(true)}
                                    onEditEntry={(entry) => handleOpenDetails(entry)}
                                />
                            )}
                        </div>
                    )}
                </>
            )}

            {/* VIEW 3: Parking Management View (Image 4) */}
            {currentSection === 'parking' && <ParkingManagementView />}

            {/* View Details Drawer */}
            <EnergyEntryDetailsDrawer
                isOpen={isDetailsDrawerOpen}
                onClose={handleCloseDetails}
                entry={selectedEntryForDetails}
            />

            {/* Floating Support Chat FAB */}
            <FloatingChatButton />
        </div>
    );
}
