import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    MapPin,
    Users,
    Briefcase,
    Star,
    ExternalLink,
    Sparkles,
    Building2,
    X,
} from "lucide-react";

const companiesData = [
    {
        id: 1,
        name: "Google",
        industry: "Product Based",
        location: "Bangalore",
        employees: "1.5L+",
        jobs: 24,
        rating: 4.9,
        tech: ["React", "Node.js", "Cloud"],
    },
    {
        id: 2,
        name: "Amazon",
        industry: "E-Commerce",
        location: "Hyderabad",
        employees: "2L+",
        jobs: 18,
        rating: 4.7,
        tech: ["Java", "AWS", "Backend"],
    },
    {
        id: 3,
        name: "Microsoft",
        industry: "Software",
        location: "Bangalore",
        employees: "1L+",
        jobs: 15,
        rating: 4.8,
        tech: ["Azure", "React", "AI"],
    },
    {
        id: 4,
        name: "Netflix",
        industry: "Streaming",
        location: "Remote",
        employees: "15K+",
        jobs: 8,
        rating: 4.6,
        tech: ["Backend", "Cloud", "DevOps"],
    },
    {
        id: 5,
        name: "Adobe",
        industry: "Creative Software",
        location: "Noida",
        employees: "30K+",
        jobs: 12,
        rating: 4.5,
        tech: ["UI/UX", "Frontend", "AI"],
    },
    {
        id: 6,
        name: "TCS",
        industry: "IT Services",
        location: "Hyderabad",
        employees: "6L+",
        jobs: 40,
        rating: 4.2,
        tech: ["Java", "Testing", "Cloud"],
    },
];

// Dynamic color hash mapping for premium corporate brand representations
const BRAND_GRADIENTS = [
    "from-blue-600 to-indigo-700 shadow-blue-500/10",
    "from-amber-500 to-orange-600 shadow-orange-500/10",
    "from-violet-600 to-fuchsia-700 shadow-violet-500/10",
    "from-rose-600 to-red-700 shadow-rose-500/10",
    "from-emerald-500 to-teal-600 shadow-emerald-500/10",
    "from-cyan-500 to-blue-600 shadow-cyan-500/10",
];

function getBrandStyle(name = "") {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return BRAND_GRADIENTS[Math.abs(hash) % BRAND_GRADIENTS.length];
}

export default function Companies() {
    const [search, setSearch] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("All");

    // Dynamically extract unique industries from raw payload files
    const industryList = useMemo(() => {
        const industries = new Set(companiesData.map((c) => c.industry));
        return ["All", ...Array.from(industries)];
    }, []);

    // Multi-tier combination filtration processing pipeline
    const filteredCompanies = useMemo(() => {
        return companiesData.filter((company) => {
            const matchesSearch =
                company.name.toLowerCase().includes(search.toLowerCase()) ||
                company.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
            const matchesIndustry =
                selectedIndustry === "All" || company.industry === selectedIndustry;
            return matchesSearch && matchesIndustry;
        });
    }, [search, selectedIndustry]);

    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans antialiased">
            <div className="max-w-7xl mx-auto px-4 py-14">

                {/* ── Heading / Hero Hub Header Segment ────────────────── */}
                <div className="text-center space-y-4">
                    <span className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold px-4 py-1.5 rounded-full shadow-inner animate-pulse">
                        <Sparkles size={12} /> Premier Corporate Ecosystems
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500 max-w-3xl mx-auto leading-tight">
                        Discover Amazing Places to Work
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        Inspect workspaces, technical operations, and infrastructure frameworks hiring local development units.
                    </p>
                </div>

                {/* ── Combined Custom Search and Category Controls ──────── */}
                <div className="mt-12 max-w-3xl mx-auto space-y-5">
                    <div className="flex items-center gap-3 bg-gray-900 border border-white/10 rounded-2xl px-5 py-3.5 shadow-2xl focus-within:border-violet-500/40 focus-within:ring-2 focus-within:ring-violet-500/5 transition-all">
                        <Search size={20} className="text-gray-500 shrink-0" />
                        <input
                            type="text"
                            placeholder="Filter by explicit company name or key technology stack tags..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent outline-none flex-1 text-sm sm:text-base text-white placeholder:text-gray-600"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="p-1 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Quick Filter Horizontal Scroll Pill Container */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                        {industryList.map((industry) => (
                            <button
                                key={industry}
                                onClick={() => setSelectedIndustry(industry)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-medium border transition-all ${selectedIndustry === industry
                                        ? "bg-violet-500 border-violet-500/40 text-white shadow-lg shadow-violet-950/50"
                                        : "bg-gray-900 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                                    }`}
                            >
                                {industry}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Main Dashboard Corporate Directory Grid ──────────── */}
                {filteredCompanies.length === 0 ? (
                    <div className="bg-gray-900/30 border border-white/5 rounded-3xl p-16 text-center max-w-md mx-auto mt-16 flex flex-col items-center">
                        <Building2 size={32} className="text-gray-600 mb-4" />
                        <h3 className="text-base font-bold text-gray-300">No organizational profiles resolve</h3>
                        <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                            We couldn't track down vectors matching your keyword constraints. Re-evaluate structural parameter boundaries.
                        </p>
                        <button
                            onClick={() => { setSearch(""); setSelectedIndustry("All"); }}
                            className="mt-5 text-xs text-violet-400 font-semibold px-4 py-2 border border-violet-500/20 rounded-xl bg-violet-500/5 hover:bg-violet-500/10 transition-colors"
                        >
                            Reset Target Rules
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 animate-fadeIn">
                        {filteredCompanies.map((company) => {
                            const brandStyle = getBrandStyle(company.name);
                            return (
                                <div
                                    key={company.id}
                                    className="group bg-gray-900/40 border border-white/5 hover:border-violet-500/30 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_12px_40px_rgba(139,92,246,0.08)] flex flex-col backdrop-blur-sm"
                                >
                                    {/* Top Panel: Logo Context Frame & Rating Stack */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${brandStyle} flex items-center justify-center text-xl font-bold tracking-wide text-white shadow-lg`}>
                                            {company.name[0]}
                                        </div>
                                        <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-xl">
                                            <Star size={12} fill="currentColor" className="pb-0.5" />
                                            <span>{company.rating}</span>
                                        </div>
                                    </div>

                                    {/* Identification and Taxonomy Fields */}
                                    <div className="mt-5">
                                        <h2 className="text-xl font-bold tracking-tight text-white group-hover:text-violet-300 transition-colors">
                                            {company.name}
                                        </h2>
                                        <p className="text-gray-500 text-xs font-medium mt-0.5 tracking-wide">
                                            {company.industry}
                                        </p>
                                    </div>

                                    {/* Core Metrics Visual Row Blocks */}
                                    <div className="mt-6 bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-3 shadow-inner">
                                        <div className="flex items-center justify-between text-xs font-medium">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <MapPin size={14} className="text-violet-400 shrink-0" />
                                                <span>Corporate Base</span>
                                            </div>
                                            <span className="text-gray-200">{company.location}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs font-medium">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Users size={14} className="text-violet-400 shrink-0" />
                                                <span>Headcount Pool</span>
                                            </div>
                                            <span className="text-gray-200">{company.employees} staff</span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs font-medium">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Briefcase size={14} className="text-violet-400 shrink-0" />
                                                <span>Available Openings</span>
                                            </div>
                                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/10">
                                                {company.jobs} Jobs
                                            </span>
                                        </div>
                                    </div>

                                    {/* Tech Stack Horizontal Chip Bar Container */}
                                    <div className="flex flex-wrap gap-1.5 mt-6">
                                        {company.tech.map((item) => (
                                            <span
                                                key={item}
                                                className="bg-white/5 border border-white/5 text-gray-300 text-[11px] font-medium px-2.5 py-1 rounded-lg tracking-wide"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Navigational Active Trigger Buttons */}
                                    <div className="mt-auto pt-6">
                                        <Link
                                            to={`/companies/${company.id}`}
                                            className="w-full bg-violet-500 hover:bg-violet-600 active:scale-98 text-white text-xs font-bold tracking-wide rounded-xl py-3 flex items-center justify-center gap-1.5 shadow-lg shadow-violet-950/30 transition-all"
                                        >
                                            <span>Inspect Enterprise Profile</span>

                                            <ExternalLink
                                                size={13}
                                                className="mb-0.5"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}