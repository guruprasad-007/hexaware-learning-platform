import Course from '../models/Course.js';

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
  try {
    // Destructure all the required fields from the request body
    const {
      title,
      description,
      duration,
      rating,
      students,
      instructor,
      price,
      thumbnailUrl,
      category,
      level,
      modules,
      trending,
      filterCategory
    } = req.body;

    // Create a new course instance
    const course = new Course({
      title,
      description,
      duration,
      rating,
      students,
      instructor,
      price,
      thumbnailUrl,
      category,
      level,
      modules,
      trending,
      filterCategory
    });

    // Save the new course to the database
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    // Handle potential validation errors or other issues
    res.status(400).json({ message: 'Failed to create course: ' + error.message });
  }
};

export { getAllCourses, createCourse };
