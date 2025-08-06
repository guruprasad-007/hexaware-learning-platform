// backend/src/models/Course.js

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    instructor: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    modules: [ // Keeping modules array for other potential uses, but not directly used for video/quiz generation anymore
      {
        title: { type: String, required: true },
        content: { type: String }, 
        videoUrl: { type: String }, 
        youtubeVideo: { 
          videoId: { type: String },
          title: { type: String },
          description: { type: String },
          thumbnail: { type: String },
          channelTitle: { type: String },
          embedUrl: { type: String },
          duration: { type: String }
        },
        quiz: { 
          questions: [{
            question: { type: String },
            options: [{ type: String }],
            correctAnswer: { type: String }
          }],
          isGenerated: { type: Boolean, default: false }
        }
      }
    ],
    // --- NEW FIELD TO STORE GENERATED VIDEO/QUIZ CONTENT PER LESSON ---
    generatedLessonContent: [
      {
        lessonNumber: { type: Number, required: true },
        title: { type: String, required: true }, // e.g., "Lesson 1: Course Title - Part 1"
        youtubeVideo: {
          videoId: { type: String },
          title: { type: String },
          description: { type: String },
          thumbnail: { type: String },
          channelTitle: { type: String },
          embedUrl: { type: String },
          duration: { type: String }
        },
        quiz: {
          questions: [{
            question: { type: String },
            options: [{ type: String }],
            correctAnswer: { type: String }
          }],
          isGenerated: { type: Boolean, default: false }
        }
      }
    ],
    imageUrl: { type: String },
    duration: { type: String },
    rating: { type: Number, default: 0 },
    lessons: { type: Number, default: 0 }, // Number of lessons/chapters
    category: { type: String, required: true },
    youtubeVideosGenerated: { type: Boolean, default: false },
    lastYouTubeSync: { type: Date }
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
