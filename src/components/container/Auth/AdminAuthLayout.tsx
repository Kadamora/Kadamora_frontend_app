import { Outlet } from 'react-router';
import Header from '../LandingPage/Header';

export default function AdminAuthLayout() {
    return (
        <div className="min-h-screen bg-white">
            {/* Mobile Header - Only visible on small screens */}
            <div className="lg:hidden">
                <Header isSticky={false} hasHero={false} />
            </div>

            {/* Main Content Grid */}
            <div className="min-h-screen lg:min-h-screen grid grid-cols-1 ">
                <div className="flex items-center justify-center ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
