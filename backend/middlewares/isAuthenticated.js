import jwt from "jsonwebtoken";


//  AUTH MIDDLEWARE
const isAuthenticated = (req, res, next) => {
  try {

    // 1. Extract token from cookie or Bearer header
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    // 2. No token → reject immediately
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // 3. Verify token (synchronous — no await needed)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach userId to request for downstream use
    if (!decoded?.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token payload" });
    }

    req.userId = decoded.userId;

    // 5. Pass control to the next middleware / route handler
    next();

  } catch (error) {

    // 6. Handle specific JWT errors with clear messages
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    }

    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token" });
    }

    if (error.name === "NotBeforeError") {
      return res
        .status(401)
        .json({ message: "Token not yet active" });
    }

    // 7. Fallback for unexpected errors
    console.error("Authentication Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error" });
  }
};

export default isAuthenticated;