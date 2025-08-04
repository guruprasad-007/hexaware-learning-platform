# ai-agents/voice_agent.py
import google.generativeai as genai
import os
import json 

class VoiceAgent:
    def __init__(self):
        # Configure Gemini (using the same API key setup as chatbot_agent)
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set for VoiceAgent.")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('models/gemini-2.5-pro') # Or the specific model you found

        # Define known commands and their mapping
        self.commands_map = {
            "go to dashboard": {"action": "navigate", "target": "/dashboard"},
            "show my courses": {"action": "navigate", "target": "/courses"},
            "open courses": {"action": "navigate", "target": "/courses"},
            "go to profile": {"action": "navigate", "target": "/profile"},
            "show my profile": {"action": "navigate", "target": "/profile"},
            "go home": {"action": "navigate", "target": "/"},
            "return home": {"action": "navigate", "target": "/"},
            "what can you do": {"action": "respond", "response": "I can help you navigate the platform, like 'go to dashboard' or 'show my courses', and answer general questions."},
            # Add more commands here
        }

    def process_command(self, command_text: str) -> dict:
        command_text_lower = command_text.lower().strip()
        print(f"Voice agent processing: '{command_text_lower}'")

        # First, check for exact matches or very strong patterns
        for phrase, action_data in self.commands_map.items():
            if phrase in command_text_lower:
                print(f"Matched hardcoded command: {phrase}")
                return action_data

        # If no direct match, use LLM for intent recognition
        try:
            # Prompt the LLM to identify the intent and extract entities
            prompt = (f"Analyze the following user command from a learning platform. "
                      f"Identify if it's a navigation request or a question. "
                      f"If it's navigation, output a JSON like: "
                      f"{{'action': 'navigate', 'target': '/[page_name]'}}. "
                      f"Possible targets are: /dashboard, /courses, /profile, /settings, /assessments, /login, /signup, /admin. "
                      f"If it's a question, output: {{'action': 'respond', 'response': '[your answer]'}}. "
                      f"If you cannot determine, respond: {{'action': 'respond', 'response': 'I did not understand. Can you rephrase?'}}. "
                      f"User command: '{command_text_lower}'"
                      )

            # Use generate_content for single turn structured output
            response = self.model.generate_content(prompt)

            # Attempt to parse the LLM's response as JSON
            try:
                llm_json_response = response.text.strip()
                # Gemini might wrap JSON in ```json...```
                if llm_json_response.startswith('```json'):
                    llm_json_response = llm_json_response.replace('```json', '').replace('```', '').strip()

                parsed_response = json.loads(llm_json_response)
                if 'action' in parsed_response:
                    print(f"LLM parsed action: {parsed_response}")
                    return parsed_response
            except json.JSONDecodeError:
                print(f"LLM did not return valid JSON, using simple response for: {response.text}")
                return {"action": "respond", "response": response.text.strip()}

        except Exception as e:
            print(f"Error calling LLM for voice command: {e}")
            return {"action": "respond", "response": "I'm sorry, I couldn't process your voice command at this moment due to an AI error."}

        # Fallback if nothing else works
        return {"action": "respond", "response": "I did not understand your voice command. Please try again."}

# Example usage (for testing)
if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()
    import json # Import json for testing purposes

    agent = VoiceAgent()
    print("Voice Agent initialized. Try commands like 'go to dashboard' or 'show my courses'. Type 'exit' to quit.")
    while True:
        user_input = input("You (voice command): ")
        if user_input.lower() == 'exit':
            break
        response = agent.process_command(user_input)
        print(f"Agent response: {response}")