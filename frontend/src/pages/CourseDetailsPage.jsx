// frontend/src/pages/CourseDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock, Star, PlayCircle, Zap } from "lucide-react";
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import api from '../services/api';

export default function CourseDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loadingContent, setLoadingContent] = useState(false);
    const [contentStatus, setContentStatus] = useState('');

    const fetchCourse = async () => {
        try {
            const { data } = await api.get(`/courses/${id}`);
            setCourse(data);
        } catch (error) {
            console.error("Error fetching course:", error);
            setContentStatus('Error loading course details.');
        }
    };

    useEffect(() => {
        if (id) {
            fetchCourse();
        }
    }, [id]);

    const handleGenerateContent = async () => {
        setLoadingContent(true);
        setContentStatus('');
        const token = localStorage.getItem('token');

        if (!token) {
            setContentStatus("Please log in to generate content.");
            navigate('/login');
            setLoadingContent(false);
            return;
        }

        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await api.post(`/courses/${id}/generate-content`, {}, config);
            setContentStatus(response.data.message);
            await fetchCourse(); // Re-fetch course to update UI with new content
        } catch (error) {
            console.error("Error generating course content:", error);
            setContentStatus(`Failed to generate content: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoadingContent(false);
        }
    };

    // New handler to navigate to QuizPage
    const handleTakeQuiz = (lessonNumber) => {
        // Navigate to the QuizPage, passing course ID and lesson number
        navigate(`/courses/${id}/quiz/${lessonNumber}`);
    };

    if (!course) {
        return (
            <>
                <Header />
                <div className="fixed inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="text-center">
                        <div className="relative w-16 h-16 mx-auto mb-4">
                            <div className="absolute inset-0 w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 border-r-purple-600 rounded-full animate-spin"></div>
                        </div>
                        <div className="text-gray-600 font-medium animate-pulse">Loading course details...</div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{course.title}</h1>
                    <p className="text-gray-700 text-lg mb-6">{course.description}</p>

                    <div className="flex flex-wrap items-center gap-6 text-md text-gray-600 mb-8">
                        <div className="flex items-center gap-2">
                            <BookOpen size={20} className="text-indigo-500" /> {course.lessons || 0} Lessons
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={20} className="text-blue-500" /> {course.enrolledCount || 0} Students
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={20} className="text-purple-500" /> {course.duration || 'N/A'}
                        </div>
                        <div className="flex items-center gap-2">
                            <Star size={20} className="text-yellow-500" /> {course.rating || 0}
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap size={20} className="text-red-500" /> {course.category || 'N/A'}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md">
                            <PlayCircle size={20} /> Start Learning
                        </button>
                        
                        {/* Generate Content Button */}
                        <button 
                            onClick={handleGenerateContent} 
                            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loadingContent}
                        >
                            {loadingContent ? 'Generating...' : 'Generate Content (Videos & Quizzes)'}
                        </button>
                    </div>
                    {contentStatus && (
                        <p className={`mt-4 text-sm ${contentStatus.startsWith('Success') ? 'text-green-600' : 'text-red-600'}`}>
                            {contentStatus}
                        </p>
                    )}
                </div>

                {/* Display course.modules (CHANGED FROM generatedLessonContent) */}
                {course.modules && course.modules.length > 0 ? (
                    <div className="mt-10 bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Lessons</h2>
                        {course.modules.map((module, index) => (
                            <div key={index} className="mb-10 border-b pb-8 last:border-b-0 last:pb-0">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Lesson {index + 1}: {module.title}</h3> {/* Using index + 1 for lesson number */}
                                {module.youtubeVideo && module.youtubeVideo.embedUrl ? (
                                    <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden shadow-md">
                                        <iframe
                                            src={module.youtubeVideo.embedUrl}
                                            title={module.youtubeVideo.title || "YouTube Video"}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">Video not available for this lesson. Try generating content!</p>
                                )}
                                {module.content && <p className="text-gray-700 mt-4 leading-relaxed">{module.content}</p>}

                                {/* Take Quiz Button */}
                                {module.quiz && module.quiz.isGenerated && module.quiz.questions && module.quiz.questions.length > 0 && (
                                    <button 
                                        onClick={() => handleTakeQuiz(index + 1)} // Pass lesson number (index + 1)
                                        className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md"
                                    >
                                        <PlayCircle size={20} /> Take Quiz
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl mb-8 shadow-lg">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No lessons available yet</h3>
                        <p className="text-gray-500 mb-4">
                            Use the "Generate Content" button to automatically add videos and quizzes for this course!
                        </p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
