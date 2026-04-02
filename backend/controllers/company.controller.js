import Company from "../models/company.model.js";

// REGISTER COMPANY
export const registerCompany = async (req, res) => {    
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Company name is required" });
        }

        const existingCompany = await Company.findOne({ name: name.trim() });

        if (existingCompany) {
            return res.status(400).json({ message: "Company already exists" });
        }

        const company = await Company.create({
            name: name.trim(),
            createdBy: req.userId
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company
        });

    } catch (error) {    
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// GET ALL COMPANIES (BY USER)
export const getCompanies = async (req, res) => {
    try {
        const userId = req.userId;

        const companies = await Company.find({ createdBy: userId });

        return res.status(200).json({
            companies
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// GET COMPANY BY ID
export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        return res.status(200).json({ company });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// UPDATE COMPANY
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (website) updateData.website = website;
        if (location) updateData.location = location;

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        return res.status(200).json({
            message: "Company updated successfully",
            company
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};