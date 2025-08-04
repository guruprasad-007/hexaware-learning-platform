// frontend/src/pages/QuizPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import api from '../services/api';
import { PlayCircle } from "lucide-react";

export default function QuizPage() {
    const { id } = useParams(); // This is the course ID
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    // This effect fetches quiz questions from the backend
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('You must be logged in to take a quiz.');
                    setLoading(false);
                    return;
                }

                const config = { headers: { Authorization: `Bearer ${token}` } };
                // We'll use the course title as the topic for now
                const courseResponse = await api.get(`/courses/${id}`, config);
                const courseTitle = courseResponse.data.title;

                const quizResponse = await api.get(`/assessments/generate?topic=${courseTitle}`, config);
                setQuestions(quizResponse.data);
            } catch (err) {
                setError('Failed to generate quiz questions.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleOptionChange = (questionIndex, selectedOption) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: selectedOption,
        }));
    };

    const handleSubmitQuiz = async (e) => {
        e.preventDefault();
        let calculatedScore = 0;
        const answersToSubmit = questions.map((q, index) => {
            const isCorrect = userAnswers[index] === q.correctAnswer;
            if (isCorrect) {
                calculatedScore++;
            }
            return {
                question: q.question,
                userAnswer: userAnswers[index],
                isCorrect
            };
        });
        setScore(calculatedScore);
        setIsSubmitted(true);

        // Now submit the score to the backend
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await api.post('/assessments/submit', {
                courseId: id,
                topic: questions[0].question, // Use a representative topic
                score: calculatedScore,
                totalQuestions: questions.length,
                answers: answersToSubmit,
            }, config);
            alert("Quiz submitted and score saved!");
        } catch (err) {
            console.error("Failed to submit score:", err);
            alert("Failed to submit score to the backend.");
        }
    };

    if (loading) return <div>Loading quiz...</div>;
    if (error) return <div>Error: {error}</div>;
    if (questions.length === 0) return <div>No questions generated for this course.</div>;

    return (
        <>
            <Header />
            <main className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Course Quiz</h1>
                <form onSubmit={handleSubmitQuiz} className="space-y-6">
                    {questions.map((question, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option.charAt(0)}
                                        checked={userAnswers[index] === option.charAt(0)}
                                        onChange={() => handleOptionChange(index, option.charAt(0))}
                                        disabled={isSubmitted}
                                    />
                                    <label className="ml-2">{option}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="submit" disabled={isSubmitted} className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50">
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