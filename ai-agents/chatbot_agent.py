# ai-agents/chatbot_agent.py

import google.generativeai as genai
import os
from dotenv import load_dotenv

class ChatbotAgent:
    def __init__(self):
        # Load environment variables from .env file
        load_dotenv()
        
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set. Please set it in your .env file.")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-pro') # Using gemini-1.5-pro for better performance

        # Initialize chat session for conversational memory
        self.chat_session = self.model.start_chat(history=[])

        # Define a list of keywords to identify learning-related queries
        self.learning_keywords = [
            "course", "lesson", "quiz", "module", "chapter",
            "learn", "study", "topic", "subject", "video",
            "question", "answer", "certificate", "progress",
            "dashboard", "profile", "enroll", "instructor",
            "api", "code", "python", "javascript", "java", "react", "mongodb",
            "database", "programming", "development", "data science"
        ]

    def _is_learning_related(self, message: str) -> bool:
        """
        Checks if a message contains keywords related to the learning platform.
        """
        # A simple check for now, can be expanded with more advanced NLP
        message_lower = message.lower()
        return any(keyword in message_lower for keyword in self.learning_keywords)

    def get_response(self, user_message: str) -> str:
        """
        Processes the user message and returns an AI-generated response, filtered by relevance.
        """
        user_message_lower = user_message.lower()

        # 1. Prioritize hardcoded responses
        if "hello" in user_message_lower or "hi" in user_message_lower:
            return "Hello! I am Mave, your AI learning assistant. How can I assist you today?"
        elif "courses" in user_message_lower or "explore" in user_message_lower:
            return "Our platform offers a wide range of courses. You can explore them in the 'Courses' section. What specific topic are you interested in?"
        elif "progress" in user_message_lower or "track" in user_message_lower or "dashboard" in user_message_lower:
            return "You can view your learning progress in your dashboard. Look for your enrolled courses there."
        elif "help" in user_message_lower or "support" in user_message_lower:
            return "I'm here to help! Please tell me more about what you need assistance with regarding the learning platform."
        elif "thank" in user_message_lower or "thanks" in user_message_lower:
            return "You're welcome! Happy to help."
        elif "contact" in user_message_lower:
            return "For specific issues, you can reach our support team through the 'Contact Us' page."
        elif "what are you" in user_message_lower or "who are you" in user_message_lower or "tell me about yourself" in user_message_lower:
            return "I am Vai, an AI assistant powered by Google's Gemini model, designed to help you navigate the Hexaware Learning Platform and answer your questions."
        
        # 2. Filter for learning-related questions before calling Gemini
        if not self._is_learning_related(user_message):
            return "I'm sorry, I can only assist with questions related to the Hexaware Learning Platform."

        # 3. If relevant, use the LLM (Gemini) for a dynamic response
        try:
            # Send message to Gemini through the chat session for conversational context
            response = self.chat_session.send_message(user_message)
            return response.text
        except Exception as e:
            print(f"Error generating content with LLM: {e}")
            return "I'm sorry, I couldn't connect to the AI brain right now. Please try again later."

# Example usage (for testing this agent in isolation)
if __name__ == "__main__":
    chatbot = ChatbotAgent()
    print("Chatbot initialized. Type 'exit' to quit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            break
        print(f"AI: {chatbot.get_response(user_input)}")
