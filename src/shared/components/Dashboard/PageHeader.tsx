import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import type { BreadcrumbItem } from '@shared/context/BreadcrumbContext';

export interface PageHeaderProps {
    title: string;
    crumbs?: BreadcrumbItem[];
    /** Optional right-aligned content (buttons, filters). */
    action?: React.ReactNode;
    className?: string;
}

/** In-page title with a breadcrumb trail underneath (e.g. "All Tenants / Dashboard > All Tenants"). */
export default function PageHeader({ title, crumbs, action, className = '' }: PageHeaderProps) {
    return (
        <div className={`flex items-end justify-between gap-4 mb-5 ${className}`}>
            <div>
                <h1 className="text-2xl font-semibold text-[#002E62] leading-tight">{title}</h1>
                {crumbs && crumbs.length > 0 && <Breadcrumbs crumbs={crumbs} className="mt-1" />}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}
