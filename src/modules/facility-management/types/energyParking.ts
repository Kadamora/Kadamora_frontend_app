export interface EnergyEntry {
    id: string;
    energyId?: string; // e.g. "ENE003"
    code: string; // e.g. "FAC133" or "FAC143"
    facilityId?: string; // e.g. "FAC133"
    totalKwh: number;
    gridPercentage: number;
    generatorPercentage: number;
    timestamp: string; // e.g. "Sept 02, 2025" or "30 SEPT, 2025 - 02:30AM"
    date?: string;
    gridKwhText?: string; // e.g. "19200.40 KWh (94%)"
    generatorKwhText?: string; // e.g. "22000.40 KWh (6%)"
    fuelLitres?: number;
    fuelCost?: number;
    fuelCostPerLitre?: number;
    generatorHours?: number;
    totalCost?: number;
    totalCostText?: string;
    meterStart?: number;
    meterEnd?: number;
    loggedBy?: string;
    facility?: string;
    status?: 'Optimal' | 'High Usage' | 'Generator Heavy' | 'Normal';
    remarks?: string;
    gridCostPerUnit?: number;
    totalGridCost?: number;
}

export interface GeneratedReportItem {
    id: string;
    title: string;
    generatedDate: string;
    type: 'Monthly' | 'Quarterly' | 'Biannually' | 'Annually';
    period: string;
    fileSize?: string;
}

export interface DailyUsagePoint {
    day: string; // "MON", "TUE", etc.
    kwh: number; // e.g. 230
    date?: string;
}

export interface EnergyMetric {
    title: string;
    value: string;
    changeText: string;
    isPositive?: boolean;
    icon: 'lightning' | 'generator' | 'fuel' | 'cost';
}

export interface EnergyReportSummary {
    period: string;
    totalConsumptionKwh: number;
    gridSharePercentage: number;
    generatorSharePercentage: number;
    totalFuelLitres: number;
    totalFuelCostNgn: number;
    averageDailyKwh: number;
    efficiencyRating: string;
}

export interface ParkingSlotItem {
    id: string;
    slotNumber: string; // e.g. "A01", "A02"
    description: string;
    status: 'Available' | 'Occupied' | 'Assigned';
    assignedTo?: string;
    vehiclePlate?: string;
}

export interface ParkingStatMetric {
    title: string;
    value: string;
    icon: 'lightning' | 'dollar' | 'warning' | 'chart';
}
