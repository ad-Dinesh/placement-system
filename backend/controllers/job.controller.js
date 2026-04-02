import Job from "../models/job.model.js";

//  CREATE JOB 
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experienceLevel,
      jobType,
      position,
      company
    } = req.body;

    if (!title || !description || !location || !jobType || !position || !company) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      experienceLevel,
      jobType,
      position,
      company,
      createdBy: req.userId
    });

    return res.status(201).json({
      message: "Job created successfully",
      job
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// GET ALL JOBS (SEARCH + FILTER)
export const getJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };

    const jobs = await Job.find(query).populate("company").sort({ createdAt: -1 });

    return res.status(200).json({ jobs });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//  GET JOB BY ID 
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("company");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ job });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//  GET JOBS BY ADMIN 
export const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.userId })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({ jobs });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//  DELETE JOB 
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      message: "Job deleted successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};