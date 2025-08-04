
import express from 'express';
const router = express.Router();
import * as chatbotController from '../controllers/chatbotController.js';
import { protect, adminOnly } from '../middleware/auth.js';

router.post('/message', chatbotController.sendMessage); 
export default router;