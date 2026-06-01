import express from "express";

import {
  createJob,
  getJobs,
  getJobById,
  getAdminJobs,
  deleteJob,
  updateJob,
} from "../controllers/job.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();


// CREATE JOB
router.post(
  "/create",
  isAuthenticated,
  createJob
);


// GET ALL JOBS
router.get(
  "/",
  getJobs
);


// GET ADMIN JOBS
router.get(
  "/admin",
  isAuthenticated,
  getAdminJobs
);


// GET JOB BY ID
router.get(
  "/:id",
  getJobById
);

router.put(
  "/:id",
  isAuthenticated,
  updateJob
);


// DELETE JOB
router.delete(
  "/:id",
  isAuthenticated,
  deleteJob
);


export default router;