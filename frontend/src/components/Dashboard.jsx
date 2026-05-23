import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Briefcase, BookmarkCheck, CheckCircle2, Clock3, XCircle,
    Eye, TrendingUp, MapPin, Wallet, ChevronRight, Edit3,
    Upload, Plus, Trash2, Loader2, AlertCircle, Star,
    Bell, Settings, LogOut, Camera, ExternalLink, Award,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// ── Date and Content Helpers ─────────────────────────────────
function timeAgo(dateString) {
    if (!dateString) return "Recently";
    const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

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

const STATUS_MAP = {
    pending: { label: "Under Review", icon: Clock3, cls: "text-amber-400 bg-amber-500/10 border-amber-500/20", dot: "bg-amber-400 animate-pulse" },
    reviewed: { label: "Reviewed", icon: Eye, cls: "text-blue-400 bg-blue-500/10 border-blue-500/20", dot: "bg-blue-400" },
    accepted: { label: "Accepted", icon: CheckCircle2, cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400" },
    rejected: { label: "Not Selected", icon: XCircle, cls: "text-red-400 bg-red-500/10 border-red-500/20", dot: "bg-red-400" },
};

// ── Stat Card Presentation Component ──────────────────────────
function StatCard({ icon: Icon, label, value, sub, accent }) {
    return (
        <div className="bg-gray-900/50 border border-white/5 backdrop-blur-sm rounded-2xl p-5 flex flex-col gap-3 hover:border-white/10 hover:bg-gray-900/80 transition-all duration-300 shadow-xl">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent} shadow-inner`}>
                <Icon size={18} />
            </div>
            <div>
                <p className="text-3xl dmsans font-bold text-white tracking-tight leading-none">{value}</p>
                <p className="text-xs font-semibold text-gray-400 tracking-wide mt-1.5">{label}</p>
                {sub && <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{sub}</p>}
            </div>
        </div>
    );
}

// ── Layout Section Wrapper ────────────────────────────────────
function Section({ title, action, actionTo, onClickAction, children }) {
    return (
        <div className="bg-gray-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.01]">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-300">{title}</h2>
                {action && (
                    actionTo ? (
                        <Link to={actionTo} className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors font-semibold">
                            {action} <ChevronRight size={13} />
                        </Link>
                    ) : (
                        <button onClick={onClickAction} className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors font-semibold">
                            {action} <ChevronRight size={13} />
                        </button>
                    )
                )}
            </div>
            {children}
        </div>
    );
}

// ── Profile Edit Modal Overlay ─────────────────────────────────
function ProfileModal({ profile, onClose, onSave }) {
    const [form, setForm] = useState({
        name: profile?.name || "",
        title: profile?.title || "",
        location: profile?.location || "",
        bio: profile?.bio || "",
        github: profile?.github || "",
        linkedin: profile?.linkedin || "",
    });
    const [saving, setSaving] = useState(false);
    const [skillInput, setSkillInput] = useState("");
    const [skills, setSkills] = useState(profile?.skills || []);

    const addSkill = () => {
        const s = skillInput.trim();
        if (s && !skills.includes(s)) { setSkills([...skills, s]); setSkillInput(""); }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/users/profile`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ ...form, skills }),
            });
            if (!res.ok) throw new Error("Failed to save changes");
            const data = await res.json();
            onSave(data);
            onClose();
        } catch {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 animate-fadeIn"
            onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="w-full max-w-lg bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.01]">
                    <h3 className="text-sm font-bold text-white tracking-wide">Edit Corporate Profile</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-white hover:bg-white/5 p-1 rounded-lg transition-colors"><XCircle size={18} /></button>
                </div>
                
                <div className="overflow-y-auto p-5 space-y-4 custom-scrollbar">
                    {[
                        { label: "Full Professional Name", key: "name", placeholder: "e.g. Dharavath Dinesh" },
                        { label: "Target Job Title", key: "title", placeholder: "e.g. MERN Full Stack Developer" },
                        { label: "Location Coordinates", key: "location", placeholder: "e.g. Hyderabad, India" },
                        { label: "GitHub URL", key: "github", placeholder: "https://github.com/..." },
                        { label: "LinkedIn URL", key: "linkedin", placeholder: "https://linkedin.com/in/..." },
                    ].map(({ label, key, placeholder }) => (
                        <div key={key}>
                            <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">{label}</label>
                            <input
                                value={form[key]}
                                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                placeholder={placeholder}
                                className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-700 outline-none focus:border-violet-500/50 transition-colors shadow-inner"
                            />
                        </div>
                    ))}
                    <div>
                        <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">Executive Summary (Bio)</label>
                        <textarea
                            value={form.bio}
                            onChange={(e) => setForm({ ...form, bio: e.target.value })}
                            rows={3}
                            placeholder="Briefly state your core technologies, experience parameters, and career goals..."
                            className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-700 outline-none resize-none focus:border-violet-500/50 transition-colors shadow-inner"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">Core Engineering Skills</label>
                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                            {skills.map((s) => (
                                <span key={s} className="flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium rounded-lg">
                                    {s}
                                    <button onClick={() => setSkills(skills.filter((x) => x !== s))} className="hover:text-red-400 p-0.5 rounded transition-colors"><Trash2 size={11} /></button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                intent="none"
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                                placeholder="Add custom technology tag (press Enter)"
                                className="flex-1 bg-gray-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-gray-700 outline-none focus:border-violet-500/50 transition-colors shadow-inner"
                            />
                            <button onClick={addSkill} className="px-3.5 bg-violet-500/15 border border-violet-500/30 rounded-xl text-violet-400 hover:bg-violet-500/25 active:scale-95 transition-all flex items-center justify-center">
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 px-5 py-4 border-t border-white/10 bg-white/[0.01]">
                    <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all">Cancel</button>
                    <button onClick={handleSave} disabled={saving}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 active:scale-[0.98] text-white text-sm font-bold transition-all disabled:opacity-50 shadow-lg shadow-violet-950/40">
                        {saving ? <Loader2 size={15} className="animate-spin" /> : null}
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

// ════════════════════════════════════════════════════════════
// ── Main Seeker Dashboard Component ──────────────────────────
// ════════════════════════════════════════════════════════════
export default function SeekerDashboard() {
    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editOpen, setEditOpen] = useState(false);
    const [resumeLoading, setResumeLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        const fetchDashboardPayload = async () => {
            setLoading(true);
            setError("");
            try {
                const token = localStorage.getItem("token");
                const headers = { Authorization: `Bearer ${token}` };

                const [profRes, appsRes, savedRes] = await Promise.all([
                    fetch(`${API_BASE}/users/profile`, { headers }),
                    fetch(`${API_BASE}/applications/applied`, { headers }),
                    fetch(`${API_BASE}/users/saved-jobs`, { headers }),
                ]);

                if (profRes.ok) {
                    const profileData = await profRes.json();
                    setProfile(profileData);
                }

                if (appsRes.ok) {
                    const appsData = await appsRes.json();
                    setApplications(appsData.applications || appsData || []);
                }

                if (savedRes.ok) {
                    const savedData = await savedRes.json();
                    setSavedJobs(savedData.jobs || savedData || []);
                }
            } catch (err) {
                setError("Engine network failure: Failed to sync dashboard telemetry.");
            } {
                setLoading(false);
            }
        };
        fetchDashboardPayload();
    }, []);

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setResumeLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const fd = new FormData();
            fd.append("resume", file);
            const res = await fetch(`${API_BASE}/users/resume`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });
            if (!res.ok) throw new Error("Upload aborted by core server");
            const data = await res.json();
            setProfile((p) => ({ ...p, resumeUrl: data.resumeUrl }));
        } catch {
            setError("Resume pipeline error: File system upload rejected.");
        } finally {
            setResumeLoading(false);
        }
    };

    const handleUnsave = async (jobId) => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`${API_BASE}/users/saved-jobs/${jobId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setSavedJobs((prev) => prev.filter((j) => (j._id || j.id) !== jobId));
        } catch { }
    };

    // ── Metric Accumulators ───────────────────────────────────
    const stats = {
        total: applications?.length || 0,
        pending: applications?.filter((a) => a.status === "pending").length || 0,
        accepted: applications?.filter((a) => a.status === "accepted").length || 0,
        saved: savedJobs?.length || 0,
    };

    const profileComplete = profile ? [
        profile.name, profile.title, profile.location,
        profile.bio, profile.resumeUrl, profile.skills?.length,
    ].filter(Boolean).length : 0;
    const profilePct = Math.round((profileComplete / 6) * 100);

    if (loading) return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="flex items-center gap-3 text-gray-500 bg-gray-900/40 border border-white/5 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-sm">
                <Loader2 size={18} className="animate-spin text-violet-400" />
                <span className="text-xs font-semibold tracking-wide uppercase">Syncing Dashboard Data...</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans antialiased">
            {editOpen && (
                <ProfileModal
                    profile={profile}
                    onClose={() => setEditOpen(false)}
                    onSave={(updated) => setProfile(updated)}
                />
            )}

            <div className="max-w-6xl mx-auto px-4 py-12">
                {error && (
                    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3.5 mb-6 text-sm text-red-400 shadow-xl animate-fadeIn">
                        <AlertCircle size={16} className="shrink-0" />
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                {/* ── Top Hero Component Area ────────────────────────── */}
                <div className="bg-gray-900 border border-white/5 rounded-3xl p-6 mb-8 relative overflow-hidden shadow-2xl backdrop-blur-md">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/[0.03] rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
                        {/* Avatar Column */}
                        <div className="relative shrink-0 group">
                          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-violet-950/40">
                              {profile?.name?.[0]?.toUpperCase() || "U"}
                          </div>
                          <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-800 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors shadow-md">
                              <Camera size={12} />
                          </button>
                        </div>

                        {/* Metadata Text Details Stack */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
                                        {profile?.name || "Anonymous Developer"}
                                    </h1>
                                    <p className="text-sm font-semibold text-violet-400 mt-0.5">{profile?.title || "Add specialized technology title"}</p>
                                    {profile?.location && (
                                        <p className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-2">
                                            <MapPin size={13} className="text-violet-400/80" />{profile.location}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <button
                                        onClick={() => setEditOpen(true)}
                                        className="flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 hover:border-violet-500/40 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all shadow-md bg-white/[0.01]"
                                    >
                                        <Edit3 size={13} /> Edit Profile
                                    </button>
                                    <Link to="/settings" className="flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-md bg-white/[0.01]">
                                        <Settings size={13} /> Settings
                                    </Link>
                                </div>
                            </div>

                            {profile?.bio && (
                                <p className="text-sm text-gray-400 mt-3 leading-relaxed max-w-2xl">{profile.bio}</p>
                            )}

                            {profile?.skills?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-4">
                                    {profile.skills.map((s) => (
                                        <span key={s} className="px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium rounded-lg">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-white/[0.03]">
                                {profile?.github && (
                                    <a href={profile.github} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-white transition-colors">
                                        <ExternalLink size={12} /> GitHub Profile
                                    </a>
                                )}
                                {profile?.linkedin && (
                                    <a href={profile.linkedin} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-white transition-colors">
                                        <ExternalLink size={12} /> LinkedIn Network
                                    </a>
                                )}
                                <label className={`flex items-center gap-2 cursor-pointer text-xs font-bold px-3 py-2 rounded-xl border transition-all shadow-sm ${profile?.resumeUrl
                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                        : "bg-white/5 border-white/10 text-gray-400 hover:border-violet-500/40 hover:text-white bg-white/[0.01]"
                                    }`}>
                                    {resumeLoading
                                        ? <Loader2 size={13} className="animate-spin" />
                                        : profile?.resumeUrl ? <CheckCircle2 size={13} /> : <Upload size={13} />
                                    }
                                    <span>{profile?.resumeUrl ? "Resume Synced" : "Upload Resume Asset"}</span>
                                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeUpload} />
                                </label>
                            </div>
                        </div>

                        {/* Completion Metrics Radial Dial */}
                        <div className="shrink-0 flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-4 min-w-[110px] shadow-inner self-stretch sm:self-center">
                            <div className="relative w-14 h-14">
                                <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
                                    <circle cx="28" cy="28" r="22" fill="none" stroke="#1f2937" strokeWidth="4.5" />
                                    <circle cx="28" cy="28" r="22" fill="none" stroke="#8b5cf6" strokeWidth="4.5"
                                        strokeDasharray={`${2 * Math.PI * 22}`}
                                        strokeDashoffset={`${2 * Math.PI * 22 * (1 - profilePct / 100)}`}
                                        strokeLinecap="round" className="transition-all Swan-Ring duration-1000 ease-out" />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-white tracking-tighter">
                                    {profilePct}%
                                </span>
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-2.5 text-center leading-tight">Profile<br />Complete</p>
                        </div>
                    </div>
                </div>

                {/* ── Segmented Navigation View Controls ──────────────── */}
                <div className="flex gap-1 mb-6 bg-gray-900 border border-white/5 rounded-xl p-1 w-fit shadow-md">
                    {[
                        { id: "overview", label: "Overview Hub" },
                        { id: "applications", label: `Applications (${stats.total})` },
                        { id: "saved", label: `Saved Jobs (${stats.saved})` },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${activeTab === tab.id
                                    ? "bg-violet-500 text-white shadow-md shadow-violet-950/50"
                                    : "text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── TAB INTERFACES STACK ────────────────────────────── */}
                
                {/* INTERFACE PANEL A: OVERVIEW ENGINE */}
                {activeTab === "overview" && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard icon={Briefcase} label="Total Applied" value={stats.total} accent="bg-violet-500/10 text-violet-400 border border-violet-500/10" />
                            <StatCard icon={Clock3} label="Under Review" value={stats.pending} accent="bg-amber-500/10 text-amber-400 border border-amber-500/10" />
                            <StatCard icon={CheckCircle2} label="Accepted Offers" value={stats.accepted} accent="bg-emerald-500/10 text-emerald-400 border border-emerald-500/10" />
                            <StatCard icon={BookmarkCheck} label="Saved Vacancies" value={stats.saved} accent="bg-blue-500/10 text-blue-400 border border-blue-500/10" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Short-feed recent applications card row */}
                            <Section title="Recent Activity" action="View full history" onClickAction={() => setActiveTab("applications")}>
                                {applications.length === 0 ? (
                                    <div className="px-5 py-12 text-center flex flex-col items-center">
                                        <Briefcase size={22} className="text-gray-700 mb-2.5" />
                                        <p className="text-sm font-semibold text-gray-400">No recent submittals</p>
                                        <Link to="/jobs" className="text-xs font-bold text-violet-400 hover:text-violet-300 mt-2.5 inline-flex items-center gap-0.5">
                                            Search Live Vacancies <ChevronRight size={13} />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-white/5">
                                        {applications.slice(0, 4).map((app) => {
                                            const st = STATUS_MAP[app.status] || STATUS_MAP.pending;
                                            const StatusIcon = st.icon;
                                            const brandStyle = getBrandStyle(app.job?.company || "?");
                                            return (
                                                <div key={app._id || app.id} className="flex items-center gap-3.5 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                                                    <div className={`w-9 h-9 bg-gradient-to-br ${brandStyle} rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md`}>
                                                        {(app.job?.company || "?")[0].toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-white truncate leading-snug">{app.job?.role}</p>
                                                        <p className="text-xs font-medium text-gray-400 truncate mt-0.5">{app.job?.company} · {timeAgo(app.createdAt)}</p>
                                                    </div>
                                                    <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border text-[10px] font-bold tracking-wide shrink-0 ${st.cls}`}>
                                                        <span className={`w-1 h-1 rounded-full ${st.dot}`} />
                                                        <StatusIcon size={10} />
                                                        {st.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </Section>

                            {/* Short-feed saved jobs block row */}
                            <Section title="Bookmarked Profiles" action="Configure list" onClickAction={() => setActiveTab("saved")}>
                                {savedJobs.length === 0 ? (
                                    <div className="px-5 py-12 text-center flex flex-col items-center">
                                        <Star size={22} className="text-gray-700 mb-2.5" />
                                        <p className="text-sm font-semibold text-gray-400">No saved roles</p>
                                        <Link to="/jobs" className="text-xs font-bold text-violet-400 hover:text-violet-300 mt-2.5 inline-flex items-center gap-0.5">
                                            Bookmark open roles <ChevronRight size={13} />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-white/5">
                                        {savedJobs.slice(0, 4).map((job) => {
                                            const brandStyle = getBrandStyle(job.company || "?");
                                            return (
                                                <div key={job._id || job.id} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors group">
                                                    <div className="flex items-center gap-3.5 min-w-0">
                                                        <div className={`w-9 h-9 bg-gradient-to-br ${brandStyle} rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md`}>
                                                            {(job.company || "?")[0].toUpperCase()}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-bold text-white truncate leading-snug">{job.role}</p>
                                                            <p className="text-xs font-medium text-gray-400 truncate mt-0.5">{job.company} · {job.location || "Remote"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                                                        <Link to={`/jobs?q=${job.role}`}
                                                            className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-violet-400 hover:bg-violet-500/10 transition-all">
                                                            <Eye size={13} />
                                                        </Link>
                                                        <button onClick={() => handleUnsave(job._id || job.id)}
                                                            className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </Section>
                        </div>
                    </div>
                )}

                {/* INTERFACE PANEL B: COMPREHENSIVE SUBMITTALS PIPELINE */}
                {activeTab === "applications" && (
                    <div className="space-y-3.5 animate-fadeIn">
                        {applications.length === 0 ? (
                            <div className="bg-gray-900 border border-white/5 rounded-3xl flex flex-col items-center py-20 text-center shadow-xl">
                                <Briefcase size={36} className="text-gray-700 mb-4" />
                                <h3 className="text-lg font-bold text-gray-200">No application traces logged</h3>
                                <p className="text-sm text-gray-500 mb-6 max-w-sm leading-relaxed">Initialize a direct workspace application on the central job feed engine to establish structural metric tracking vectors.</p>
                                <Link to="/jobs" className="flex items-center gap-1.5 bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md shadow-violet-950/40">
                                    Initialize Search <ChevronRight size={14} />
                                </Link>
                            </div>
                        ) : (
                            applications.map((app) => {
                                const st = STATUS_MAP[app.status] || STATUS_MAP.pending;
                                const StatusIcon = st.icon;
                                const brandStyle = getBrandStyle(app.job?.company || "?");
                                return (
                                    <div key={app._id || app.id} className="bg-gray-900 border border-white/5 hover:border-white/10 rounded-2xl p-5 shadow-xl transition-all duration-200">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-11 h-11 bg-gradient-to-br ${brandStyle} rounded-2xl flex items-center justify-center text-white text-base font-black shrink-0 shadow-lg`}>
                                                {(app.job?.company || "?")[0].toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                                    <div>
                                                        <h4 className="text-base font-bold text-white tracking-tight leading-snug">{app.job?.role}</h4>
                                                        <p className="text-xs font-semibold text-gray-400 mt-0.5">{app.job?.company}</p>
                                                    </div>
                                                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-bold tracking-wide ${st.cls} shadow-sm`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                                                        <StatusIcon size={12} />
                                                        {st.label}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-xs text-gray-500 font-medium">
                                                    {app.job?.location && <span className="flex items-center gap-1.5"><MapPin size={13} className="text-violet-400" />{app.job.location}</span>}
                                                    {app.job?.salary && <span className="flex items-center gap-1.5"><Wallet size={13} />{app.job.salary}</span>}
                                                    <span className="flex items-center gap-1.5"><Clock3 size={13} />Dispatched {timeAgo(app.createdAt)}</span>
                                                </div>

                                                {app.job?.skills?.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-3.5">
                                                        {app.job.skills.slice(0, 5).map((skill) => (
                                                            <span key={skill} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-md text-[10px] text-gray-400 font-medium tracking-wide">{skill}</span>
                                                        ))}
                                                    </div>
                                                )}

                                                {app.status === "accepted" && (
                                                    <div className="mt-4 flex items-start gap-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-xs text-emerald-400 font-medium shadow-inner animate-scaleIn">
                                                        <Award size={14} className="shrink-0 mt-0.5" />
                                                        <span>Offer Document Dispatched! Check your configured email framework account to process sequential interview files from the {app.job?.company} human resource coordinator.</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}

                {/* INTERFACE PANEL C: PERSISTENT BOOKMARKS MANIFEST */}
                {activeTab === "saved" && (
                    <div className="space-y-3.5 animate-fadeIn">
                        {savedJobs.length === 0 ? (
                            <div className="bg-gray-900 border border-white/5 rounded-3xl flex flex-col items-center py-20 text-center shadow-xl">
                                <Star size={36} className="text-gray-700 mb-4" />
                                <h3 className="text-lg font-bold text-gray-200">Saved manifest unpopulated</h3>
                                <p className="text-sm text-gray-500 mb-6 max-w-sm leading-relaxed">Toggle bookmark primitives on active job cards to construct an index of high-interest operational roles.</p>
                                <Link to="/jobs" className="flex items-center gap-1.5 bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md shadow-violet-950/40">
                                    Explore Job Boards <ChevronRight size={14} />
                                </Link>
                            </div>
                        ) : (
                            savedJobs.map((job) => {
                                const brandStyle = getBrandStyle(job.company || "?");
                                return (
                                    <div key={job._id || job.id} className="bg-gray-900 border border-white/5 hover:border-white/10 rounded-2xl p-5 shadow-xl transition-all duration-200 group">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-11 h-11 bg-gradient-to-br ${brandStyle} rounded-2xl flex items-center justify-center text-white text-base font-black shrink-0 shadow-lg`}>
                                                {(job.company || "?")[0].toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h4 className="text-base font-bold text-white tracking-tight leading-snug">{job.role}</h4>
                                                        <p className="text-xs font-semibold text-gray-400 mt-0.5">{job.company}</p>
                                                    </div>
                                                    <button onClick={() => handleUnsave(job._id || job.id)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-red-500/10 border border-white/5 rounded-xl text-xs font-semibold text-gray-500 hover:text-red-400 transition-all shrink-0 bg-white/[0.01]">
                                                        <Trash2 size={13} /> <span className="hidden sm:inline">Delete Bookmark</span>
                                                    </button>
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-xs text-gray-500 font-medium">
                                                    {job.location && <span className="flex items-center gap-1.5"><MapPin size={13} className="text-violet-400" />{job.location}</span>}
                                                    {job.salary && <span className="flex items-center gap-1.5"><Wallet size={13} />{job.salary}</span>}
                                                    {job.type && <span className="flex items-center gap-1.5"><Briefcase size={13} />{job.type}</span>}
                                                </div>

                                                {job.skills?.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-3.5">
                                                        {job.skills.slice(0, 5).map((skill) => (
                                                            <span key={skill} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-md text-[10px] text-gray-400 font-medium tracking-wide">{skill}</span>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex gap-2.5 mt-5 pt-4 border-t border-white/[0.03]">
                                                    <Link to={`/jobs?q=${job.role}`}
                                                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 text-gray-400 hover:text-violet-400 hover:bg-violet-500/5 text-xs font-bold transition-all bg-white/[0.01]">
                                                        <Eye size={13} /> View Comprehensive Spec
                                                    </Link>
                                                    <Link to={`/jobs?q=${job.role}`}
                                                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-xs font-black tracking-wide uppercase shadow-md shadow-violet-950/20 transition-all active:scale-[0.99]">
                                                        Initialize Direct Application <ChevronRight size={13} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}