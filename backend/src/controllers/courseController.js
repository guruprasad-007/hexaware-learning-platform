import Course from '../models/Course.js';
import User from '../models/User.js';

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



const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// ... (keep your existing getUserProfile function)

// @desc    Enroll a user in a course
// @route   POST /api/users/enroll
// @access  Private
const enrollInCourse = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is already enrolled in the course
    const isAlreadyEnrolled = user.courses.ongoing.includes(courseId) || user.courses.completed.includes(courseId);

    if (isAlreadyEnrolled) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    // Add the course to the 'ongoing' list
    user.courses.ongoing.push(courseId);
    
    // Create a new progress document for this course
    user.progress.push({
      courseId: courseId,
      status: 'in-progress',
      modulesProgress: [] // Initially empty
    });

    await user.save();

    res.status(200).json({ message: 'Successfully enrolled in the course' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};




export { getAllCourses, createCourse, getCourseById , enrollInCourse};
