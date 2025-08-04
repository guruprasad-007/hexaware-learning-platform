// frontend/src/components/voice/VoiceAssistantComponent.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { processVoiceCommand } from '../../services/voiceAssistantService'; // We'll create this service

export default function VoiceAssistantComponent() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [statusMessage, setStatusMessage] = useState('Click to speak');
  const navigate = useNavigate();

  // Check for Web Speech API compatibility
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechSynthesis = window.speechSynthesis;
  const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;

  useEffect(() => {
    if (!SpeechRecognition || !SpeechSynthesis) {
      setStatusMessage("Voice commands not supported by your browser.");
      console.error("Web Speech API not supported in this browser.");
    }
  }, [SpeechRecognition, SpeechSynthesis]);

  const speak = (text) => {
    if (SpeechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Set language
      SpeechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (!SpeechRecognition || isListening) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Listen for a single phrase
    recognition.interimResults = false; // Only return final results
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setStatusMessage('Listening...');
      console.log('Voice recognition started.');
    };

    recognition.onresult = async (event) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      setStatusMessage(`Processing: "${spokenText}"`);
      console.log('Transcript:', spokenText);

      try {
        // Send command to backend AI agent
        const aiAction = await processVoiceCommand(spokenText);
        console.log('AI Action received:', aiAction);

        if (aiAction && aiAction.action === 'navigate' && aiAction.target) {
          speak(`Navigating to ${aiAction.target.replace('/', ' ')}.`);
          navigate(aiAction.target);
          setStatusMessage('Command executed!');
        } else if (aiAction && aiAction.action === 'respond' && aiAction.response) {
          speak(aiAction.response);
          setStatusMessage('Response delivered!');
        } else {
          speak("I'm sorry, I couldn't understand that command.");
          setStatusMessage("Command not understood.");
        }
      } catch (error) {
        console.error('Error processing voice command:', error);
        speak("I encountered an error. Please try again.");
        setStatusMessage("Error processing command.");
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setStatusMessage(`Error: ${event.error}`);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        speak("Please allow microphone access to use voice commands.");
      } else {
        speak("Sorry, I didn't catch that. Please try again.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setStatusMessage('Click to speak');
      console.log('Voice recognition ended.');
    };

    recognition.start();
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={startListening}
        disabled={isListening || !SpeechRecognition}
        className={`
          bg-blue-600 text-white rounded-full p-4 shadow-lg
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
          transition-all duration-300 transform
          ${isListening ? 'scale-110 animate-pulse' : 'hover:scale-110'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        aria-label="Start Voice Assistant"
        title={statusMessage}
      >
        {isListening ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3s3 1.34 3 3v6c0 1.66-1.34 3-3 3z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14c1.66 0 2.99-1.34 2.99-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3.25-2.52 5.8-5.3 5.8S6.7 14.25 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z" />
          </svg>
        )}
      </button>
      {statusMessage && (
        <div className="absolute top-0 left-full ml-3 px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg transform -translate-y-1/2 whitespace-nowrap opacity-0 animate-fade-in-right origin-left">
          {statusMessage}
        </div>
      )}
    </div>
  );
}