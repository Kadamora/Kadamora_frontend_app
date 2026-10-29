import LandingPageContainer from '@shared/layouts/LandingLayout/LandingPageContainer';
import SEO from '@shared/components/SEO/SEO';
import FMHero from './components/FMHero';
import FMMetrics from './components/FMMetrics';
import FMComprehensiveServices from './components/FMComprehensiveServices';
import FMHomeServices from './components/FMHomeServices';
import Assistance from '@modules/real-estate/landing/Home/components/Assistance';

export default function FMLandingPage() {
    return (
        <>
            <SEO
                title="Facility Management - Seamless Control For Your Estate Facility"
                description="Transform your property management experience with Kadamora's comprehensive platform. From residential to commercial spaces, we have everything covered."
            />
            <LandingPageContainer
                hero={FMHero}
                heroClassName="bg-white"
                headerTheme="light"
                logoSrc="/assets/logo/FMLogo.svg"
                navLinks={[]}
            >
                <FMMetrics />
                <FMComprehensiveServices />
                <FMHomeServices />
                <Assistance />
            </LandingPageContainer>
        </>
    );
}
