import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  FileText,
} from "lucide-react";

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

  // Close dropdown when clicking outside
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

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Logout
  const handleLogout = () => {
    setDropOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  const userName = user?.name || "User";
  const userEmail = user?.email || "";

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-950/70 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_20px_rgba(139,92,246,0.08)] flex items-center">
        
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
              <Briefcase size={15} className="text-white" />
            </div>

            <span className="text-[15px] font-semibold text-white tracking-tight">
              Talent<span className="text-violet-400">Path</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({ name, path }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  pathname === path
                    ? "bg-violet-500/10 text-violet-300"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">

            {/* Not Logged In */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-[13px] font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  Log in
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 text-[13px] font-semibold bg-violet-500 text-white rounded-lg hover:bg-violet-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {/* Notification */}
                <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
                  <Bell size={16} />

                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                </button>

                {/* Profile Dropdown */}
                <div ref={dropRef} className="relative">
                  <button
                    onClick={() => setDropOpen((v) => !v)}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-lg transition-all duration-200"
                  >
                    <div className="w-7 h-7 bg-violet-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {userName[0]?.toUpperCase()}
                    </div>

                    <span className="text-[13px] text-gray-300 hidden sm:block">
                      {userName}
                    </span>

                    <ChevronDown
                      size={13}
                      className={`text-gray-500 transition-transform duration-200 ${
                        dropOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  {dropOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-100">

                      {/* User Info */}
                      <div className="px-3 py-2.5 border-b border-white/10">
                        <p className="text-[13px] font-medium text-white">
                          {userName}
                        </p>

                        <p className="text-xs text-gray-500 truncate">
                          {userEmail}
                        </p>
                      </div>

                      {/* Dashboard */}
                      <Link
                        to="/dashboard"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200"
                      >
                        <LayoutDashboard size={14} />
                        Dashboard
                      </Link>

                      {/* Applications */}
                      <Link
                        to="/applications"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200"
                      >
                        <FileText size={14} />
                        My Applications
                      </Link>

                      {/* Logout */}
                      <div className="border-t border-white/10">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-400 hover:bg-red-500/10 transition-all duration-200"
                        >
                          <LogOut size={14} />
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gray-950/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 md:hidden">

          {NAV.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`block py-2.5 text-sm font-medium transition-all duration-200 ${
                pathname === path
                  ? "text-violet-300"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}