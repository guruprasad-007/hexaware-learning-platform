# ai-agents/quiz_agent.py
import google.generativeai as genai
import os
import json

class QuizAgent:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set for QuizAgent.")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('models/gemini-2.5-pro')

    def generate_questions(self, topic: str, num_questions: int = 5) -> dict:
        prompt = f"""
        Generate a multiple-choice quiz with {num_questions} questions on the topic of '{topic}'.
        For each question, provide 4 options (A, B, C, D) and specify the correct answer.
        Return the output as a JSON array of objects. Each object should have the following keys:
        - question: The quiz question text.
        - options: An array of 4 option strings.
        - correctAnswer: The correct answer (e.g., "C").
        Example format:
        [{{
          "question": "What is the capital of France?",
          "options": ["A. Berlin", "B. Madrid", "C. Paris", "D. Rome"],
          "correctAnswer": "C"
        }}]
        """
        try:
            response = self.model.generate_content(prompt)
            quiz_json_string = response.text.strip().replace('```json', '').replace('```', '').strip()
            quiz_data = json.loads(quiz_json_string)
            return quiz_data
        except Exception as e:
            print("Error generating quiz questions: " + str(e))
            return {"error": "Failed to generate quiz"}

if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()
    quiz_agent = QuizAgent()
    quiz = quiz_agent.generate_questions("React Hooks")
    print(json.dumps(quiz, indent=2))