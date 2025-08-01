import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  // --- Fields from your original model ---
  title: { // Changed from 'name' to 'title' to match frontend
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  thumbnailUrl: {
    type: String,
    default: 'https://placehold.co/400x250/E0E0E0/333333?text=Course+Image'
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  duration: { // Changed from durationHours to match frontend ("12 hrs")
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
    required: true
  },
  modules: [{
    number: { type: Number, required: true },
    content: { type: String, required: true },
    // test object...
  }],

  // --- ✅ Added fields to support the frontend UI ---
  description: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  students: { // Storing as a number, will format on frontend
    type: Number,
    default: 0,
  },
  instructor: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Storing price as a number is better for calculations
    required: true,
  },
  trending: {
    type: Boolean,
    default: false,
  },
  filterCategory: { // For the filter buttons
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
