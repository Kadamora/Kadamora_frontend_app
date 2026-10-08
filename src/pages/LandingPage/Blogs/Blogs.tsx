import LandingPageContainer from '@components/container/LandingPage/LandingPageContainer';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';

// Simulated blog data matching the provided design
const allNews = [
    {
        id: 1,
        title: "How to Manage Your Construction Project Like a Pro",
        excerpt: "From planning to delivery, explore best practices for timely, cost-effective, and quality construction.",
        date: "June 18, 2025 04:33 AM",
        image: "https://images.unsplash.com/photo-1541888081643-eb04e28ab96d?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "What Every Resident Should Know About Facility Services",
        excerpt: "Empower residents with insights on their roles, rights, and how to maximize facility services in their community.",
        date: "July 25, 2025 11:00 AM",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "5 Smart Ways to Simplify Estate Facility Management",
        excerpt: "Discover practical tips to streamline operations, improve resident satisfaction, and reduce overhead costs.",
        date: "August 12, 2025 09:15 AM",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Property Listing Tips to Attract the Right Buyers or Tenants",
        excerpt: "Improve your listings with strategic visuals, descriptions, and pricing to drive faster results.",
        date: "July 10, 2025 03:00 PM",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Why Reliable Logistics Are Key to Business Growth",
        excerpt: "Delays cost money—find out how efficient logistics can boost your business's reputation and revenue.",
        date: "August 22, 2025 04:15 AM",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "Do Delivery Services Need Insurance? Here's Why It Matters",
        excerpt: "Protect your logistics business from risks and understand the benefits of coverage for every delivery.",
        date: "September 5, 2025 11:45 AM",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop"
    }
];

export default function Blogs() {
    return (
        <LandingPageContainer>
            {/* Top Pattern Background Section */}
            <div className="relative border-b border-[#E9E9E9] bg-[#F8FDFC] pt-12 pb-32 overflow-hidden">
                {/* Thin vertical grid lines mimicking the image */}
                <div className="absolute inset-0 z-0 flex justify-between px-10 opacity-30 pointer-events-none">
                    <div className="w-px h-full bg-[#D1EBD9]"></div>
                    <div className="w-px h-full bg-[#D1EBD9]"></div>
                    <div className="w-px h-full bg-[#D1EBD9]"></div>
                    <div className="w-px h-full bg-[#D1EBD9]"></div>
                    <div className="w-px h-full bg-[#D1EBD9]"></div>
                    <div className="w-px h-full bg-[#D1EBD9]"></div>
                </div>

                {/* Header Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-8 items-center pb-8">
                    <div>
                        <h1 className="text-[54px] font-bold text-[#002E62] leading-tight">Kadamora Blog</h1>
                    </div>
                    <div>
                        <p className="text-[#475467] text-[15px] leading-relaxed max-w-md ml-auto pt-4">
                            Discover the inner workings of our process, stay updated with key milestones, and get to know the people driving success for millions of businesses.
                        </p>
                    </div>
                </div>
            </div>

            {/* Featured Top Story Overlaying the grid background */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 mb-16">
                <div className="flex flex-col md:flex-row bg-[#2A344A] rounded-xl overflow-hidden shadow-lg h-[400px]">
                    {/* Dark section */}
                    <div className="w-full md:w-1/2 p-10 flex flex-col justify-between text-white relative">
                        <div>
                            <div className="inline-flex items-center gap-1.5 bg-white text-[#16C784] px-3 py-1 rounded-full text-xs font-semibold mb-6">
                                <CheckCircle2 size={14} className="fill-[#16C784] text-white" />
                                <span className="text-[#002E62]">Top Stories</span>
                            </div>
                            
                            <h2 className="text-[32px] font-bold leading-tight mb-4">
                                The Future of PropTech: Where Property Meets Technology
                            </h2>
                            <p className="text-gray-300 text-sm leading-relaxed max-w-sm mb-6">
                                When I first considered transitioning into aesthetic medicine, I realized that becoming an Aesthetic Nurse Practitioner
                            </p>
                            <div className="text-xs text-gray-400">June 04, 2021</div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-white rounded-full"></span>
                                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="w-8 h-8 rounded-full bg-white text-[#002E62] flex items-center justify-center hover:bg-gray-100 transition-colors">
                                    <ChevronLeft size={18} />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-white text-[#002E62] flex items-center justify-center hover:bg-gray-100 transition-colors">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Image section */}
                    <div className="w-full md:w-1/2 h-full">
                        <img 
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" 
                            alt="Modern apartment" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* All News Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-[36px] font-bold text-[#002E62] mb-3">All News</h2>
                        <p className="text-[#71717A] text-[14px] leading-relaxed">
                            your inside look at the thoughts, trends, and stories shaping our journey. Here, we share everything from behind-the-scenes insights and expert tips to industry updates and the people driving innovation within our team.
                        </p>
                    </div>
                    <div className="w-full md:w-[350px]">
                        <div className="flex items-center bg-[#F4F4F5] rounded-full p-1 border border-transparent focus-within:border-gray-300 transition-colors overflow-hidden h-12">
                            <input 
                                type="text" 
                                placeholder="Search for news..." 
                                className="bg-transparent border-none outline-none flex-1 px-5 text-[14px] text-gray-700 placeholder-gray-400"
                            />
                            <button className="bg-[#2A344A] text-white px-6 h-full rounded-full text-[14px] font-medium hover:bg-[#2A344A]/90 transition-colors">
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allNews.map((news) => (
                        <Link 
                            to={`/blogs/${news.id}`} 
                            key={news.id} 
                            className="flex flex-col bg-white rounded-xl overflow-hidden border border-[#E4E4E7] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow group"
                        >
                            <div className="h-52 overflow-hidden bg-gray-100">
                                <img 
                                    src={news.image} 
                                    alt={news.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-[17px] font-bold text-[#001731] leading-snug mb-3">
                                    {news.title}
                                </h3>
                                <p className="text-[13.5px] text-[#71717A] leading-relaxed mb-6 flex-1">
                                    {news.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-[12px] text-[#A1A1AA] mt-auto">
                                    <Calendar size={14} className="stroke-[#A1A1AA]" />
                                    <span>{news.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </LandingPageContainer>
    );
}
