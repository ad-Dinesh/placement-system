import express from "express";
import {
    getCompanies,
    getCompanyById,
    updateCompany,

    registerCompany
} from "../controllers/company.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Create
router.post("/", isAuthenticated, registerCompany);

// Read all
router.get("/", isAuthenticated, getCompanies);

// Read one
router.get("/:id", isAuthenticated, getCompanyById);

// Update
router.put("/:id", isAuthenticated, updateCompany);

// Delete
// router.delete("/:id", isAuthenticated, deleteCompany);

export default router;