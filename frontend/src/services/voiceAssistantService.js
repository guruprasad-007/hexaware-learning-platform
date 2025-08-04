// frontend/src/services/voiceAssistantService.js
import api from './api'; // Re-use your existing axios instance

export const processVoiceCommand = async (commandText) => {
  try {
    console.log("Sending voice command to backend:", commandText);
    // This endpoint will be handled by your Node.js backend
    const response = await api.post('/voice-command', { command: commandText });
    console.log("Received AI action from backend:", response.data);
    return response.data; // Expecting { action: "navigate", target: "/dashboard" } or { action: "respond", response: "..." }
  } catch (error) {
    console.error('Error in voiceAssistantService:', error);
    throw error;
  }
};