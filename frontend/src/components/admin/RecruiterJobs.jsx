import { useState } from "react";
import { Briefcase, Eye, Trash2, MapPin, Wallet, Users, ChevronRight, ToggleLeft, ToggleRight } from "lucide-react";

export default function RecruiterJobs() {
  const [postedJobs, setPostedJobs] = useState([
    { id: 1, role: "Frontend Developer", company: "Google India", location: "Bangalore", salary: "₹18 - ₹24 LPA", applicants: 42, active: true, type: "Full-time" },
    { id: 2, role: "Backend Architect", company: "Amazon Systems", location: "Hyderabad", salary: "₹25 - ₹32 LPA", applicants: 89, active: true, type: "Remote" },
    { id: 3, role: "UI/UX Visual Lead", company: "Adobe Systems", location: "Noida, UP", salary: "₹14 - ₹19 LPA", applicants: 17, active: false, type: "Hybrid" },
  ]);

  const toggleJobState = (id) => {
    setPostedJobs(postedJobs.map((j) => (j.id === id ? { ...j, active: !j.active } : j)));
  };

  const handleDropJob = (id) => {
    setPostedJobs(postedJobs.filter((j) => j.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Active Workspaces</h1>
            <p className="text-gray-400 text-xs mt-1">Audit, modify, toggle visibility vectors or completely tear-down live active listings.</p>
          </div>
          <div className="text-xs text-gray-500 bg-gray-900 border border-white/5 rounded-xl px-4 py-2 w-fit">
            Managing <span className="text-violet-400 font-bold">{postedJobs.length}</span> Open Configurations
          </div>
        </div>

        <div className="space-y-3.5">
          {postedJobs.length === 0 ? (
            <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center">
              <Briefcase size={24} className="text-gray-600 mb-3" />
              <p className="text-sm font-semibold text-gray-400">No active job frameworks deployed</p>
            </div>
          ) : (
            postedJobs.map((job) => (
              <div key={job.id} className={`bg-gray-900/40 border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 ${job.active ? "border-white/5 hover:border-white/10" : "border-white/5 opacity-40"}`}>
                <div className="space-y-2.5 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-lg font-bold tracking-tight text-white">{job.role}</h3>
                    <span className="text-[10px] bg-white/5 border border-white/5 text-gray-300 font-bold px-2 py-0.5 rounded-md uppercase">{job.type}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-400 leading-none">{job.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><MapPin size={12} className="text-violet-400" />{job.location}</span>
                    <span className="flex items-center gap-1"><Wallet size={12} />{job.salary}</span>
                    <span className="flex items-center gap-1 bg-violet-500/5 text-violet-400 px-2 py-0.5 border border-violet-500/10 rounded-md font-bold"><Users size={11} className="mt-0.5" /> {job.applicants} Candidates</span>
                  </div>
                </div>

                {/* Micro Action Button Controls Row */}
                <div className="flex items-center gap-2 self-end sm:self-center border-t border-white/[0.03] sm:border-0 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                  <button onClick={() => toggleJobState(job.id)} className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer bg-white/[0.01] ${job.active ? "border-white/10 text-emerald-400 hover:border-emerald-500/20" : "border-white/5 text-gray-500 hover:text-white"}`}>
                    {job.active ? <ToggleRight size={18} className="text-emerald-400" /> : <ToggleLeft size={18} />}
                    <span className="hidden md:inline">{job.active ? "Open" : "Closed"}</span>
                  </button>
                  <button onClick={() => handleDropJob(job.id)} className="p-2 bg-white/[0.01] border border-white/10 hover:border-red-500/20 text-gray-500 hover:text-red-400 rounded-xl transition-all cursor-pointer">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}