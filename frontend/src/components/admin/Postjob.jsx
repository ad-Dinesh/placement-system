import { useState } from "react";

export default function PostJob() {

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    experience: "",
    skills: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      console.log(formData);

      // BACKEND API LATER

      alert("Job Posted Successfully");

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "",
        experience: "",
        skills: "",
        description: "",
      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-gray-950 text-white p-6">

      <div className="max-w-4xl mx-auto">

        {/* HEADING */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Post New Job
          </h1>

          <p className="text-gray-400 mt-2">
            Create and publish a new job opening
          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-6"
        >

          {/* JOB TITLE */}
          <div>

            <label className="block text-sm mb-2 text-gray-300">

              Job Title

            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Frontend Developer"
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
              required
            />

          </div>


          {/* COMPANY */}
          <div>

            <label className="block text-sm mb-2 text-gray-300">

              Company Name

            </label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Google"
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
              required
            />

          </div>


          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* LOCATION */}
            <div>

              <label className="block text-sm mb-2 text-gray-300">

                Location

              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Hyderabad"
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
                required
              />

            </div>


            {/* SALARY */}
            <div>

              <label className="block text-sm mb-2 text-gray-300">

                Salary

              </label>

              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="12 LPA"
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
                required
              />

            </div>

          </div>


          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* JOB TYPE */}
            <div>

              <label className="block text-sm mb-2 text-gray-300">

                Job Type

              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
                required
              >

                <option value="">
                  Select
                </option>

                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Remote">
                  Remote
                </option>

              </select>

            </div>


            {/* EXPERIENCE */}
            <div>

              <label className="block text-sm mb-2 text-gray-300">

                Experience

              </label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="2+ Years"
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
                required
              />

            </div>

          </div>


          {/* SKILLS */}
          <div>

            <label className="block text-sm mb-2 text-gray-300">

              Skills

            </label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
              required
            />

          </div>


          {/* DESCRIPTION */}
          <div>

            <label className="block text-sm mb-2 text-gray-300">

              Job Description

            </label>

            <textarea
              rows="6"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write complete job description..."
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 resize-none"
              required
            />

          </div>


          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-500 hover:bg-violet-600 transition-all rounded-xl py-3 font-semibold"
          >

            {loading
              ? "Posting..."
              : "Post Job"}

          </button>

        </form>

      </div>

    </div>
  );
}