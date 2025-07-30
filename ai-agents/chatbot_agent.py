# ai-agents/chatbot_agent.py (THIS IS THE CORRECT VERSION WITH GEMINI INTEGRATION)
import google.generativeai as genai
import os # Make sure this is imported to access environment variables

class ChatbotAgent:
    def __init__(self):
        # Configure your generative AI model using the API key from environment variables
        api_key = os.getenv("GEMINI_API_KEY") # This line reads the API key
        if not api_key:
            # IMPORTANT: This error will tell you if your API key isn't loaded
            raise ValueError("GEMINI_API_KEY environment variable not set. Please set it in your .env file in the ai-agents directory.")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('models/gemini-2.5-pro') # <--- UPDATED THIS LINE # Use the more specific model name # Initialize Gemini Pro model
        
        # Initialize chat session for conversational memory
        self.chat_session = self.model.start_chat(history=[])

    def get_response(self, user_message: str) -> str:
        """
        Processes the user message and returns an AI-generated response.
        """
        user_message_lower = user_message.lower()

        # Hardcoded responses (These will be checked first)
        if "hello" in user_message_lower or "hi" in user_message_lower:
            return "Hello! How can I assist you with Hexaware's learning platform today?"
        elif "courses" in user_message_lower or "learn" in user_message_lower:
            return "Our platform offers a wide range of courses. You can explore them in the 'Courses' section. What specific topic are you interested in?"
        elif "progress" in user_message_lower or "track" in user_message_lower:
            return "You can view your learning progress in your dashboard. Look for the 'My Progress' or 'Learning Path' section."
        elif "help" in user_message_lower or "support" in user_message_lower:
            return "I'm here to help! Please tell me more about what you need assistance with."
        elif "thank" in user_message_lower or "thanks" in user_message_lower:
            return "You're welcome! Happy to help."
        elif "contact" in user_message_lower:
            return "For specific issues, you can reach our support team through the 'Contact Us' page or by emailing support@hexaware.com."
        elif "what are you" in user_message_lower or "who are you" in user_message_lower or "tell me about yourself" in user_message_lower:
            return "I am an AI assistant powered by Google's Gemini model, designed to help you navigate the Hexaware Learning Platform and answer your questions."
        # --- END OF HARDCODED RESPONSES ---

        # If no hardcoded response matches, use the LLM (Gemini)
        try:
            # Send message to Gemini through the chat session for conversational context
            response = self.chat_session.send_message(user_message)
            return response.text
        except Exception as e:
            print(f"Error generating content with LLM: {e}")
            # Fallback if the LLM call itself fails (e.g., API key issue, network error)
            return "I'm sorry, I couldn't connect to the AI brain right now. Please try again later."

# Example usage (for testing this agent in isolation) - You can remove or comment this out for production
if __name__ == "__main__":
    # For local testing, ensure GEMINI_API_KEY is set in your environment or a local .env for this script
    from dotenv import load_dotenv
    load_dotenv() # Load .env if running this file directly
    
    chatbot = ChatbotAgent()
    print("Chatbot initialized. Type 'exit' to quit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            break
        print(f"AI: {chatbot.get_response(user_input)}")