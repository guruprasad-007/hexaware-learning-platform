// backend/src/controllers/adminController.js

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const ADMIN_EMAIL = "guruadmin17@gmail.com";
const ADMIN_PASSWORD_HASH = "$2b$10$ABuRmAWRlvqh70TLOQ/gluFz1cY8jMO/n2De3Dm0CppeTJZ7VdM7q";

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

export const getDashboardStats = async (req, res) => {
    try {
        const User = (await import("../models/User.js")).default;
        const Course = (await import("../models/Course.js")).default;
        const totalUsers = await User.countDocuments({});
        const totalCourses = await Course.countDocuments({});
        res.status(200).json({ totalUsers, totalCourses });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const User = (await import("../models/User.js")).default;
        const users = await User.find({ role: "user" }).select("-password").populate({
            path: 'enrolledCourses',
            select: 'title'
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching user list:", error);
        res.status(500).json({ message: "Error fetching user list", error: error.message });
    }
};

export const enrollUserInCourse = async (req, res) => {
    const { userId, courseId } = req.body;
    try {
        const User = (await import("../models/User.js")).default;
        const Course = (await import("../models/Course.js")).default;
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
        console.error("Error adding course to user:", error);
        res.status(500).json({ message: "Error adding course to user", error: error.message });
    }
};

export const getAdminCourses = async (req, res) => {
  try {
    const Course = (await import("../models/Course.js")).default;
    const courses = await Course.find({}).select('title');
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
};

export const addCourse = async (req, res) => {
  const { title, description, instructor, imageUrl, duration, rating, lessons, category } = req.body;
  
  try {
    const generatedModules = [];
    let numLessons = parseInt(lessons, 10);
    
    if (isNaN(numLessons) || numLessons <= 0) {
      numLessons = 1; 
    }

    for (let i = 1; i <= numLessons; i++) {
      const module = {
        title: `Lesson ${i}: ${title} - Part ${i}`,
        content: `This is content for Lesson ${i} of the ${title} course.`,
        videoUrl: '',
        youtubeVideo: {},
        quiz: {}
      };
      generatedModules.push(module);
    }

    const Course = (await import("../models/Course.js")).default;
    const newCourse = new Course({
      title,
      description,
      instructor,
      modules: generatedModules, // Populating modules array here
      isPublished: true,
      imageUrl,
      duration,
      rating: rating || 0,
      lessons: numLessons, 
      category,
      youtubeVideosGenerated: false,
      lastYouTubeSync: null
    });

    const savedCourse = await newCourse.save();
    
    res.status(201).json({ 
      message: "Course added successfully", 
      course: savedCourse
    });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Error adding course", error: error.message });
  }
};
