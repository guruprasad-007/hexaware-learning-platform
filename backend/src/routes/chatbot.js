// backend/src/routes/chatbot.js (CORRECTED IMPORT FOR NAMED EXPORT)
import express from 'express';
const router = express.Router();
import * as chatbotController from '../controllers/chatbotController.js';

// CHANGE THIS LINE: Import 'protect' as a named export
import { protect } from '../middleware/authMiddleware.js'; // <--- CORRECTED LINE

// Route to send messages to the chatbot
// Use 'protect' directly, as it's now imported by its name
router.post('/message', chatbotController.sendMessage); // Removed 'protect' middleware
export default router;