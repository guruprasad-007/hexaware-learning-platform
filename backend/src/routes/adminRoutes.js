// backend/src/routes/adminRoutes.js

import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

const ADMIN_EMAIL = "guruadmin17@gmail.com";
const ADMIN_PASSWORD_HASH = "$2b$10$ABuRmAWRlvqh70TLOQ/gluFz1cY8jMO/n2De3Dm0CppeTJZ7VdM7q";

router.post('/login', async (req, res) => {
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
});

router.use(protect);
router.use(adminOnly);

router.get('/dashboard-stats', async (req, res) => {
  try {
    const User = (await import('../models/User.js')).default;
    const Course = (await import('../models/Course.js')).default;

    const totalCourses = await Course.countDocuments();
    const totalUsers = await User.countDocuments();

    const stats = {
      totalCourses,
      totalUsers
    };

    res.json(stats);

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
});

router.get('/users', async (req, res) => {
  try {
    const User = (await import('../models/User.js')).default;
    const users = await User.find({ role: 'user' }) 
      .populate('enrolledCourses', 'title instructor category') 
      .select('-password') 
      .sort({ createdAt: -1 });

    res.json(users);

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

router.post('/enroll-course', async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({
        message: 'User ID and Course ID are required'
      });
    }

    const User = (await import('../models/User.js')).default;
    const Course = (await import('../models/Course.js')).default;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({
        message: 'User is already enrolled in this course'
      });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.json({
      message: 'User enrolled in course successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        enrolledCourses: user.enrolledCourses
      }
    });

  } catch (error) {
    console.error('Error enrolling user in course:', error);
    res.status(500).json({
      message: 'Failed to enroll user in course',
      error: error.message
    });
  }
});

router.get('/courses', async (req, res) => {
  try {
    const Course = (await import('../models/Course.js')).default;
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ 
      message: 'Failed to fetch courses', 
      error: error.message 
    });
  }
});

router.post('/courses', async (req, res) => {
  try {
    const {
      title,
      description,
      instructor,
      imageUrl,
      duration,
      rating,
      lessons,
      category
    } = req.body;

    if (!title || !instructor || !category) {
      return res.status(400).json({
        message: 'Missing required fields: title, instructor, and category are required'
      });
    }

    if (rating && (rating < 0 || rating > 5)) {
      return res.status(400).json({
        message: 'Rating must be between 0 and 5'
      });
    }

    if (lessons && lessons < 0) {
      return res.status(400).json({
        message: 'Number of lessons cannot be negative'
      });
    }

    const generatedModules = [];
    let numLessons = parseInt(lessons, 10);
    if (isNaN(numLessons) || numLessons <= 0) {
        numLessons = 1; 
    }

    for (let i = 1; i <= numLessons; i++) {
        generatedModules.push({
            title: `Lesson ${i}: ${title} - Part ${i}`,
            content: `This is content for Lesson ${i} of the ${title} course.`,
            videoUrl: '',
            youtubeVideo: {},
            quiz: {}
        });
    }

    const courseData = {
      title: title.trim(),
      description: description?.trim() || '',
      instructor: instructor.trim(),
      category: category.trim(),
      imageUrl: imageUrl?.trim() || '',
      duration: duration?.trim() || '',
      rating: rating ? parseFloat(rating) : 0,
      lessons: numLessons, 
      isPublished: false, 
      modules: generatedModules 
    };

    const Course = (await import('../models/Course.js')).default;
    const newCourse = new Course(courseData);
    const savedCourse = await newCourse.save();

    res.status(201).json({
      message: 'Course created successfully',
      course: savedCourse
    });

  } catch (error) {
    console.error('Error creating course:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Course with this title already exists'
      });
    }

    res.status(500).json({
      message: 'Failed to create course',
      error: error.message
    });
  }
});

router.put('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined || updateData[key] === '') {
        delete updateData[key];
      }
    });

    const Course = (await import('../models/Course.js')).default;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Course updated successfully',
      course: updatedCourse
    });

  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      message: 'Failed to update course',
      error: error.message
    });
  }
});

router.delete('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const Course = (await import('../models/Course.js')).default;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Course deleted successfully',
      course: deletedCourse
    });

  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      message: 'Failed to delete course',
      error: error.message
    });
  }
});

router.get('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const Course = (await import('../models/Course.js')).default;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);

  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      message: 'Failed to fetch course',
      error: error.message
    });
  }
});

export default router;
