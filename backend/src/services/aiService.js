// backend/src/services/aiService.js (UPDATED)
import axios from 'axios'; // Old: const axios = require('axios');

const AI_AGENT_BASE_URL = 'http://localhost:8000';

export const getChatbotResponse = async (message) => { // Old: exports.getChatbotResponse = ...
  try {
    const response = await axios.post(`${AI_AGENT_BASE_URL}/chatbot_query`, {
      user_message: message,
    });
    return response.data.response;
  } catch (error) {
    console.error('Error communicating with AI agent:', error.message);
    if (error.response) {
        console.error('AI Agent Response Data:', error.response.data);
        console.error('AI Agent Response Status:', error.response.status);
    } else if (error.request) {
        console.error('No response received from AI Agent:', error.request);
    }
    throw new Error('Could not get response from AI agent service.');
  }
};