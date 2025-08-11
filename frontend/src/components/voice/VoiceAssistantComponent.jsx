// frontend/src/components/voice/VoiceAssistantComponent.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, X, Loader } from 'lucide-react';
import { processVoiceCommand } from '../../services/voiceAssistantService';

const VoiceAssistantComponent = () => {
    const [isListening, setIsListening] = useState(false);
    const [response, setResponse] = useState('');
    const [processing, setProcessing] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Click to speak');
    const [messageVisible, setMessageVisible] = useState(false);
    const navigate = useNavigate();
    const recognitionRef = useRef(null);
    const responseTimeoutRef = useRef(null);

    // Check for Web Speech API compatibility
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const isSupported = !!SpeechRecognition;
    
    // Text-to-speech for vocal feedback
    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleButtonClick = () => {
        if (!isSupported) {
            setResponse("Speech recognition is not supported in this browser.");
            speak("Speech recognition is not supported in this browser.");
            setMessageVisible(true);
            return;
        }

        if (isListening) {
            stopListening();
        } else {
            setResponse("");
            setStatusMessage('Listening...');
            startListening();
        }
    };

    const startListening = () => {
        if (!isSupported || isListening) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setProcessing(false); // Reset processing state
            setStatusMessage('Listening...');
            console.log('Voice recognition started.');
        };

        recognition.onresult = async (event) => {
            const spokenText = event.results[0][0].transcript;
            setStatusMessage(`Processing: "${spokenText}"`);
            console.log('Transcript:', spokenText);

            stopListening(); // Stop listening immediately after result
            setProcessing(true); // Start processing state for UI feedback

            try {
                // Send command to the voice service
                const aiAction = await processVoiceCommand(spokenText);
                console.log('AI Action received:', aiAction);

                setProcessing(false);

                if (aiAction && aiAction.action === 'navigate' && aiAction.target) {
                    speak(`Navigating to ${aiAction.target.replace('/', ' ')}.`);
                    navigate(aiAction.target);
                    setStatusMessage('Command executed!');
                } else if (aiAction && aiAction.action === 'respond' && aiAction.response) {
                    speak(aiAction.response);
                    setResponse(aiAction.response);
                    setStatusMessage('Response delivered!');
                } else {
                    const fallbackResponse = "I'm sorry, I couldn't understand that command.";
                    speak(fallbackResponse);
                    setResponse(fallbackResponse);
                    setStatusMessage("Command not understood.");
                }
            } catch (error) {
                console.error('Error processing voice command:', error);
                const errorResponse = "I encountered an error. Please try again.";
                speak(errorResponse);
                setResponse(errorResponse);
                setStatusMessage("Error processing command.");
                setProcessing(false);
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setStatusMessage(`Error: ${event.error}`);
            setIsListening(false);
            setProcessing(false);
            if (event.error === 'not-allowed') {
                speak("Please allow microphone access to use voice commands.");
            } else {
                speak("Sorry, I didn't catch that. Please try again.");
            }
        };

        recognition.onend = () => {
            setIsListening(false);
            setProcessing(false);
            if (statusMessage === 'Listening...') {
                setStatusMessage('Click to speak');
            }
            console.log('Voice recognition ended.');
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
        setProcessing(false);
        setStatusMessage('Click to speak');
    };

    useEffect(() => {
        if (response) {
            setMessageVisible(true);
            if (responseTimeoutRef.current) {
                clearTimeout(responseTimeoutRef.current);
            }
            responseTimeoutRef.current = setTimeout(() => {
                setMessageVisible(false);
                setResponse('');
            }, 5000); // Hide message after 5 seconds
        }
        // Cleanup function
        return () => {
            if (responseTimeoutRef.current) {
                clearTimeout(responseTimeoutRef.current);
            }
        };
    }, [response]);

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <div className="voice-assistant-button-wrapper">
                <button
                    onClick={handleButtonClick}
                    className={`voice-assistant-button ${isListening ? 'listening' : ''} ${!isSupported ? 'unsupported' : ''}`}
                    disabled={!isSupported}
                    aria-label="Start Voice Assistant"
                >
                    {processing ? (
                        <Loader className="animate-spin text-white" size={24} />
                    ) : isListening ? (
                        <X size={24} className="text-white" />
                    ) : (
                        <Mic size={24} className="text-white" />
                    )}
                </button>
                {isListening && (
                    <div className="listening-indicator">
                        <span className="dot dot-1"></span>
                        <span className="dot dot-2"></span>
                        <span className="dot dot-3"></span>
                    </div>
                )}
            </div>
            {messageVisible && (
                <div className="voice-response-message">
                    {response}
                </div>
            )}

            {/* Inlined CSS for self-contained component */}
            <style jsx>{`
                .voice-assistant-container {
                    position: fixed;
                    bottom: 24px;
                    left: 24px;
                    z-index: 50;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                .voice-assistant-button-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .voice-assistant-button {
                    background-color: #4f46e5;
                    color: white;
                    border-radius: 9999px; /* full rounded */
                    padding: 16px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    transition-property: all;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    transition-duration: 300ms;
                    transform: scale(1);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .voice-assistant-button:hover:not(:disabled) {
                    background-color: #4338ca;
                    transform: scale(1.1);
                }

                .voice-assistant-button.listening {
                    background-color: #dc2626;
                    transform: scale(1.1);
                    animation: pulse 1.5s infinite cubic-bezier(0.4, 0, 0.6, 1);
                }
                
                .voice-assistant-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .listening-indicator {
                    position: absolute;
                    width: 64px; /* 16px * 4 */
                    height: 64px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .dot {
                    width: 8px;
                    height: 8px;
                    background-color: #dc2626;
                    border-radius: 9999px;
                    margin: 0 2px;
                    opacity: 0.5;
                    animation: dot-pulse 1.5s infinite;
                }

                .dot-1 { animation-delay: 0s; }
                .dot-2 { animation-delay: 0.2s; }
                .dot-3 { animation-delay: 0.4s; }

                @keyframes pulse {
                    0%, 100% {
                        box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
                    }
                }
                
                @keyframes dot-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.5); opacity: 1; }
                }

                .voice-response-message {
                    margin-top: 12px;
                    padding: 12px 20px;
                    background-color: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    color: #1f2937;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 1.5;
                    max-width: 300px;
                    word-wrap: break-word;
                    transform: translateY(10px);
                    animation: fade-in-up 0.5s forwards;
                    opacity: 0;
                }
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default VoiceAssistantComponent;
