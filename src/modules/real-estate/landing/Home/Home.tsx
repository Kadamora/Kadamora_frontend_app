import LandingPageContainer from "@shared/layouts/LandingLayout/LandingPageContainer";
import { HomeSEO } from "@shared/components/SEO/SEO";
import Services from "./components/Services";
import Listings from "./components/Listings";
import Features from "./components/Features";
import Why from "./components/Why";
import Testimonials from "./components/Testimonials";
import Hero from "./components/Hero";
import FAQ from "@modules/real-estate/components/FAQ";
import Assistance from "./components/Assistance";

export default function Home() {
    return (
        <>
            <HomeSEO />
            <LandingPageContainer hero={Hero}>
                <Services />
                <Listings />
                <Features />
                <Why />
                <div className="bg-[#f7f8fa]">
                    <FAQ />
                </div>
                <Testimonials />
                <Assistance/>
            </LandingPageContainer>
        </>
    );
}


