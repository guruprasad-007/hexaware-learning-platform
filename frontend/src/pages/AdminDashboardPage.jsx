// frontend/src/pages/AdminDashboardPage.jsx (COMPLETE AND MODIFIED)

import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/common/AdminHeader'; // Use the new admin header
import Footer from '../components/common/Footer';
import api from '../services/api'; // Use your core API instance
import { Users, BookOpen, UserPlus, Calendar, Mail, GraduationCap, TrendingUp, ChevronDown, Plus, AlertCircle } from 'lucide-react';

// Enhanced Stats Card Component
const StatCard = ({ icon: Icon, value, label, color, delay, trend }) => (
  <div 
    className={`group relative bg-gradient-to-br ${color} backdrop-blur-xl p-8 rounded-2xl shadow-2xl hover:shadow-3xl border border-white/20 transform hover:-translate-y-4 hover:scale-105 transition-all duration-700 animate-fade-in-up cursor-pointer overflow-hidden`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Background glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Floating particles */}
    <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
    <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-700"></div>
    
    <div className="relative z-10 flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="p-4 bg-white/15 rounded-xl backdrop-blur-sm">
              <Icon className="w-8 h-8 text-white drop-shadow-lg group-hover:animate-bounce transition-all duration-500" />
            </div>
            <div className="absolute inset-0 bg-white/20 rounded-xl blur-lg group-hover:animate-pulse"></div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
              {value}
            </p>
            <p className="text-white/90 font-medium group-hover:text-white transition-colors duration-300">
              {label}
            </p>
          </div>
        </div>
        
        {trend && (
          <div className="flex items-center gap-2 text-white/80">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{trend}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Enhanced User Row Component
const UserRow = ({ user, allCourses, handleAddCourse, index }) => (
  <tr className="group bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 animate-fade-in-up border-b border-gray-200/50"
      style={{ animationDelay: `${index * 100}ms` }}>
    <td className="px-6 py-6 whitespace-nowrap">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
            {user.fullName}
          </p>
        </div>
      </div>
    </td>
    <td className="px-6 py-6 whitespace-nowrap">
      <div className="flex items-center space-x-3">
        <Mail className="w-5 h-5 text-gray-400" />
        <span className="text-gray-700 font-medium">{user.email}</span>
      </div>
    </td>
    <td className="px-6 py-6">
      <div className="flex flex-wrap gap-2 max-w-xs">
        {user.enrolledCourses.length > 0 ? (
          user.enrolledCourses.map((course, idx) => (
            <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border border-purple-200 shadow-sm">
              <GraduationCap className="w-3 h-3 mr-1" />
              {course.title}
            </span>
          ))
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
            No courses enrolled
          </span>
        )}
      </div>
    </td>
    <td className="px-6 py-6 whitespace-nowrap">
      <div className="flex items-center space-x-3">
        <Calendar className="w-5 h-5 text-gray-400" />
        <span className="text-gray-700 font-semibold">{user.loginHistory.length}</span>
        <span className="text-gray-500 text-sm">days</span>
      </div>
    </td>
    <td className="px-6 py-6 whitespace-nowrap">
      <div className="relative">
        <select
          onChange={(e) => handleAddCourse(user._id, e.target.value)}
          className="appearance-none bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 hover:border-purple-300 text-purple-700 py-3 px-4 pr-12 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 font-semibold transition-all duration-300 cursor-pointer hover:shadow-lg min-w-[200px]"
          defaultValue=""
        >
          <option value="" disabled>Add a Course</option>
          {allCourses.map(course => (
            <option key={course._id} value={course._id} className="py-2">
              {course.title}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
          <Plus className="w-4 h-4 text-purple-600 mr-1" />
          <ChevronDown className="w-4 h-4 text-purple-600" />
        </div>
      </div>
    </td>
  </tr>
);

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0 });
    const [users, setUsers] = useState([]);
    const [allCourses, setAllCourses] = useState([]); // State for all courses for the dropdown
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Helper to get token and config for protected routes
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token found");
        }
        return {
            headers: { Authorization: `Bearer ${token}` }
        };
    };

    // Fetch all data for the dashboard on initial load
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const config = getAuthHeaders();
                
                // Fetch stats data
                const statsResponse = await api.get('/admin/dashboard-stats', config);
                setStats(statsResponse.data);

                // Fetch all users
                const usersResponse = await api.get('/admin/users', config);
                setUsers(usersResponse.data);

                // Fetch all available courses for the dropdown
                const coursesResponse = await api.get('/admin/courses', config);
                setAllCourses(coursesResponse.data);

            } catch (err) {
                setError('Failed to fetch dashboard data. Please log in as admin.');
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    // Handle the action of adding a course to a user
    const handleAddCourse = async (userId, selectedCourseId) => {
        if (!selectedCourseId) {
            alert("Please select a course to add.");
            return;
        }
        try {
            const config = getAuthHeaders();
            // Call the enroll-course API endpoint
            await api.post('/admin/enroll-course', { userId, courseId: selectedCourseId }, config);

            // Re-fetch users to update the list and reflect the new course
            const usersResponse = await api.get('/admin/users', config);
            setUsers(usersResponse.data);
            alert("Course added successfully!");
        } catch (err) {
            setError('Failed to add course. Please try again.');
        }
    };

    if (loading) {
        return (
            <>
                <AdminHeader />
                <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
                    {/* Background elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float-slow"></div>
                        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-float-reverse"></div>
                    </div>
                    
                    <div className="text-center space-y-6 relative z-10">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-200 border-t-purple-600 mx-auto shadow-lg"></div>
                            <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-2 border-purple-300 opacity-20"></div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30">
                            <p className="text-gray-700 font-semibold text-lg">Loading Admin Dashboard...</p>
                            <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the data</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    
    if (error) {
        return (
            <>
                <AdminHeader />
                <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
                    {/* Background elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-float-slow"></div>
                        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-red-400/15 to-pink-400/15 rounded-full blur-3xl animate-float-reverse"></div>
                    </div>
                    
                    <div className="text-center max-w-md relative z-10">
                        <div className="bg-white/80 backdrop-blur-xl border-2 border-red-200/50 text-red-700 p-8 rounded-2xl shadow-xl">
                            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
                            <h2 className="text-xl font-bold mb-4">Error Loading Dashboard</h2>
                            <p className="font-semibold mb-6">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

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
                                                <Users className="w-8 h-8 text-white drop-shadow-lg" />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full border-3 border-white animate-pulse"></div>
                                        </div>
                                        <div>
                                            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                                                Admin <span className="animate-gradient-text">Dashboard</span>
                                            </h1>
                                            <p className="text-white/90 text-lg font-medium">Manage users and courses efficiently</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Stats section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <StatCard
                            icon={Users}
                            value={stats.totalUsers}
                            label="Total Users"
                            color="from-blue-500/90 to-indigo-600/90"
                            delay={0}
                            trend="+12% from last month"
                        />
                        <StatCard
                            icon={BookOpen}
                            value={stats.totalCourses}
                            label="Total Courses"
                            color="from-purple-500/90 to-violet-600/90"
                            delay={200}
                            trend="+5 new courses"
                        />
                    </div>

                    {/* Enhanced User list table */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden animate-fade-in-up delay-400">
                        <div className="px-8 py-6 bg-gradient-to-r from-gray-50/80 to-white/80 border-b border-gray-200/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                                <div className="ml-auto text-sm text-gray-600 bg-white/80 px-3 py-1 rounded-full">
                                    {users.length} users
                                </div>
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200/50">
                                <thead className="bg-gradient-to-r from-gray-50/50 to-white/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">User Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Enrolled Courses</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Days Logged In</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200/50">
                                    {users.map((user, index) => (
                                        <UserRow
                                            key={user._id}
                                            user={user}
                                            allCourses={allCourses}
                                            handleAddCourse={handleAddCourse}
                                            index={index}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {users.length === 0 && (
                            <div className="text-center py-12">
                                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg font-medium">No users found</p>
                                <p className="text-gray-400 text-sm">Users will appear here once they register</p>
                            </div>
                        )}
                    </div>
                </main>

                {/* Enhanced Custom CSS */}
                <style jsx>{`
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(5deg); }
                    }
                    
                    @keyframes float-reverse {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(20px) rotate(-5deg); }
                    }
                    
                    @keyframes pulse-slow {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.3; }
                    }
                    
                    @keyframes bounce-gentle {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    
                    @keyframes pulse-gentle {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.8; }
                    }
                    
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
                    
                    @keyframes gradient-text {
                        0%, 100% {
                            background-size: 200% 200%;
                            background-position: left center;
                        }
                        50% {
                            background-size: 200% 200%;
                            background-position: right center;
                        }
                    }
                    
                    /* Animation Classes */
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
                        animation: pulse-gentle 3s ease-in-out infinite;
                    }
                    
                    .animate-fade-in-up {
                        animation: fade-in-up 0.8s ease-out forwards;
                    }
                    
                    .animate-gradient-text {
                        background: linear-gradient(-45deg, #6366f1, #8b5cf6, #06b6d4, #10b981);
                        background-size: 400% 400%;
                        animation: gradient-text 4s ease infinite;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    
                    /* Delay Classes */
                    .delay-200 { animation-delay: 200ms; }
                    .delay-400 { animation-delay: 400ms; }

                    /* Enhanced glass morphism effects */
                    .glass-effect {
                        background: rgba(255, 255, 255, 0.25);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.18);
                    }

                    /* Custom scrollbar */
                    ::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
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

                    /* Enhanced focus states for accessibility */
                    button:focus,
                    select:focus {
                        outline: 2px solid #8b5cf6;
                        outline-offset: 2px;
                    }

                    /* Responsive improvements */
                    @media (max-width: 768px) {
                        .animate-fade-in-up {
                            animation-delay: 0ms !important;
                        }
                    }

                    /* Accessibility improvements */
                    @media (prefers-reduced-motion: reduce) {
                        .animate-float-slow,
                        .animate-float-reverse,
                        .animate-pulse-slow,
                        .animate-bounce-gentle,
                        .animate-pulse-gentle,
                        .animate-gradient-text {
                            animation: none;
                        }
                        
                        .transform {
                            transform: none !important;
                        }
                    }
                `}</style>
            </div>
            <Footer />
        </>
    );
}