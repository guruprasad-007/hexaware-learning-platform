// frontend/src/pages/QuizPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
// PlayCircle is not used in QuizPage, can be removed if not needed for other elements
// import { PlayCircle } from "lucide-react"; 
import api from '../services/api'; // Import your API service

export default function QuizPage() {
    const { id: courseId, lessonNumber } = useParams(); // Get both courseId and lessonNumber
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

                // Fetch the course details from your backend
                const response = await api.get(`/courses/${courseId}`);
                const course = response.data;

                if (!course) {
                    setError('Course not found.');
                    return;
                }

                // Find the specific lesson's quiz using lessonNumber
                const lesson = course.generatedLessonContent.find(
                    (l) => l.lessonNumber === parseInt(lessonNumber, 10)
                );

                if (!lesson || !lesson.quiz || !lesson.quiz.isGenerated || !lesson.quiz.questions || lesson.quiz.questions.length === 0) {
                    setError('Quiz not found for this lesson or not yet generated.');
                    return;
                }

                setQuestions(lesson.quiz.questions);

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
    }, [courseId, lessonNumber]); // Depend on courseId and lessonNumber

    // parseQuestions is no longer needed as questions are already parsed from DB
    // const parseQuestions = (text) => { ... }; 

    const handleOptionChange = (questionIndex, selectedOption) => {
        setUserAnswers(prev => ({ ...prev, [questionIndex]: selectedOption }));
    };

    const handleSubmitQuiz = async (e) => {
        e.preventDefault();
        let calculatedScore = 0;
        const answersToSubmit = questions.map((q, index) => {
            const isCorrect = userAnswers[index] === q.correctAnswer;
            if (isCorrect) calculatedScore++;
            return {
                question: q.question,
                userAnswer: userAnswers[index],
                isCorrect,
                correctAnswer: q.correctAnswer // Include correct answer in submission for backend validation
            };
        });

        setScore(calculatedScore);
        setIsSubmitted(true);
        alert(`Quiz submitted! Your score: ${calculatedScore}/${questions.length}`);

        // Optional: Send score to backend (e.g., to /api/assessments/submit)
        // You would need to ensure your backend's submitScore endpoint is ready for this payload
        /*
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await api.post('/assessments/submit', {
                courseId,
                lessonNumber: parseInt(lessonNumber, 10),
                score: calculatedScore,
                totalQuestions: questions.length,
                answers: answersToSubmit
            }, config);
            console.log("Score submitted to backend successfully!");
        } catch (submitError) {
            console.error("Failed to submit score to backend:", submitError);
            // Handle error, e.g., show a message to the user
        }
        */
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
                                        // The option value should be the full option string, not just charAt(0)
                                        // unless your backend's correctAnswer is also just 'A', 'B', 'C', 'D'
                                        value={option} 
                                        checked={userAnswers[index] === option}
                                        onChange={() => handleOptionChange(index, option)}
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
