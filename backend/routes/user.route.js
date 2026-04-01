import express from "express";  
import { register, login, logout, getProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(authMiddleware, getProfile);

export default router;