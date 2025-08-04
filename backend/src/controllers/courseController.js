// backend/src/controllers/courseController.js (COMPLETE AND CORRECTED)
import mongoose from "mongoose";
import Course from "../models/Course.js";
import User from "../models/User.js";

// @desc    Get all courses a user is enrolled in
// @route   GET /api/courses/enrolled
// @access  Private (User)
export const getEnrolledCourses = async (req, res) => {
    // Assuming req.user is populated by your authentication middleware
    const userId = req.user._id;
  
    try {
      const userWithCourses = await User.findById(userId).populate("enrolledCourses");
      if (!userWithCourses) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(userWithCourses.enrolledCourses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching enrolled courses", error: error.message });
    }
  };
  
// @desc    Get all available courses (for the courses page)
// @route   GET /api/courses/all
// @access  Public
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses", error: error.message });
    }
};

// @desc    Get all unique course categories
// @route   GET /api/courses/categories
// @access  Public
export const getCourseCategories = async (req, res) => {
    try {
        const categories = await Course.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

// @desc    Get a single course by ID
// @route   GET /api/courses/:id
// @access  Public
export const getCourseDetails = async (req, res) => {
    try {
        const courseId = req.params.id;

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(404).json({ message: "Invalid course ID" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Error fetching course details", error: error.message });
    }
};

// @desc    Enroll a user in a course
// @route   POST /api/courses/enroll
// @access  Private (User)
export const userEnrollInCourse = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user._id; // Get user ID from the protected token

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: "User is already enrolled in this course" });
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        res.status(200).json({ message: "Successfully enrolled in the course" });
    } catch (error) {
        res.status(500).json({ message: "Error enrolling user", error: error.message });
    }
};