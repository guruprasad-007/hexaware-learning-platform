# ai-agents/main.py (Modified to be a Flask server)
from flask import Flask, request, jsonify
from flask_cors import CORS # To handle CORS issues between frontend and this server
from chatbot_agent import ChatbotAgent # Import your new chatbot agent

# Import your other agents if main.py is orchestrating them
# from profile_agent import ProfileAgent
# from assessment_agent import AssessmentAgent
# from recommender_agent import RecommenderAgent
# from tracker_agent import TrackerAgent

app = Flask(__name__)
CORS(app) # Enable CORS for all origins (adjust in production for security)

# Initialize your chatbot agent
chatbot = ChatbotAgent()

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