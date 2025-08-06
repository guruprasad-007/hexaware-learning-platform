// backend/src/services/aiService.js

import axios from 'axios';

const AI_AGENT_BASE_URL = 'http://localhost:8000'; 

export const getChatbotResponse = async (message) => {
  try {
    const response = await axios.post(`${AI_AGENT_BASE_URL}/chatbot_query`, {
      user_message: message,
    });
    return response.data.response;
  } catch (error) {
    console.error('Error communicating with AI agent:', error.message);
    if (error.response) {
        console.error('AI Agent Response Data:', error.response.data);
    } else if (error.request) {
        console.error('No response received from AI Agent:', error.request);
    }
    throw new Error('Could not get response from AI agent service.');
  }
};

export const processVoiceCommand = async (commandText) => {
  try {
    const response = await axios.post(`${AI_AGENT_BASE_URL}/process_voice_command`, {
      command_text: commandText,
    });
    return response.data;
  } catch (error) {
    console.error('Error communicating with Python voice agent:', error.message);
    if (error.response) {
        console.error('Voice Agent Response Data:', error.response.data);
    } else if (error.request) {
        console.error('No response received from Voice Agent:', error.request);
    }
    throw new Error('Could not get response from AI voice command service.');
  }
};

export const generateQuiz = async (topic) => {
    try {
        const response = await axios.get(`${AI_AGENT_BASE_URL}/generate_quiz?topic=${topic}`);
        return response.data;
    } catch (error) {
        console.error('Error generating quiz via AI agent:', error.message);
        if (error.response) {
            console.error('AI Quiz Agent Response Data:', error.response.data);
        } else if (error.request) {
            console.error('No response received from AI Quiz Agent:', error.request);
        }
        throw new Error('Failed to generate quiz from AI agent service.');
    }
};
