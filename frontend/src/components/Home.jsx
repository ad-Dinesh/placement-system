import { useState, useEffect } from "react";
import { Search, MapPin, Briefcase, TrendingUp, Building2, Users, ArrowRight, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { icon: "💻", label: "Engineering",  count: "2.4k jobs", color: "from-blue-500/10 to-blue-500/5" },
  { icon: "🎨", label: "Design",       count: "890 jobs",  color: "from-pink-500/10 to-pink-500/5" },
  { icon: "📊", label: "Marketing",    count: "1.2k jobs", color: "from-orange-500/10 to-orange-500/5" },
  { icon: "💼", label: "Finance",      count: "760 jobs",  color: "from-emerald-500/10 to-emerald-500/5" },
  { icon: "🩺", label: "Healthcare",   count: "1.8k jobs", color: "from-red-500/10 to-red-500/5" },
  { icon: "📱", label: "Product",      count: "540 jobs",  color: "from-violet-500/10 to-violet-500/5" },
];

const FEATURED_JOBS = [
  {
    title: "Senior React Developer",
    company: "Stripe",
    location: "Remote",
    salary: "$120k – $160k",
    type: "Full-time",
    tags: ["React", "TypeScript", "GraphQL"],
    logo: "S",
    logoColor: "bg-violet-600",
    posted: "2h ago",
    featured: true,
  },
  {
    title: "Product Designer",
    company: "Notion",
    location: "San Francisco, CA",
    salary: "$100k – $140k",
    type: "Full-time",
    tags: ["Figma", "Design Systems", "Prototyping"],
    logo: "N",
    logoColor: "bg-gray-800",
    posted: "5h ago",
    featured: false,
  },
  {
    title: "Backend Engineer",
    company: "Linear",
    location: "Remote",
    salary: "$130k – $170k",
    type: "Full-time",
    tags: ["Node.js", "PostgreSQL", "AWS"],
    logo: "L",
    logoColor: "bg-indigo-600",
    posted: "1d ago",
    featured: false,
  },
];

const COMPANIES = [
  { name: "Google",  letter: "G", color: "bg-red-500" },
  { name: "Meta",    letter: "M", color: "bg-blue-600" },
  { name: "Amazon",  letter: "A", color: "bg-orange-500" },
  { name: "Netflix", letter: "N", color: "bg-red-600" },
  { name: "Stripe",  letter: "S", color: "bg-violet-600" },
  { name: "Notion",  letter: "N", color: "bg-gray-700" },
  { name: "Figma",   letter: "F", color: "bg-pink-500" },
  { name: "Linear",  letter: "L", color: "bg-indigo-600" },
];

const STATS = [
  { icon: Briefcase,  value: "10k+", label: "Active Jobs" },
  { icon: Building2,  value: "5k+",  label: "Companies" },
  { icon: Users,      value: "50k+", label: "Job Seekers" },
  { icon: TrendingUp, value: "92%",  label: "Placement Rate" },
];

export default function Home() {
  const [keyword,  setKeyword]  = useState("");
  const [location, setLocation] = useState("");
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">

      {/* ── Animated Mesh Background ────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-32 right-1/4 w-72 h-72 bg-blue-600/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>

      <div className="relative z-10">

        {/* ── Hero ──────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pt-20 pb-12 text-center">

          <div
            className="transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-8 text-xs font-medium bg-violet-500/10 text-violet-300 rounded-full border border-violet-500/20">
              <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
              1,200+ new jobs posted this week
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-5">
              Find your next{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                great role
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Browse thousands of jobs from companies that care about where you work and how you grow.
            </p>
          </div>

          {/* Search bar */}
          <div
            className="flex flex-col md:flex-row bg-gray-900/80 backdrop-blur border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
          >
            <div className="flex items-center gap-3 flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-white/10">
              <Search size={15} className="text-gray-500 shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title or keyword"
                className="w-full text-sm bg-transparent outline-none text-white placeholder:text-gray-600"
              />
            </div>
            <div className="flex items-center gap-3 flex-1 px-5 py-4">
              <MapPin size={15} className="text-gray-500 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or remote"
                className="w-full text-sm bg-transparent outline-none text-white placeholder:text-gray-600"
              />
            </div>
            <div className="p-2">
              <Link
                to={`/jobs?q=${keyword}&location=${location}`}
                className="flex items-center justify-center gap-2 w-full md:w-auto bg-violet-500 hover:bg-violet-600 active:scale-95 text-white text-sm font-semibold px-7 py-3 rounded-xl transition-all"
              >
                <Search size={14} />
                Search
              </Link>
            </div>
          </div>

          <p className="text-xs text-gray-600 mt-4">
            Popular:&nbsp;
            {["React Developer", "UI Designer", "Product Manager", "Data Analyst"].map((tag, i) => (
              <Link
                key={tag}
                to={`/jobs?q=${tag}`}
                className="text-gray-500 hover:text-violet-400 transition-colors"
              >
                {tag}{i < 3 ? " · " : ""}
              </Link>
            ))}
          </p>
        </section>

        {/* ── Stats ─────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className="bg-gray-900/60 border border-white/8 rounded-xl p-5 text-center hover:border-white/15 transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transitionDuration: "600ms",
                  transitionDelay: `${300 + i * 80}ms`,
                }}
              >
                <Icon size={17} className="text-violet-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured Jobs ──────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-white">Featured jobs</h2>
              <p className="text-xs text-gray-500 mt-0.5">Hand-picked opportunities</p>
            </div>
            <Link
              to="/jobs"
              className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {FEATURED_JOBS.map((job) => (
              <Link
                key={job.title}
                to={`/jobs?q=${job.title}`}
                className="group flex items-start gap-4 bg-gray-900/60 border border-white/8 hover:border-violet-500/30 hover:bg-violet-500/3 rounded-xl p-4 transition-all duration-200"
              >
                {/* Logo */}
                <div className={`${job.logoColor} w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {job.logo}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors leading-tight">
                        {job.title}
                        {job.featured && (
                          <span className="ml-2 inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-500/15 text-amber-400 text-[10px] font-medium rounded-md border border-amber-500/20">
                            <Star size={8} />Featured
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{job.company} · {job.location}</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400 shrink-0">{job.salary}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    {job.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/8 rounded-md text-[11px] text-gray-400">
                        {tag}
                      </span>
                    ))}
                    <span className="flex items-center gap-1 text-[11px] text-gray-600 ml-auto">
                      <Clock size={10} />{job.posted}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Job Categories ─────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Browse by category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CATEGORIES.map(({ icon, label, count }) => (
              <Link
                key={label}
                to={`/jobs?category=${label.toLowerCase()}`}
                className="group flex items-center gap-3 bg-gray-900/60 border border-white/8 hover:border-violet-500/30 hover:bg-violet-500/4 rounded-xl px-4 py-3.5 transition-all duration-200"
              >
                <span className="text-xl leading-none">{icon}</span>
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors leading-tight">{label}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{count}</p>
                </div>
                <ArrowRight size={13} className="text-gray-700 group-hover:text-violet-500 ml-auto transition-all group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Hiring Companies ───────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-6 text-center">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center gap-3">
            {COMPANIES.map(({ name, letter, color }) => (
              <div
                key={name}
                className="flex items-center gap-2 bg-gray-900/60 border border-white/8 hover:border-white/15 rounded-xl px-3.5 py-2 transition-all cursor-default group"
              >
                <div className={`${color} w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                  {letter}
                </div>
                <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors font-medium">{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Dual CTA ───────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-2 gap-4">
            {/* For job seekers */}
            <div className="bg-gray-900/60 border border-white/8 rounded-2xl p-7 flex flex-col">
              <div className="w-9 h-9 bg-violet-500/15 rounded-xl flex items-center justify-center mb-4">
                <Users size={17} className="text-violet-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1.5">Looking for a job?</h3>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed flex-1">
                Create your profile and get discovered by top companies. Set up job alerts so you never miss an opportunity.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors group"
              >
                Create free profile <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* For employers */}
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-7 flex flex-col">
              <div className="w-9 h-9 bg-violet-500/20 rounded-xl flex items-center justify-center mb-4">
                <Building2 size={17} className="text-violet-300" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1.5">Ready to hire?</h3>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed flex-1">
                Post your job in minutes and reach thousands of qualified candidates actively looking for their next role.
              </p>
              <Link
                to="/post-job"
                className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all w-fit"
              >
                Post a job — it's free <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}