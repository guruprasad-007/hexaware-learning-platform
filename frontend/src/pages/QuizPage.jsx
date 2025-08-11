// frontend/src/pages/QuizPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import api from '../services/api'; 

export default function QuizPage() {
    const { id: courseId, lessonNumber } = useParams(); 
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAnswers, setUserAnswers] = useState({}); 
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem('token');
                if (!token) {
                    setError('You must be logged in to take a quiz.');
                    setLoading(false);
                    return;
                }

                const response = await api.get(`/courses/${courseId}`);
                const course = response.data;

                if (!course) {
                    setError('Course not found.');
                    return;
                }

                const moduleIndex = parseInt(lessonNumber, 10) - 1;
                const lessonModule = course.modules[moduleIndex];

                if (!lessonModule || !lessonModule.quiz || !lessonModule.quiz.isGenerated || !lessonModule.quiz.questions || lessonModule.quiz.questions.length === 0) {
                    setError('Quiz not found for this lesson or not yet generated.');
                    return;
                }

                setQuestions(lessonModule.quiz.questions);

            } catch (err) {
                console.error("Error fetching quiz:", err);
                setError('Failed to load quiz questions. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (courseId && lessonNumber) {
            fetchQuizQuestions();
        }
    }, [courseId, lessonNumber]);

    const handleOptionChange = (questionIndex, selectedOptionValue) => { // Renamed parameter for clarity
        setUserAnswers(prev => ({ ...prev, [questionIndex]: selectedOptionValue }));
    };

    const handleSubmitQuiz = async (e) => {
        e.preventDefault(); 

        let calculatedScore = 0;
        const answersToSubmit = questions.map((q, index) => {
            // The comparison is now between the extracted letter (e.g., 'A') and q.correctAnswer ('A')
            const isCorrect = userAnswers[index] === q.correctAnswer; 
            if (isCorrect) calculatedScore++; 
            return {
                question: q.question,
                userAnswer: userAnswers[index] || 'Not answered', 
                correctAnswer: q.correctAnswer, 
                isCorrect 
            };
        });

        setScore(calculatedScore); 
        setIsSubmitted(true); 
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("You must be logged in to submit your score.");
                return;
            }
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            const quizSubmissionData = {
                courseId,
                lessonNumber: parseInt(lessonNumber, 10),
                quizTitle: questions[0]?.quizTitle || `Quiz for Lesson ${lessonNumber}`, 
                score: calculatedScore,
                totalQuestions: questions.length,
                answers: answersToSubmit 
            };

            await api.post('/assessments/submit', quizSubmissionData, config);
            alert("Quiz submitted successfully! Your score has been recorded."); 

        } catch (submitError) {
            console.error("Failed to submit score to backend:", submitError);
            setError(`Failed to submit score: ${submitError.response?.data?.message || submitError.message}`);
        }
    };

    // Loading State
    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>
                    
                    <div className="container mx-auto px-4 py-20 relative z-10">
                        <div className="flex flex-col items-center justify-center min-h-[60vh]">
                            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30 text-center max-w-md mx-auto">
                                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
                                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Quiz</h2>
                                <p className="text-gray-600">Preparing your questions...</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // Error State
    if (error) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-orange-400/15 to-red-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>
                    
                    <div className="container mx-auto px-4 py-20 relative z-10">
                        <div className="flex flex-col items-center justify-center min-h-[60vh]">
                            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30 text-center max-w-md mx-auto">
                                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-red-700 mb-4">Error</h2>
                                <p className="text-gray-700 mb-6">{error}</p>
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // No Questions State
    if (questions.length === 0) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-gray-400/20 to-slate-400/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-slate-400/15 to-gray-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>
                    
                    <div className="container mx-auto px-4 py-20 relative z-10">
                        <div className="flex flex-col items-center justify-center min-h-[60vh]">
                            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30 text-center max-w-md mx-auto">
                                <div className="w-20 h-20 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">No Questions Available</h2>
                                <p className="text-gray-600">No questions found for this quiz.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
                {/* Enhanced Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Main floating orbs */}
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-tr from-indigo-300/10 to-pink-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
                    
                    {/* Geometric shapes */}
                    <div className="absolute top-1/4 right-1/5 w-32 h-32 border-2 border-purple-200/40 rounded-3xl animate-spin" style={{animationDuration: '20s'}}></div>
                    <div className="absolute bottom-1/3 left-1/6 w-24 h-24 border border-indigo-200/30 rotate-45 animate-bounce" style={{animationDuration: '3s'}}></div>
                    
                    {/* Animated particles */}
                    <div className="absolute top-10 right-10 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-20 left-16 w-3 h-3 bg-indigo-400 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute top-1/3 left-10 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-500"></div>
                </div>

                <div className="container mx-auto px-4 py-12 relative z-10">
                    {/* Quiz Header */}
                    <div className="text-center mb-12">
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 max-w-4xl mx-auto">
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                        Quiz for Lesson {lessonNumber}
                                    </h1>
                                    <p className="text-xl text-gray-600">
                                        Test your knowledge • {questions.length} questions
                                    </p>
                                </div>
                            </div>
                            
                            {!isSubmitted && (
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50">
                                    <p className="text-sm text-blue-700 font-medium">
                                        💡 Take your time and read each question carefully. You can only submit once!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quiz Form */}
                    <form onSubmit={handleSubmitQuiz} className="space-y-8">
                        {questions.map((question, index) => (
                            <div 
                                key={index} 
                                className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl border border-white/30 transform hover:-translate-y-2 transition-all duration-500"
                            >
                                {/* Question Header */}
                                <div className="flex items-start mb-6">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
                                            {question.question}
                                        </h3>
                                    </div>
                                </div>

                                {/* Answer Options */}
                                <div className="space-y-3 ml-16">
                                    {question.options.map((option, optionIndex) => {
                                        const optionLetter = option.charAt(0);
                                        const isSelected = userAnswers[index] === optionLetter;
                                        const isCorrect = isSubmitted && optionLetter === question.correctAnswer;
                                        const isWrong = isSubmitted && isSelected && optionLetter !== question.correctAnswer;
                                        
                                        return (
                                            <div 
                                                key={optionIndex} 
                                                className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                                                    isSubmitted 
                                                        ? isCorrect 
                                                            ? 'border-green-400 bg-green-50' 
                                                            : isWrong 
                                                                ? 'border-red-400 bg-red-50'
                                                                : 'border-gray-200 bg-gray-50'
                                                        : isSelected
                                                            ? 'border-purple-400 bg-purple-50 shadow-lg'
                                                            : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25 hover:shadow-md'
                                                }`}
                                            >
                                                <label className="flex items-center p-4 cursor-pointer relative">
                                                    <div className="flex items-center flex-grow">
                                                        {/* Custom Radio Button */}
                                                        <div className="relative">
                                                            <input
                                                                type="radio"
                                                                name={`question-${index}`} 
                                                                value={optionLetter}
                                                                checked={isSelected}
                                                                onChange={() => handleOptionChange(index, optionLetter)}
                                                                disabled={isSubmitted} 
                                                                className="sr-only"
                                                            />
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                                                isSubmitted
                                                                    ? isCorrect
                                                                        ? 'border-green-500 bg-green-500'
                                                                        : isWrong
                                                                            ? 'border-red-500 bg-red-500'
                                                                            : 'border-gray-400 bg-gray-100'
                                                                    : isSelected
                                                                        ? 'border-purple-500 bg-purple-500'
                                                                        : 'border-gray-400 bg-white group-hover:border-purple-400'
                                                            }`}>
                                                                {(isSelected || (isSubmitted && isCorrect)) && (
                                                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Option Text */}
                                                        <div className="ml-4 flex-grow">
                                                            <span className={`text-base font-medium transition-colors duration-300 ${
                                                                isSubmitted
                                                                    ? isCorrect
                                                                        ? 'text-green-800'
                                                                        : isWrong
                                                                            ? 'text-red-800'
                                                                            : 'text-gray-700'
                                                                    : isSelected
                                                                        ? 'text-purple-800'
                                                                        : 'text-gray-700 group-hover:text-purple-700'
                                                            }`}>
                                                                {option}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Status Icons */}
                                                    {isSubmitted && (
                                                        <div className="ml-4">
                                                            {isCorrect ? (
                                                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            ) : isWrong ? (
                                                                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    )}
                                                </label>
                                                
                                                {/* Hover Effect Background */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Answer Feedback (Only shown after submission) */}
                                {isSubmitted && (
                                    <div className="ml-16 mt-6 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200">
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <span className="text-sm font-medium text-gray-600 mr-2">Your answer:</span>
                                                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                                                    userAnswers[index] === question.correctAnswer
                                                        ? 'text-green-700 bg-green-100'
                                                        : 'text-red-700 bg-red-100'
                                                }`}>
                                                    {userAnswers[index] || 'Not answered'}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-sm font-medium text-gray-600 mr-2">Correct answer:</span>
                                                <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                                                    {question.correctAnswer}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Submit Button */}
                        <div className="flex justify-center pt-8">
                            <button 
                                type="submit" 
                                disabled={isSubmitted} 
                                className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative flex items-center">
                                    {isSubmitted ? (
                                        <>
                                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Quiz Submitted
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6 mr-2 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                            </svg>
                                            Submit Quiz
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </form>

                    {/* Score Display */}
                    {score !== null && (
                        <div className="mt-12">
                            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 max-w-2xl mx-auto text-center">
                                <div className="mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
                                <p className="text-lg text-gray-600 mb-6">Great job on completing the quiz</p>
                                
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-green-700 mb-2">
                                            {score}/{questions.length}
                                        </div>
                                        <div className="text-lg font-semibold text-green-600 mb-4">
                                            {Math.round((score / questions.length) * 100)}% Score
                                        </div>
                                        
                                        {/* Score Performance Message */}
                                        <div className="text-center">
                                            {score === questions.length ? (
                                                <div className="text-green-700">
                                                    <div className="text-2xl mb-2">🎉</div>
                                                    <p className="font-bold">Perfect Score!</p>
                                                    <p className="text-sm">You got all questions correct!</p>
                                                </div>
                                            ) : score >= questions.length * 0.8 ? (
                                                <div className="text-green-600">
                                                    <div className="text-2xl mb-2">⭐</div>
                                                    <p className="font-bold">Excellent Work!</p>
                                                    <p className="text-sm">You have a strong understanding of the material.</p>
                                                </div>
                                            ) : score >= questions.length * 0.6 ? (
                                                <div className="text-yellow-600">
                                                    <div className="text-2xl mb-2">👍</div>
                                                    <p className="font-bold">Good Job!</p>
                                                    <p className="text-sm">You're on the right track. Review the material and try again.</p>
                                                </div>
                                            ) : (
                                                <div className="text-orange-600">
                                                    <div className="text-2xl mb-2">📚</div>
                                                    <p className="font-bold">Keep Studying!</p>
                                                    <p className="text-sm">Review the lesson content and practice more.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => navigate(`/course/${courseId}`)}
                                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                                    >
                                        Back to Course
                                    </button>
                                    <button
                                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                        className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                                    >
                                        Review Answers
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
            
            {/* Custom Styles */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
                
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                /* Smooth scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: rgba(147, 51, 234, 0.5);
                    border-radius: 10px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(147, 51, 234, 0.7);
                }
                
                /* Focus styles for accessibility */
                button:focus,
                input:focus,
                label:focus {
                    outline: 2px solid #8b5cf6;
                    outline-offset: 2px;
                }
                
                /* Animation classes */
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                
                .animate-slideIn {
                    animation: slideIn 0.5s ease-out forwards;
                }
                
                /* Responsive improvements */
                @media (max-width: 768px) {
                    .container {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                    
                    .text-4xl {
                        font-size: 2rem;
                    }
                    
                    .text-3xl {
                        font-size: 1.875rem;
                    }
                }
                
                /* Performance optimizations */
                * {
                    will-change: auto;
                }
                
                .transform {
                    will-change: transform;
                }
                
                /* Accessibility improvements */
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                    
                    .transform {
                        transform: none !important;
                    }
                }
            `}</style>
        </>
    );
}