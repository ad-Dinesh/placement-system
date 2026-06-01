import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  MapPin,
  Loader2,
  Users,
  X,
  Check,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function Applicants() {
  const { id } = useParams();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("jwt_token");

      const res = await fetch(
        `http://localhost:8000/api/v1/applications/${id}/applicants`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log(data);

      setCandidates(data.applications || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (id, decision) => {
  try {
    const token = localStorage.getItem("jwt_token");

    const res = await fetch(
      `http://localhost:8000/api/v1/applications/status/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: decision,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update status");
      return;
    }

    setCandidates((prev) =>
      prev.map((c) =>
        c._id === id
          ? { ...c, status: decision }
          : c
      )
    );

    alert(`Candidate ${decision}`);
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Applicants
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : candidates.length === 0 ? (
          <div className="text-center py-20">
            <Users size={40} className="mx-auto mb-3 text-gray-500" />
            <p className="text-gray-400">
              No applicants found
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {candidates.map((cand) => (
              <div
                key={cand._id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5"
              >
                <div className="flex justify-between items-start">

                  <div className="space-y-3">

                    <h2 className="text-xl font-semibold">
                      {cand.applicant?.fullname || "Unknown User"}
                    </h2>

                    <p className="text-gray-400">
                      {cand.applicant?.email}
                    </p>

                    <p className="flex items-center gap-2 text-gray-400">
                      <MapPin size={14} />
                      {cand.applicant?.profile?.location ||
                        "Location not specified"}
                    </p>

                    {(cand.applicant?.profile?.skills || []).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {cand.applicant.profile.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-violet-500/10 text-violet-400 rounded-md text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {cand.applicant?.profile?.resume && (
                      <a
                        href={cand.applicant.profile.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="text-violet-400 underline"
                      >
                        View Resume
                      </a>
                    )}
                  </div>

                  <div>
                    {cand.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleDecision(cand._id, "rejected")
                          }
                          className="px-3 py-2 bg-red-600 rounded"
                        >
                          <X size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleDecision(cand._id, "accepted")
                          }
                          className="px-4 py-2 bg-green-600 rounded flex items-center gap-1"
                        >
                          <Check size={16} />
                          Accept
                        </button>
                      </div>
                    ) : cand.status === "accepted" ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 size={18} />
                        Accepted
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-400">
                        <XCircle size={18} />
                        Rejected
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}