import { useState } from "react";
import { Search, MapPin, Briefcase, TrendingUp, Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { icon: "💻", label: "Engineering",  count: "2.4k jobs" },
  { icon: "🎨", label: "Design",       count: "890 jobs" },
  { icon: "📊", label: "Marketing",    count: "1.2k jobs" },
  { icon: "💼", label: "Finance",      count: "760 jobs" },
  { icon: "🩺", label: "Healthcare",   count: "1.8k jobs" },
  { icon: "📱", label: "Product",      count: "540 jobs" },
];

const COMPANIES = ["Google", "Meta", "Amazon", "Netflix", "Stripe", "Notion", "Figma", "Linear"];

const STATS = [
  { icon: Briefcase, value: "10k+",  label: "Active jobs" },
  { icon: Building2, value: "5k+",   label: "Companies" },
  { icon: Users,     value: "50k+",  label: "Job seekers" },
  { icon: TrendingUp,value: "92%",   label: "Placement rate" },
];

export default function Home() {
  const [keyword,  setKeyword]  = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">

        <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-xs font-medium bg-violet-500/10 text-violet-400 rounded-full border border-violet-500/20">
          <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
          1,200+ new jobs posted this week
        </span>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-5">
          Find your next{" "}
          <span className="text-violet-400">great role</span>
        </h1>

        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Browse thousands of jobs from companies that care about where you work and how you grow.
        </p>

        {/* Search bar */}
        <div className="flex flex-col md:flex-row bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-white/10">
            <Search size={16} className="text-gray-500 shrink-0" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title or keyword"
              className="w-full text-sm bg-transparent outline-none text-white placeholder:text-gray-600"
            />
          </div>
          <div className="flex items-center gap-3 flex-1 px-5 py-4">
            <MapPin size={16} className="text-gray-500 shrink-0" />
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
              className="flex items-center justify-center w-full md:w-auto bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Search
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-4">
          Popular: <span className="text-gray-500">React Developer · UI Designer · Product Manager · Data Analyst</span>
        </p>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-gray-900 border border-white/10 rounded-xl p-5 text-center">
              <Icon size={18} className="text-violet-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Job Categories ───────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-xl font-semibold text-white mb-6">Browse by category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CATEGORIES.map(({ icon, label, count }) => (
            <Link
              key={label}
              to={`/jobs?category=${label.toLowerCase()}`}
              className="flex items-center gap-3 bg-gray-900 border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 rounded-xl px-4 py-4 transition-all group"
            >
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">{label}</p>
                <p className="text-xs text-gray-500">{count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Trusted Companies ────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 pb-24 text-center">
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-6">Trusted by teams at</p>
        <div className="flex flex-wrap justify-center gap-6">
          {COMPANIES.map((name) => (
            <span
              key={name}
              className="text-gray-700 font-bold text-lg hover:text-gray-400 transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to hire great talent?</h2>
          <p className="text-gray-400 text-sm mb-6">Post your job in minutes and reach thousands of qualified candidates.</p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Post a job — it's free
          </Link>
        </div>
      </section>

    </div>
  );
}