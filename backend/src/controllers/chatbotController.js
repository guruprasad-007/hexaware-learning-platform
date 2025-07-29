// backend/src/controllers/chatbotController.js (UPDATED)
import * as aiService from '../services/aiService.js'; // Note the .js extension!
// If aiService exports default, use: import aiService from '../services/aiService.js';
// Based on previous code, `exports.getChatbotResponse` means it's named exports, so `* as` or individual named imports are needed.

export const sendMessage = async (req, res) => { // Old: exports.sendMessage = ...
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const aiReply = await aiService.getChatbotResponse(message);
    res.json({ reply: aiReply });
  } catch (error) {
    console.error('Error in chatbotController:', error);
    res.status(500).json({ error: 'Failed to get a response from AI assistant.' });
  }
};