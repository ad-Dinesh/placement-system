import { useParams } from "react-router-dom";

import {
  MapPin,
  Wallet,
  Briefcase,
  Clock3,
} from "lucide-react";


const jobsData = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer",
    location: "Remote",
    salary: "₹18 LPA",
    type: "Full Time",
  },

  {
    id: 2,
    company: "Amazon",
    role: "Backend Engineer",
    location: "Hyderabad",
    salary: "₹22 LPA",
    type: "Remote",
  },
];


export default function SingleJob() {

  const { id } = useParams();

  const job = jobsData.find(
    (job) => job.id === Number(id)
  );

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Job not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Top Section */}
        <div className="bg-gray-900 border border-white/10 rounded-3xl p-8">

          <div className="flex items-start justify-between flex-wrap gap-4">

            <div>

              <span className="bg-violet-500/10 text-violet-300 text-xs px-3 py-1 rounded-full border border-violet-500/20">
                {job.type}
              </span>

              <h1 className="text-4xl font-bold mt-5">
                {job.role}
              </h1>

              <p className="text-gray-400 text-lg mt-2">
                {job.company}
              </p>

            </div>

            <button className="bg-violet-500 hover:bg-violet-600 px-6 py-3 rounded-xl text-sm font-medium transition-colors">
              Apply Now
            </button>

          </div>


          {/* Details */}
          <div className="flex flex-wrap gap-6 mt-8 text-gray-400">

            <div className="flex items-center gap-2">
              <MapPin size={18} />
              {job.location}
            </div>

            <div className="flex items-center gap-2">
              <Wallet size={18} />
              {job.salary}
            </div>

            <div className="flex items-center gap-2">
              <Briefcase size={18} />
              2+ Years Experience
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={18} />
              Posted 2 days ago
            </div>

          </div>

        </div>


        {/* Skills */}
        <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 mt-6">

          <h2 className="text-2xl font-semibold mb-5">
            Required Skills
          </h2>

          <div className="flex flex-wrap gap-3">

            {[
              "React",
              "JavaScript",
              "Tailwind",
              "Node.js",
              "MongoDB",
            ].map((skill) => (

              <span
                key={skill}
                className="bg-violet-500/10 border border-violet-500/20 text-violet-300 px-4 py-2 rounded-full text-sm"
              >
                {skill}
              </span>

            ))}

          </div>

        </div>


        {/* Description */}
        <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 mt-6">

          <h2 className="text-2xl font-semibold mb-5">
            Job Description
          </h2>

          <p className="text-gray-400 leading-relaxed">
            We are looking for a passionate developer who can
            build modern and scalable web applications using
            React, Node.js, and modern frontend technologies.
            You will work with experienced engineers and help
            create high-quality products used by millions of users.
          </p>

        </div>

      </div>

    </div>
  );
}