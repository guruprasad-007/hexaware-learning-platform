// backend/src/controllers/assessmentController.js

// aiService is used for generating quizzes, not directly for score submission/prediction
import * as aiService from "../services/aiService.js"; 

// This function generates a quiz on demand (used elsewhere, not directly for prediction)
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

// @desc    Submit user's quiz score and answers to the database
// @route   POST /api/assessments/submit
// @access  Private (User must be logged in)
export const submitScore = async (req, res) => {
    // Extract data from the request body
    const { courseId, lessonNumber, quizTitle, score, totalQuestions, answers } = req.body;
    // Get the user ID from the authenticated request (set by your auth middleware)
    const userId = req.user._id; 

    // Basic validation to ensure all necessary data is present
    if (!courseId || !lessonNumber || !quizTitle || score === undefined || !totalQuestions || !answers) {
        return res.status(400).json({ message: "Missing required quiz submission data." });
    }

    try {
        // Dynamically import the Assessment model to avoid circular dependencies or static import issues
        const Assessment = (await import("../models/Assessment.js")).default; 

        // Calculate the percentage score
        const percentageScore = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

        // Create a new Assessment document
        const newAssessment = new Assessment({
            userId,
            courseId,
            lessonNumber,
            quizTitle,
            score,
            totalQuestions,
            percentageScore,
            answers // Store the detailed answers array
        });

        // Save the new assessment to the database
        await newAssessment.save();
        
        // Send a success response
        res.status(201).json({ message: "Quiz score submitted successfully", assessment: newAssessment });
    } catch (error) {
        console.error("Error submitting quiz score:", error);
        res.status(500).json({ message: "Failed to submit quiz score", error: error.message });
    }
};

// @desc    Get a student's performance prediction for a specific course
// @route   GET /api/assessments/prediction/:courseId
// @access  Private (User must be logged in)
export const getStudentPerformancePrediction = async (req, res) => {
    const { courseId } = req.params; // Get course ID from URL parameters
    const userId = req.user._id; // Get authenticated user's ID

    try {
        // Dynamically import the Assessment and Course models
        const Assessment = (await import("../models/Assessment.js")).default;
        const Course = (await import("../models/Course.js")).default; 

        // Find all assessments for this user and course, sorted by submission time
        const userAssessments = await Assessment.find({ userId, courseId }).sort({ submittedAt: 1 });

        // If no quiz data exists, return a message
        if (userAssessments.length === 0) {
            return res.status(200).json({ prediction: "No quiz data available for prediction yet for this course.", averageScore: "N/A", quizzesTaken: 0, totalLessons: 0 });
        }

        // Fetch the course to get the total number of lessons
        const course = await Course.findById(courseId);
        // Use course.lessons or default to the number of quizzes taken if lessons not defined
        const totalLessons = course ? course.lessons : userAssessments.length; 

        // Calculate the average percentage score across all quizzes for this course
        const totalPercentage = userAssessments.reduce((sum, assessment) => sum + assessment.percentageScore, 0);
        const averagePercentage = totalPercentage / userAssessments.length;

        let predictionMessage = "";
        // Generate a prediction message based on the average score
        if (averagePercentage >= 80) {
            predictionMessage = "Excellent progress! You are likely to master this course.";
        } else if (averagePercentage >= 60) {
            predictionMessage = "Good progress. You are on track to complete this course successfully.";
        } else if (averagePercentage >= 40) {
            predictionMessage = "Needs some improvement. Consider reviewing earlier lessons in this course.";
        } else {
            predictionMessage = "At risk of falling behind. Strong recommendation to seek additional support for this course.";
        }

        // Send the prediction data in the response
        res.status(200).json({
            averageScore: averagePercentage.toFixed(2), // Format to 2 decimal places
            quizzesTaken: userAssessments.length,
            totalLessons: totalLessons,
            prediction: predictionMessage
        });

    } catch (error) {
        console.error("Error fetching prediction:", error);
        res.status(500).json({ message: "Failed to get performance prediction", error: error.message });
    }
};
