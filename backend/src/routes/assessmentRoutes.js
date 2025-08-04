// backend/src/routes/assessmentRoutes.js

import express from 'express';
const router = express.Router();
import { generateQuiz, submitScore } from '../controllers/assessmentController.js';
import { protect } from '../middleware/auth.js';

// @route   GET /api/assessments/generate
// @desc    Generate an AI quiz
// @access  Private (User)
router.get('/generate', protect, generateQuiz);

// @route   POST /api/assessments/submit
// @desc    Submit user's quiz score and answers
// @access  Private (User)
router.post('/submit', protect, submitScore);

export default router;