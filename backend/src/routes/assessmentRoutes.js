// backend/src/routes/assessmentRoutes.js

import express from 'express';
const router = express.Router();
// Import the controller functions
import { generateQuiz, submitScore, getStudentPerformancePrediction } from '../controllers/assessmentController.js';
// Import the authentication middleware
import { protect } from '../middleware/auth.js';

// Route to generate a quiz (if you have a separate feature for this)
router.get('/generate', protect, generateQuiz);

// Route to submit a student's quiz score and answers
router.post('/submit', protect, submitScore);

// Route to get a student's performance prediction for a specific course
// The :courseId parameter is used to identify the course
router.get('/prediction/:courseId', protect, getStudentPerformancePrediction); 

export default router;
