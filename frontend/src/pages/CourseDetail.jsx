import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/common/Header';
import { Clock, BookOpen, BarChart, CheckCircle, PlayCircle, ArrowLeft, PartyPopper } from 'lucide-react';

const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-600"></div>
    </div>
);

// --- New Confirmation Message Component ---
const EnrollmentConfirmation = ({ courseTitle, show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed bottom-5 right-5 bg-white p-5 rounded-xl shadow-2xl border border-gray-100 z-50 animate-fadeInUp">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <PartyPopper className="w-8 h-8 text-purple-600" />
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">Successfully Enrolled!</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        You are now enrolled in "<strong>{courseTitle}</strong>". Happy learning!
                    </p>
                </div>
                <button onClick={onClose} className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600">&times;</button>
            </div>
        </div>
    );
};


export default function CourseDetailPage() {
    const { id: courseId } = useParams(); // Get the course ID from the URL and rename for clarity
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false); // State to track enrollment
    const [isEnrolling, setIsEnrolling] = useState(false); // State for button loading
    const [showConfirmation, setShowConfirmation] = useState(false); // State for the confirmation message

    useEffect(() => {
        const fetchInitialData = async () => {
            const token = localStorage.getItem('token');
            try {
                // 1. Fetch the public course details
                const courseRes = await axios.get(`http://localhost:5000/api/auth/courses/${courseId}`);
                setCourse(courseRes.data);


            } catch (err) {
                console.error("Failed to fetch initial data:", err);
                setError("Could not find the course you're looking for.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, [courseId]);

    const handleEnroll = async () => {
        setIsEnrolling(true);
        const token = localStorage.getItem('token');

        if (!token) {
            // In a real app, you might redirect to login
            alert('Please log in to enroll in a course.');
            setIsEnrolling(false);
            return;
        }

        try {
            // Make the API call to the backend enrollment endpoint
            await axios.post('http://localhost:5000/api/auth/enroll', 
                { courseId }, // Request body with the course ID
                { headers: { Authorization: `Bearer ${token}` } } // Auth header
            );
            
            setIsEnrolled(true);
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 5000);

        } catch (err) {
            console.error('Enrollment failed:', err);
            alert(err.response?.data?.message || 'Enrollment failed. Please try again.');
        } finally {
            setIsEnrolling(false);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-center text-red-500 p-8">{error}</div>;
    }
    
    // Ensure course is not null before rendering
    if (!course) {
        return null;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <EnrollmentConfirmation 
                courseTitle={course?.title}
                show={showConfirmation}
                onClose={() => setShowConfirmation(false)}
            />
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link to="/courses" className="flex items-center text-gray-500 hover:text-purple-600 font-medium transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to All Courses
                    </Link>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Left Column: Course Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">{course.category}</span>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
                            <p className="text-lg text-gray-600 mb-6">{course.description}</p>
                            
                            <div className="flex items-center space-x-6 text-gray-500 mb-8">
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center">
                                    <BookOpen className="w-5 h-5 mr-2 text-green-500" />
                                    <span>{course.modules?.length || 0} Modules</span>
                                </div>
                                <div className="flex items-center">
                                    <BarChart className="w-5 h-5 mr-2 text-yellow-500" />
                                    <span>{course.level}</span>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-4">What you'll learn</h2>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Build enterprise-level applications and deploy to production.</span></li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Master fundamental concepts behind structured and unstructured data.</span></li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Learn to work with a team of developers in a version-controlled environment.</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Course Card */}
                    <div className="mt-8 lg:mt-0">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <img src={course.thumbnailUrl} alt={course.title} className="w-full h-56 object-cover" />
                            <div className="p-6">
                                <div className="text-3xl font-bold text-gray-900 mb-4">${course.price}</div>
                                <button 
                                    onClick={handleEnroll}
                                    disabled={isEnrolled || isEnrolling}
                                    className={`w-full font-bold py-3 rounded-lg transition-colors flex items-center justify-center ${
                                        isEnrolled 
                                            ? 'bg-green-600 text-white cursor-not-allowed' 
                                            : isEnrolling
                                            ? 'bg-purple-400 text-white cursor-wait'
                                            : 'bg-purple-600 text-white hover:bg-purple-700'
                                    }`}
                                >
                                    {isEnrolled ? (
                                        <><CheckCircle className="w-5 h-5 mr-2" />Enrolled</>
                                    ) : isEnrolling ? (
                                        'Enrolling...'
                                    ) : (
                                        'Enroll Now'
                                    )}
                                </button>
                                <div className="text-sm text-gray-500 mt-4 text-center">30-Day Money-Back Guarantee</div>
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h3 className="text-md font-bold text-gray-800 mb-3">This course includes:</h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-center"><Clock className="w-4 h-4 mr-2" />{course.duration} on-demand video</li>
                                        <li className="flex items-center"><BookOpen className="w-4 h-4 mr-2" />{course.modules?.length || 0} modules</li>
                                        <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Full lifetime access</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modules Section */}
                <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Content</h2>
                    <div className="space-y-4">
                        {course.modules?.map((module, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                <div className="flex items-center">
                                    <PlayCircle className="w-6 h-6 text-purple-500 mr-4" />
                                    <div>
                                        <div className="font-bold text-gray-800">Module {module.number}</div>
                                        <p className="text-gray-600">{module.content}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-400">25 mins</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
}
