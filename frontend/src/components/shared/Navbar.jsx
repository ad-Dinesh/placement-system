import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Briefcase, Bell, Menu, X, ChevronDown, LogOut, LayoutDashboard, FileText } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";

const NAV = [
  { name: "Find Jobs", path: "/jobs" },
  { name: "Companies", path: "/companies" },
  { name: "Applications", path: "/applications" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef();

  // ✅ Improved outside click (supports touch)
  useEffect(() => {
    const handler = (e) => {
      if (!dropRef.current?.contains(e.target)) {
        setDropOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  // ✅ Safe logout
  const handleLogout = () => {
    setDropOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  // ✅ Safe user fallback
  const userName = user?.name || "User";
  const userEmail = user?.email || "";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-950 border-b border-white/10 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between">

          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center">
              <Briefcase size={15} className="text-white" />
            </div>
            <span className="text-[15px] font-semibold text-white tracking-tight">
              Talent<span className="text-violet-400">Path</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({ name, path }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  pathname === path
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <Link to="/login"
                  className="px-4 py-2 text-[13px] font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  Log in
                </Link>
                <Link to="/signup"
                  className="px-4 py-2 text-[13px] font-semibold bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors">
                  Get started
                </Link>
              </>
            ) : (
              <>
                <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Bell size={16} />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                </button>

                <div ref={dropRef} className="relative">
                  <button
                    onClick={() => setDropOpen((v) => !v)}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <div className="w-7 h-7 bg-violet-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {userName[0]?.toUpperCase()}
                    </div>
                    <span className="text-[13px] text-gray-300 hidden sm:block">{userName}</span>
                    <ChevronDown size={13} className={`text-gray-500 transition-transform ${dropOpen ? "rotate-180" : ""}`} />
                  </button>

                  {dropOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-gray-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                      <div className="px-3 py-2.5 border-b border-white/10">
                        <p className="text-[13px] font-medium text-white">{userName}</p>
                        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                      </div>

                      <Link to="/dashboard" onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <LayoutDashboard size={14} /> Dashboard
                      </Link>

                      <Link to="/applications" onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <FileText size={14} /> My Applications
                      </Link>

                      <div className="border-t border-white/10">
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-400 hover:bg-red-500/10 transition-colors">
                          <LogOut size={14} /> Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gray-950 border-b border-white/10 px-4 py-3 md:hidden">
          {NAV.map(({ name, path }) => (
            <Link key={path} to={path}
              className={`block py-2.5 text-sm font-medium ${pathname === path ? "text-white" : "text-gray-400"}`}>
              {name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}