import { useEffect, useState } from "react";
import {
  Briefcase,
  Users,
  CheckCircle2,
  Clock3,
  Plus,
  TrendingUp,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon: Icon, color, loading }) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${color.bg} ${color.border}`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className={`text-sm font-medium ${color.label}`}>{title}</p>
        {loading ? (
          <div className="h-9 w-16 mt-2 rounded-lg animate-pulse bg-white/10" />
        ) : (
          <h2 className={`text-4xl font-bold mt-1 tracking-tight ${color.value}`}>
            {value.toLocaleString()}
          </h2>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color.iconBg}`}>
        <Icon size={22} className={color.icon} />
      </div>
    </div>
    <div className={`absolute -bottom-4 -right-4 opacity-5`}>
      <Icon size={80} className={color.icon} />
    </div>
  </div>
);

const JobRow = ({ job, index }) => (
  <div
    className="group flex items-center justify-between py-4 border-b border-gray-800/60 last:border-0 transition-colors hover:bg-gray-800/30 -mx-6 px-6"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 rounded-lg bg-violet-900/40 border border-violet-800/50 flex items-center justify-center flex-shrink-0">
        <Briefcase size={15} className="text-violet-400" />
      </div>
      <div>
        <h3 className="font-semibold text-white text-sm leading-tight">{job.title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{job.location || "Location not set"}</p>
      </div>
    </div>
    <Link
      to={`/recruiter/jobs/${job._id}/applicants`}
      className="flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:gap-2.5"
    >
      View Applicants
      <ArrowRight size={13} />
    </Link>
  </div>
);

export default function RecruiterDashboard() {
  const [stats, setStats] = useState({ jobs: 0, applicants: 0, accepted: 0, pending: 0 });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const token = localStorage.getItem("jwt_token");

      const jobsRes = await fetch("http://localhost:8000/api/v1/jobs/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const jobsData = await jobsRes.json();
      const allJobs = jobsData.jobs || [];

      let totalApplicants = 0;
      let accepted = 0;
      let pending = 0;

      await Promise.all(
        allJobs.map(async (job) => {
          try {
            const res = await fetch(
              `http://localhost:8000/api/v1/applications/${job._id}/applicants`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await res.json();
            const applications = data.applications || [];
            totalApplicants += applications.length;
            applications.forEach((app) => {
              if (app.status === "accepted") accepted++;
              if (app.status === "pending") pending++;
            });
          } catch (err) {
            console.log(err);
          }
        })
      );

      setStats({ jobs: allJobs.length, applicants: totalApplicants, accepted, pending });
      setJobs(allJobs.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const cards = [
    {
      title: "Total Jobs",
      value: stats.jobs,
      icon: Briefcase,
      color: {
        bg: "bg-gray-900",
        border: "border-gray-800",
        label: "text-gray-400",
        value: "text-white",
        iconBg: "bg-gray-800",
        icon: "text-gray-300",
      },
    },
    {
      title: "Total Applicants",
      value: stats.applicants,
      icon: Users,
      color: {
        bg: "bg-violet-950/60",
        border: "border-violet-900/50",
        label: "text-violet-300",
        value: "text-violet-100",
        iconBg: "bg-violet-900/60",
        icon: "text-violet-400",
      },
    },
    {
      title: "Accepted",
      value: stats.accepted,
      icon: CheckCircle2,
      color: {
        bg: "bg-emerald-950/60",
        border: "border-emerald-900/50",
        label: "text-emerald-300",
        value: "text-emerald-100",
        iconBg: "bg-emerald-900/60",
        icon: "text-emerald-400",
      },
    },
    {
      title: "Pending Review",
      value: stats.pending,
      icon: Clock3,
      color: {
        bg: "bg-amber-950/60",
        border: "border-amber-900/50",
        label: "text-amber-300",
        value: "text-amber-100",
        iconBg: "bg-amber-900/60",
        icon: "text-amber-400",
      },
    },
  ];

  const acceptRate =
    stats.applicants > 0
      ? Math.round((stats.accepted / stats.applicants) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                Recruiter Portal
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              Monitor your hiring pipeline at a glance
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchDashboard(true)}
              disabled={refreshing}
              className="p-2.5 rounded-xl border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 hover:bg-gray-800 transition-all disabled:opacity-40"
              title="Refresh"
            >
              <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            </button>

            <Link
              to="/recruiter/post-job"
              className="bg-violet-600 hover:bg-violet-500 active:bg-violet-700 px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition-colors shadow-lg shadow-violet-900/30"
            >
              <Plus size={16} />
              Post a Job
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cards.map((card) => (
            <StatCard key={card.title} {...card} loading={loading} />
          ))}
        </div>

        {/* Acceptance Rate Banner */}
        {!loading && stats.applicants > 0 && (
          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/50 p-4 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-violet-900/40 border border-violet-800/40">
              <TrendingUp size={18} className="text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1.5">Overall acceptance rate</p>
              <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-600 to-emerald-500 rounded-full transition-all duration-700"
                  style={{ width: `${acceptRate}%` }}
                />
              </div>
            </div>
            <span className="text-lg font-bold text-white tabular-nums">{acceptRate}%</span>
          </div>
        )}

        {/* Recent Jobs */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Recent Jobs</h2>
            <Link
              to="/recruiter/jobs"
              className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4 mt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div className="w-9 h-9 rounded-lg bg-gray-800" />
                  <div className="flex-1">
                    <div className="h-3.5 w-1/3 rounded bg-gray-800 mb-2" />
                    <div className="h-3 w-1/5 rounded bg-gray-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-3">
                <Briefcase size={22} className="text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm">No jobs posted yet</p>
              <Link
                to="/recruiter/post-job"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300"
              >
                <Plus size={14} /> Post your first job
              </Link>
            </div>
          ) : (
            <div className="mt-2">
              {jobs.map((job, i) => (
                <JobRow key={job._id} job={job} index={i} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}