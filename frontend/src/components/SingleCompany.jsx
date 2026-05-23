import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Users,
  Briefcase,
  Star,
  ArrowLeft,
  Globe,
  MessageSquare,
  ShieldCheck,
  Building2,
  ExternalLink
} from "lucide-react";

// ── Mock Database (Matches your Companies page payload) ──────
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
    about: "Google's mission is to organize the world's information and make it universally accessible and useful. Our engineering teams build highly scalable systems that handle billions of requests per day.",
    website: "https://google.com"
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
    about: "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.",
    website: "https://amazon.com"
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
    about: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Its mission is to empower every person and every organization on the planet to achieve more.",
    website: "https://microsoft.com"
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
    about: "Netflix is the world's leading streaming entertainment service. We have a unique culture of freedom and responsibility that empowers our talent to build incredible entertainment experiences.",
    website: "https://netflix.com"
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
    about: "Adobe is the global leader in digital media and digital marketing solutions. Our creative, marketing and document solutions empower everyone — from individual artists to global brands.",
    website: "https://adobe.com"
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
    about: "Tata Consultancy Services is an IT services, consulting and business solutions organization that has been partnering with many of the world's largest businesses in their transformation journeys.",
    website: "https://tcs.com"
  },
];

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

export default function SingleCompany() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the exact company from database matching the URL route id string
  const company = companiesData.find((c) => c.id === parseInt(id, 10));

  // If page is accessed directly with an invalid ID parameter
  if (!company) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-4">
        <Building2 size={40} className="text-gray-600" />
        <h2 className="text-xl font-bold">Profile Not Found</h2>
        <button 
          onClick={() => navigate("/companies")}
          className="flex items-center gap-2 text-sm text-violet-400 font-semibold"
        >
          <ArrowLeft size={16} /> Back to Companies
        </button>
      </div>
    );
  }

  const brandStyle = getBrandStyle(company.name);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans antialiased">
      
      {/* Dynamic Header Hero Banner Cover */}
      <div className="h-44 bg-gradient-to-r from-gray-900 via-violet-950/20 to-gray-900 border-b border-white/5 relative" />

      <div className="max-w-5xl mx-auto px-4 pb-16">
        
        {/* ── Floating Action Navigation Header Bar ──────────────── */}
        <div className="flex items-center justify-between -mt-28 relative z-10 mb-8">
          <button
            onClick={() => navigate("/companies")}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-400 hover:text-white bg-gray-900/80 backdrop-blur border border-white/10 px-4 py-2.5 rounded-xl transition-all"
          >
            <ArrowLeft size={16} />
            <span>Back to Directory</span>
          </button>
          
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-violet-300 hover:text-white bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 px-4 py-2.5 rounded-xl transition-all"
          >
            <span>Visit Website</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* ── Main Layout Frame Header ───────────────────────────── */}
        <div className="bg-gray-900/40 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
          
          {/* Executive Company Profile Heading Grid */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/5">
            <div className="flex items-center gap-5">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${brandStyle} flex items-center justify-center text-2xl sm:text-3xl font-extrabold tracking-wide text-white shadow-xl shrink-0`}>
                {company.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                    {company.name}
                  </h1>
                  <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md h-fit mt-1 hidden sm:inline-block">
                    Verified Verified
                  </span>
                </div>
                <p className="text-gray-400 text-sm sm:text-base font-medium mt-0.5">
                  {company.industry}
                </p>
              </div>
            </div>

            {/* Corporate Star Rating Badge */}
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-2 rounded-2xl w-fit sm:self-center">
              <Star size={16} fill="currentColor" />
              <div className="flex flex-col">
                <span className="text-base font-bold leading-none">{company.rating}</span>
                <span className="text-[10px] text-gray-500 font-medium mt-0.5">Rating</span>
              </div>
            </div>
          </div>

          {/* Core Analytics Metric Dashboard Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-950/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Headquarters</p>
                <p className="text-sm font-semibold text-gray-200 mt-0.5">{company.location}</p>
              </div>
            </div>

            <div className="bg-gray-950/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
                <Users size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Global Employees</p>
                <p className="text-sm font-semibold text-gray-200 mt-0.5">{company.employees}</p>
              </div>
            </div>

            <div className="bg-gray-950/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <Briefcase size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Active Opportunities</p>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">{company.jobs} Open Openings</p>
              </div>
            </div>
          </div>

          {/* Primary Split Information Modules */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
            
            {/* Left Column: Detailed Overviews */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={14} className="text-violet-400" /> About the Organization
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {company.about}
                </p>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={14} className="text-violet-400" /> Organizational Culture
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Joining {company.name} means working alongside an international collection of innovative designers, systems architects, and field researchers focused on deploying high-quality digital products.
                </p>
              </div>
            </div>

            {/* Right Column: Technology Profile Stack */}
            <div className="bg-gray-950/50 border border-white/5 rounded-2xl p-5 space-y-4 h-fit">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                <Globe size={14} className="text-violet-400" />
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Primary Stack</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {company.tech.map((item) => (
                  <span
                    key={item}
                    className="bg-white/5 border border-white/5 text-gray-300 text-xs font-medium px-3 py-1 rounded-xl"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed pt-2">
                Engineering units here heavily deploy these tools within microservices frameworks and production pipelines.
              </p>
            </div>

          </div>

          {/* Action Footer Drawer Link Tray */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 font-medium text-center sm:text-left">
              Interested in launching a career here? Check out their active job vacancies.
            </p>
            <button
              onClick={() => navigate(`/jobs?q=${company.name}`)}
              className="w-full sm:w-auto bg-violet-500 hover:bg-violet-600 active:scale-98 text-white text-xs font-bold tracking-wide rounded-xl px-6 py-3.5 flex items-center justify-center gap-1.5 shadow-lg shadow-violet-950/30 transition-all cursor-pointer"
            >
              <span>Explore {company.jobs} Open Positions</span>
              <ArrowLeft size={14} className="rotate-180" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}