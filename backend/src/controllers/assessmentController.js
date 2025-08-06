// backend/src/controllers/assessmentController.js

import * as aiService from "../services/aiService.js";

export const generateQuiz = async (req, res) => {
    const { topic } = req.query;
    if (!topic) return res.status(400).json({ message: "Topic is required" });

    try {
        const quizQuestions = await aiService.generateQuiz(topic);
        res.status(200).json(quizQuestions);
    } catch (error) {
        console.error("Error generating quiz:", error);
        res.status(500).json({ message: "Failed to generate AI quiz" });
    }
};

export const submitScore = async (req, res) => {
    const { courseId, topic, score, totalQuestions, answers } = req.body;
    const userId = req.user._id;

    try {
        const Assessment = (await import("../models/Assessment.js")).default;
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
