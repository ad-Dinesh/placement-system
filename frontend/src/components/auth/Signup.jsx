import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";

const RULES = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter",   test: (p) => /[A-Z]/.test(p) },
  { label: "One number",            test: (p) => /[0-9]/.test(p) },
  { label: "One special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

function PasswordStrength({ password }) {
  const passed = RULES.filter((r) => r.test(password)).length;
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {RULES.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < passed ? colors[passed - 1] : "bg-white/10"}`} />
        ))}
      </div>
      {password && (
        <ul className="space-y-1">
          {RULES.map((rule) => {
            const ok = rule.test(password);
            return (
              <li key={rule.label} className="flex items-center gap-1.5 text-xs">
                {ok ? <Check size={11} className="text-green-400 shrink-0" /> : <X size={11} className="text-gray-600 shrink-0" />}
                <span className={ok ? "text-gray-400" : "text-gray-600"}>{rule.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "jobseeker" });
  const [showPw,  setShowPw]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim())  return "Full name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email.";
    const fail = RULES.find((r) => !r.test(form.password));
    if (fail) return fail.label + " is required.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    const result = await signup(form.name.trim(), form.email.trim(), form.password, form.role);
    setLoading(false);
    if (result.success) navigate("/dashboard");
    else setError(result.message);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-950 flex">

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-gray-900 border-r border-white/10 p-12">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center">
            <Briefcase size={15} className="text-white" />
          </div>
          <span className="text-[15px] font-semibold text-white">
            Talent<span className="text-violet-400">Path</span>
          </span>
        </div>
        <div>
          <p className="text-4xl font-bold text-white leading-snug mb-4">
            The smarter way to grow your career.
          </p>
          <ul className="space-y-3 text-sm text-gray-500">
            {["Apply to 10,000+ verified job listings", "Track all your applications in one place", "Get noticed by top companies"].map((text) => (
              <li key={text} className="flex items-center gap-2.5">
                <div className="w-4 h-4 bg-violet-500/20 rounded-full flex items-center justify-center shrink-0">
                  <Check size={9} className="text-violet-400" />
                </div>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-8 text-sm text-gray-600">
          <span><strong className="text-gray-300 font-semibold">10k+</strong> Jobs</span>
          <span><strong className="text-gray-300 font-semibold">5k+</strong> Companies</span>
          <span><strong className="text-gray-300 font-semibold">50k+</strong> Users</span>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
          <p className="text-sm text-gray-500 mb-8">
            Already have one?{" "}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Log in
            </Link>
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Role */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">I am a</label>
              <div className="grid grid-cols-2 gap-2">
                {[{ value: "jobseeker", label: "Job Seeker" }, { value: "employer", label: "Employer" }].map(({ value, label }) => (
                  <button key={value} type="button"
                    onClick={() => setForm((p) => ({ ...p, role: value }))}
                    className={`py-2.5 text-sm font-medium rounded-lg border transition-colors ${
                      form.role === value
                        ? "bg-violet-500/20 border-violet-500 text-violet-300"
                        : "bg-gray-900 border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Full name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="John Doe" autoComplete="name"
                className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="you@example.com" autoComplete="email"
                className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} name="password" value={form.password}
                  onChange={handleChange} placeholder="••••••••" autoComplete="new-password"
                  className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-violet-500 transition-colors pr-10"
                />
                <button type="button" onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Confirm password</label>
              <input type="password" name="confirm" value={form.confirm} onChange={handleChange}
                placeholder="••••••••" autoComplete="new-password"
                className={`w-full bg-gray-900 border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition-colors ${
                  form.confirm && form.confirm !== form.password
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-violet-500"
                }`}
              />
              {form.confirm && form.confirm !== form.password && (
                <p className="text-xs text-red-400 mt-1">Passwords don't match</p>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-colors mt-2">
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-xs text-gray-600 text-center mt-6">
            By signing up you agree to our{" "}
            <Link to="/terms" className="text-gray-500 hover:text-gray-400 underline">Terms</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-gray-500 hover:text-gray-400 underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}