// backend/src/routes/voiceAssistant.js
import express from 'express';
const router = express.Router();
import * as voiceAssistantController from '../controllers/voiceAssistantController.js';
// You might want to protect this route if voice commands are only for logged-in users
// import { protect } from '../middleware/auth.js'; 

console.log("Voice Assistant route file loaded and router initialized.")
router.post('/', voiceAssistantController.processCommand); // <--- CHANGE THIS LINE

export default router;