import { useState } from "react";
import { LayoutDashboard, Briefcase, Users, CheckCircle2, Clock, BarChart3, ArrowUpRight } from "lucide-react";

export default function RecruiterDashboard() {
  // Mock data for analytics tracking without a database login
  const [metrics] = useState({
    activeJobs: 12,
    totalApplicants: 148,
    interviewsScheduled: 32,
    placementRate: "84%",
  });

  const recentActivity = [
    { id: 1, candidate: "Dinesh Kumar", role: "MERN Stack Developer", status: "Applied just now", type: "New" },
    { id: 2, candidate: "Aravind Swamy", role: "React Native Developer", status: "Interview Scheduled", type: "Interview" },
    { id: 3, candidate: "Anjali Sharma", role: "Backend Engineer", status: "Reviewed 2h ago", type: "Reviewed" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-10 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title Header */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Recruiter Console
          </h1>
          <p className="text-gray-400 text-sm mt-1.5">
            Real-time hiring metrics, active workspace tracking, and applicant review channels.
          </p>
        </div>

        {/* 4-Column Metric Row Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Openings", value: metrics.activeJobs, icon: Briefcase, color: "text-violet-400 bg-violet-500/10" },
            { label: "Total Applicants", value: metrics.totalApplicants, icon: Users, color: "text-blue-400 bg-blue-500/10" },
            { label: "Interviews In Progress", value: metrics.interviewsScheduled, icon: Clock, color: "text-amber-400 bg-amber-500/10" },
            { label: "Placement Rate", value: metrics.placementRate, icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10" },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="bg-gray-900/40 border border-white/5 backdrop-blur-sm rounded-2xl p-5 flex flex-col gap-3 shadow-xl">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">{card.value}</p>
                  <p className="text-xs font-bold text-gray-400 mt-2 tracking-wide uppercase">{card.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dashboard Visual Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Activity Feed Module */}
          <div className="lg:col-span-2 bg-gray-900/40 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <BarChart3 size={14} className="text-violet-400" /> Incoming Applicant Velocity
              </h3>
            </div>
            <div className="space-y-3.5">
              {recentActivity.map((act) => (
                <div key={act.id} className="flex items-center justify-between p-3.5 bg-gray-950/40 border border-white/5 rounded-xl hover:border-white/10 transition-colors group">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors">{act.candidate}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{act.role}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg">
                    {act.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts Panel */}
          <div className="bg-gray-900/40 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-sm h-fit">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">System Pipelines</h3>
            <div className="space-y-2">
              {[
                { label: "Publish New Vacancy", desc: "Deploy opening specifications", url: "/admin/post-job" },
                { label: "Review Candidate List", desc: "Process application state rules", url: "/admin/applicants" },
              ].map((link, idx) => (
                <a href={link.url} key={idx} className="block p-3.5 bg-gray-950/30 border border-white/5 hover:border-violet-500/20 hover:bg-violet-500/[0.02] rounded-xl group transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-200 group-hover:text-violet-400 transition-colors">{link.label}</span>
                    <ArrowUpRight size={13} className="text-gray-600 group-hover:text-violet-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{link.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}