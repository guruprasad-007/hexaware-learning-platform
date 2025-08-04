import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import api from '../services/api';
import { BookOpen, Star, Clock, Users, ArrowRight, ChevronDown, ChevronUp, PlayCircle } from "lucide-react";

export default function CourseDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(true); // Hardcoded for demonstration
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedSections, setExpandedSections] = useState(new Set());

    // Hardcoded courses data
    const hardcodedCourses = [
        {
            _id: 'hardcoded-1',
            title: 'Introduction to the Course',
            description: 'Get started with the fundamentals of web development and learn the essential skills needed to build modern web applications.',
            category: 'web',
            level: 'Beginner',
            instructor: 'John Smith',
            rating: '4.8',
            duration: '3min',
            lessons: '2',
            students: '1.2k',
            imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            modules: [
                {
                    title: 'Introduction to the Course',
                    content: 'Welcome to the comprehensive web development course where you will learn HTML, CSS, JavaScript and modern frameworks.',
                    lectures: 2,
                    duration: '3min',
                    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
                },
                {
                    title: 'Setting up Development Environment',
                    content: 'Learn how to set up your development environment with VS Code, Node.js, and essential extensions.',
                    lectures: 3,
                    duration: '15min',
                    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
                }
            ]
        },
        {
            _id: 'hardcoded-2',
            title: 'Leveraging Generative AI for Data Analytics [NEW]',
            description: 'Master the power of generative AI tools like ChatGPT and Claude for advanced data analysis and insights generation.',
            category: 'ai',
            level: 'Intermediate',
            instructor: 'Dr. Sarah Johnson',
            rating: '4.9',
            duration: '1hr 29min',
            lessons: '7',
            students: '850',
            imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            modules: [
                {
                    title: 'Understanding Generative AI Basics',
                    content: 'Explore the fundamentals of generative AI and its applications in data analytics.',
                    lectures: 3,
                    duration: '25min',
                    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
                },
                {
                    title: 'Introduction to AI Tools (ChatGPT, Grok.com)',
                    content: 'Get hands-on experience with popular AI tools and learn how to integrate them into your data analysis workflow.',
                    lectures: 2,
                    duration: '20min',
                    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
                },
                {
                    title: 'Prompt Engineering for Data Analysis',
                    content: 'Learn effective prompt engineering techniques for data analysis tasks. Master the art of crafting prompts that generate accurate insights.',
                    lectures: 4,
                    duration: '44min',
                    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
                }
            ]
        },
        {
            _id: 'hardcoded-3',
            title: 'Introduction to Data Analytics',
            description: 'Comprehensive introduction to data analytics covering statistics, visualization, and modern analytical techniques.',
            category: 'data',
            level: 'Beginner',
            instructor: 'Michael Chen',
            rating: '4.7',
            duration: '58min',
            lessons: '13',
            students: '2.1k',
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            modules: [
                {
                    title: 'Data Analytics Fundamentals',
                    content: 'Understanding data types, collection methods, and basic statistical concepts.',
                    lectures: 5,
                    duration: '30min',
                    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
                },
                {
                    title: 'Data Visualization Techniques',
                    content: 'Learn to create compelling visualizations using various tools and libraries.',
                    lectures: 8,
                    duration: '28min',
                    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
                }
            ]
        }
    ];

    const toggleSection = (index) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    useEffect(() => {
        const hardcodedCourse = hardcodedCourses.find(course => course._id === id);
        if (hardcodedCourse) {
            setCourse(hardcodedCourse);
            setIsLoading(false);
        } else {
            setError('Course not found.');
            setIsLoading(false);
        }
    }, [id]);

    const handleEnroll = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please log in to enroll in a course.");
            return;
        }

        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await api.post('/courses/enroll', { courseId: id }, config);
            setIsEnrolled(true);
            alert("Successfully enrolled in the course!");
        } catch (err) {
            alert(`Enrollment failed: ${err.response?.data?.message || err.message}`);
        }
    };

    if (isLoading) return <div>Loading course details...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!course) return <div>Course not found.</div>;

    return (
        <>
            <Header />
            <main className="container mx-auto p-8">
                {/* Course Main Details Section */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/90 backdrop-blur-sm p-12">
                    <div className="md:flex md:space-x-12">
                        <div className="md:w-1/3 flex-shrink-0">
                            <img src={course.imageUrl} alt={course.title} className="rounded-2xl w-full h-auto object-cover shadow-lg" />
                        </div>
                        <div className="mt-8 md:mt-0 md:w-2/3">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
                            <p className="text-xl text-gray-600 mb-6">{course.description}</p>

                            <div className="flex flex-wrap gap-6 mb-8 text-sm font-semibold text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-600" />
                                    <span>{course.instructor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500" />
                                    <span>{course.rating} Rating</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-green-500" />
                                    <span>{course.lessons} Lessons</span>
                                </div>
                            </div>

                            {isEnrolled ? (
                                <button className="py-4 px-8 bg-green-500 text-white font-bold rounded-xl shadow-lg">Start Learning</button>
                            ) : (
                                <button onClick={handleEnroll} className="py-4 px-8 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-colors">Enroll Now</button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Course Content Section */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Course content</h2>
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center">
                            <p className="text-gray-600 text-sm">
                                {course.modules.length} sections • {course.modules.reduce((acc, curr) => acc + (curr.lectures || 0), 0)} lectures • {course.duration} total length
                            </p>
                            <button onClick={() => setExpandedSections(new Set(course.modules.map((_, i) => i)))} className="text-purple-600 hover:text-purple-700 font-semibold">
                                Expand all sections
                            </button>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {course.modules.map((module, index) => (
                                <div key={index} className="bg-white hover:bg-gray-50 transition-colors">
                                    <button
                                        onClick={() => toggleSection(index)}
                                        className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                                    >
                                        <span className="flex items-center gap-4">
                                            {expandedSections.has(index) ? (
                                                <ChevronUp className="w-5 h-5 text-purple-600" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-purple-600" />
                                            )}
                                            <span className="font-semibold text-lg text-gray-700">{module.title}</span>
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            {module.lectures} lectures • {module.duration}
                                        </span>
                                    </button>
                                    {expandedSections.has(index) && (
                                        <div className="px-6 py-4 text-gray-600 bg-gray-50">
                                            <p className="mb-4">{module.content}</p>
                                            <div className="space-y-2">
                                                {/* Video Player */}
                                                {module.videoUrl && (
                                                    <div className="rounded-lg overflow-hidden shadow-lg mb-4">
                                                        <iframe 
                                                            className="w-full h-auto aspect-video"
                                                            src={module.videoUrl} 
                                                            title={module.title}
                                                            frameBorder="0" 
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                            allowFullScreen
                                                        ></iframe>
                                                    </div>
                                                )}
                                                {/* Link to Quiz Page */}
                                                <Link 
                                                    to={`/courses/${id}/quiz`}
                                                    className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <PlayCircle className="w-5 h-5" />
                                                    Take Quiz for this Course
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}