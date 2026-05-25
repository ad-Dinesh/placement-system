export default function RecruiterDashboard() {

  return (

    <div className="min-h-screen bg-gray-950 text-white p-8">

      {/* HEADING */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Recruiter Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Manage jobs and applicants
        </p>

      </div>


      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL JOBS */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

          <h2 className="text-gray-400 text-sm">
            Total Jobs
          </h2>

          <p className="text-3xl font-bold mt-3">
            12
          </p>

        </div>


        {/* TOTAL APPLICANTS */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

          <h2 className="text-gray-400 text-sm">
            Applicants
          </h2>

          <p className="text-3xl font-bold mt-3">
            48
          </p>

        </div>


        {/* ACTIVE JOBS */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

          <h2 className="text-gray-400 text-sm">
            Active Jobs
          </h2>

          <p className="text-3xl font-bold mt-3">
            8
          </p>

        </div>

      </div>


      {/* BUTTONS */}
      <div className="mt-10 flex gap-4">

        <button className="bg-violet-500 hover:bg-violet-600 px-5 py-3 rounded-xl font-semibold">

          Post New Job

        </button>


        <button className="bg-gray-800 hover:bg-gray-700 px-5 py-3 rounded-xl font-semibold">

          Manage Jobs

        </button>

      </div>

    </div>
  );
}