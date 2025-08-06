// backend/src/models/Assessment.js

import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // References the Course model
        required: true
    },
    lessonNumber: { // To link the assessment to a specific lesson/module
        type: Number,
        required: true
    },
    quizTitle: { // The title of the quiz, e.g., "Lesson 1: Intro to React"
        type: String,
        required: true
    },
    score: { // Number of correct answers
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    percentageScore: { // Calculated percentage score (e.g., 85.5)
        type: Number,
        required: true
    },
    answers: [ // Array to store user's answers and correctness for each question
        {
            question: { type: String, required: true },
            userAnswer: { type: String }, // The option chosen by the user
            correctAnswer: { type: String, required: true }, // The actual correct answer
            isCorrect: { type: Boolean, required: true } // True if userAnswer matches correctAnswer
        }
    ],
    submittedAt: { // Timestamp of when the quiz was submitted
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const Assessment = mongoose.model('Assessment', assessmentSchema);
export default Assessment;
