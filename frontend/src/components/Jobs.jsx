import { useState, useMemo, useRef, useEffect } from "react";
import {
  Search, MapPin, Briefcase, Wallet, Clock3, SlidersHorizontal,
  X, ChevronRight, Sparkles, Bookmark, CheckCircle2, Loader2,
  Building2, Upload, FileText, ArrowRight, AlertCircle,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";




// ── Apply Modal ──────────────────────────────────────────────
function ApplyModal({ job, onClose, onSuccess }) {
  const [coverLetter, setCoverLetter]   = useState("");
  const [resumeFile,  setResumeFile]    = useState(null);
  const [dragOver,    setDragOver]      = useState(false);
  const [submitting,  setSubmitting]    = useState(false);
  const [error,       setError]         = useState("");
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    const allowed = ["application/pdf", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      setError("Only PDF or Word documents are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5 MB.");
      return;
    }
    setError("");
    setResumeFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!resumeFile) { setError("Please upload your resume."); return; }
    setSubmitting(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("jobId",       job.id);
      formData.append("resume",      resumeFile);
      formData.append("coverLetter", coverLetter);

      const res = await fetch(
  `http://localhost:8000/api/v1/applications/apply/${job._id}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }
);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Application failed.");
      }

      onSuccess(job.id);
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-lg bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center font-bold text-white shrink-0">
              {job.company?.name[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">{job.title}</p>
              <p className="text-xs text-violet-400 mt-0.5">{job.company?.name} · {job.location}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">

          {/* Resume upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Resume <span className="text-violet-400">*</span>
            </label>

            {resumeFile ? (
              /* File preview */
              <div className="flex items-center gap-3 bg-violet-500/8 border border-violet-500/20 rounded-xl px-4 py-3">
                <FileText size={18} className="text-violet-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{resumeFile.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{(resumeFile.size / 1024).toFixed(0)} KB</p>
                </div>
                <button
                  onClick={() => setResumeFile(null)}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              /* Drop zone */
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl px-4 py-8 text-center cursor-pointer transition-all ${
                  dragOver
                    ? "border-violet-500 bg-violet-500/8"
                    : "border-white/10 hover:border-violet-500/40 hover:bg-white/2"
                }`}
              >
                <Upload size={22} className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-medium">
                  Drop your resume here or{" "}
                  <span className="text-violet-400 hover:underline">browse</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">PDF or Word · max 5 MB</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </div>
            )}
          </div>

          {/* Cover letter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Cover Letter <span className="text-gray-600">(optional)</span>
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
              placeholder={`Tell ${job.company?.name} why you're a great fit for this role...`}
              className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none resize-none focus:border-violet-500/50 transition-colors"
            />
            <p className="text-xs text-gray-600 mt-1 text-right">{coverLetter.length}/1000</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5 text-xs text-red-400">
              <AlertCircle size={13} className="shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 pb-5">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || !resumeFile}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 active:scale-95 text-white text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <><Loader2 size={15} className="animate-spin" /> Submitting…</>
            ) : (
              <>Submit Application <ArrowRight size={14} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Jobs Page ───────────────────────────────────────────
export default function Jobs() {
  const [search,         setSearch]         = useState("");
  const [selectedTypes,  setSelectedTypes]  = useState([]);
  const [selectedExp,    setSelectedExp]    = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState([]);
  const [selectedJob,    setSelectedJob]    = useState(null);
  const [savedJobIds,    setSavedJobIds]    = useState(new Set());
  const [appliedJobIds,  setAppliedJobIds]  = useState(new Set());
  const [applyModalJob,  setApplyModalJob]  = useState(null); // controls modal
const [jobsData, setJobsData] = useState([]);
const [loading, setLoading] = useState(true)
  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/jobs"
      );

      const data = await res.json();

      console.log("ALL JOBS =>", data);

      setJobsData(data.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, []);



  const filteredJobs = useMemo(() => {
  return jobsData.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.includes(job.jobType);

    const matchesExp =
      selectedExp.length === 0 ||
      selectedExp.includes(String(job.experienceLevel));

    const matchesCity =
      selectedCities.length === 0 ||
      selectedCities.includes(job.location);

    return (
      matchesSearch &&
      matchesType &&
      matchesExp &&
      matchesCity
    );
  });
}, [
  jobsData,
  search,
  selectedTypes,
  selectedExp,
  selectedCities,
]); 


  if (loading) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      Loading Jobs...
    </div>
  );
}

  const toggleFilter = (list, setList, value) =>
    setList((prev) => prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]);

  const clearAllFilters = () => {
    setSearch(""); setSelectedTypes([]); setSelectedExp([]);
    setSelectedCities([]); setSelectedSalary([]); setSelectedJob(null);
  };

  const toggleSave = (id) =>
    setSavedJobIds((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const handleApplySuccess = (jobId) =>
    setAppliedJobIds((prev) => new Set([...prev, jobId]));

  const activeFilterCount = [...selectedTypes, ...selectedExp, ...selectedCities, ...selectedSalary].length;

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans antialiased">

      {/* Apply Modal */}
      {applyModalJob && (
        <ApplyModal
          job={applyModalJob}
          onClose={() => setApplyModalJob(null)}
          onSuccess={handleApplySuccess}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Hero */}
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

        {/* Search bar */}
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
            <button onClick={() => setSearch("")} className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 bg-white/[0.02] border border-white/5 p-3 rounded-xl">
            <span className="text-xs text-gray-500 font-medium mr-1">Active:</span>
            {[...selectedTypes, ...selectedExp, ...selectedCities, ...selectedSalary].map((chip) => (
              <span key={chip} className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium pl-2.5 pr-1.5 py-1 rounded-lg">
                {chip}
                <button
                  onClick={() => {
                    if (selectedTypes.includes(chip))  toggleFilter(selectedTypes,  setSelectedTypes,  chip);
                    if (selectedExp.includes(chip))    toggleFilter(selectedExp,    setSelectedExp,    chip);
                    if (selectedCities.includes(chip)) toggleFilter(selectedCities, setSelectedCities, chip);
                    if (selectedSalary.includes(chip)) toggleFilter(selectedSalary, setSelectedSalary, chip);
                  }}
                  className="hover:bg-violet-500/20 rounded p-0.5 transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <button onClick={clearAllFilters} className="text-xs text-gray-500 hover:text-violet-400 transition-colors font-medium ml-auto px-2 py-1">
              Reset all
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-5 sticky top-24 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-violet-400" />
                  <h2 className="font-bold text-sm uppercase tracking-wider text-gray-200">Filters</h2>
                </div>
                {activeFilterCount > 0 && (
                  <button onClick={clearAllFilters} className="text-xs text-gray-500 hover:text-white transition-colors">Clear all</button>
                )}
              </div>

              {[
                { title: "Job Framework",         items: ["Full Time", "Remote", "Internship", "Hybrid"],          list: selectedTypes,  set: setSelectedTypes },
                { title: "Top Indian Hubs",        items: ["Bangalore", "Hyderabad", "Pune", "Mumbai", "Delhi NCR", "Remote"], list: selectedCities, set: setSelectedCities },
                { title: "Experience Depth",       items: ["Fresher", "1-3 Years", "3+ Years"],                    list: selectedExp,    set: setSelectedExp },
                { title: "Compensation Threshold", items: ["5+ LPA", "10+ LPA", "20+ LPA"],                       list: selectedSalary, set: setSelectedSalary },
              ].map(({ title, items, list, set }) => (
                <div key={title}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">{title}</h3>
                  <div className="space-y-2.5 text-sm">
                    {items.map((item) => (
                      <label key={item} className="flex items-center gap-3 cursor-pointer text-gray-400 hover:text-white transition-colors">
                        <input
                          type="checkbox"
                          checked={list.includes(item)}
                          onChange={() => toggleFilter(list, set, item)}
                          className="rounded border-white/10 bg-gray-950 w-4 h-4 accent-violet-500 cursor-pointer"
                        />
                        <span className={list.includes(item) ? "text-violet-300 font-medium" : ""}>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards + Detail panel */}
          <div className={`grid gap-6 ${selectedJob ? "lg:col-span-9 lg:grid-cols-12" : "lg:col-span-9"}`}>

            {/* Job cards */}
            <div className={`space-y-4 ${selectedJob ? "lg:col-span-5" : "w-full"}`}>
              {filteredJobs.length === 0 ? (
                <div className="bg-gray-900/40 border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 mb-4">
                    <Briefcase size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-300">No vacancies match</h3>
                  <p className="text-gray-500 text-sm mt-1 max-w-sm">Try widening your filters.</p>
                  <button onClick={clearAllFilters} className="mt-5 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors">
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const isSelected = selectedJob?.id === job.id;
                  const isApplied  = appliedJobIds.has(job.id);
                  return (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className={`group bg-gray-900 border rounded-2xl p-5 cursor-pointer transition-all duration-200 relative ${
                        isSelected
                          ? "border-violet-500 bg-violet-950/[0.12] shadow-lg shadow-violet-950/20"
                          : "border-white/10 hover:border-white/20 hover:bg-gray-900/80"
                      }`}
                    >
                      {/* Applied badge */}
                      {isApplied && (
                        <span className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={9} /> Applied
                        </span>
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold tracking-tight group-hover:text-violet-400 transition-colors pr-16">
                            {job.title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-0.5">{job.company?.name}</p>
                        </div>
                        {!isApplied && (
                          <span className="bg-white/5 border border-white/10 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-lg shrink-0">
                            {job.jobType}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1.5 text-gray-400"><MapPin size={13} className="text-violet-400" />{job.location}</span>
                        <span className="flex items-center gap-1.5"><Wallet size={13} />₹{job.salary?.min} - ₹{job.salary?.max}</span>
                      </div>

                      <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-white/5">
                        <span className="text-[11px] text-gray-600 flex items-center gap-1"><Clock3 size={12} />{job.posted}</span>
                        <span className="text-xs font-bold text-violet-400 opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-all">
                          View details <ChevronRight size={14} className="mt-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Detail panel */}
            {selectedJob && (
              <div className="lg:col-span-7 sticky top-24 bg-gray-900 border border-violet-500/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col">

                {/* Panel header */}
                <div className="p-6 border-b border-white/5 bg-white/[0.01]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner">
                        {selectedJob.company?.name[0]}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight">{selectedJob.title}</h2>
                        <p className="text-violet-400 text-sm font-medium flex items-center gap-1.5 mt-0.5">
                          <Building2 size={14} /> {selectedJob.company?.name} Ecosystem
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedJob(null)} className="text-gray-500 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors">
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
                      <Wallet size={12} /> ₹{selectedJob.salary?.min} - ₹{selectedJob.salary?.max}
                    </span>
                  </div>
                </div>

                {/* Panel body */}
                <div className="p-6 space-y-6 max-h-[50vh] overflow-y-auto">
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

                {/* Panel footer — action buttons */}
                <div className="p-4 border-t border-white/5 bg-white/[0.01] flex gap-3 mt-auto">
                  <button
                    onClick={() => toggleSave(selectedJob.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      savedJobIds.has(selectedJob.id)
                        ? "bg-violet-500/10 border-violet-500/30 text-violet-300"
                        : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <Bookmark size={15} className={savedJobIds.has(selectedJob.id) ? "fill-violet-400" : ""} />
                    {savedJobIds.has(selectedJob.id) ? "Saved" : "Save"}
                  </button>

                  {appliedJobIds.has(selectedJob.id) ? (
                    <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold">
                      <CheckCircle2 size={15} /> Application Submitted
                    </div>
                  ) : (
                    <button
                      onClick={() => setApplyModalJob(selectedJob)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 active:scale-95 text-white text-sm font-bold transition-all"
                    >
                      Apply Now <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}