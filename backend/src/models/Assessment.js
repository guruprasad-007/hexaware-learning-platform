// backend/src/models/Assessment.js

import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    topic: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    dateTaken: { type: Date, default: Date.now },
    answers: [{
      question: String,
      userAnswer: String,
      isCorrect: Boolean
    }]
  },
  { timestamps: true }
);

const Assessment = mongoose.model("Assessment", assessmentSchema);
export default Assessment;