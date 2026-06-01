
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);


// ─── Token Helpers ─────────────────────────────────────

function saveToken(token) {
  localStorage.setItem("jwt_token", token);
}

function getToken() {
  return localStorage.getItem("jwt_token");
}

function removeToken() {
  localStorage.removeItem("jwt_token");
}


// Decode JWT
function decodeToken(token) {

  try {

    const payload = token.split(".")[1];

    return JSON.parse(
      atob(
        payload
          .replace(/-/g, "+")
          .replace(/_/g, "/")
      )
    );

  } catch {

    return null;

  }
}


// Check Expiry
function isTokenExpired(token) {

  const decoded = decodeToken(token);

  if (!decoded?.exp) return true;

  return decoded.exp * 1000 < Date.now();
}


// ─── Provider ──────────────────────────────────────────

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  // Restore user from token
  useEffect(() => {

    const token = getToken();



    if (token && !isTokenExpired(token)) {

      const decoded = decodeToken(token);

      setUser({
        email: decoded.email,
        id: decoded.userId,
        role: decoded.role,
      });

    } else {

      removeToken();

    }

    setLoading(false);

  }, []);


  // ─── LOGIN ──────────────────────────────────────────

  const login = useCallback(async (email, password) => {
console.log("LOGIN FUNCTION STARTED");
    try {

      const res = await fetch(
  "http://localhost:8000/api/v1/users/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }
);


      const data = await res.json();


      if (!res.ok) {

        return {
          success: false,
          message:
            data.message || "Login failed.",
        };
      }


    saveToken(data.token);

const decoded = decodeToken(data.token);

console.log("decoded =>", decoded);

if (!decoded) {
  return {
    success: false,
    message: "Token decode failed",
  };
}

const userData = {
  email: decoded.email || data.user?.email,
  id: decoded.userId || data.user?._id,
  role: decoded.role || data.user?.role,
};

console.log("LOGIN SUCCESS");

setUser(userData);
console.log("LOGIN SUCCESS");
return {
  success: true,
  user: userData,
};

    }  catch (error) {

  console.error("LOGIN ERROR =>", error);

  return {
    success: false,
    message: error.message || "Network error",
  };

}

  }, []);
  


  // ─── SIGNUP ─────────────────────────────────────────

  const signup = useCallback(async (
    name,
    email,
    password,
    role
  ) => {

    try {

      const res = await fetch(
  "http://localhost:8000/api/v1/users/signup",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role,
    }),
  }
);


      const data = await res.json();


      if (!res.ok) {

        return {
          success: false,
          message:
            data.message || "Signup failed.",
        };
      }


      saveToken(data.token);

      const decoded = decodeToken(data.token);


      const userData = {

        email: decoded.email,
        id: decoded.userId,
        role: decoded.role,
      };


      setUser(userData);


      return {
        success: true,
        user: userData,
      };

    } catch {

      return {
        success: false,
        message:
          "Network error. Please try again.",
      };
    }

  }, []);


  // ─── LOGOUT ─────────────────────────────────────────

  const logout = useCallback(() => {

    removeToken();

    setUser(null);

  }, []);


  // ─── AUTH FETCH ─────────────────────────────────────

  const authFetch = useCallback(async (
    url,
    options = {}
  ) => {

    const token = getToken();


    if (!token || isTokenExpired(token)) {

      logout();

      throw new Error(
        "Session expired. Please log in again."
      );
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

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        authFetch,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}


// ─── CUSTOM HOOK ─────────────────────────────────────

export function useAuth() {

  const ctx = useContext(AuthContext);

  if (!ctx) {

    throw new Error(
      "useAuth must be used inside <AuthProvider>"
    );
  }

  return ctx;
}