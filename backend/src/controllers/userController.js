import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  // The user object is attached to the request by the 'protect' middleware
  const userId = req.user._id;

  try {
    // Find the user by their ID and populate the 'ongoing' and 'completed' course fields.
    // This replaces the course ObjectIds with the actual course documents.
    // NOTE: This assumes you have a 'Course' model that is referenced.
    const user = await User.findById(userId)
      .populate('courses.ongoing')
      .populate('courses.completed');

    if (user) {
      // The frontend needs to combine the populated course data with the user's progress data.
      // We send the full user object so the frontend has everything it needs.
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePictureUrl: user.profilePictureUrl,
        currentPoints: user.currentPoints,
        currentStreak: user.currentStreak,
        badges: user.badges,
        achievements: user.achievements,
        courses: user.courses, // This now contains the full course objects
        progress: user.progress, // Send the detailed progress data
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

export { getUserProfile };
