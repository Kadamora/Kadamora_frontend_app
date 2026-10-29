
import { useNavigate } from "react-router";

export default function Assistance() {
    const navigate = useNavigate();

    return (
        <section className="relative">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src="/assets/contact_us_bg.jpg"
                    alt="Contact us"
                    className="h-full w-full object-cover transition-transform duration-2000 ease-in-out"
                />

                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-[40vh] max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex w-full flex-col items-start justify-center gap-6 py-12 md:flex-row md:items-center md:justify-between md:gap-10">
                    {/* Text */}
                    <div className="max-w-[700px]">
                        <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[50px]">
                            Stay Close, We Are Always Here
                        </h2>

                        <p className="max-w-[600px] text-sm leading-relaxed text-white sm:text-base">
                            Have more questions or need assistance? Our friendly
                            and knowledgeable team is here to help. Don't hesitate
                            to reach out - we're just a message away!
                        </p>
                    </div>

                    {/* CTA */}
                    <button
                        type="button"
                        onClick={() => navigate("/contact")}
                        className="shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-secondary transition-colors hover:bg-border sm:text-base"
                    >
                        Get In Touch
                    </button>
                </div>
            </div>
        </section>
    );
}