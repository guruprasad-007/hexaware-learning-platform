// backend/src/routes/voiceAssistant.js
import express from 'express';
const router = express.Router();
import * as voiceAssistantController from '../controllers/voiceAssistantController.js';
import { protect } from '../middleware/auth.js'; 

console.log("Voice Assistant route file loaded and router initialized.")

// Add the 'protect' middleware to secure this route
router.post('/', protect, voiceAssistantController.processCommand);

export default router;
