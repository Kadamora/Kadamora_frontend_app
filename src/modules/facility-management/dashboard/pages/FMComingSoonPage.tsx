import { Link, useLocation } from 'react-router';
import PageHeader from '@shared/components/Dashboard/PageHeader';
import { FiClock, FiArrowLeft } from 'react-icons/fi';

export default function FMComingSoonPage() {
    const location = useLocation();
    const segment = location.pathname.split('/').filter(Boolean).pop() || 'page';
    const title = segment
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

    return (
        <div className="space-y-6 pb-12">
            <PageHeader
                title={title}
                crumbs={[
                    { label: 'Dashboard', path: '/facility-management/dashboard' },
                    { label: title },
                ]}
            />

            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-xs min-h-[400px]">
                <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <FiClock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#093154] mb-2">{title} is Coming Soon</h3>
                <p className="text-sm text-gray-500 max-w-md mb-6">
                    We are actively building this feature to make your facility management experience even better. Stay tuned!
                </p>
                <Link
                    to="/facility-management/dashboard"
                    className="inline-flex items-center gap-2 bg-[#093154] hover:bg-[#072440] text-white text-sm font-semibold rounded-xl px-6 py-2.5 transition shadow-xs"
                >
                    <FiArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                </Link>
            </div>
        </div>
    );
}
