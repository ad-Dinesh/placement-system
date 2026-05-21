import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ================= REGISTER =================
export const register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const allowedRoles = ["jobseeker", "employer"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {

    console.error("Register Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// ================= LOGIN =================
export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        sub: user._id,
        email: user.email,
        name: user.fullname,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      }
    );

    const { password: _, ...safeUser } = user._doc;

    return res
      .status(200)

      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      })

      .json({
        success: true,
        message: `Welcome back ${user.fullname}`,
        token,
        user: safeUser,
      });

  } catch (error) {

    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// ================= LOGOUT =================
export const logout = async (req, res) => {
  try {

    return res
      .status(200)

      .cookie("token", "", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
      })

      .json({
        success: true,
        message: "Logged out successfully",
      });

  } catch (error) {

    console.error("Logout Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// ================= GET PROFILE =================
export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    console.error("GetProfile Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {

    const { fullname, bio, skills } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update fields
    if (fullname) {
      user.fullname = fullname;
    }

    // Ensure profile exists
    if (!user.profile) {
      user.profile = {};
    }

    if (bio) {
      user.profile.bio = bio;
    }

    if (skills) {
      user.profile.skills = skills.split(",");
    }

    await user.save();

    const updatedUser = await User.findById(req.userId)
      .select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {

    console.error("UpdateProfile Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};