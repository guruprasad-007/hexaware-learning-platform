# ai-agents/voice_agent.py

import google.generativeai as genai
import os
import json
import requests
from dotenv import load_dotenv

class VoiceAgent:
    def __init__(self):
        load_dotenv()
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set for VoiceAgent.")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('models/gemini-2.5-pro')
        self.backend_url = os.getenv("BACKEND_URL", "http://localhost:5000")
        self.commands_map = {
            "go to dashboard": {"action": "navigate", "target": "/dashboard"},
            "show my courses": {"action": "navigate", "target": "/courses"},
            "open courses": {"action": "navigate", "target": "/courses"},
            "go to profile": {"action": "navigate", "target": "/profile"},
            "show my profile": {"action": "navigate", "target": "/profile"},
            "go home": {"action": "navigate", "target": "/"},
            "return home": {"action": "navigate", "target": "/"},
            "what can you do": {"action": "respond", "response": "I can help you navigate the platform, like 'go to dashboard' or 'show my courses', and answer general questions."},
            "what courses do you have": {"action": "list_courses"},
            "list all courses": {"action": "list_courses"},
            "go to homepage": {"action": "navigate", "target": "/"},
            "who are you": {"action": "respond", "responce": "Hello! I am Mave , your AI assistant."},
        }
        
        # New: Store a list of course titles and IDs for LLM prompting
        self.courses_data = self._get_courses_data()
        self.course_titles = [course.get('title') for course in self.courses_data if course.get('title')]

    def _get_courses_data(self) -> list:
        """
        Fetches all course titles and IDs from the Node.js backend.
        """
        try:
            response = requests.get(f"{self.backend_url}/api/courses/all")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching courses from backend: {e}")
            return []

    def _enroll_in_course(self, course_title: str, token: str) -> dict:
        """
        Calls the backend API to enroll the authenticated user in a course.
        """
        print(f"Attempting to enroll in course: '{course_title}' with token: '{token[:10]}...'")
        try:
            course_id = next((course.get('_id') for course in self.courses_data if course.get('title').lower() == course_title.lower()), None)
            if not course_id:
                print(f"Error: Course ID not found for title '{course_title}'")
                return {"action": "respond", "response": f"I couldn't find a course with the title '{course_title}'. Please try again."}

            headers = {"Authorization": f"Bearer {token}"}
            enroll_url = f"{self.backend_url}/api/courses/enroll/{course_id}"
            
            print(f"Sending enrollment request to: {enroll_url}")
            print(f"With headers: {headers}")

            response = requests.post(enroll_url, headers=headers)
            response.raise_for_status()

            print(f"Enrollment successful! Status: {response.status_code}")
            return {"action": "respond", "response": f"Successfully enrolled in the course: {course_title}."}

        except requests.exceptions.HTTPError as http_err:
            print(f"HTTP error occurred during enrollment: {http_err}")
            print(f"Response status code: {http_err.response.status_code}")
            print(f"Response body: {http_err.response.text}")
            if http_err.response.status_code == 409:
                return {"action": "respond", "response": f"You are already enrolled in the course: {course_title}."}
            elif http_err.response.status_code == 401:
                return {"action": "respond", "response": "You must be logged in to enroll in a course. Please log in first."}
            else:
                return {"action": "respond", "response": "An error occurred while trying to enroll you in the course."}
        except Exception as e:
            print(f"An unexpected error occurred during enrollment: {e}")
            return {"action": "respond", "response": "An unexpected error occurred. Please try again."}

    def process_command(self, command_text: str, token: str = None) -> dict:
        command_text_lower = command_text.lower().strip()
        print(f"Voice agent processing: '{command_text_lower}'")

        for phrase, action_data in self.commands_map.items():
            if phrase in command_text_lower:
                if action_data.get("action") == "list_courses":
                    if self.course_titles:
                        response_text = "We currently offer the following courses: " + ", ".join(self.course_titles) + "."
                        return {"action": "respond", "response": response_text}
                    else:
                        return {"action": "respond", "response": "I'm sorry, I couldn't retrieve the list of courses at this time."}
                return action_data

        try:
            course_list_string = "The available courses are: " + ", ".join(self.course_titles) + "."
            prompt = (f"Analyze the user command. "
                      f"Possible actions are: 'navigate', 'respond', or 'enroll'. "
                      f"If it's a navigation command, output a JSON like: "
                      f"{{'action': 'navigate', 'target': '/[page_name]'}}. "
                      f"Valid targets: /dashboard, /courses, /profile. "
                      f"If the user wants to enroll in a course, output a JSON like: "
                      f"{{'action': 'enroll', 'courseTitle': '[exact course title]'}}. "
                      f"Use this information to ensure the course title is correct: {course_list_string}"
                      f"If it's a question, output: {{'action': 'respond', 'response': '[your answer]'}}. "
                      f"If you cannot determine, respond with: {{'action': 'respond', 'response': 'I did not understand. Can you rephrase?'}}. "
                      f"User command: '{command_text_lower}'"
                     )
            
            response = self.model.generate_content(prompt)
            llm_json_response = response.text.strip().replace('```json', '').replace('```', '').strip()
            parsed_response = json.loads(llm_json_response)
            
            if parsed_response.get('action') == 'enroll':
                course_title_from_llm = parsed_response.get('courseTitle')
                if course_title_from_llm and token:
                    return self._enroll_in_course(course_title_from_llm, token)
                elif not token:
                    return {"action": "respond", "response": "You must be logged in to enroll in a course."}
                else:
                    return {"action": "respond", "response": "I'm sorry, I couldn't identify the course you want to enroll in."}

            if 'action' in parsed_response:
                return parsed_response
        
        except (json.JSONDecodeError, Exception) as e:
            print(f"Error processing command with LLM: {e}")
            return {"action": "respond", "response": "I'm sorry, I encountered an error. Please try again."}

        return {"action": "respond", "response": "I did not understand your voice command. Please try again."}

if __name__ == "__main__":
    load_dotenv()
    agent = VoiceAgent()
    print("Voice Agent initialized. Try commands like 'enroll in the Java course'.")
    # This example usage needs a token to test the new functionality
    sample_token = "YOUR_JWT_TOKEN_HERE" # Replace with a real token for testing
    while True:
        user_input = input("You (voice command): ")
        if user_input.lower() == 'exit':
            break
        response = agent.process_command(user_input, sample_token)
        print(f"Agent response: {response}")
