// frontend/src/services/voiceAssistantService.js
import api from './api';

const AI_AGENT_BASE_URL = 'http://localhost:8000'; 

export const processVoiceCommand = async (commandText) => {
    try {
        console.log("Sending voice command to AI agent:", commandText);
        const response = await api.post(`${AI_AGENT_BASE_URL}/process_voice_command`, 
            { command_text: commandText }
        );
        console.log("Received AI action from backend:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error in voiceAssistantService:', error);
        throw error;
    }
};
