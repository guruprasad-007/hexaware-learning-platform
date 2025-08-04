// backend/src/controllers/voiceAssistantController.js
import * as aiService from '../services/aiService.js'; // Assuming aiService now uses ES modules

export const processCommand = async (req, res) => {
  const { command } = req.body;
  console.log("Voice Assistant controller hit!"); 
  

  if (!command) {
    return res.status(400).json({ error: 'Voice command text is required' });
  }

  console.log(`Received voice command: "${command}"`);

  try {
    // Call the AI Service to get a structured action from your Python voice agent
    const aiAction = await aiService.processVoiceCommand(command);

    // Expecting aiAction like: { action: "navigate", target: "/dashboard" } or { action: "respond", response: "..." }
    if (aiAction && aiAction.action) {
        return res.json(aiAction);
    } else {
        // Default response if AI doesn't return a clear action
        return res.json({ action: "respond", response: "I'm sorry, I couldn't determine the exact action for that command." });
    }
  } catch (error) {
    console.error('Error in voiceAssistantController:', error);
    res.status(500).json({ action: "respond", response: "I encountered an error processing your voice command. Please try again later." });
  }
};