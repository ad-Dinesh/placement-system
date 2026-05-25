import { useEffect, useState } from "react";

export default function RecruiterJobs() {

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetchJobs();

  }, []);


  const fetchJobs = async () => {

    try {

      const token =
        localStorage.getItem("jwt_token");

      const response = await fetch(
        "http://localhost:8000/api/v1/jobs/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      setJobs(data.jobs || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };
  const deleteJob = async (jobId) => {

    try {

      const token =
        localStorage.getItem("jwt_token");

      const response = await fetch(
        `http://localhost:8000/api/v1/jobs/${jobId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        alert("Job Deleted");

        fetchJobs();

      }

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="min-h-screen bg-gray-950 text-white p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADING */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            My Jobs
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all posted jobs
          </p>

        </div>


        {/* LOADING */}
        {loading ? (

          <p className="text-gray-400">
            Loading...
          </p>

        ) : jobs.length === 0 ? (

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">

            <h2 className="text-2xl font-semibold">
              No Jobs Found
            </h2>

            <p className="text-gray-400 mt-2">
              Post your first job
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {jobs.map((job) => (

              <div
                key={job._id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
              >

                <h2 className="text-2xl font-bold">

                  {job.title}

                </h2>

                <p className="text-violet-400 mt-2">

                  {job.company?.name || "Company"}

                </p>


                <div className="mt-4 space-y-2 text-gray-300">

                  <p>
                    📍 {job.location}
                  </p>

                  <p>
                    💰 {job.salary}
                  </p>

                  <p>
                    🧑‍💻 {job.jobType}
                  </p>

                </div>


                {/* BUTTONS */}
                <div className="flex gap-3 mt-6">

                  <Link
                    to={`/recruiter/jobs/${job._id}/applicants`}
                    className="bg-violet-500 hover:bg-violet-600 px-4 py-2 rounded-xl font-medium"
                  >

                    View Applicants

                  </Link>


                  <button
                    onClick={() => deleteJob(job._id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-medium"
                  >

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}