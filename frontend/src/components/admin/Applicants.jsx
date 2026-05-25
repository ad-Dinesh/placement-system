import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";


export default function Applicants() {

  const { id } = useParams();

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetchApplicants();

  }, []);


  const fetchApplicants = async () => {

    try {

      const token =
        localStorage.getItem("jwt_token");

      const response = await fetch(
        `http://localhost:8000/api/v1/applications/${id}/applicants`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      setApplications(
        data.applications || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  // UPDATE STATUS
  const updateStatus = async (
    applicationId,
    status
  ) => {

    try {

      const token =
        localStorage.getItem("jwt_token");

      const response = await fetch(
        `http://localhost:8000/api/v1/applications/status/${applicationId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        fetchApplicants();

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

            Applicants

          </h1>

          <p className="text-gray-400 mt-2">

            Manage all job applicants

          </p>

        </div>


        {/* LOADING */}
        {loading ? (

          <p className="text-gray-400">
            Loading...
          </p>

        ) : applications.length === 0 ? (

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">

            <h2 className="text-2xl font-semibold">

              No Applicants Found

            </h2>

          </div>

        ) : (

          <div className="space-y-6">

            {applications.map((app) => (

              <div
                key={app._id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              >

                {/* LEFT */}
                <div>

                  <h2 className="text-2xl font-bold">

                    {app.applicant?.fullname}

                  </h2>

                  <p className="text-gray-400 mt-2">

                    {app.applicant?.email}

                  </p>


                  <p className="mt-4">

                    Status:
                    <span className="text-violet-400 ml-2 capitalize">

                      {app.status}

                    </span>

                  </p>

                </div>


                {/* BUTTONS */}
                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      updateStatus(
                        app._id,
                        "accepted"
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-medium"
                  >

                    Accept

                  </button>


                  <button
                    onClick={() =>
                      updateStatus(
                        app._id,
                        "rejected"
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-medium"
                  >

                    Reject

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