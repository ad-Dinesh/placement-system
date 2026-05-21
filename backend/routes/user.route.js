import express from "express";

import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();


// Register
router.post("/signup", register);


// Login
router.post("/login", login);


// Logout
router.get("/logout", logout);


// Get Profile
router.get("/profile", isAuthenticated, getProfile);


// Update Profile
router.put("/profile/update", isAuthenticated, updateProfile);


export default router;