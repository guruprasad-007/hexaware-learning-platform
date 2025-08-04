// backend/src/controllers/adminController.js

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Course from "../models/Course.js";

// Hardcoded admin credentials for development
const ADMIN_EMAIL = "guruadmin17@gmail.com";
const ADMIN_PASSWORD_HASH = "$2b$10$ABuRmAWRlvqh70TLOQ/gluFz1cY8jMO/n2De3Dm0CppeTJZ7VdM7q";

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: "admin_id", role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({
    message: "Admin login successful",
    token,
    role: "admin",
  });
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard-stats
// @access  Admin
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        const totalCourses = await Course.countDocuments({});
        res.status(200).json({ totalUsers, totalCourses });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
    }
};

// @desc    Get all users with their enrolled courses
// @route   GET /api/admin/users
// @access  Admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password").populate({
            path: 'enrolledCourses',
            select: 'title'
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user list", error: error.message });
    }
};

// @desc    Enroll a user in a course
// @route   POST /api/admin/enroll-course
// @access  Admin
export const enrollUserInCourse = async (req, res) => {
    const { userId, courseId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (!user.enrolledCourses.includes(courseId)) {
            user.enrolledCourses.push(courseId);
            await user.save();
        }

        res.status(200).json({ message: "Course added to user successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding course to user", error: error.message });
    }
};

// @desc    Get all courses (for admin use)
// @route   GET /api/admin/courses
// @access  Admin
export const getAdminCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).select('title');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
};

// @desc    Add a new course (for admin use)
// @route   POST /api/admin/courses
// @access  Admin
export const addCourse = async (req, res) => {
  const { title, description, instructor, modules, imageUrl, duration, rating, lessons } = req.body; // <-- Added new fields
  try {
    const newCourse = new Course({
      title,
      description,
      instructor,
      modules,
      isPublished: true,
      imageUrl,
      duration,
      rating,
      lessons
    });

    const savedCourse = await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: savedCourse });
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error: error.message });
  }
};