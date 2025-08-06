# ai-agents/main.py (Modified to be a Flask server)
from flask import Flask, request, jsonify
from flask_cors import CORS # To handle CORS issues between frontend and this server
from chatbot_agent import ChatbotAgent # Import your new chatbot agent
from dotenv import load_dotenv
from voice_agent import VoiceAgent
from quiz_agent import QuizAgent
# Import your other agents if main.py is orchestrating them
# from profile_agent import ProfileAgent
# from assessment_agent import AssessmentAgent
# from recommender_agent import RecommenderAgent
# from tracker_agent import TrackerAgent
load_dotenv()
app = Flask(__name__)
CORS(app) # Enable CORS for all origins (adjust in production for security)

# Initialize your chatbot agent
chatbot = ChatbotAgent()
voice_assistant = VoiceAgent() 
quiz_agent = QuizAgent()


# If you have other agents that need to be initialized for calls from the chatbot, do it here
# profile_agent_instance = ProfileAgent()
# recommender_agent_instance = RecommenderAgent()

@app.route('/')
def health_check():
    return jsonify({"status": "AI Agents service running"}), 200

@app.route('/chatbot_query', methods=['POST'])
def chatbot_query():
    data = request.json
    user_message = data.get('user_message')

    if not user_message:
        return jsonify({"error": "No user_message provided"}), 400

    print(f"Received message for chatbot: {user_message}") # For debugging

    try:
        # Get response from the chatbot agent
        ai_response = chatbot.get_response(user_message)
        return jsonify({"response": ai_response}), 200
    except Exception as e:
        print(f"Error processing chatbot query: {e}")
        return jsonify({"error": "Internal AI error"}), 500
    
@app.route('/process_voice_command', methods=['POST'])
def process_voice_command():
    data = request.json
    command_text = data.get('command_text')

    if not command_text:
        return jsonify({"error": "No command_text provided"}), 400

    print(f"Received voice command for processing: {command_text}")

    try:
        # Get structured action from the voice agent
        action_response = voice_assistant.process_command(command_text)
        return jsonify(action_response), 200 # action_response is already a dict/JSON
    except Exception as e:
        print(f"Error processing voice command: {e}")
        return jsonify({"action": "respond", "response": "An internal error occurred while processing your voice command."}), 500
    
@app.route('/generate_quiz', methods=['GET'])
def generate_quiz_route():
    topic = request.args.get('topic')
    if not topic:
        return jsonify({"error": "Topic is required"}), 400

    try:
        questions = quiz_agent.generate_questions(topic)
        return jsonify(questions), 200
    except Exception as e:
        print(f"Error from quiz route: {e}")
        return jsonify({"error": "Failed to generate quiz"}), 500

# You would also add routes for your other agents if they are called directly
# @app.route('/profile_analysis', methods=['POST'])
# def profile_analysis():
#     # ... call profile_agent_instance
#     pass

if __name__ == '__main__':
    # Run the Flask app
    # host='0.0.0.0' makes it accessible from outside localhost (important for Docker/VMs)
    # port=8000 matches the AI_AGENT_BASE_URL in your Node.js aiService.js
    app.run(host='0.0.0.0', port=8000, debug=True)