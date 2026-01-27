const whyKadamora = [
    {
        title: 'Seamless Property Listings:',
        desc: 'Effortlessly create and manage detailed property listings to attract potential tenants and buyers.',
    },
    {
        title: 'Comprehensive Tenant Management:',
        desc: "Streamline communication with tenants, track payments, and manage maintenance requests in one place.",
    },
    {
        title: 'Intuitive Market Analytics:',
        desc: 'Gain insights into market trends and property valuations to make informed investment decisions.',
    },
    {
        title: 'Enhanced Marketing Tools:',
        desc: 'Utilize advanced marketing features to promote properties across multiple channels for maximum exposure.',
    },
    
];

export default function Why() {
    return (
        <section
            className="py-22 bg-secondary text-white relative overflow-hidden"
            style={{
                backgroundImage: 'url(/assets/patternbg.png)',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'top left',
                backgroundSize: 'auto',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-[50px] font-bold mb-8 ">Why Kadamora ?</h2>
                        <div className="space-y-6">
                            {whyKadamora.map((item, index) => (
                                <div key={index} className="flex space-x-3 mb-6.25">
                                    <div className="mt-2 mr-2">
                                        <img
                                            src="/assets/icons/check_mark_big.png"
                                            alt="Check"
                                            className="w-7.5 h-7.5"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-300">
                                            <span className="font-bold">{item.title}</span> {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center items-center relative">
                        {/* Bottom left badge */}
                        <img
                            src="/assets/chart-badge-left.png"
                            alt="Chart Badge Left"
                            className="absolute bottom-0 -left-16.25 z-10"
                        />

                        {/* Top right badge */}
                        <img
                            src="/assets/chart-badge-right.png"
                            alt="Chart Badge Right"
                            className="absolute top-7.5 -right-18.75 z-10"
                        />

                        {/* Main chart image */}
                        <img
                            src="/assets/chart.png"
                            alt="Kadamora Dashboard Chart"
                            className="w-full h-auto rounded-xl object-contain"
                            style={{ maxWidth: '561px', width: '100%', height: 'auto', maxHeight: '461px' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
