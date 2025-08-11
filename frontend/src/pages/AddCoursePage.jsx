// frontend/src/pages/AddCoursePage.jsx

import React, { useState } from 'react';
import AdminHeader from '../components/common/AdminHeader';
import Footer from '../components/common/Footer';
import api from '../services/api';

export default function AddCoursePage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructor, setInstructor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [duration, setDuration] = useState('');
    const [rating, setRating] = useState(0);
    const [lessons, setLessons] = useState(0); 
    const [category, setCategory] = useState('');

    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        const token = localStorage.getItem('token');
        if (!token) {
            setStatus('Error: You are not logged in as admin.');
            setLoading(false);
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const courseData = {
            title,
            description,
            instructor,
            imageUrl,
            duration,
            rating,
            lessons: parseInt(lessons, 10), 
            category,
        };

        try {
            const response = await api.post('/admin/courses', courseData, config);
            setStatus(`Success: ${response.data.message}`);
            setTitle('');
            setDescription('');
            setInstructor('');
            setImageUrl('');
            setDuration('');
            setRating(0);
            setLessons(0);
            setCategory('');
        } catch (err) {
            setStatus(`Error: ${err.response?.data?.message || 'Failed to add course.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AdminHeader />
            <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
                
                {/* Enhanced Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float-slow"></div>
                    <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-float-reverse"></div>
                    <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-tr from-indigo-300/10 to-pink-300/10 rounded-full blur-2xl animate-pulse-slow"></div>
                    
                    {/* Additional floating elements */}
                    <div className="absolute top-20 right-1/4 w-32 h-32 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-2xl animate-bounce-gentle"></div>
                    <div className="absolute bottom-1/3 right-20 w-48 h-48 bg-gradient-to-l from-emerald-300/15 to-teal-300/15 rounded-full blur-2xl animate-pulse-gentle"></div>
                </div>

                <main className="container mx-auto p-8 relative z-10">
                    
                    {/* Enhanced Header Section */}
                    <div className="mb-10 animate-fade-in-up">
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
                            {/* Header with gradient background */}
                            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-6">
                                        <div className="relative">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                                                <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full border-3 border-white animate-pulse"></div>
                                        </div>
                                        <div>
                                            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                                                Add New <span className="animate-gradient-text">Course</span>
                                            </h1>
                                            <p className="text-white/90 text-lg font-medium">Create and publish a new course</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Form Section */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden animate-fade-in-up delay-200">
                        <div className="p-8">
                            
                            {/* Status Message */}
                            {status && (
                                <div className={`p-6 mb-8 rounded-2xl backdrop-blur-sm shadow-lg border animate-fade-in-up ${
                                    status.startsWith('Success') 
                                        ? 'bg-gradient-to-r from-green-50/80 to-emerald-50/80 text-green-700 border-green-200/50' 
                                        : 'bg-gradient-to-r from-red-50/80 to-pink-50/80 text-red-700 border-red-200/50'
                                }`}>
                                    <div className="flex items-center gap-3">
                                        {status.startsWith('Success') ? (
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                        )}
                                        <span className="font-semibold text-lg">{status}</span>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                
                                {/* Course Title */}
                                <div className="group animate-fade-in-up delay-300">
                                    <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        </div>
                                        Course Title
                                    </label>
                                    <input 
                                        type="text" 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        placeholder="Enter an engaging course title..." 
                                        className="w-full p-5 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 transition-all duration-300 text-gray-800 placeholder-gray-500 font-medium text-lg shadow-lg hover:shadow-xl group-hover:border-purple-300" 
                                        required 
                                    />
                                </div>

                                {/* Course Description */}
                                <div className="group animate-fade-in-up delay-400">
                                    <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                            </svg>
                                        </div>
                                        Description
                                    </label>
                                    <textarea 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)} 
                                        placeholder="Provide a detailed description of what students will learn..." 
                                        className="w-full p-5 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 transition-all duration-300 text-gray-800 placeholder-gray-500 font-medium shadow-lg hover:shadow-xl group-hover:border-purple-300 min-h-[120px] resize-y" 
                                        rows="4" 
                                        required 
                                    />
                                </div>

                                {/* Instructor and Category Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group animate-fade-in-up delay-500">
                                        <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            Instructor Name
                                        </label>
                                        <input 
                                            type="text" 
                                            value={instructor} 
                                            onChange={(e) => setInstructor(e.target.value)} 
                                            placeholder="Enter instructor's name..." 
                                            className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 transition-all duration-300 text-gray-800 placeholder-gray-500 font-medium shadow-lg hover:shadow-xl group-hover:border-purple-300" 
                                            required 
                                        />
                                    </div>

                                    <div className="group animate-fade-in-up delay-600">
                                        <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                            </div>
                                            Category
                                        </label>
                                        <input 
                                            type="text" 
                                            value={category} 
                                            onChange={(e) => setCategory(e.target.value)} 
                                            placeholder="e.g., Web Development, Design..." 
                                            className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 transition-all duration-300 text-gray-800 placeholder-gray-500 font-medium shadow-lg hover:shadow-xl group-hover:border-purple-300" 
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Image URL */}
                                <div className="group animate-fade-in-up delay-700">
                                    <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        Course Image URL
                                    </label>
                                    <input 
                                        type="url" 
                                        value={imageUrl} 
                                        onChange={(e) => setImageUrl(e.target.value)} 
                                        placeholder="https://example.com/course-image.jpg" 
                                        className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 transition-all duration-300 text-gray-800 placeholder-gray-500 font-medium shadow-lg hover:shadow-xl group-hover:border-purple-300" 
                                        required 
                                    />
                                </div>

                                {/* Duration, Rating, and Lessons Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="group animate-fade-in-up delay-800">
                                        <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            Duration
                                        </label>
                                        <input 
                                            type="text" 
                                            value={duration} 
                                            onChange={(e) => setDuration(e.target.value)} 
                                            placeholder="e.g., 4 weeks, 10 hours..." 
                                            className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 transition-all duration-300 text-gray-800 placeholder-gray-500 font-medium shadow-lg hover:shadow-xl group-hover:border-purple-300" 
                                            required 
                                        />
                                    </div>

                                    <div className="group animate-fade-in-up delay-900">
                                        <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                            Rating (0-5)
                                        </label>
                                        <input 
                                            type="number" 
                                            value={rating} 
                                            onChange={(e) => setRating(parseFloat(e.target.value))} 
                                            placeholder="4.5" 
                                            min="0" 
                                            max="5" 
                                            step="0.1" 
                                            className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 transition-all duration-300 text-gray-800 placeholder-gray-500 font-medium shadow-lg hover:shadow-xl group-hover:border-purple-300" 
                                            required 
                                        />
                                    </div>

                                    <div className="group animate-fade-in-up delay-1000">
                                        <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            Number of Lessons
                                        </label>
                                        <input 
                                            type="number" 
                                            value={lessons} 
                                            onChange={(e) => setLessons(parseInt(e.target.value) || 0)} 
                                            placeholder="15" 
                                            min="1" 
                                            className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 transition-all duration-300 text-gray-800 placeholder-gray-500 font-medium shadow-lg hover:shadow-xl group-hover:border-purple-300" 
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center pt-8 animate-fade-in-up delay-1100">
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="relative group overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-bold py-5 px-12 rounded-2xl text-lg shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                                    >
                                        {/* Button background animation */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                        
                                        <div className="relative flex items-center justify-center gap-3">
                                            {loading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Creating Course...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Create Course
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            
            <Footer />

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }

                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(15px) rotate(-3deg); }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.8; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.05); }
                }

                @keyframes bounce-gentle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes pulse-gentle {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 0.9; }
                }

                @keyframes gradient-text {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }

                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }

                .animate-float-reverse {
                    animation: float-reverse 8s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }

                .animate-bounce-gentle {
                    animation: bounce-gentle 3s ease-in-out infinite;
                }

                .animate-pulse-gentle {
                    animation: pulse-gentle 5s ease-in-out infinite;
                }

                .animate-gradient-text {
                    background: linear-gradient(-45deg, #fff, #e0e7ff, #c7d2fe, #a5b4fc);
                    background-size: 400% 400%;
                    animation: gradient-text 3s ease infinite;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
                .delay-400 { animation-delay: 400ms; }
                .delay-500 { animation-delay: 500ms; }
                .delay-600 { animation-delay: 600ms; }
                .delay-700 { animation-delay: 700ms; }
                .delay-800 { animation-delay: 800ms; }
                .delay-900 { animation-delay: 900ms; }
                .delay-1000 { animation-delay: 1000ms; }
                .delay-1100 { animation-delay: 1100ms; }
            `}</style>
        </>
    );
}