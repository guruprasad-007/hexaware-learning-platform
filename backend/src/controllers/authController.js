// backend/src/controllers/authController.js (MODIFIED)

import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register
export const registerUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ fullName, email, password, role });

    // Assuming a generateToken utility exists
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
// @desc    User/Admin Login
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Update loginHistory with the current date
    const today = new Date();
    const lastLoginDate = user.loginHistory && user.loginHistory.length > 0 ? user.loginHistory[user.loginHistory.length - 1] : null;

    // Only push a new date if the last login was on a different day
    if (!lastLoginDate || lastLoginDate.getDate() !== today.getDate() || lastLoginDate.getMonth() !== today.getMonth() || lastLoginDate.getFullYear() !== today.getFullYear()) {
      user.loginHistory.push(today);
      await user.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role, // Pass the user's role to the frontend
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// Protected route example
export const getUserProfile = async (req, res) => {
  res.json(req.user);
};