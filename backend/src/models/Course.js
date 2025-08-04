// backend/src/models/Course.js (UPDATED)

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    instructor: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    modules: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        videoUrl: { type: String }
      }
    ],
    // --- NEW FIELDS ---
    imageUrl: { type: String },
    duration: { type: String },
    rating: { type: Number, default: 0 },
    lessons: { type: Number, default: 0 },
    // --- NEW CATEGORY FIELD ---
    category: { type: String, required: true }
    // ------------------
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;