import { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Wallet,
  Clock3,
  SlidersHorizontal,
  X,
  ChevronRight,
  Sparkles,
  Bookmark,
  CheckCircle2,
  Loader2,
  Building2,
} from "lucide-react";

// ── Enhanced Mock Database with Explicit City Parameters ──────
const jobsData = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer",
    location: "Remote",
    salary: "₹18 LPA",
    salaryNum: 18,
    type: "Full Time",
    experience: "1-3 Years",
    posted: "Posted 2 days ago",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    description: "We are looking for a Frontend Developer to join our core search infrastructure team. You will build highly accessible user interfaces used by billions of users worldwide.",
  },
  {
    id: 2,
    company: "Amazon",
    role: "Backend Engineer",
    location: "Hyderabad",
    salary: "₹22 LPA",
    salaryNum: 22,
    type: "Remote",
    experience: "3+ Years",
    posted: "Posted 1 day ago",
    skills: ["Node.js", "AWS", "DynamoDB", "Java"],
    description: "Scale our primary retail fulfillment logic. You will optimize complex distributed microservices, minimize database latency windows, and orchestrate serverless event architectures.",
  },
  {
    id: 3,
    company: "Netflix",
    role: "UI/UX Designer",
    location: "Bangalore",
    salary: "₹14 LPA",
    salaryNum: 14,
    type: "Hybrid",
    experience: "1-3 Years",
    posted: "Posted 3 days ago",
    skills: ["Figma", "Prototyping", "Design Systems"],
    description: "Craft cinematic user journeys. This team owns the post-signup discovery interface, building immersive canvas animations and conducting continuous A/B multivariate testing.",
  },
  {
    id: 4,
    company: "Meta",
    role: "React Developer",
    location: "Remote",
    salary: "₹25 LPA",
    salaryNum: 25,
    type: "Full Time",
    experience: "3+ Years",
    posted: "Posted 5 hours ago",
    skills: ["React", "GraphQL", "Relay", "Next.js"],
    description: "Advance the next generation of social graph rendering engines. You will work on cutting-edge internal React primitives to reduce bundle overhead and initial paint times.",
  },
  {
    id: 5,
    company: "Razorpay",
    role: "SDE-1 (Frontend)",
    location: "Bangalore",
    salary: "₹8 LPA",
    salaryNum: 8,
    type: "Full Time",
    experience: "Fresher",
    posted: "Posted Today",
    skills: ["JavaScript", "React", "State Management"],
    description: "Perfect for early-career developers eager to own meaningful checkout features. You'll work closely with product managers to implement robust payment checkout widgets.",
  },
  {
    id: 6,
    company: "Cred",
    role: "Full Stack Engineer",
    location: "Mumbai",
    salary: "₹30 LPA",
    salaryNum: 30,
    type: "Full Time",
    experience: "3+ Years",
    posted: "Posted 1 day ago",
    skills: ["Next.js", "Go", "PostgreSQL", "Docker"],
    description: "Architect secure financial commerce integrations. You will deliver high-throughput software pipelines processing transaction ledger events at peak load conditions.",
  },
  {
    id: 7,
    company: "Zomato",
    role: "Mobile App Developer",
    location: "Delhi NCR",
    salary: "₹16 LPA",
    salaryNum: 16,
    type: "Hybrid",
    experience: "1-3 Years",
    posted: "Posted 4 days ago",
    skills: ["React Native", "Swift", "Kotlin"],
    description: "Enhance critical geofencing and real-time delivery tracking application primitives. You will systematically identify bundle bottlenecks to yield performance updates across platforms.",
  },
  {
    id: 8,
    company: "PhonePe",
    role: "DevOps Engineer",
    location: "Pune",
    salary: "₹20 LPA",
    salaryNum: 20,
    type: "Full Time",
    experience: "3+ Years",
    posted: "Posted Yesterday",
    skills: ["Kubernetes", "Terraform", "GitHub Actions", "AWS"],
    description: "Orchestrate highly reliable hybrid cloud architectures. You will implement robust infrastructure-as-code files to enhance horizontal auto-scaling matrices across dynamic payment gateways.",
  }
];

export default function Jobs() {
  // ── Search & Filter State Management ───────────────────────
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedExp, setSelectedExp] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState([]);

  // ── Interactive UI State ───────────────────────────────────
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [applyingId, setApplyingId] = useState(null);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  // ── Real-time Intersection Filtering Engine ────────────────
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesSearch =
        job.role.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(job.type);

      const matchesExp =
        selectedExp.length === 0 || selectedExp.includes(job.experience);

      const matchesCity =
        selectedCities.length === 0 || selectedCities.includes(job.location);

      const matchesSalary =
        selectedSalary.length === 0 ||
        selectedSalary.some((range) => {
          if (range === "5+ LPA") return job.salaryNum >= 5;
          if (range === "10+ LPA") return job.salaryNum >= 10;
          if (range === "20+ LPA") return job.salaryNum >= 20;
          return true;
        });

      return matchesSearch && matchesType && matchesExp && matchesCity && matchesSalary;
    });
  }, [search, selectedTypes, selectedExp, selectedCities, selectedSalary]);

  // ── Multi-Select Filter Toggles ────────────────────────────
  const handleFilterToggle = (list, setList, value) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setSearch("");
    setSelectedTypes([]);
    setSelectedExp([]);
    setSelectedCities([]);
    setSelectedSalary([]);
    setSelectedJob(null);
  };

  // ── Interactive Action Handlers ────────────────────────────
  const toggleSaveJob = (id) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const simulateApplication = async (id) => {
    setApplyingId(id);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setApplyingId(null);
    setAppliedJobIds((prev) => new Set([...prev, id]));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        {/* ── Heading / Hero Segment ─────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
              <Sparkles size={12} /> Live Tech Career Engine
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
              Find Your Dream Job
            </h1>
            <p className="text-gray-400 mt-1.5 text-sm">
              Discover verified opportunities across premier Indian software ecosystems.
            </p>
          </div>
          <div className="text-sm text-gray-500 bg-gray-900/50 border border-white/5 rounded-xl px-4 py-2 h-fit">
            Showing <span className="text-violet-400 font-bold">{filteredJobs.length}</span> of {jobsData.length} Open Profiles
          </div>
        </div>

        {/* ── Search Bar Input Matrix ────────────────────────── */}
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-3.5 mb-8 flex items-center gap-3 shadow-xl focus-within:border-violet-500/40 transition-colors">
          <Search size={20} className="text-gray-500 ml-2 shrink-0" />
          <input
            type="text"
            placeholder="Search by precise tech keywords, roles, or organization names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-white text-base placeholder:text-gray-600"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* ── Active Filter Chip Tray ────────────────────────── */}
        {(selectedTypes.length > 0 || selectedExp.length > 0 || selectedCities.length > 0 || selectedSalary.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 bg-white/[0.02] border border-white/5 p-3 rounded-xl animate-fadeIn">
            <span className="text-xs text-gray-500 font-medium mr-1">Active Criteria:</span>
            {[...selectedTypes, ...selectedExp, ...selectedCities, ...selectedSalary].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium pl-2.5 pr-1.5 py-1 rounded-lg"
              >
                {chip}
                <button
                  onClick={() => {
                    if (selectedTypes.includes(chip)) handleFilterToggle(selectedTypes, setSelectedTypes, chip);
                    if (selectedExp.includes(chip)) handleFilterToggle(selectedExp, setSelectedExp, chip);
                    if (selectedCities.includes(chip)) handleFilterToggle(selectedCities, setSelectedCities, chip);
                    if (selectedSalary.includes(chip)) handleFilterToggle(selectedSalary, setSelectedSalary, chip);
                  }}
                  className="hover:bg-violet-500/20 rounded p-0.5 transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs text-gray-500 hover:text-violet-400 transition-colors font-medium ml-auto px-2 py-1"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── Main Structured Grid Split ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Sidebar Filter Component */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-5 sticky top-24 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-violet-400" />
                  <h2 className="font-bold text-sm uppercase tracking-wider text-gray-200">Filters</h2>
                </div>
                {(selectedTypes.length > 0 || selectedExp.length > 0 || selectedCities.length > 0 || selectedSalary.length > 0) && (
                  <button onClick={clearAllFilters} className="text-xs text-gray-500 hover:text-white transition-colors">
                    Clear all
                  </button>
                )}
              </div>

              {/* Job Type Checkboxes */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Job Framework</h3>
                <div className="space-y-2.5 text-sm">
                  {["Full Time", "Remote", "Internship", "Hybrid"].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group text-gray-400 hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleFilterToggle(selectedTypes, setSelectedTypes, type)}
                        className="rounded border-white/10 bg-gray-950 text-violet-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-violet-500 cursor-pointer"
                      />
                      <span className={selectedTypes.includes(type) ? "text-violet-300 font-medium" : ""}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Top Indian Tech Hubs Filter Segment */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Top Indian Hubs</h3>
                <div className="space-y-2.5 text-sm">
                  {["Bangalore", "Hyderabad", "Pune", "Mumbai", "Delhi NCR", "Remote"].map((city) => (
                    <label key={city} className="flex items-center gap-3 cursor-pointer group text-gray-400 hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(city)}
                        onChange={() => handleFilterToggle(selectedCities, setSelectedCities, city)}
                        className="rounded border-white/10 bg-gray-950 text-violet-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-violet-500 cursor-pointer"
                      />
                      <span className={selectedCities.includes(city) ? "text-violet-300 font-medium" : ""}>{city}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Levels */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Experience Depth</h3>
                <div className="space-y-2.5 text-sm">
                  {["Fresher", "1-3 Years", "3+ Years"].map((exp) => (
                    <label key={exp} className="flex items-center gap-3 cursor-pointer group text-gray-400 hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedExp.includes(exp)}
                        onChange={() => handleFilterToggle(selectedExp, setSelectedExp, exp)}
                        className="rounded border-white/10 bg-gray-950 text-violet-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-violet-500 cursor-pointer"
                      />
                      <span className={selectedExp.includes(exp) ? "text-violet-300 font-medium" : ""}>{exp}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Ranges */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Compensation Threshold</h3>
                <div className="space-y-2.5 text-sm">
                  {["5+ LPA", "10+ LPA", "20+ LPA"].map((sal) => (
                    <label key={sal} className="flex items-center gap-3 cursor-pointer group text-gray-400 hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedSalary.includes(sal)}
                        onChange={() => handleFilterToggle(selectedSalary, setSelectedSalary, sal)}
                        className="rounded border-white/10 bg-gray-950 text-violet-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-violet-500 cursor-pointer"
                      />
                      <span className={selectedSalary.includes(sal) ? "text-violet-300 font-medium" : ""}>{sal}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Master-Detail Jobs Stack Canvas */}
          <div className={`grid gap-6 ${selectedJob ? "lg:col-span-9 lg:grid-cols-12" : "lg:col-span-9 lg:grid-cols-1"}`}>
            
            {/* Left Hand Card Feed */}
            <div className={`space-y-4 ${selectedJob ? "lg:col-span-5 xl:col-span-5" : "w-full"}`}>
              {filteredJobs.length === 0 ? (
                <div className="bg-gray-900/40 border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 mb-4">
                    <Briefcase size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-300">No vacancies match current configuration</h3>
                  <p className="text-gray-500 text-sm mt-1 max-w-sm">Try widening your salary boundaries or changing the selected city parameters.</p>
                  <button onClick={clearAllFilters} className="mt-5 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors">
                    Revert Filter Rules
                  </button>
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const isCurrentSelection = selectedJob?.id === job.id;
                  return (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className={`group bg-gray-900 border rounded-2xl p-5 cursor-pointer transition-all duration-200 relative overflow-hidden ${
                        isCurrentSelection
                          ? "border-violet-500 bg-violet-950/[0.12] shadow-lg shadow-violet-950/20"
                          : "border-white/10 hover:border-white/20 hover:bg-gray-900/80"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold tracking-tight group-hover:text-violet-400 transition-colors">
                            {job.role}
                          </h3>
                          <p className="text-gray-400 text-sm mt-0.5">{job.company}</p>
                        </div>
                        <span className="bg-white/5 border border-white/10 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-lg shrink-0">
                          {job.type}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1.5 text-gray-400"><MapPin size={13} className="text-violet-400" />{job.location}</span>
                        <span className="flex items-center gap-1.5"><Wallet size={13} />{job.salary}</span>
                      </div>

                      <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-white/5">
                        <span className="text-[11px] text-gray-600 flex items-center gap-1"><Clock3 size={12} />{job.posted}</span>
                        <span className="text-xs font-bold text-violet-400 opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-all">
                          Inspect Workspace <ChevronRight size={14} className="mt-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Hand Sticky Information Drawer */}
            {selectedJob && (
              <div className="lg:col-span-7 xl:col-span-7 sticky top-24 bg-gray-900 border border-violet-500/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-fadeIn">
                <div className="p-6 border-b border-white/5 bg-white/[0.01]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner">
                        {selectedJob.company[0]}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight">{selectedJob.role}</h2>
                        <p className="text-violet-400 text-sm font-medium flex items-center gap-1.5 mt-0.5">
                          <Building2 size={14} /> {selectedJob.company} Ecosystem
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="text-gray-500 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    <span className="bg-white/5 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-gray-300 font-medium flex items-center gap-1.5">
                      <MapPin size={12} className="text-violet-400" /> {selectedJob.location} Hub
                    </span>
                    <span className="bg-white/5 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-gray-300 font-medium flex items-center gap-1.5">
                      <Briefcase size={12} /> {selectedJob.experience} Range
                    </span>
                    <span className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-1.5 text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                      <Wallet size={12} /> {selectedJob.salary}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-6 max-h-[50vh] overflow-y-auto custom-scrollbar">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Core Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedJob.skills.map((skill) => (
                        <span key={skill} className="bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 text-xs font-medium text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Operational Scope</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{selectedJob.description}</p>
                  </div>
                </div>

                <div className="p-4 border-t border-white/5 bg-white/[0.01] flex gap-3 mt-auto">
                  <button
                    onClick={() => toggleSaveJob(selectedJob.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      savedJobIds.has(selectedJob.id)
                        ? "bg-violet-500/10 border-violet-500/30 text-violet-300"
                        : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white bg-transparent"
                    }`}
                  >
                    <Bookmark size={15} className={savedJobIds.has(selectedJob.id) ? "fill-violet-400" : ""} />
                    <span>{savedJobIds.has(selectedJob.id) ? "Saved" : "Save"}</span>
                  </button>

                  <button
                    onClick={() => simulateApplication(selectedJob.id)}
                    disabled={applyingId === selectedJob.id || appliedJobIds.has(selectedJob.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                      appliedJobIds.has(selectedJob.id)
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                        : "bg-violet-500 hover:bg-violet-600 text-white disabled:opacity-50"
                    }`}
                  >
                    {applyingId === selectedJob.id ? (
                      <><Loader2 size={15} className="animate-spin" /> Verifying Credentials...</>
                    ) : appliedJobIds.has(selectedJob.id) ? (
                      <><CheckCircle2 size={15} /> Application Dispatched</>
                    ) : (
                      <>Initialize Rapid Application</>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}