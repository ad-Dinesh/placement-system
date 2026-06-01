import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Trash2, MapPin, Users, Loader2, Eye } from "lucide-react";




export default function RecruiterJobs() {
  const navigate = useNavigate();
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); // Track which job is being deleted

  // Wrapped in useCallback to prevent recreating the function on every render
  const fetchJobs = useCallback(async (abortController) => {
    try {
      const token = localStorage.getItem("jwt_token");

      const res = await fetch("http://localhost:8000/api/v1/jobs/admin", {
        signal: abortController?.signal, // Cancel request if component unmounts
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data = await res.json();
      setPostedJobs(data.jobs || []);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Fetch Jobs Error:", error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDropJob = async (id) => {
    // Double confirmation to prevent accidental clicks
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      setDeletingId(id); // Set deleting state for this specific item
      const token = localStorage.getItem("jwt_token");

      const res = await fetch(`http://localhost:8000/api/v1/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      alert(data.message || "Job deleted successfully");

      // Refresh list without showing the full page loading spinner
      fetchJobs();
    } catch (error) {
      console.error("Delete Job Error:", error);
      alert("Something went wrong while deleting the job.");
    } finally {
      setDeletingId(null); // Reset deleting state
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchJobs(abortController);

    return () => abortController.abort(); // Cleanup on unmount
  }, [fetchJobs]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col gap-3 items-center justify-center">
        <Loader2 className="animate-spin text-violet-400" size={32} />
        <span className="text-sm font-medium text-gray-400">Loading Jobs...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-10 font-sans antialiased">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              My Jobs
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Manage all jobs created by you.
            </p>
          </div>

          <div className="text-xs text-gray-400 bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-xl px-4 py-2 w-fit shadow-sm">
            Total Jobs{" "}
            <span className="text-violet-400 font-bold ml-1">
              {postedJobs.length}
            </span>
          </div>
        </div>

        {/* Jobs List Wrapper */}
        <div className="space-y-3.5">
          {postedJobs.length === 0 ? (
            <div className="bg-gray-900/20 border border-white/5 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center">
              <div className="p-3 bg-gray-900/60 rounded-xl mb-3 border border-white/5">
                <Briefcase size={22} className="text-gray-500" />
              </div>
              <p className="text-sm font-semibold text-gray-400">
                No jobs posted yet
              </p>
            </div>
          ) : (
            postedJobs.map((job) => {
              const isDeleting = deletingId === job._id;

              return (
                <div
                  key={job._id}
                  className="bg-gray-900/40 border border-white/5 hover:border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200"
                >
                  <div className="space-y-2.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-lg font-bold tracking-tight text-white truncate max-w-md">
                        {job.title}
                      </h3>
                      <span className="text-[10px] bg-white/5 border border-white/5 text-gray-300 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {job.jobType}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-gray-400 leading-none">
                      {job.company?.name || "Unknown Company"}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-violet-400" />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-1 bg-violet-500/5 text-violet-400 px-2 py-0.5 border border-violet-500/10 rounded-md font-bold">
                        <Users size={11} className="mt-0.5" />
                        {job.applicationsCount || 0} Applicants
                      </span>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <button
                    onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                    title="View Applicants"
                    className="p-2.5 border rounded-xl bg-white/[0.01] border-white/10 hover:border-violet-500/30 text-gray-400 hover:text-violet-400"
                  >
                    <Eye size={14} />
                  </button>
                  <div className="flex items-center gap-2 self-end sm:self-center border-t border-white/[0.03] sm:border-0 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleDropJob(job._id)}
                      disabled={isDeleting}
                      title="Delete Job"
                      className={`p-2.5 border rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center
                        ${isDeleting
                          ? "bg-gray-900 border-white/5 text-gray-600 cursor-not-allowed"
                          : "bg-white/[0.01] border-white/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 hover:bg-red-500/5"
                        }`}
                    >
                      {isDeleting ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}