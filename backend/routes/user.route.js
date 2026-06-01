import express from "express";

import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";


const router = express.Router();


// Register
router.post("/signup", register);


// Login
router.post("/login", login);


// Logout
router.get("/logout", logout);


// Get Profile
router.get("/profile", isAuthenticated, getProfile);

router.put(
  "/profile/update",
  isAuthenticated,
  singleUpload,
  updateProfile
);

router.post(
  "/resume",
  isAuthenticated,
  singleUpload,
  updateProfile
);


export default router;