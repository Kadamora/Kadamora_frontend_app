import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

import type { HeaderNavLink } from './Header';

interface LandingPageContainerProps {
    children: ReactNode;
    hero?: () => ReactNode;
    heroClassName?: string;
    headerTheme?: 'dark' | 'light';
    navLinks?: HeaderNavLink[];
    logoSrc?: string;
}

export default function LandingPageContainer({
    children,
    hero,
    heroClassName = 'bg-gray-900',
    headerTheme = 'dark',
    navLinks,
    logoSrc,
}: LandingPageContainerProps) {
    const [isSticky, setIsSticky] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (headerTheme === 'light' || !heroRef.current) {
                setIsSticky(window.scrollY > 20);
            } else {
                const heroBottom = heroRef.current.getBoundingClientRect().bottom;
                setIsSticky(heroBottom <= 0 || window.scrollY > 20);
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [headerTheme]);

    return (
        <div className="min-h-screen">
            {/* Header/Navigation */}
            <Header isSticky={isSticky} hasHero={!!hero} theme={headerTheme} navLinks={navLinks} logoSrc={logoSrc} />
            {hero && (
                <section ref={heroRef} className={`relative ${heroClassName}`}>
                    {hero()}
                </section>
            )}

            <section className={!hero ? 'mt-[100px]' : ''}>{children}</section>
            <Footer />
        </div>
    );
}
