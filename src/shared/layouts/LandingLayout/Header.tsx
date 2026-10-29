import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { MdClose } from 'react-icons/md';
import { useAppSelector } from '@store/hooks';

export interface HeaderNavLink {
    label: string;
    path: string;
}

interface HeaderProps {
    isSticky: boolean;
    hasHero?: boolean;
    theme?: 'dark' | 'light';
    navLinks?: HeaderNavLink[];
    logoSrc?: string;
}

const DEFAULT_NAV_LINKS: HeaderNavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Timeline', path: '/timeline' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Pricing', path: '/pricing' },
];

export default function Header({
    isSticky,
    hasHero = true,
    theme = 'dark',
    navLinks = DEFAULT_NAV_LINKS,
    logoSrc,
}: HeaderProps) {
    const [mobileOpen, setMobileOpen] = useState(false); // slide state
    const [menuVisible, setMenuVisible] = useState(false); // mount state
    const location = useLocation();
    const isAuthenticated = useAppSelector((s) => !!s.auth.accessToken || s.auth.isAuthenticated);

    const isHospitalityLanding = location.pathname.startsWith('/hospitality-tours');
    const isFacilityLanding =
        location.pathname.startsWith('/facility-management') ||
        location.pathname.startsWith('/services/facility-management');
    const isServiceLanding = isHospitalityLanding || isFacilityLanding;

    const dashboardPath = isHospitalityLanding
        ? '/hospitality-tours/dashboard'
        : isFacilityLanding
          ? '/facility-management/dashboard'
          : '/dashboard';

    const logoTargetPath = isHospitalityLanding
        ? '/hospitality-tours'
        : isFacilityLanding
          ? '/facility-management'
          : '/';

    // Helper function to check if a path is active
    const isActivePath = (path: string) => {
        if (path === '/' || path === '/hospitality-tours' || path === '/facility-management') {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    const getHeaderClasses = () => {
        if (theme === 'light') {
            return isSticky
                ? 'bg-white/60 backdrop-blur-xl backdrop-saturate-180 shadow-[0_4px_30px_rgba(0,0,0,0.06)] border-b border-white/50'
                : 'bg-transparent';
        }
        if (!hasHero) {
            return isSticky
                ? 'bg-white/65 backdrop-blur-xl backdrop-saturate-180 shadow-[0_4px_30px_rgba(0,0,0,0.06)] border-b border-white/50'
                : 'bg-white/85 backdrop-blur-md border-b border-slate-100';
        }
        return isSticky
            ? 'bg-[#001731]/75 backdrop-blur-xl backdrop-saturate-180 shadow-[0_4px_30px_rgba(0,0,0,0.25)] border-b border-white/10'
            : 'bg-transparent';
    };

    const getTextClasses = (isActive = false) => {
        if (theme === 'light') {
            return isActive
                ? 'text-primary font-semibold'
                : 'text-[#091E42] hover:text-primary transition-colors';
        }
        if (!hasHero) {
            return isActive ? 'text-primary' : 'text-gray-700 hover:text-primary';
        }
        return isActive ? 'text-white' : 'text-gray-300 hover:text-primary';
    };

    const getButtonClasses = () => {
        if (theme === 'light') {
            return {
                login: 'text-[#091E42] hover:text-primary px-6 py-1.5 border border-primary rounded-full font-medium text-sm transition-colors',
                getStarted:
                    'bg-primary text-secondary px-6 py-1.5 rounded-full border border-primary hover:bg-primary/90 font-medium text-sm transition-colors',
            };
        }
        if (!hasHero) {
            return {
                login: 'text-gray-700 hover:text-primary px-6 py-1 border border-primary-600 rounded-full font-medium',
                getStarted:
                    'bg-primary text-secondary px-6 py-1 rounded-full border-primary-600 hover:bg-primary/90 font-medium',
            };
        }
        return {
            login: 'text-gray-300 hover:text-primary px-6 py-1 border border-primary-600 rounded-full font-medium',
            getStarted:
                'bg-primary text-secondary px-6 py-1 rounded-full border-primary-600 hover:bg-border font-medium',
        };
    };

    const buttonStyles = getButtonClasses();

    useEffect(() => {
        // Lock body scroll while menu is visible (includes exit animation)
        if (menuVisible) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [menuVisible]);

    const openMenu = () => {
        setMenuVisible(true);
        // allow next frame for transition start
        requestAnimationFrame(() => setMobileOpen(true));
    };

    const closeMenu = () => {
        setMobileOpen(false);
        // unmount after animation ends
        setTimeout(() => setMenuVisible(false), 300);
    };

    return (
        <header
            className={`fixed top-0 w-full z-30 h-[75px] transition-all duration-300 ease-in-out ${getHeaderClasses()}`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    <div className="flex items-center">
                        <Link to={logoTargetPath}>
                            <img
                                src={logoSrc || (hasHero ? '/assets/logo/logo-full.png' : '/assets/logo/logo-small-black.png')}
                                alt="Kadamora Logo"
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>
                    {navLinks.length > 0 && (
                        <div className="hidden lg:flex space-x-8 font-medium">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`nav-anim ${getTextClasses(isActivePath(item.path))} relative`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )}
                    <div className="hidden lg:flex items-center space-x-4">
                        {isAuthenticated || isServiceLanding ? (
                            <>
                                <Link to="/dashboard" className={buttonStyles.login}>
                                    All Services
                                </Link>
                                <Link to={dashboardPath} className={buttonStyles.getStarted}>
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/auth/login" className={buttonStyles.login}>
                                    Login
                                </Link>
                                <Link to="/auth/signup" className={buttonStyles.getStarted}>
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                    {/* Mobile hamburger */}
                    <div
                        aria-label="Open menu"
                        aria-controls="mobile-menu"
                        onClick={openMenu}
                        className={`lg:hidden ${theme === 'light' ? 'text-[#091E42]' : hasHero ? 'text-white' : 'text-gray-700'} cursor-pointer`}
                    >
                        <span className="sr-only">Open main menu</span>
                        <div className="space-y-1.5">
                            <span className="block w-7 h-0.5 bg-current rounded"></span>
                            <span className="block w-7 h-0.5 bg-current rounded"></span>
                            <span className="block w-7 h-0.5 bg-current rounded"></span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile full-screen menu */}
            {menuVisible && (
                <div
                    id="mobile-menu"
                    className={`fixed inset-0 z-50 w-screen h-screen bg-[#001731] text-white px-6 py-6 flex flex-col transform transition-transform duration-300 ease-out ${
                        mobileOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <Link to={logoTargetPath} onClick={closeMenu}>
                            <img src={logoSrc || '/assets/logo/logo-full.png'} alt="Kadamora Logo" className="h-13 w-auto" />
                        </Link>
                        <button
                            aria-label="Close menu"
                            onClick={closeMenu}
                            className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center"
                        >
                            <span className="text-xl leading-none">
                                <MdClose color="#ffffff" size={24} />
                            </span>
                        </button>
                    </div>

                    <nav className="mt-20 space-y-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeMenu}
                                className="block text-4xl font-medium"
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Auth Links */}
                        <div className="pt-8 border-t border-gray-600 space-y-6">
                            {isAuthenticated || isServiceLanding ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        onClick={closeMenu}
                                        className="block text-[30px] font-medium text-gray-300 hover:text-white transition-colors"
                                    >
                                        All Services
                                    </Link>
                                    <Link
                                        to={dashboardPath}
                                        onClick={closeMenu}
                                        className="block text-2xl font-medium bg-primary text-secondary px-6 py-3 rounded-full hover:bg-primary/90 transition-colors w-fit"
                                    >
                                        Dashboard
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/auth/login"
                                        onClick={closeMenu}
                                        className="block text-[35px] font-medium text-gray-300 hover:text-white transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/auth/signup"
                                        onClick={closeMenu}
                                        className="block text-2xl font-medium bg-primary text-secondary px-6 py-3 rounded-full hover:bg-primary/90 transition-colors w-fit"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    <div className="mt-auto text-sm text-gray-300">
                        {new Date().getFullYear()} © Kadamora. All rights reserved.
                    </div>
                </div>
            )}
        </header>
    );
}
