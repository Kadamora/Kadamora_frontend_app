import { Outlet } from 'react-router';
import bg from './images/bg.png';
import logo from './images/logo.png';
import Header from '../LandingLayout/Header';

interface AuthLayoutProps {
    /** Optional override for the left-panel background image.
     *  Defaults to the Real Estate building image.
     *  Each module (e.g. hospitality-tours) can pass its own image. */
    leftImage?: string;
    /** Optional override for the brand logo image/SVG.
     *  Defaults to standard Kadamora logo. */
    logoImage?: string;
}

export default function AuthLayout({ leftImage, logoImage }: AuthLayoutProps) {
    const panelImage = leftImage ?? bg;
    const brandLogo = logoImage ?? logo;

    return (
        <div className="min-h-screen bg-white">
            {/* Mobile Header - Only visible on small screens */}
            <div className="lg:hidden">
                <Header isSticky={false} hasHero={false} />
            </div>

            {/* Main Content Grid */}
            <div className="min-h-screen lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-[100px] lg:pt-0">
                {/* Left visual panel - Hidden on mobile */}
                <div className="hidden lg:block relative bg-secondary overflow-hidden" aria-hidden>
                    {/* Brand */}
                    <a href="/">
                        <img
                            src={brandLogo}
                            alt="Kadamora logo"
                            className="absolute top-[24px] left-[24px] w-[200px] h-auto z-20"
                        />
                    </a>

                    {/* Building visual — swappable per module */}
                    <img
                        src={panelImage}
                        alt="Kadamora visual"
                        className="absolute bottom-0 left-0 w-full h-auto object-contain pointer-events-none select-none z-0"
                    />
                </div>

                {/* Right content panel */}
                <div className="flex items-center justify-center px-4 sm:px-8 py-8 lg:py-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
