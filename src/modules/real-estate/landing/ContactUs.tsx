
import LandingPageContainer from "@shared/layouts/LandingLayout/LandingPageContainer";
import ContactForm from "@modules/real-estate/components/ContactForm";
import FAQ from "@modules/real-estate/components/FAQ";

import { ContactSEO } from "@shared/components/SEO/SEO";

export default function ContactUs() {
    return (
        <>
            <ContactSEO />
            <LandingPageContainer>
                <ContactForm />
                <div className="bg-[#ffffff]">
                    <FAQ />
                </div>
            </LandingPageContainer>
        </>
    );
}


