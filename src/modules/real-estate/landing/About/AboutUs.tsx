import LandingPageContainer from "@shared/layouts/LandingLayout/LandingPageContainer";
import { AboutSEO } from "@shared/components/SEO/SEO";
import Stats from "./components/Stats";
import Teams from "./components/Teams";
import ContactForm from "@modules/real-estate/components/ContactForm";
import FAQ from "@modules/real-estate/components/FAQ";
import Hero from "./components/Hero";


export default function AboutUs() {
    return (
        <>
            <AboutSEO />
            <LandingPageContainer hero={Hero}>
                <Stats />
                <Teams />
                <ContactForm />
                <div className="bg-[#ffffff]">
                    <FAQ />
                </div>
            </LandingPageContainer>
        </>
    );
}


