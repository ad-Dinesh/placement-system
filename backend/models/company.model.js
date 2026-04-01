import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    description: {
        type: String,
    },

    website: {
        type: String,
    },

    location: {
        type: String,
    },

    logo: {
        type: String, // URL (Cloudinary / storage)
    },

    industry: {
        type: String,
    },

    companySize: {
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '500+'],
    },

    foundedYear: {
        type: Number,
    },

    recruiters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

export default mongoose.model("Company", companySchema);