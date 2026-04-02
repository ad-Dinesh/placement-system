import express from "express";  
import { 
  register, 
  login, 
  logout, 
  getProfile, 
  updateProfile 
} from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/isAuthenticated.js";

const router = express.Router();

// auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// profile routes
router.get("/profile", authMiddleware, getProfile);
router.put("/profile/update", authMiddleware, updateProfile); // important

export default router;