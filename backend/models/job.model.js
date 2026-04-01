import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: [String],

    salary: {
        min: Number,
        max: Number,
    },

    location: {
        type: String,
        required: true,
    },

    experienceLevel: {
        type: Number,
        required: true,
    },

    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract'],
        required: true,
    },

    skills: [String],

    position: {
        type: Number,
        required: true,
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    applicationsCount: {
        type: Number,
        default: 0,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });

export default mongoose.model("Job", jobSchema);