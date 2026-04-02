import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  getAdminJobs,
} from "../controllers/job.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// create job
router.post("/", isAuthenticated, createJob);

// get all jobs
router.get("/", getJobs);

// get jobs created by admin
router.get("/admin", isAuthenticated, getAdminJobs);

// get job by id
router.get("/:id", getJobById);

export default router;