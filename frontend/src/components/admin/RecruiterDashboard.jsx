import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase, Users, Eye, CheckCircle2, XCircle, Clock3,
  Plus, ChevronRight, Loader2, AlertCircle, TrendingUp,
  Building2, MapPin, Wallet, BarChart2, ArrowUpRight,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ── Helpers ───────────────────────────────────────────────────
function timeAgo(d) {
  if (!d) return "";
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 3600)  return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

const APP_STATUS = {
  pending:  { label: "Pending",  color: "text-amber-400",   bg: "bg-amber-400/10",   dot: "bg-amber-400" },
  reviewed: { label: "Reviewed", color: "text-blue-400",    bg: "bg-blue-400/10",    dot: "bg-blue-400" },
  accepted: { label: "Accepted", color: "text-emerald-400", bg: "bg-emerald-400/10", dot: "bg-emerald-400" },
  rejected: { label: "Rejected", color: "text-red-400",     bg: "bg-red-400/10",     dot: "bg-red-400" },
};

// ── Stat card ─────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, accent, to }) {
  const inner = (
    <div className={`bg-gray-900 border border-white/8 rounded-xl p-5 flex items-center gap-4 hover:border-white/15 transition-all ${to ? "cursor-pointer" : ""}`}>
      <div className={`w-10 h-10 ${accent} rounded-xl flex items-center justify-center shrink-0`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold text-white leading-none">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{label}</p>
      </div>
      {to && <ChevronRight size={14} className="text-gray-700 shrink-0" />}
    </div>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
}

// ── Job row ───────────────────────────────────────────────────
function JobRow({ job }) {
  const isActive = job.status !== "paused" && job.status !== "closed";
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors border-b border-white/5 last:border-0">
      <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">
        {(job.company?.[0] || "J").toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{job.title || job.role}</p>
        <div className="flex items-center gap-3 mt-0.5 text-[11px] text-gray-500">
          {job.location && <span className="flex items-center gap-1"><MapPin size={9} className="text-violet-400" />{job.location}</span>}
          {job.type     && <span>{job.type}</span>}
          <span className="flex items-center gap-1"><Clock3 size={9} />{timeAgo(job.createdAt)}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-center">
          <p className="text-sm font-bold text-white">{job.applicantCount || 0}</p>
          <p className="text-[10px] text-gray-600">applicants</p>
        </div>
        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
          isActive
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            : "bg-gray-500/10 border-gray-500/20 text-gray-500"
        }`}>
          {isActive ? "Active" : "Paused"}
        </span>
        <Link
          to={`/recruiter/jobs/${job._id}/applicants`}
          className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
        >
          <Eye size={12} /> View
        </Link>
      </div>
    </div>
  );
}

// ── Applicant row ─────────────────────────────────────────────
function ApplicantRow({ app }) {
  const st = APP_STATUS[app.status] || APP_STATUS.pending;
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors border-b border-white/5 last:border-0">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">
        {(app.applicant?.name?.[0] || "?").toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{app.applicant?.name || "Unknown"}</p>
        <p className="text-[11px] text-gray-500 truncate mt-0.5">
          Applied for <span className="text-gray-400">{app.job?.title || app.job?.role}</span> · {timeAgo(app.createdAt)}
        </p>
      </div>
      <div className="flex items-center gap-2.5 shrink-0">
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${st.color} ${st.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${st.dot} ${app.status === "pending" ? "animate-pulse" : ""}`} />
          {st.label}
        </span>
        <Link
          to={`/recruiter/jobs/${app.job?._id}/applicants`}
          className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
        >
          Review
        </Link>
      </div>
    </div>
  );
}

// ── Section card ──────────────────────────────────────────────
function Card({ title, viewAllTo, viewAllLabel, empty, emptyIcon: EmptyIcon, emptyAction, children }) {
  return (
    <div className="bg-gray-900 border border-white/8 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
        <h2 className="text-sm font-bold text-white">{title}</h2>
        {viewAllTo && (
          <Link to={viewAllTo} className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">
            {viewAllLabel || "View all"} <ChevronRight size={12} />
          </Link>
        )}
      </div>
      {empty ? (
        <div className="flex flex-col items-center justify-center py-12 text-center px-4">
          <div className="w-10 h-10 bg-white/5 border border-white/8 rounded-xl flex items-center justify-center mb-3">
            <EmptyIcon size={18} className="text-gray-600" />
          </div>
          <p className="text-sm text-gray-400 font-medium mb-1">Nothing here yet</p>
          {emptyAction}
        </div>
      ) : children}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
export default function RecruiterDashboard() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        const h = { Authorization: `Bearer ${token}` };

        const [statsRes, jobsRes, appsRes, profileRes] = await Promise.all([
          fetch(`${API_BASE}/recruiter/stats`,               { headers: h }),
          fetch(`${API_BASE}/recruiter/jobs?limit=5`,        { headers: h }),
          fetch(`${API_BASE}/recruiter/applications?limit=5`,{ headers: h }),
          fetch(`${API_BASE}/users/profile`,                 { headers: h }),
        ]);

        const stats   = statsRes.ok   ? await statsRes.json()   : {};
        const jobs    = jobsRes.ok    ? await jobsRes.json()    : [];
        const apps    = appsRes.ok    ? await appsRes.json()    : [];
        const profile = profileRes.ok ? await profileRes.json() : {};

        setData({ stats, jobs: jobs.jobs || jobs, apps: apps.applications || apps, profile });
      } catch (err) {
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <Loader2 size={22} className="animate-spin text-violet-400" />
    </div>
  );

  const { stats = {}, jobs = [], apps = [], profile = {} } = data || {};

  const statCards = [
    { icon: Briefcase,   label: "Jobs Posted",       value: stats.totalJobs        || 0, accent: "bg-violet-500/15 text-violet-400",  to: "/recruiter/jobs" },
    { icon: Users,       label: "Total Applicants",  value: stats.totalApplicants  || 0, accent: "bg-blue-500/15 text-blue-400",      to: "/recruiter/applicants" },
    { icon: CheckCircle2,label: "Accepted",           value: stats.accepted         || 0, accent: "bg-emerald-500/15 text-emerald-400" },
    { icon: Clock3,      label: "Pending Review",    value: stats.pending          || 0, accent: "bg-amber-500/15 text-amber-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
            <AlertCircle size={14} className="shrink-0" />{error}
          </div>
        )}

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""} 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {profile?.company
                ? <span className="flex items-center gap-1.5"><Building2 size={13} className="text-violet-400" />{profile.company}</span>
                : "Here's your recruiting overview."
              }
            </p>
          </div>
          <Link
            to="/recruiter/post-job"
            className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 active:scale-95 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
          >
            <Plus size={15} /> Post a Job
          </Link>
        </div>

        {/* ── Stats ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statCards.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        {/* ── Hiring funnel ──────────────────────────────────── */}
        {(stats.totalApplicants > 0) && (
          <div className="bg-gray-900 border border-white/8 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 size={15} className="text-violet-400" />
              <h2 className="text-sm font-bold text-white">Hiring funnel</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Applied",   value: stats.totalApplicants || 0, color: "bg-violet-500",  w: 100 },
                { label: "Reviewed",  value: stats.reviewed        || 0, color: "bg-blue-500",    w: stats.totalApplicants ? Math.round((stats.reviewed / stats.totalApplicants) * 100) : 0 },
                { label: "Accepted",  value: stats.accepted        || 0, color: "bg-emerald-500", w: stats.totalApplicants ? Math.round((stats.accepted / stats.totalApplicants) * 100) : 0 },
                { label: "Rejected",  value: stats.rejected        || 0, color: "bg-red-500",     w: stats.totalApplicants ? Math.round((stats.rejected / stats.totalApplicants) * 100) : 0 },
              ].map(({ label, value, color, w }) => (
                <div key={label}>
                  <div className="flex items-end justify-between mb-1.5">
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-xs font-bold text-white">{value}</p>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${w}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Two col: Jobs + Applicants ──────────────────────── */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* Recent jobs */}
          <Card
            title="Recent job postings"
            viewAllTo="/recruiter/jobs"
            viewAllLabel="Manage jobs"
            empty={jobs.length === 0}
            emptyIcon={Briefcase}
            emptyAction={
              <Link to="/recruiter/post-job"
                className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors mt-1">
                <Plus size={12} /> Post your first job
              </Link>
            }
            
          >
            {jobs.map((job) => <JobRow key={job._id} job={job} />)}
          </Card>

          {/* Recent applicants */}
          <Card
            title="Recent applicants"
            viewAllTo="/recruiter/applicants"
            empty={apps.length === 0}
            emptyIcon={Users}
            emptyAction={
              <p className="text-xs text-gray-600 mt-1">Applicants appear here once you post jobs.</p>
            }
          >
            {apps.map((app) => <ApplicantRow key={app._id} app={app} />)}
          </Card>
        </div>

        {/* ── Quick actions ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "Post a new job",      desc: "Create a new listing",          icon: Plus,       to: "/recruiter/post-job",     accent: "text-violet-400" },
            { label: "Manage job listings", desc: "Edit, pause or delete jobs",     icon: Briefcase,  to: "/recruiter/jobs",         accent: "text-blue-400" },
            { label: "Review applicants",   desc: "Accept or reject candidates",    icon: Users,      to: "/recruiter/applicants",   accent: "text-emerald-400" },
          ].map(({ label, desc, icon: Icon, to, accent }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-4 bg-gray-900 border border-white/8 hover:border-white/15 rounded-xl p-4 transition-all group"
            >
              <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                <Icon size={16} className={`${accent} group-hover:scale-110 transition-transform`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
              <ArrowUpRight size={14} className="text-gray-700 group-hover:text-gray-400 transition-colors shrink-0" />
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}