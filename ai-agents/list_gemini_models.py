# ai-agents/list_gemini_models.py
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load your .env file to get the GEMINI_API_KEY
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("Error: GEMINI_API_KEY environment variable not set. Please set it in your .env file.")
else:
    try:
        genai.configure(api_key=api_key)
        print("--- Available Gemini Models supporting 'generateContent' ---")
        found_models = False
        for m in genai.list_models():
            if "generateContent" in m.supported_generation_methods:
                print(f"  - {m.name} (Description: {m.description})")
                found_models = True
        if not found_models:
            print("No models found supporting 'generateContent' with your current API key and project setup.")
        print("----------------------------------------------------------")
    except Exception as e:
        print(f"An error occurred while listing models: {e}")
        print("Please ensure your API key is correct and billing is set up if required.")