import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

// ─── Token helpers ─────────────────────────────────────────────────────────────
// Tokens are stored in localStorage. For higher security, use httpOnly cookies
// via your backend (recommended in production).

function saveToken(token) {
  localStorage.setItem("jwt_token", token);
}

function getToken() {
  return localStorage.getItem("jwt_token");
}

function removeToken() {
  localStorage.removeItem("jwt_token");
}

// Decode JWT payload without a library (payload is base64url encoded)
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

// Check if token is expired
function isTokenExpired(token) {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 < Date.now();
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true); // true while we check stored token

  // On app load, restore user from stored token
  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token);
      setUser({ name: decoded.name, email: decoded.email, id: decoded.sub });
    } else {
      removeToken(); // Clear expired token
    }
    setLoading(false);
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────────
  // Returns { success: true } or { success: false, message: "..." }
  const login = useCallback(async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Login failed." };
      }

      saveToken(data.token);
      const decoded = decodeToken(data.token);
      setUser({ name: decoded.name, email: decoded.email, id: decoded.sub });
      return { success: true };
    } catch {
      return { success: false, message: "Network error. Please try again." };
    }
  }, []);

  // ── Signup ─────────────────────────────────────────────────────────────────
  const signup = useCallback(async (name, email, password, role) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Signup failed." };
      }

      saveToken(data.token);
      const decoded = decodeToken(data.token);
      setUser({ name: decoded.name, email: decoded.email, id: decoded.sub });
      return { success: true };
    } catch {
      return { success: false, message: "Network error. Please try again." };
    }
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  // ── Authenticated fetch helper ─────────────────────────────────────────────
  // Use this instead of raw fetch() for any protected API calls
  const authFetch = useCallback(async (url, options = {}) => {
    const token = getToken();

    if (!token || isTokenExpired(token)) {
      logout();
      throw new Error("Session expired. Please log in again.");
    }

    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (res.status === 401) {
      logout();
      throw new Error("Unauthorized.");
    }

    return res;
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}