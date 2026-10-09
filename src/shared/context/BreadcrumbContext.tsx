import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbContextType {
    breadcrumbs: BreadcrumbItem[];
    setBreadcrumbs: (crumbs: BreadcrumbItem[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType>({
    breadcrumbs: [],
    setBreadcrumbs: () => {},
});

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};

export const useBreadcrumbContext = () => useContext(BreadcrumbContext);

/**
 * Senior Developer Hook: Easily add dynamic breadcrumbs to any page!
 * 
 * @example
 * useBreadcrumbs([
 *     { label: 'Listings', path: '/hospitality-tours/dashboard/my-listings' },
 *     { label: category.title }
 * ]);
 */
export function useBreadcrumbs(crumbs: BreadcrumbItem[]) {
    const { setBreadcrumbs } = useBreadcrumbContext();
    const serializedCrumbs = JSON.stringify(crumbs);

    useEffect(() => {
        setBreadcrumbs(crumbs);
        return () => {
            setBreadcrumbs([]);
        };
    }, [serializedCrumbs, setBreadcrumbs]);
}
