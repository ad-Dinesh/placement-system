import { useState } from "react";
import { Plus, X, FilePlus2, Loader2, CheckCircle2 } from "lucide-react";

export default function PostJob() {
  const [form, setForm] = useState({ title: "", company: "", location: "", type: "Full-time", salary: "", desc: "" });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(["React", "Node.js"]);
  const [publishing, setPublishing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
      setTagInput("");
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setPublishing(true);

    const token = localStorage.getItem("jwt_token");

    const res = await fetch("http://localhost:8000/api/v1/jobs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: form.title,
        description: form.desc,
        requirements: tags,
        salary: {
          min: 600000,
          max: 1200000,
        },
        location: form.location,
        experienceLevel: 1,
        jobType: form.type.toLowerCase(),
        position: 1,

        // Replace with your actual company id
        company: "6a0c545539280d4400626f9c",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to create job");
      return;
    }

    setSuccess(true);

    setForm({
      title: "",
      company: "",
      location: "",
      type: "full-time",
      salary: "",
      desc: "",
    });

    setTimeout(() => setSuccess(false), 3000);

    console.log("JOB CREATED =>", data);

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {
    setPublishing(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-10 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Post a New Vacancy</h1>
          <p className="text-gray-400 text-xs mt-1">Deploy an active profile structural element directly onto the public seeker feed map.</p>
        </div>

        {success && (
          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3.5 text-sm text-emerald-400 animate-scaleIn">
            <CheckCircle2 size={16} className="shrink-0" />
            <p className="font-semibold">Listing Published Successfully! Track open states from your management layout tabs.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-900/40 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Job Title Role</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Frontend Engineer" className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500/40 transition-colors shadow-inner" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Hiring Corporate Entity</label>
              <input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. Google India" className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500/40 transition-colors shadow-inner" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Locality Framework</label>
              <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Hyderabad, TS" className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500/40 transition-colors shadow-inner" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Commitment Level</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500/40 transition-colors text-white cursor-pointer">
                <option value="Full-time">Full-time Framework</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contractual Basis</option>
                <option value="Internship">Internship Profile</option>
                <option value="Remote">100% Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Compensation Scale</label>
              <input required value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder="e.g. ₹18 - ₹24 LPA" className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500/40 transition-colors shadow-inner" />
            </div>
          </div>

          {/* Core Tech Stack Section */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Required Tech Stack Tags</label>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {tags.map((t) => (
                <span key={t} className="flex items-center gap-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs px-2.5 py-1 rounded-lg font-medium">
                  {t}
                  <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} className="hover:text-red-400 transition-colors p-0.5"><X size={10} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())} placeholder="Add specific library context (press enter)..." className="flex-1 bg-gray-950 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-violet-500/40 transition-colors shadow-inner" />
              <button type="button" onClick={handleAddTag} className="px-3.5 bg-violet-500/15 border border-violet-500/30 rounded-xl text-violet-400 hover:bg-violet-500/25 transition-all"><Plus size={16} /></button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Role Specifications Overview</label>
            <textarea required value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={4} placeholder="Detail day-to-day requirements, stack depths, code architecture patterns expected..." className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none resize-none focus:border-violet-500/40 transition-colors shadow-inner" />
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={publishing} className="w-full sm:w-auto bg-violet-500 hover:bg-violet-600 disabled:opacity-50 px-6 py-3 rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-violet-950/40 cursor-pointer active:scale-98 transition-all">
              {publishing ? <Loader2 size={15} className="animate-spin" /> : <FilePlus2 size={15} />}
              <span>Deploy Open Position</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}