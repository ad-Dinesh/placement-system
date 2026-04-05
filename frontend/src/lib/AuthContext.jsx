import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

function saveToken(token) {
  try {
    localStorage.setItem("jwt_token", token);
  } catch {}
}

function getToken() {
  try {
    return localStorage.getItem("jwt_token");
  } catch {
    return null;
  }
}

function removeToken() {
  try {
    localStorage.removeItem("jwt_token");
  } catch {}
}

function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

function isTokenExpired(token) {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 < Date.now();
}

// ✅ NEW: Safe extraction (important security layer)
function safeSetUserFromToken(token) {
  const decoded = decodeToken(token);

  // validate required fields
  if (!decoded || !decoded.email || !decoded.sub) {
    removeToken();
    return null;
  }

  return {
    name: decoded.name,
    email: decoded.email,
    id: decoded.sub,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (token && !isTokenExpired(token)) {
      const userData = safeSetUserFromToken(token);
      if (userData) setUser(userData);
    } else {
      removeToken();
    }

    setLoading(false);
  }, []);

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

      const userData = safeSetUserFromToken(data.token);
      if (!userData) {
        return { success: false, message: "Invalid token." };
      }

      setUser(userData);

      return { success: true };
    } catch {
      return { success: false, message: "Network error. Please try again." };
    }
  }, []);

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

      const userData = safeSetUserFromToken(data.token);
      if (!userData) {
        return { success: false, message: "Invalid token." };
      }

      setUser(userData);

      return { success: true };
    } catch {
      return { success: false, message: "Network error. Please try again." };
    }
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  const authFetch = useCallback(
    async (url, options = {}) => {
      const token = getToken();

      if (!token || isTokenExpired(token)) {
        logout();
        throw new Error("Session expired.");
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
    },
    [logout]
  );

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, authFetch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}