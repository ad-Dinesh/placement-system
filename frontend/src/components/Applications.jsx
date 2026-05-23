import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase, Clock3, CheckCircle2, XCircle, AlertCircle,
  Loader2, FileText, Building2, MapPin, Wallet, Eye,
  Trash2, RefreshCw, ChevronRight, Search, X, Filter,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ── Status config ────────────────────────────────────────────
const STATUS = {
  pending: {
    label: "Under Review",
    icon: Clock3,
    classes: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    dot: "bg-amber-400",
  },
  reviewed: {
    label: "Reviewed",
    icon: Eye,
    classes: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    dot: "bg-blue-400",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    classes: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    dot: "bg-emerald-400",
  },
  rejected: {
    label: "Not Selected",
    icon: XCircle,
    classes: "bg-red-500/10 border-red-500/20 text-red-400",
    dot: "bg-red-400",
  },
};

const FILTER_TABS = ["All", "pending", "reviewed", "accepted", "rejected"];

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60)  return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30)  return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

// ── Withdraw confirm modal ───────────────────────────────────
function WithdrawModal({ app, onCancel, onConfirm, loading }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="w-full max-w-sm bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="w-11 h-11 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mb-4">
          <Trash2 size={18} className="text-red-400" />
        </div>
        <h3 className="text-base font-bold text-white mb-1">Withdraw Application?</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          You're about to withdraw your application for{" "}
          <span className="text-white font-medium">{app?.job?.role}</span> at{" "}
          <span className="text-white font-medium">{app?.job?.company}</span>. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            Keep it
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 text-white text-sm font-bold transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Stat card ────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, colorClass }) {
  return (
    <div className="bg-gray-900 border border-white/8 rounded-xl p-4 flex items-center gap-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xl font-bold text-white leading-tight">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ── Application card ─────────────────────────────────────────
function AppCard({ app, onWithdraw }) {
  const st = STATUS[app.status] || STATUS.pending;
  const Icon = st.icon;

  return (
    <div className="group bg-gray-900 border border-white/8 hover:border-white/15 rounded-2xl p-5 transition-all duration-200">
      <div className="flex items-start gap-4">

        {/* Company logo */}
        <div className="w-11 h-11 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center font-bold text-white text-base shrink-0">
          {(app.job?.company || "?")[0].toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          {/* Top row */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="text-base font-bold text-white leading-tight">{app.job?.role || "Unknown Role"}</h3>
              <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-1">
                <Building2 size={12} className="text-violet-400 shrink-0" />
                {app.job?.company || "Unknown Company"}
              </p>
            </div>

            {/* Status badge */}
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold shrink-0 ${st.classes}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${st.dot} ${app.status === "pending" ? "animate-pulse" : ""}`} />
              <Icon size={11} />
              {st.label}
            </span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
            {app.job?.location && (
              <span className="flex items-center gap-1">
                <MapPin size={11} className="text-violet-400" />{app.job.location}
              </span>
            )}
            {app.job?.salary && (
              <span className="flex items-center gap-1">
                <Wallet size={11} />{app.job.salary}
              </span>
            )}
            {app.job?.type && (
              <span className="flex items-center gap-1">
                <Briefcase size={11} />{app.job.type}
              </span>
            )}
            <span className="flex items-center gap-1 ml-auto">
              <Clock3 size={11} /> Applied {timeAgo(app.createdAt)}
            </span>
          </div>

          {/* Skills */}
          {app.job?.skills?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {app.job.skills.slice(0, 4).map((s) => (
                <span key={s} className="px-2 py-0.5 bg-white/5 border border-white/8 rounded-md text-[11px] text-gray-400">
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Cover letter preview */}
          {app.coverLetter && (
            <p className="mt-3 text-xs text-gray-600 line-clamp-2 bg-white/3 border border-white/5 rounded-lg px-3 py-2 italic">
              "{app.coverLetter}"
            </p>
          )}

          {/* Accepted message */}
          {app.status === "accepted" && (
            <div className="mt-3 flex items-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-lg px-3 py-2 text-xs text-emerald-400">
              <CheckCircle2 size={12} className="shrink-0" />
              Congratulations! The employer has accepted your application. Check your email for next steps.
            </div>
          )}

          {/* Rejected message */}
          {app.status === "rejected" && (
            <div className="mt-3 flex items-center gap-2 bg-red-500/8 border border-red-500/20 rounded-lg px-3 py-2 text-xs text-red-400">
              <XCircle size={12} className="shrink-0" />
              This application was not selected. Keep applying — the right role is out there.
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
            {/* Resume link */}
            {app.resumeUrl ? (
              <a
                href={app.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                <FileText size={12} /> View Resume
              </a>
            ) : (
              <span className="text-xs text-gray-700">No resume link</span>
            )}

            {/* Withdraw — only for pending/reviewed */}
            {["pending", "reviewed"].includes(app.status) && (
              <button
                onClick={() => onWithdraw(app)}
                className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-400 transition-colors"
              >
                <Trash2 size={11} /> Withdraw
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton ─────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-gray-900 border border-white/8 rounded-2xl p-5 animate-pulse">
      <div className="flex gap-4">
        <div className="w-11 h-11 bg-gray-800 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2.5">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-800 rounded w-2/5" />
            <div className="h-5 bg-gray-800 rounded w-24" />
          </div>
          <div className="h-3 bg-gray-800 rounded w-1/4" />
          <div className="flex gap-3 mt-1">
            <div className="h-2.5 bg-gray-800 rounded w-16" />
            <div className="h-2.5 bg-gray-800 rounded w-20" />
          </div>
          <div className="flex gap-1.5 mt-1">
            <div className="h-5 bg-gray-800 rounded w-14" />
            <div className="h-5 bg-gray-800 rounded w-16" />
            <div className="h-5 bg-gray-800 rounded w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [activeTab,    setActiveTab]    = useState("All");
  const [search,       setSearch]       = useState("");
  const [withdrawApp,  setWithdrawApp]  = useState(null);
  const [withdrawing,  setWithdrawing]  = useState(false);

  // ── Fetch applications ───────────────────────────────────
 const fetchApplications = async () => {

  setLoading(true);
  setError("");

  try {

    const token = localStorage.getItem("token");

    console.log("Fetching:", `${API_BASE}/applications/applied`);

    const res = await fetch(
      `${API_BASE}/applications/applied`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }

    const data = await res.json();

    console.log(data);

    setApplications(data.applications || []);

  } catch (err) {

    console.error(err);

    setError(
      err.message || "Failed to load applications."
    );

  } finally {

    setLoading(false);

  }
};
  

  // ── Withdraw ─────────────────────────────────────────────
  const handleWithdraw = async () => {
    if (!withdrawApp) return;
    setWithdrawing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/applications/${withdrawApp._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to withdraw.");
      setApplications((prev) => prev.filter((a) => a._id !== withdrawApp._id));
      setWithdrawApp(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setWithdrawing(false);
    }
  };

  // ── Filter + search ──────────────────────────────────────
  const filtered = applications.filter((app) => {
    const matchesTab    = activeTab === "All" || app.status === activeTab;
    const matchesSearch = !search ||
      app.job?.role?.toLowerCase().includes(search.toLowerCase()) ||
      app.job?.company?.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // ── Stats ────────────────────────────────────────────────
  const counts = {
    total:    applications.length,
    pending:  applications.filter((a) => a.status === "pending").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans antialiased">

      {/* Withdraw modal */}
      {withdrawApp && (
        <WithdrawModal
          app={withdrawApp}
          onCancel={() => setWithdrawApp(null)}
          onConfirm={handleWithdraw}
          loading={withdrawing}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ── Page header ─────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">My Applications</h1>
            <p className="text-gray-400 text-sm mt-1.5">Track every role you've applied to in one place.</p>
          </div>
          <button
            onClick={fetchApplications}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-900 border border-white/10 rounded-xl text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-50"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* ── Stats row ────────────────────────────────────── */}
        {!loading && applications.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <StatCard label="Total Applied"  value={counts.total}    icon={Briefcase}   colorClass="bg-violet-500/15 text-violet-400" />
            <StatCard label="Under Review"   value={counts.pending}  icon={Clock3}      colorClass="bg-amber-500/15 text-amber-400" />
            <StatCard label="Accepted"       value={counts.accepted} icon={CheckCircle2}colorClass="bg-emerald-500/15 text-emerald-400" />
            <StatCard label="Not Selected"   value={counts.rejected} icon={XCircle}     colorClass="bg-red-500/15 text-red-400" />
          </div>
        )}

        {/* ── Search bar ───────────────────────────────────── */}
        {applications.length > 0 && (
          <div className="flex items-center gap-2 bg-gray-900 border border-white/10 rounded-xl px-4 py-2.5 mb-4 focus-within:border-violet-500/40 transition-colors">
            <Search size={14} className="text-gray-500 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role or company..."
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-600"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-600 hover:text-gray-300 transition-colors">
                <X size={13} />
              </button>
            )}
          </div>
        )}

        {/* ── Filter tabs ──────────────────────────────────── */}
        {applications.length > 0 && (
          <div className="flex items-center gap-1.5 mb-6 flex-wrap">
            <Filter size={13} className="text-gray-600 mr-1" />
            {FILTER_TABS.map((tab) => {
              const count = tab === "All"
                ? applications.length
                : applications.filter((a) => a.status === tab).length;
              const st = STATUS[tab];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    activeTab === tab
                      ? tab === "All"
                        ? "bg-violet-500/15 border-violet-500/30 text-violet-300"
                        : `${st.classes}`
                      : "border-white/8 text-gray-500 hover:text-gray-300 hover:border-white/15"
                  }`}
                >
                  {tab === "All" ? "All" : st.label}
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                    activeTab === tab ? "bg-white/10" : "bg-white/5"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Error ───────────────────────────────────────── */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5 text-sm text-red-400">
            <AlertCircle size={15} className="shrink-0" />
            {error}
            <button onClick={fetchApplications} className="ml-auto text-xs underline">Retry</button>
          </div>
        )}

        {/* ── Loading skeletons ────────────────────────────── */}
        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Empty state ──────────────────────────────────── */}
        {!loading && applications.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-gray-900 border border-white/8 rounded-2xl flex items-center justify-center mb-5">
              <Briefcase size={24} className="text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No applications yet</h3>
            <p className="text-sm text-gray-500 max-w-xs mb-6">
              You haven't applied to any jobs yet. Start exploring opportunities and submit your first application.
            </p>
            <Link
              to="/jobs"
              className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 active:scale-95 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all"
            >
              Browse Jobs <ChevronRight size={14} />
            </Link>
          </div>
        )}

        {/* ── No results after filter ──────────────────────── */}
        {!loading && applications.length > 0 && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 bg-gray-900 border border-white/8 rounded-xl flex items-center justify-center mb-4">
              <Search size={18} className="text-gray-600" />
            </div>
            <p className="text-white font-semibold mb-1">No matches found</p>
            <p className="text-sm text-gray-500 mb-4">Try a different search or filter.</p>
            <button
              onClick={() => { setSearch(""); setActiveTab("All"); }}
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
            >
              <X size={13} /> Clear filters
            </button>
          </div>
        )}

        {/* ── Application cards ────────────────────────────── */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((app) => (
              <AppCard
                key={app._id}
                app={app}
                onWithdraw={setWithdrawApp}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}