// frontend/src/services/chatbotService.js
import api from './api'; // Assuming you have a configured axios instance

export const sendMessageToChatbot = async (message) => {
  try {
    const response = await api.post('/chatbot/message', { message });
    return response.data.reply; // Assuming your backend sends back { reply: "..." }
  } catch (error) {
    console.error('Error sending message to chatbot:', error);
    throw error;
  }
};