import React from 'react';
import { Link } from 'react-router';
import type { BreadcrumbItem } from '@shared/context/BreadcrumbContext';

export interface BreadcrumbsProps {
    crumbs: BreadcrumbItem[];
    className?: string;
}

/** Renders `A > B > C`; the last crumb (or any crumb without a path) is highlighted, not linked. */
export default function Breadcrumbs({ crumbs, className = '' }: BreadcrumbsProps) {
    if (!crumbs || crumbs.length === 0) return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-1.5 text-xs text-[#71717A] font-medium leading-tight ${className}`}
        >
            {crumbs.map((crumb, idx) => {
                const isLast = idx === crumbs.length - 1;
                return (
                    <React.Fragment key={`${crumb.label}-${idx}`}>
                        {idx > 0 && <span className="text-slate-400">&gt;</span>}
                        {crumb.onClick && !isLast ? (
                            <button
                                type="button"
                                onClick={crumb.onClick}
                                className="hover:text-[#002E62] transition-colors cursor-pointer text-xs font-medium"
                            >
                                {crumb.label}
                            </button>
                        ) : crumb.path && !isLast ? (
                            <Link to={crumb.path} className="hover:text-[#002E62] transition-colors">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="text-[#359F6A] font-medium">{crumb.label}</span>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
}
