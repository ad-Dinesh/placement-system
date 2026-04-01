import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email'],
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    profile: {
        bio: String,
        skills: [String],
        resume: String,
        resumeOriginalName: String,
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        },
        profilePicture: {
            type: String,
            default: "",
        },
    },
}, { timestamps: true });

export default mongoose.model('User', userSchema);