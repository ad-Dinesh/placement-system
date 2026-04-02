import express from "express";
import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus
} from "../controllers/application.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// apply
router.post("/apply/:id", isAuthenticated, applyJob);

// student
router.get("/applied", isAuthenticated, getAppliedJobs);

// admin
router.get("/:id/applicants", isAuthenticated, getApplicants);

// update status
router.put("/status/:id", isAuthenticated, updateStatus);

export default router;