import { Link } from "react-router";

export default function Assistance() {
    return (
        <section className="relative">
            <div className="absolute inset-0">
                <img src="/assets/contact_us_bg.jpg" alt="Contact us" className="h-full w-full object-cover transition-transform duration-2000 ease-in-out" />
                 <div
                                className={`absolute inset-0 bg-black/60 transition-opacity duration-700 opacity-100`}
                            />
            </div>
            <div className="relative z-10 flex min-h-[40vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex w-full items-center justify-between">
                    <div>
                        <h2 className="mb-4 text-4xl font-bold text-white md:text-[50px]">Stay Close, We Are Always Here</h2>
                        <p className="text-white max-w-[600px]">Have more questions or need assistance? Our friendly and knowledgeable team is here to help. Don't hesitate to reach out - we're just a message away!</p>
                    </div>
                    <div>
                        <Link
                            to="/contact"
                            className="rounded-full text-sm font-medium w-fit bg-primary px-6 py-2 text-lg text-secondary transition-colors hover:bg-border"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}