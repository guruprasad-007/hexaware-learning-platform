// backend/src/controllers/assessmentController.js
import Assessment from "../models/Assessment.js";
// Assuming you have an aiService to communicate with your quiz_agent.py
import * as aiService from "../services/aiService.js";
import Course from "../models/Course.js";

// @desc    Generate an AI quiz
// @route   GET /api/assessments/generate
// @access  Private (User)
export const generateQuiz = async (req, res) => {
    const { topic } = req.query;
    if (!topic) return res.status(400).json({ message: "Topic is required" });

    try {
        // Call the Python AI agent to generate questions
        const quizQuestions = await aiService.generateQuiz(topic);
        res.status(200).json(quizQuestions);
    } catch (error) {
        console.error("Error generating quiz:", error);
        res.status(500).json({ message: "Failed to generate AI quiz" });
    }
};

// @desc    Submit user's score and answers
// @route   POST /api/assessments/submit
// @access  Private (User)
export const submitScore = async (req, res) => {
    const { courseId, topic, score, totalQuestions, answers } = req.body;
    const userId = req.user._id;

    try {
        const newAssessment = new Assessment({
            userId,
            courseId,
            topic,
            score,
            totalQuestions,
            answers
        });
        await newAssessment.save();
        res.status(201).json({ message: "Score submitted successfully" });
    } catch (error) {
        console.error("Error submitting score:", error);
        res.status(500).json({ message: "Failed to submit score" });
    }
};