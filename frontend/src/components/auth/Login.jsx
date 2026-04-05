import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [form, setForm]       = useState({ email: "", password: "" });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // ✅ NEW: Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ✅ NEW: Email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // ✅ prevent double click

    setError("");

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    setLoading(true);

    const result = await login(email, password);

    setLoading(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
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
            Your next big career move starts here.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            Join 50,000+ professionals who found their dream job through TalentPath.
          </p>
        </div>
        <div className="flex gap-8 text-sm text-gray-600">
          <span><strong className="text-gray-300 font-semibold">10k+</strong> Jobs</span>
          <span><strong className="text-gray-300 font-semibold">5k+</strong> Companies</span>
          <span><strong className="text-gray-300 font-semibold">50k+</strong> Users</span>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign up free
            </Link>
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="you@example.com" autoComplete="email"
                className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-gray-400">Password</label>
                <Link to="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input type={showPw ? "text" : "password"} name="password" value={form.password}
                  onChange={handleChange} placeholder="••••••••" autoComplete="current-password"
                  className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-violet-500 transition-colors pr-10"
                />
                <button type="button" onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-colors mt-2">
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="text-xs text-gray-600 text-center mt-8">
            By logging in you agree to our{" "}
            <Link to="/terms" className="text-gray-500 hover:text-gray-400 underline">Terms</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-gray-500 hover:text-gray-400 underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}