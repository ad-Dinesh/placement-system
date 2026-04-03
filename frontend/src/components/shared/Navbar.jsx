import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  Bell, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  ChevronDown,
  Menu,
  X,
  Zap,
  Compass,
  Star
} from "lucide-react";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll logic for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock User State (Deenni nee Auth Context tho replace chey)
  const user = { name: "Dinesh Dharavath", email: "dinesh@iiitdmj.ac.in" }; 

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
      scrolled 
      ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3" 
      : "bg-white border-b border-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center">
          
          {/* --- LEFT: BRAND LOGO --- */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 rounded-[18px] rotate-2 group-hover:rotate-0 transition-all duration-500 flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)]">
                  <Briefcase size={24} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-[3px] border-white shadow-sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
                  JOB<span className="text-indigo-600">HIVE</span>
                </span>
                <span className="text-[10px] font-black text-slate-400 tracking-[0.25em] uppercase mt-1">Elite Portal</span>
              </div>
            </Link>

            {/* --- CENTER: NAV LINKS (Desktop) --- */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-50 p-1.5 rounded-[20px] border border-slate-100">
              {[
                { name: "Overview", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
                { name: "Explore", path: "/jobs", icon: <Compass size={18} /> },
                { name: "My Tracker", path: "/applications", icon: <Zap size={18} /> },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2.5 px-6 py-2.5 rounded-[14px] text-[13.5px] font-bold transition-all duration-300 ease-out ${
                    isActive(link.path)
                      ? "bg-white text-indigo-600 shadow-[0_4px_12px_rgba(0,0,0,0.05)] scale-[1.03]"
                      : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <span className={isActive(link.path) ? "text-indigo-600" : "text-slate-400"}>
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* --- RIGHT: ACTIONS & PROFILE --- */}
          <div className="flex items-center gap-4">
            
            {/* Search & Notifications */}
            <div className="hidden sm:flex items-center gap-2">
              <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-2xl transition-all active:scale-90">
                <Search size={20} />
              </button>
              <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-2xl relative group transition-all active:scale-90">
                <Bell size={20} />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white group-hover:animate-ping" />
              </button>
            </div>

            <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

            {/* User Session Logic */}
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-5 py-2.5 text-slate-600 hover:text-indigo-600 text-sm font-bold rounded-xl transition-all">
                  Sign In
                </Link>
                <Link to="/register" className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-0.5 active:scale-95 transition-all">
                  Join Now
                </Link>
              </div>
            ) : (
              <div className="relative">
                {/* Smooth Profile Button */}
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-1.5 pr-4 rounded-[20px] bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-sm transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden md:flex flex-col items-start leading-tight">
                    <span className="text-[14px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Dinesh D.</span>
                    <div className="flex items-center gap-1">
                       <Star size={10} className="fill-amber-400 text-amber-400" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Premium</span>
                    </div>
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-all duration-500 ${isProfileOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>

                {/* Smooth Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-72 bg-white border border-slate-100 rounded-[28px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] p-3 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
                    <div className="p-4 mb-2 bg-indigo-50/30 rounded-[20px] border border-indigo-100/20">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-500 mb-1">Account Verified</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <Link to="/profile" className="flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all group">
                        <div className="flex items-center gap-3">
                          <User size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" /> My Profile
                        </div>
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      </Link>

                      <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
                        <Settings size={18} className="text-slate-400" /> Settings
                      </Link>
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-95">
                        <LogOut size={18} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE DRAWER --- */}
      {isMobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 p-6 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-top-2">
          <Link to="/dashboard" className="px-5 py-4 font-black text-slate-800 bg-slate-50 rounded-2xl">Overview</Link>
          <Link to="/jobs" className="px-5 py-4 font-black text-slate-800 hover:bg-indigo-50 rounded-2xl transition-all">Explore</Link>
          <Link to="/applications" className="px-5 py-4 font-black text-slate-800 hover:bg-indigo-50 rounded-2xl transition-all">My Tracker</Link>
        </div>
      )}
    </nav>
  );
}