import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/AuthContext";
import Navbar  from "./components/shared/Navbar";
import Home    from "./components/Home";
import Login   from "./components/auth/Login";
import Signup  from "./components/auth/Signup";

// Placeholder pages — replace as you build
const Jobs         = () => <div className="p-8 text-white text-xl">Jobs Page</div>;
const Companies    = () => <div className="p-8 text-white text-xl">Companies Page</div>;
const Applications = () => <div className="p-8 text-white text-xl">My Applications</div>;
const Dashboard    = () => <div className="p-8 text-white text-xl">Dashboard</div>;
const NotFound     = () => <div className="p-8 text-white text-xl">404 — Not Found</div>;

// Redirect logged-in users away from /login and /signup
function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" replace /> : children;
}

// Redirect logged-out users to /login
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="pt-16">
        <Routes>
          {/* Public */}
          <Route path="/"          element={<Home />} />
          <Route path="/jobs"      element={<Jobs />} />
          <Route path="/companies" element={<Companies />} />

          {/* Guest only */}
          <Route path="/login"  element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />

          {/* Protected */}
          <Route path="/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}