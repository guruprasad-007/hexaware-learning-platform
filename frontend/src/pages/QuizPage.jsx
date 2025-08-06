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

    if (loading) return <div className="text-center mt-20">Loading quiz...</div>;
    if (error) return <div className="text-center mt-20 text-red-600">Error: {error}</div>;
    if (questions.length === 0) return <div className="text-center mt-20">No questions found for this quiz.</div>;

    return (
        <>
            <Header />
            <main className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Quiz for Lesson {lessonNumber}</h1>
                <form onSubmit={handleSubmitQuiz} className="space-y-6">
                    {questions.map((question, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name={`question-${index}`} 
                                        value={option.charAt(0)} // <--- CRITICAL CHANGE: Set value to 'A', 'B', 'C', 'D'
                                        checked={userAnswers[index] === option.charAt(0)} // <--- CRITICAL CHANGE: Compare with 'A', 'B', 'C', 'D'
                                        onChange={() => handleOptionChange(index, option.charAt(0))} // <--- CRITICAL CHANGE: Pass 'A', 'B', 'C', 'D'
                                        disabled={isSubmitted} 
                                        className="form-radio h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                                    />
                                    <label className="ml-2 text-gray-700">{option}</label>
                                </div>
                            ))}
                            {isSubmitted && (
                                <div className="mt-4 text-sm">
                                    <p className={userAnswers[index] === question.correctAnswer ? "text-green-600" : "text-red-600"}>
                                        Your answer: {userAnswers[index] || 'Not answered'}
                                    </p>
                                    <p className="text-blue-600">
                                        Correct answer: {question.correctAnswer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                    <button 
                        type="submit" 
                        disabled={isSubmitted} 
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors duration-300"
                    >
                        Submit Quiz
                    </button>
                </form>
                {score !== null && (
                    <div className="mt-8 p-6 bg-green-100 text-green-700 rounded-lg shadow-md">
                        Your score is: {score} out of {questions.length}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
