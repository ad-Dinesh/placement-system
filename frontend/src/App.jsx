import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { AuthProvider, useAuth } from "./lib/AuthContext";

import Navbar from "./components/shared/Navbar";

import Home from "./components/Home";
import Jobs from "./components/Jobs";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";


// Placeholder Pages
const Companies = () => (
  <div className="p-8 text-white text-xl">
    Companies Page
  </div>
);

const Applications = () => (
  <div className="p-8 text-white text-xl">
    My Applications
  </div>
);

const Dashboard = () => (
  <div className="p-8 text-white text-xl">
    Dashboard
  </div>
);

const NotFound = () => (
  <div className="p-8 text-white text-xl">
    404 — Not Found
  </div>
);


// Loader
function Loader() {
  return (
    <div className="h-screen flex items-center justify-center text-gray-400">
      Loading...
    </div>
  );
}


// Guest Route
function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    children
  );
}


// Protected Route
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return user ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}


// App Routes
function AppRoutes() {
  const location = useLocation();

  const hideNavbar = ["/login", "/signup"].includes(
    location.pathname
  );

  return (
    <div className="min-h-screen bg-gray-950">
      
      {!hideNavbar && <Navbar />}

      <main className="pt-16">

        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route
            path="/companies"
            element={<Companies />}
          />


          {/* Guest Routes */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            }
          />


          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          />


          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </main>
    </div>
  );
}


// Main App
export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}