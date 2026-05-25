import { useState } from "react";
import { Users, Check, X, FileText, MapPin, Award, ShieldAlert, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function Applicants() {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Dharavath Dinesh", role: "Frontend Developer", match: "94%", skills: ["React", "TypeScript", "Tailwind CSS"], location: "Hyderabad, IN", status: "pending" },
    { id: 2, name: "Bhanu Prakash", role: "Backend Engineer", match: "88%", skills: ["Node.js", "Express", "MongoDB", "Java"], location: "Bangalore, IN", status: "pending" },
    { id: 3, name: "Rohit Sharma", role: "UI/UX Designer", match: "72%", skills: ["Figma", "Adobe XD", "Prototyping"], location: "Mumbai, IN", status: "accepted" },
  ]);

  const handleDecision = (id, decision) => {
    setCandidates(candidates.map((c) => (c.id === id ? { ...c, status: decision } : c)));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Applicant Pipeline</h1>
          <p className="text-gray-400 text-xs mt-1">Review incoming credential dossiers, audit algorithmic match percentages, and manage candidate workflows.</p>
        </div>

        <div className="space-y-4">
          {candidates.length === 0 ? (
            <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-12 text-center">
              <Users size={24} className="text-gray-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-400">Dossier manifest completely unpopulated</p>
            </div>
          ) : (
            candidates.map((cand) => (
              <div key={cand.id} className="bg-gray-900/40 border border-white/5 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
                
                {/* Left Side Details Column */}
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-bold tracking-tight text-white leading-none">{cand.name}</h3>
                    <span className="text-[10px] bg-violet-500/10 border border-violet-500/20 text-violet-400 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {cand.match} Skill Match
                    </span>
                  </div>
                  
                  <p className="text-xs font-semibold text-gray-400 leading-none">{cand.role} Candidate</p>
                  <p className="flex items-center gap-1 text-xs text-gray-500 font-medium"><MapPin size={12} className="text-violet-400" />{cand.location}</p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {cand.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-md text-[10px] font-medium text-gray-400">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Right Side Workflow Action Triggers */}
                <div className="flex flex-row md:flex-col sm:items-center md:items-end justify-between sm:justify-end gap-3 border-t md:border-0 border-white/[0.03] pt-4 md:pt-0">
                  
                  {/* Interactive Status Badging Deck */}
                  {cand.status === "pending" ? (
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button onClick={() => handleDecision(cand.id, "rejected")} className="p-2.5 bg-white/[0.01] border border-white/10 hover:border-red-500/20 text-gray-500 hover:text-red-400 rounded-xl transition-all cursor-pointer">
                        <X size={15} />
                      </button>
                      <button onClick={() => handleDecision(cand.id, "accepted")} className="px-4 py-2.5 bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-violet-950/30 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
                        <Check size={14} /> Accept Candidate
                      </button>
                    </div>
                  ) : cand.status === "accepted" ? (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-xl">
                      <CheckCircle2 size={13} /> Approved and Shortlisted
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl">
                      <XCircle size={13} /> Profile Application Closed
                    </span>
                  )}
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}