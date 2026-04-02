import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

// ================= APPLY TO JOB =================
export const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.id;

    // check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // prevent duplicate
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    // create application
    const application = await Application.create({
      job: jobId,
      applicant: userId
    });

    // increment application count
    job.applicationsCount = (job.applicationsCount || 0) + 1;
    await job.save();

    return res.status(201).json({
      message: "Applied successfully",
      application
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// ================= GET APPLIED JOBS (STUDENT) =================
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userId;

    const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        populate: {
          path: "company"
        }
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ applications });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// ================= GET APPLICANTS (ADMIN) =================
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({ applications });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// ================= UPDATE STATUS =================
export const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.status(200).json({
      message: "Status updated",
      application
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};